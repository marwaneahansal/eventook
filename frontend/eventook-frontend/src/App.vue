<template>
  <div id="app">
    <div id="nav">
      <Navbar />
    </div>
    <router-view class="container"/>
    <div id="footer">
      <Footer />
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

#nav, .container {
  width: 80%;
  margin: 0 auto;
}
</style>
