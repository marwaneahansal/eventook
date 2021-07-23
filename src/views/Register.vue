<template>
  <div id="register">
    <div class="register-wrapper">
      <div class="register--form px-4 py-5">
        <h2 class="is-size-4 has-text-weight-bold has-text-centered">Welcome aboard 👨‍✈️!</h2>
        <p class="has-text-centered">Register to be able to create events</p>
        <p class="is-size-5 has-text-danger has-text-centered mt-2" v-if="registerError">{{ registerError }}</p>

        <div class="is-flex is-flex-direction-column is-align-items-center my-6 px-4">
          <div class="register-input">
            <label for="full-name">Full Name</label>
            <input class="input my-2" type="full-name" placeholder="John Doe" id="full-name" v-model="fullName">
            <p class="has-text-danger" v-if="formErrors.fullName">{{ formErrors.fullName }}</p>
          </div>

          <div class="register-input">
            <label for="email">Email</label>
            <input class="input my-2" type="email" placeholder="johndoe@email.com" id="email" v-model="email">
            <p class="has-text-danger" v-if="formErrors.email">{{ formErrors.email }}</p>
          </div>

          <div class="register-input">
            <label for="password">Password</label>
            <input class="input my-2" type="password" placeholder="********************" id="password" v-model="password">
            <p class="has-text-danger" v-if="formErrors.password">{{ formErrors.password }}</p>
          </div>

          <div class="register-input">
            <label for="confirm-password">Confirm Password</label>
            <input class="input my-2" type="password" placeholder="********************" id="confirm-password" v-model="confirmPassword">
            <p class="has-text-danger" v-if="formErrors.confirmPassword">{{ formErrors.confirmPassword }}</p>
          </div>

          <div class="register-input mt-3">
            <b-field>
              <b-checkbox :value="true" type="is-info" disabled>Register as an event organizer</b-checkbox>
            </b-field>
          </div>

          <button class="button is-primary is-meduim has-text-black is-uppercase has-text-weight-semibold is-align-self-center mt-5" @click="register">Register</button>

          <p class="mt-3 has-text-centered">Already <span class="has-text-primary">EVENTOOK</span> memeber! <a @click="$router.push({ name: 'Login' })" class="has-text-info has-text-weight-semibold">Login to your account</a> </p>
        </div>
      </div>
      <div class="register--illustration is-flex is-justify-content-center is-hidden-mobile is-hidden-tablet">
        <img src="../assets/images/register.svg" alt="register illustration">
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  data() {
    return {
      fullName: null,
      email: null,
      password: null,
      confirmPassword: null,

      formErrors: {},

      registerError: null,
    };
  },

  methods: {
    validateForm() {
      const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!this.fullName) this.formErrors.fullName = 'Full Name is required';

      if (!this.email) this.formErrors.email = 'Email is required';

      if (this.email && !emailRegExp.test(this.email.toLowerCase())) this.formErrors.email = 'Please type a valid email';

      if (!this.password) this.formErrors.password = 'Password is required';

      if (!this.confirmPassword) this.formErrors.confirmPassword = 'You need to confirm your password';

      if (this.password && this.confirmPassword && this.password !== this.confirmPassword) this.formErrors.confirmPassword = 'Password and Password confirmation needs to be the same';
    },
    register() {
      this.registerError = null;
      this.formErrors = {};
      this.validateForm();

      if (Object.keys(this.formErrors).length === 0) {
        const loadingComponent = this.$buefy.loading.open();
        axios.post('/users/register', {
          name: this.fullName,
          email: this.email,
          password: this.password,
          isEventOrganizer: true,
        })
          .then((res) => {
            loadingComponent.close();
            if (res.data.user) {
              this.$buefy.notification.open({
                duration: 5000,
                message: 'Registered In',
                position: 'is-bottom-right',
                type: 'is-success',
              });
            } else if (res.data.success === false && res.data.message) this.registerError = res.data.message;
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
#register {
  width: 80%;
  margin: 0 auto;
  padding-top: 4rem;

  .register-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    // grid-template-rows: 60%;
    margin: 0 auto;
  }

  .register--illustration {
    background-color: #0a1e5e;
    border-radius: 0 8px 8px 0;
    // height: 60%;
  }

  .register--form {
    background-color: #0a1e5e;
    border-radius: 8px 0 0 8px;
    height: 100%;

    .register-input {
      width: 100%;

      input {
        background-color: transparent;
        border: 1px solid #1d55bc;
        color: #b8d4f7;

        &::placeholder {
          color: #8493a8;
        }
      }
    }
  }

  .checkbox:hover {
    color: #c6c1b9 !important;
  }

  .b-checkbox.checkbox[disabled] {
    opacity: 0.9;
  }

}

@media only screen and (min-width: 769px) and (max-width: 1023px) {
  #register {
    width: 90% !important;
    padding-top: 2rem;

    .register-wrapper {
      width: 100% !important;
      grid-template-columns: 1fr !important;
    }
  }
}

@media only screen and (max-width: 768px) {
  #register {
    width: 95% !important;
    padding-top: 2rem !important;
    padding-right: 1rem;
    padding-left: 1rem;

    .register-wrapper {
      grid-template-columns: 1fr !important;
      margin: 0 auto;
    }
    .register--form {
      border-radius: 8px !important;
    }
  }

}
</style>
