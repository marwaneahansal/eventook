<template>
  <div class="home">
    <div class="banner-image"></div>
    <div class="home-content">
      <div
        class="header-content is-flex is-flex-direction-column
          is-justify-content-center is-align-items-center">
        <h1 class="is-uppercase main-title">Book your tickets for <br>your favourites
          <span class="has-text-primary">events</span>
        </h1>
      </div>
    </div>

    <search-tab />

    <div class="latest-events-showcase">
      <div class="events-showcase-header mb-5">
        <div class="is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between">
          <div>
            <p class="is-size-4 has-text-light is-uppercase has-text-weight-semibold">Events:</p>
            <div class="primary-line has-background-primary"></div>
          </div>
          <a href="#" class="is-size-5 has-text-primary is-hover-light">View all</a>
        </div>
        <div class="line has-background-grey"></div>
      </div>

      <div class="is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between">
        <event-card class="mb-6 mr-6"/>
        <event-card class="mb-6 mr-6"/>
        <event-card class="mb-6"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchTab from '@/components/SearchTab';
import EventCard from '@/components/EventCard';

export default {
  name: 'Home',

  components: { SearchTab, EventCard },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/home';
</style>
