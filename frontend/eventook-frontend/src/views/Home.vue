<template>
  <div class="home">
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

    <search-tab @search="setSearchQuery" initSearchQuery/>

    <div class="latest-events-showcase container">
      <div class="events-showcase-header mb-6">
        <div class="is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between">
          <div>
            <p class="is-size-4 is-size-6-mobile has-text-light is-uppercase has-text-weight-semibold">Events:</p>
            <div class="primary-line has-background-primary"></div>
          </div>
          <a href="/events" class="is-size-5 is-size-7-mobile has-text-primary is-hover-light">View all</a>
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
import axios from '@/axios';

export default {
  name: 'Home',

  data() {
    return {
      events: null,
    };
  },

  components: { SearchTab, EventCard },

  methods: {
    getEventsShowcase() {
      const loadingComponent = this.$buefy.loading.open();
      axios.get('events/showcase')
        .then((res) => {
          loadingComponent.close();
          this.events = res.data.events;
        })
        .catch((err) => {
          loadingComponent.close();
          this.$buefy.notification.open({
            duration: 5000,
            message: err.message,
            position: 'is-bottom-right',
            type: 'is-danger',
          });
        });
    },
    setSearchQuery(search = '') {
      this.$store.commit('SET_EVENTS_SEARCH_QUERY', search);
      this.$router.push({ name: 'Events' });
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
