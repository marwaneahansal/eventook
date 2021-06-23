<template functional>
  <div class="home-search-tab container">
      <div class="search-tab" data-background="../assets/images/ticket-bg01.jpg">
        <div class="search-tab-content is-flex is-flex-direction-column is-justify-content-center">
            <div class="search-tab-header">
                <div class="search-ticket-header">
                    <h6 class="is-size-5 has-text-primary has-text-weight-bold
                      is-uppercase">
                      Welcome to EVENTOOK
                    </h6>
                    <div class="is-flex is-flex-direction-row
                          is-align-items-center">
                      <h3 class="is-size-4 is-white is-uppercase has-text-weight-semibold mr-6">
                        what are you looking for
                      </h3>
                      <div class="is-flex is-flex-direction-row
                          is-justify-content-center is-align-items-center" style="width: 60%">
                        <b-input type="text" placeholder="Search for Events" style="width: 100%">
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
</template>

<style lang="scss">
@import '../assets/scss/searchTab';
</style>
