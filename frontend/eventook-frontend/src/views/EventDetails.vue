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
        <h2 class="is-uppercase text-3xl">Best Web technologies - 2020</h2>
      </div>
      <div class="event-description-thumbnail">
        <img src="../assets/images/event02.jpg" alt="event thumbnail">
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
