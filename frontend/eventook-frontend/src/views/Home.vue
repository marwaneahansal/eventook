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
        <h3 class="second-title">
          Safe, secure, reliable ticketing.Your ticket to live entertainment!
        </h3>
      </div>
    </div>
    <div class="home-search-tab">
      <div class="search-tab" data-background="../assets/images/ticket-bg01.jpg">
        <div class="search-tab-content is-flex is-flex-direction-column is-justify-content-center">
            <div class="search-tab-header">
                <div class="search-ticket-header">
                    <h6 class="is-size-5 has-text-primary has-text-weight-bold
                      is-uppercase">
                      Welcome to EVENTOOK
                    </h6>
                    <div class="is-flex is-flex-direction-row
                          is-align-items-center columns px-3">
                      <h3 class="is-size-4 is-white is-uppercase has-text-weight-semibold mr-6 colum is-two-fifths">
                        what are you looking for
                      </h3>
                      <div class="is-flex is-flex-direction-row
                          is-justify-content-center is-align-items-center columns column">
                        <b-input type="text" placeholder="Search for Events" class="column is-full">
                        </b-input>
                        <button class="button is-primary has-text-black">
                          <span>Search</span>
                        </button>
                      </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/home';
</style>
