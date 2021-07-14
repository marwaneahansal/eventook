<template>
	<div>
			<b-navbar class="b-navbar pt-2" :transparent="true">
					<template #brand>
							<b-navbar-item
							tag="router-link"
							class="is-size-4 has-text-white has-text-weight-medium" :to="{ path: '/' }">
									EVENT <span class="has-text-primary">OOK</span>
							</b-navbar-item>
					</template>
					<template #end>
							<b-navbar-item class="has-text-white has-text-weight-medium" @click="$router.push({ name: 'Home'})">
									Home
							</b-navbar-item>
							<b-navbar-item class="has-text-white has-text-weight-medium">
									Events
							</b-navbar-item>
							<b-navbar-item class="has-text-white has-text-weight-medium" @click="$router.push({ name: 'About'})">
									About us
							</b-navbar-item>
							<b-navbar-item class="has-text-white has-text-weight-medium">
									Contact
							</b-navbar-item>
							<b-navbar-item @click="$router.push({ name: 'Register'})">
									<a class="button is-primary">
										<strong class="is-uppercase">Join us</strong>
									</a>
							</b-navbar-item>
					</template>
			</b-navbar>
	</div>
</template>
<style lang="scss" scoped>
@import "../assets/scss/_variables";

.b-navbar {
  background-color: transparent !important;

  b-navbar-item {
    color: $main-color !important;
  }

}

</style>
