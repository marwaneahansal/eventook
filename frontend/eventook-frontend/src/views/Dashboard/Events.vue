<template>
  <div class="dashboard-events" v-if="events" >
    <div class="dashboard-events__title mb-6 is-flex is-align-items-center is-justify-content-space-between">
      <h3 class="is-size-4 has-text-light" v-if="userRole === 'eventOrganizer'">Events Organized by you:</h3>
      <h3 class="is-size-4 has-text-light" v-if="userRole === 'admin'">All Events:</h3>
      <b-button type="is-info" icon-left="plus" v-if="userRole === 'eventOrganizer'" @click="newEvent">New Event</b-button>
    </div>

    <div class="dashboard-events__events" v-if="events.length > 0">
      <event-card
        v-for="(event, index) in events" :key="index"
        :event="event">
        <template v-slot:approve-state>
          <b-tag :type="event.approved ? 'is-success' : 'is-warning'">{{ event.approved ? 'Approved' : 'Not Approved' }}</b-tag>
        </template>

        <template v-slot:view-bookings>
          <router-link :to="`/dashboard/events/${event.uid}/bookings`">
            <button class="view-booking mb-2 px-3 button is-primary is-inverted is-outlined">View Bookings</button>
          </router-link>
        </template>

        <template v-slot:action-buttons>
          <div class="is-flex" v-if="userRole === 'eventOrganizer'">
            <b-button icon-left="pencil-outline" class="is-size-5 edit-button is-flex-grow-1" type="is-info is-light" @click="editEvent(event.uid)">Edit</b-button>
            <b-button icon-left="delete-outline" class="is-size-5 delete-button is-flex-grow-1" type="is-danger is-light" @click="deleteEventDialog(event.uid)">Delete</b-button>
          </div>
          <div class="is-flex" v-if="userRole === 'admin'">
            <b-button icon-left="check-underline" class="is-size-5 edit-button is-flex-grow-1" type="is-info is-light" @click="approveEventDialog(event.uid)">Approve Event</b-button>
          </div>
        </template>
      </event-card>
    </div>
    <div v-else class="emptyState is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
      <img :src="require('@/assets/images/emptyState.svg')" alt="no events are created yet">
      <p>No Events Yet</p>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';
import EventCard from '@/components/EventCard';

export default {
  data() {
    return {
      events: null,
    };
  },

  components: { EventCard },

  computed: {
    userRole() {
      return this.$store.state.loggedInUser.role;
    },
  },

  methods: {
    getEvents() {
      const loadingComponent = this.$buefy.loading.open();
      axios.get('events/dashboard/events')
        .then((res) => {
          this.events = res.data.Events;
          loadingComponent.close();
        }).catch((err) => {
          loadingComponent.close();
          this.$buefy.notification.open({
            duration: 5000,
            message: err.message,
            position: 'is-bottom-right',
            type: 'is-danger',
          });
        });
    },
    newEvent() {
      this.$router.push({ name: 'DashboardAddEvents' });
    },
    editEvent(eventUid) {
      this.$router.push({ name: 'DashboardEventsEdit', params: { eventUid } });
    },
    deleteEventDialog(eventUid) {
      this.$buefy.dialog.confirm({
        title: 'Deleting event',
        message: 'Are you sure you want to <b>delete</b> this event? This action cannot be undone.',
        confirmText: 'Delete Event',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deleteEvent(eventUid),
      });
    },
    deleteEvent(eventUid) {
      const loadingComponent = this.$buefy.loading.open();

      axios.delete(`events/${eventUid}`)
        .then((res) => {
          loadingComponent.close();
          this.events = res.data.Events;
          this.$buefy.notification.open({
            duration: 5000,
            message: res.data.message,
            position: 'is-bottom-right',
            type: 'is-success',
          });
        }).catch((err) => {
          loadingComponent.close();
          this.$buefy.notification.open({
            duration: 5000,
            message: err.response.data.message || err.message,
            position: 'is-bottom-right',
            type: 'is-danger',
          });
        });
    },
    approveEventDialog(eventUid) {
      this.$buefy.dialog.confirm({
        title: 'Approving event',
        message: 'Are you sure you want to <b>approve</b> this event? This action cannot be undone.',
        confirmText: 'Approve Event',
        type: 'is-info',
        hasIcon: true,
        onConfirm: () => this.approveEvent(eventUid),
      });
    },
    approveEvent(eventUid) {
      const loadingComponent = this.$buefy.loading.open();

      axios.put(`events/approve/${eventUid}`)
        .then((res) => {
          loadingComponent.close();
          this.events = res.data.events;
          this.$buefy.notification.open({
            duration: 5000,
            message: res.data.message,
            position: 'is-bottom-right',
            type: 'is-success',
          });
        }).catch((err) => {
          loadingComponent.close();
          this.$buefy.notification.open({
            duration: 5000,
            message: err.response.data.message || err.message,
            position: 'is-bottom-right',
            type: 'is-danger',
          });
        });
    },
  },

  created() {
    this.getEvents();
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/_variables.scss';

.dashboard-events__events {
  display: grid;
  column-gap: 2rem;
  row-gap: 2rem;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
  min-height: 500px;

  .edit-button {
    border-radius: 0 0 0 4px !important;
  }

  .delete-button {
    border-radius: 0 0 4px 0 !important;
  }

  .tag {
    width: fit-content;
  }
}

.modal-card {
  .modal-card-head, .modal-card-foot {
    background: #001232 !important;

    p {
      color: #fff !important;
    }
  }

  .modal-card-head {
    border-bottom-color: #565656 !important;
  }

  .modal-card-foot {
    border-top-color: #565656 !important;
  }

  .modal-card-body {
    background-color: $light-background;
  }
}

.emptyState {
  img {
    width: 300px;
  }
}

.view-booking {
  border: none;
  width: fit-content;
  background: transparent !important;
  height: auto !important;
}
</style>
