<template>
  <div id="login">
    <div class="login-wrapper">
      <div class="login--illustration is-flex is-justify-content-center">
        <img src="../assets/images/login.svg" alt="login illustration">
      </div>
      <div class="login--form px-4 py-5 is-flex is-flex-direction-column is-justify-content-center">
        <h2 class="is-size-4 has-text-weight-bold has-text-centered">Welcome Back 👨‍✈️!</h2>
        <p class="is-size-5 has-text-danger has-text-centered mt-2" v-if="loginError">{{ loginError }}</p>

        <div class="is-flex is-flex-direction-column is-align-items-center my-6">
          <div class="login-input">
            <label for="email">Email</label>
            <input class="input my-2" type="email" placeholder="johndoe@email.com" id="email" v-model="email" :class="{'input-error': formErrors.email}">
            <p class="has-text-danger" v-if="formErrors.email">{{ formErrors.email }}</p>
          </div>
          <div class="login-input">
            <label for="password">Password</label>
            <input class="input my-2" type="password" placeholder="********************" id="password" v-model="password" :class="{'input-error': formErrors.password}">
            <p class="has-text-danger" v-if="formErrors.password">{{ formErrors.password }}</p>
          </div>

          <button class="button is-primary is-meduim has-text-black is-uppercase has-text-weight-semibold is-align-self-center mt-5" @click="login">Login</button>

          <p class="mt-3">Don't have an account yet! <a @click="$router.push({ name: 'Register'})" class="has-text-info has-text-weight-semibold">Register Now</a> </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  data() {
    return {
      email: null,
      password: null,

      formErrors: {},

      loginError: null,
    };
  },

  methods: {
    validateForm() {
      const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!this.email) this.formErrors.email = 'Email is required';

      if (this.email && !emailRegExp.test(this.email.toLowerCase())) this.formErrors.email = 'Please type a valid email';

      if (!this.password) this.formErrors.password = 'Password is required';
    },
    login() {
      this.loginError = null;
      this.formErrors = {};
      this.validateForm();

      if (Object.keys(this.formErrors).length === 0) {
        const loadingComponent = this.$buefy.loading.open();
        axios.post('/users/login', {
          email: this.email,
          password: this.password,
        })
          .then((res) => {
            loadingComponent.close();
            if (res.data.user) {
              this.$buefy.notification.open({
                duration: 3000,
                message: 'Loooged In',
                position: 'is-bottom-right',
                type: 'is-success',
              });
              this.$router.push({ name: 'Dashboard' });
            } else if (res.data.success === false && res.data.message) this.loginError = res.data.message;
            else {
              this.$buefy.notification.open({
                duration: 5000,
                message: res.data.message || 'Something went wrong',
                position: 'is-bottom-right',
                type: 'is-danger',
              });
            }
          }).catch((err) => {
            loadingComponent.close();
            this.$buefy.notification.open({
              duration: 5000,
              message: err.message,
              position: 'is-bottom-right',
              type: 'is-danger',
            });
          });
      }
    },
    isUserLoggedIn() {
      this.$store.dispatch('getLoggedInuser')
        .then((res) => {
          if (res.data.user) {
            this.$buefy.notification.open({
              duration: 5000,
              message: 'Already logged in!',
              position: 'is-bottom-right',
              type: 'is-warning',
            });
            this.$router.push({ name: 'Dashboard' });
          }
        }).catch(() => { });
    },
  },

  created() {
    this.isUserLoggedIn();
  },
};
</script>

<style lang="scss" scoped>
#login {
  width: 80%;
  margin: 0 auto;
  padding-top: 4rem;

  .login-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0 auto;
  }

  .login--illustration {
    background-color: #0a1e5e;
    border-radius: 8px 0 0 8px;
  }

  .login--form {
    background-color: #0a1e5e;
    border-radius: 0 8px 8px 0;
    height: 100%;

    .login-input {
      width: 100%;

      input {
        background-color: transparent;
        border: 1px solid #1d55bc;
        color: #b8d4f7;

        &::placeholder {
          color: #8493a8;
        }

        &.input-error {
          border: 1px solid #ff3860 !important;
        }
      }
    }

  }

}
</style>
