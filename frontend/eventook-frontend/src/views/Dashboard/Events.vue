<template>
  <div class="mt-6 dashboard-events">
    <div class="dashboard-events__title  mb-5">
      <h3 class="is-size-4 has-text-light has-text-weight-semibold">Events Organized by you:</h3>
      <div class="primary-line has-background-primary"></div>
    </div>

    <div class="dashboard-events__events">
      <event-card
        v-for="(event, index) in events" :key="index"
        :event="event"
      />
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
  },

  created() {
    this.getEvents();
  },
};
</script>

<style lang="scss">
.dashboard-events__title {
  width: fit-content;

  .primary-line {
    height: 4px;
    border-radius: 5px;
    width: 100%;
    z-index: 10;
  }
}

.dashboard-events__events {
  display: grid;
  column-gap: 3rem;
  row-gap: 2rem;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
}
</style>
