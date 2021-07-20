<template>
  <div class="events">
    <div class="banner-image"></div>
    <div class="event-content container">
      <div
        class="header-content is-flex is-flex-direction-column
          is-justify-content-center is-align-items-center">
        <h1 class="is-uppercase main-title">Get <span class="has-text-primary">events</span> tickets
        </h1>
      </div>
    </div>

    <search-tab />

    <div class="latest-events-showcase container">
      <div class="events-showcase-header mb-6">
        <div class="is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between">
          <div>
            <p class="is-size-4 has-text-light is-uppercase has-text-weight-semibold">Events:</p>
            <div class="primary-line has-background-primary"></div>
          </div>
        </div>
        <div class="line has-background-grey"></div>
      </div>

      <div class="events-wrapper" v-if="events">
        <event-card
          v-for="(event, index) in events" :key="index"
          :event="event"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from '@/axios';
import SearchTab from '@/components/SearchTab';
import EventCard from '@/components/EventCard';

export default {
  name: 'Home',

  data() {
    return {
      events: null,
    };
  },

  components: { SearchTab, EventCard },

  methods: {
    getAllEvents() {
      const loadingComponent = this.$buefy.loading.open();
      axios.get('events')
        .then((res) => {
          loadingComponent.close();
          this.events = res.data.events;
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
    this.getAllEvents();
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/home';
@import '../assets/scss/events';
</style>
