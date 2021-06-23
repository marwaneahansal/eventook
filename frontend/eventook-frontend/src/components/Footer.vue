<template>
  <div class="footer-wrapper">
    <div class="footer-container">
      <div class="footer-nav is-flex is-align-items-center is-justify-content-space-between mb-5">
        <p class="is-size-4 has-text-white has-text-weight-medium" style="cursor: pointer" @click="$router.push({ name: 'Home'}).catch()">
          EVENT<span class="has-text-primary">OOK</span>
        </p>

        <div class="footer-nav-items is-flex is-flex-diriction-column is-align-items-center is-justify-content-space-evenly">
          <p class="has-text-white has-text-weight-medium mr-3" style="cursor: pointer" @click="$router.push({ name: 'Home'}).catch()">Home</p>
          <p class="has-text-white has-text-weight-medium mr-3" style="cursor: pointer" @click="$router.push({ name: 'Events'}).catch()">Events</p>
          <p class="has-text-white has-text-weight-medium mr-3" style="cursor: pointer" @click="$router.push({ name: 'Home'}).catch()">About us</p>
          <p class="has-text-white has-text-weight-medium" style="cursor: pointer" @click="$router.push({ name: 'Home'}).catch()">Contact</p>
        </div>
      </div>

      <div class="footer-copy">
        <div class="footer-nav is-flex is-align-items-center is-justify-content-space-between">
          <div class="is-flex is-align-items-center">
            <p class="is-size-6 has-text-white has-text-weight-medium mr-1">Made by with</p>
            <img src="../assets/images/heart.svg" alt="heart">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
@import '../assets/scss/footer.scss';
</style>
