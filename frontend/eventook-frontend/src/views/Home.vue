<template>
  <div class="home">
    <page-loader v-if="!isLoaded"></page-loader>
    <div class="banner-image"></div>
    <div class="home-content container">
      <div
        class="header-content is-flex is-flex-direction-column
          is-justify-content-center is-align-items-center">
        <h1 class="is-uppercase main-title">Book your tickets for <br>your favourites
          <span class="has-text-primary">events</span>
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
          <a href="#" class="is-size-5 has-text-primary is-hover-light">View all</a>
        </div>
        <div class="line has-background-grey"></div>
      </div>

      <div class="coming-up-events mb-6" v-if="events">
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
import SearchTab from '@/components/SearchTab';
import EventCard from '@/components/EventCard';
import PageLoader from '@/components/PageLoader';
import axios from '@/axios';

export default {
  name: 'Home',

  data() {
    return {
      events: null,
      isLoaded: false,
    };
  },

  components: { SearchTab, EventCard, PageLoader },

  methods: {
    getEventsShowcase() {
      this.isLoaded = false;
      axios.get('events/showcase')
        .then((res) => {
          this.isLoaded = true;
          this.events = res.data.events;
        })
        .catch((err) => {
          this.isLoaded = true;
          console.log(err);
        });
    },
  },

  created() {
    this.getEventsShowcase();
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/home';
</style>
