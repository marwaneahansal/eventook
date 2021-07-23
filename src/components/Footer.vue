<template>
  <div class="footer-wrapper">
    <div class="footer-container">
      <div class="footer-nav is-flex is-align-items-center is-justify-content-space-between mb-5">
        <p class="is-size-4-desktop has-text-white has-text-weight-medium footer-nav_logo" style="cursor: pointer" @click="$router.push({ name: 'Home'}).catch()">
          EVENT<span class="has-text-primary">OOK</span>
        </p>

        <div class="footer-nav-items is-flex is-flex-diriction-column is-align-items-center is-justify-content-space-evenly">
          <p class="has-text-white has-text-weight-medium mr-3 is-size-6-desktop is-size-7" style="cursor: pointer" @click="$router.push({ name: 'Home'}).catch()">Home</p>
          <p class="has-text-white has-text-weight-medium mr-3 is-size-6-desktop is-size-7" style="cursor: pointer" @click="$router.push({ name: 'Events'}).catch()">Events</p>
          <p class="has-text-white has-text-weight-medium mr-3 is-size-6-desktop is-size-7" style="cursor: pointer" @click="$router.push({ name: 'Home'}).catch()">About us</p>
          <p class="has-text-white has-text-weight-medium is-size-6-desktop is-size-7" style="cursor: pointer" @click="$router.push({ name: 'Home'}).catch()">Contact</p>
        </div>
      </div>

      <div class="line has-background-grey mb-5"></div>

      <div class="footer-copy">
        <div class="footer-nav is-flex is-align-items-center is-justify-content-center">
          <div class="is-flex is-align-items-center">
            <p class="is-size-7 has-text-white has-text-weight-medium mr-1">
              Made by
              <a href="https://www.marwaneahansal.com" target="_blank" class="has-text-primary">marwane ahansal</a>
               with
            </p>
            <box-icon type='solid' name='heart' color="red" size="17px"></box-icon>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
@import '../assets/scss/footer.scss';
</style>
