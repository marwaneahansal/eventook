<template>
  <div class="event-details">
    <div class="banner-image"></div>
    <div class="event-details-header container mb-6">
      <div
        class="header-content is-flex is-flex-direction-column
          is-justify-content-center is-align-items-center">
        <h1 class="is-uppercase main-title">
          Best Web technologies - 2020
        </h1>
        <button class="button is-primary is-large has-text-black mt-3 is-uppercase">Book tickets now</button>
      </div>
      <div class="days-left is-flex is-align-items-center is-justify-content-space-between">
        <span>15d</span>
        <span>4h</span>
        <span>22m</span>
        <span>12s</span>
      </div>
    </div>

    <div class="container event-description is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center py-6">
      <div class="event-description-text">
        <h2 class="is-uppercase is-size-3 has-text-weight-bold has-text-primary">Best Web technologies - 2020</h2>
        <p class="is-size-5 ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, delectus ut maxime aliquid eum consequuntur modi nihil temporibus itaque earum reiciendis ab illo quibusdam nesciunt et labore! Ea, unde ipsam.
        </p>
        <button class="button is-primary has-text-black mt-3 is-uppercase is-rounded">Book tickets</button>
      </div>
      <div class="event-description-thumbnail">
        <img src="../assets/images/event02.jpg" alt="event thumbnail">
      </div>
    </div>

    <div class="statistics-wrapper">
      <div class="container statistics is-flex is-flex-direction-column is-align-items-center py-6">
        <h3 class="is-uppercase is-size-2 mt-6 mb-3 has-text-weight-semibold has-text-primary">More info</h3>
        <p class="has-text-centered mb-6 is-size-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur magnam facilis non laboriosam modi necessitatibus itaque nihil sequi atque deleniti?
        </p>
      </div>
    </div>

    <div class="container event-stats">
      <!-- color="#00d1b2" -->
      <div class="event-stats--card event-stats--card-1">
        <box-icon name='calendar-event' color="#009881" size="lg"></box-icon>
        <div>
          <p class="is-size-5">3 Days (Friday-Sunday)</p>
          <p class="has-text-primary">70+ Workshops</p>
        </div>
      </div>

      <div class="event-stats--card event-stats--card-1">
        <box-icon name='map-pin' color="#009881" size="lg"></box-icon>
        <div>
          <p class="is-size-5">17 South Sherman Street</p>
          <p class="has-text-primary">Astoria, NY 11106</p>
        </div>
      </div>

      <div class="event-stats--card event-stats--card-1">
        <box-icon name='blanket' color="#009881" size="lg"></box-icon>
        <div>
          <p class="is-size-5">530</p>
          <p class="has-text-primary">Tickets Booked</p>
        </div>
      </div>

      <div class="event-stats--card event-stats--card-1">
        <box-icon name='calendar-event' color="#009881" size="lg"></box-icon>
        <div>
          <p class="is-size-5">500</p>
          <p class="has-text-primary">Usefull Sessions</p>
        </div>
      </div>

      <div class="event-stats--card event-stats--card-1">
        <box-icon name='calendar-event' color="#009881" size="lg"></box-icon>
        <div>
          <p class="is-size-5">15</p>
          <p class="has-text-primary">Talented Speakers</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
@import '../assets/scss/event-details.scss';
</style>
