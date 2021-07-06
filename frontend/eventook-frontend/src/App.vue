<template>
  <div>
    <div id="app">
      <div id="nav">
        <Navbar  class="container"/>
      </div>
      <router-view/>
      <div id="footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style lang="scss">
@import './assets/scss/main';

.container {
  width: 80%;
  margin: 0 auto;
}
</style>
