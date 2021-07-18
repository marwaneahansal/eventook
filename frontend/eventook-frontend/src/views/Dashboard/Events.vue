<template>
  <div class="dashboard-events">
    <div class="dashboard-events__title mb-5">
      <h3 class="is-size-4 has-text-light">Events Organized by you:</h3>
    </div>

    <div class="dashboard-events__events">
      <event-card
        v-for="(event, index) in events" :key="index"
        :event="event">
        <template v-slot:approve-state>
          <b-tag :type="event.approved ? 'is-success' : 'is-warning'">{{ event.approved ? 'Approved' : 'Not Approved' }}</b-tag>
        </template>

        <template v-slot:action-buttons>
          <div class="is-flex">
            <b-button icon-left="pencil-outline" class="is-size-5 edit-button is-flex-grow-1" type="is-info is-light" @click="editEvent(event.uid)">Edit</b-button>
            <b-button icon-left="delete-outline" class="is-size-5 delete-button is-flex-grow-1" type="is-danger is-light" @click="deleteEventDialog(event.uid)">Delete</b-button>
          </div>
        </template>
      </event-card>
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
  },

  created() {
    this.getEvents();
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/_variables.scss';

.dashboard-events__title {
  width: fit-content;
}

.dashboard-events__events {
  display: grid;
  column-gap: 2rem;
  row-gap: 2rem;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);

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
</style>
