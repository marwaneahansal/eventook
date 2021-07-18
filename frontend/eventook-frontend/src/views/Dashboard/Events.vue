<template>
  <div class="dashboard-events">
    <div class="dashboard-events__title mb-5">
      <h3 class="is-size-4 has-text-light">Events Organized by you:</h3>
    </div>

    <div class="dashboard-events__events">
      <event-card
        v-for="(event, index) in events" :key="index"
        :event="event">
        <template v-slot:action-buttons>
          <b-button icon-left="pencil-outline" class="is-size-5 edit-button" type="is-info is-light" @click="editEvent(event.uid)">Edit</b-button>
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
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
  }
}
</style>
