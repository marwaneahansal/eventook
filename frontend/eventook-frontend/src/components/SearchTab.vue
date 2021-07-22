<template>
  <div class="home-search-tab container">
      <div class="search-tab">
        <div class="search-tab-content is-flex is-flex-direction-column is-justify-content-center">
            <div class="search-tab-header">
                <div class="search-ticket-header">
                    <h6 class="is-size-5-desktop has-text-primary has-text-weight-bold-desktop
                      is-uppercase has-text-centered has-text-left-tablet">
                      Welcome to EVENTOOK
                    </h6>
                    <div class="searchInputWrapper is-flex is-flex-direction-row
                          is-align-items-center">
                      <h3 class="is-size-4-desktop is-white is-uppercase has-text-weight-semibold-desktop">
                        what are you looking for
                      </h3>
                      <div class="is-flex is-flex-direction-row is-justify-content-center is-align-items-center-tablet is-align-items-flex-start-mobile searchInput">
                        <b-input type="text" placeholder="Search for Events" v-model="searchQuery">
                        </b-input>
                        <button class="button is-primary has-text-black mt-2-mobile mt-0-tablet" @click="searchEvents">
                          Search
                        </button>
                      </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {

  props: {
    initSearchQuery: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      searchQuery: '',
    };
  },

  methods: {
    searchEvents() {
      this.$store.commit('SET_EVENTS_SEARCH_QUERY', this.searchQuery.trim());
      this.$emit('search', this.searchQuery.trim());
    },
  },

  created() {
    if (this.initSearchQuery) this.searchQuery = '';
    else this.searchQuery = this.$store.state.eventsSearchQuery;
  },

  destroyed() {
    this.searchQuery = '';
    this.$store.commit('SET_EVENTS_SEARCH_QUERY', '');
  },

};
</script>

<style lang="scss">
@import '../assets/scss/searchTab';
</style>
