<template>
  <div class="full_page__layout">
    <div class="sidebar">
      <side-bar @logout="logout"></side-bar>
    </div>
    <div class="full_page__content py-6 px-4" v-if="userName">
      <h1 class="is-size-4">Welcome <span class="has-text-weight-bold is-uppercase">{{ userName }}</span></h1>
      <router-view class="router-view"/>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';
import SideBar from '@/components/SideBar';

export default {
  components: { SideBar },

  methods: {
    logout() {
      axios.get('users/logout')
        .then((res) => {
          if (res.data.success === true) this.$store.commit('SET_LOGGED_IN_USER', null);

          this.$router.push({ name: 'Login' });
        }).catch((err) => {
          this.$buefy.notification.open({
            duration: 5000,
            message: err.message,
            position: 'is-bottom-right',
            type: 'is-danger',
          });
          this.$router.push({ name: 'Login' });
        });
    },
  },

  computed: {
    userName() {
      return this.$store.state.loggedInUser?.name || null;
    },
  },
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
.full_page__content {
  flex: 1;
}
</style>
