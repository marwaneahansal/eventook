<template>
  <div class="main__layout">
    <div id="nav">
      <Navbar  class="container"/>
    </div>
    <router-view class="router-view"/>
    <div id="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style lang="scss">
.main__layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .router-view {
    flex: 1;
  }
}

.container {
  width: 80%;
  margin: 0 auto;
}
@media only screen and (min-width: 769px) and (max-width: 1023px) {
  .container {
    width: 90% !important;
  }
}
@media only screen and (max-width: 768px) {
  .container {
    width: 100% !important;
    padding: 0 1rem;
  }
}
</style>
