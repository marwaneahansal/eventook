<template>
	<div>
			<b-navbar class="b-navbar pt-2" :transparent="true">
					<template #brand>
							<b-navbar-item
							tag="router-link"
							class="is-size-4-desktop is-size-6 has-text-white has-text-weight-medium" :to="{ path: '/' }">
									EVENT <span class="has-text-primary">OOK</span>
							</b-navbar-item>
					</template>
					<template #end>
							<b-navbar-item class="has-text-white has-text-weight-medium" @click="$router.push({ name: 'Home'}).catch(() => { })">
									Home
							</b-navbar-item>
							<b-navbar-item class="has-text-white has-text-weight-medium" @click="$router.push({ name: 'Events' }).catch(() => { })">
									Events
							</b-navbar-item>
							<b-navbar-item class="has-text-white has-text-weight-medium" @click="$router.push({ name: 'About'}).catch(() => { })">
									About us
							</b-navbar-item>
							<b-navbar-item class="has-text-white has-text-weight-medium">
									Contact
							</b-navbar-item>
							<div class="is-flex-desktop" v-if="!isLoggedIn">
								<b-navbar-item @click="$router.push({ name: 'Login'}).catch(() => { })" class="has-text-white has-text-weight-medium-desktop">
										Login
								</b-navbar-item>
								<b-navbar-item @click="$router.push({ name: 'Register'}).catch(() => { })">
									<a class="button is-primary">
										<strong class="is-uppercase">Join us</strong>
									</a>
								</b-navbar-item>
							</div>
							<b-navbar-item @click="$router.push({ name: 'Dashboard'}).catch(() => { })" v-else>
								<a class="button is-primary">
									<strong>Dashboard</strong>
								</a>
							</b-navbar-item>
					</template>
			</b-navbar>
	</div>
</template>

<script>
export default {

  data() {
    return {
      isLoggedIn: false,
    };
  },

  methods: {
    isUserLoggedIn() {
      this.$store.dispatch('getLoggedInuser')
        .then((res) => {
          if (res.data.user) this.isLoggedIn = true;
          else this.isLoggedIn = false;
        }).catch(() => {
          this.isLoggedIn = false;
        });
    },
  },

  created() {
    this.isUserLoggedIn();
  },

};
</script>

<style lang="scss">
@import "../assets/scss/_variables";

.b-navbar {
  background-color: transparent !important;

  b-navbar-item {
    color: $main-color !important;
  }

}

.navbar-burger {
	span {
		background-color: $light !important;
	}
}

@media only screen and (max-width: 1023px) {
	.navbar-menu.is-active {
		position: absolute;
		width: 100%;
		background-color: $light-background !important;
		color: $light !important;
	}
	.navbar-menu {
		background-color: $light-background !important;
		color: $light !important;
	}
}

</style>
