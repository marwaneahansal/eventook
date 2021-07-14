<template>
  <div class="full_page__layout">
    <div class="sidebar">
      <side-bar></side-bar>
    </div>
    <div class="full_page__content py-6 px-4">
      <h1 class="is-size-4">Welcome <span class="has-text-weight-bold is-uppercase">full Name</span></h1>
      <router-view class="router-view"/>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar';

export default {
  components: { SideBar },
};
</script>

<style lang="scss" scoped>
.full_page__layout {
  display: flex;
  flex-direction: row;
  min-height: 100vh;

  .router-view {
    flex: 1;
  }
}
</style>
