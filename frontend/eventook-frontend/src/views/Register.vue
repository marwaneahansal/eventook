<template>
  <div id="register">
    <div class="register-wrapper">
      <div class="register--form px-4 py-5">
        <h2 class="is-size-4 has-text-weight-bold mb-6 has-text-centered">Welcome aboard 👨‍✈️!</h2>

        <div class="is-flex is-flex-direction-column is-align-items-center mb-6 px-4">
          <div class="register-input">
            <label for="full-name">Full Name</label>
            <input class="input my-2" type="full-name" placeholder="John Doe" id="full-name">
            <!-- <p class="has-text-danger" v-if="formErrors.fullName">{{ formErrors.fullName }}</p> -->
          </div>

          <div class="register-input">
            <label for="email">Email</label>
            <input class="input my-2" type="email" placeholder="johndoe@email.com" id="email">
            <!-- <p class="has-text-danger" v-if="formErrors.fullName">{{ formErrors.fullName }}</p> -->
          </div>

          <div class="register-input">
            <label for="password">Password</label>
            <input class="input my-2" type="password" placeholder="********************" id="password">
            <!-- <p class="has-text-danger" v-if="formErrors.email">{{ formErrors.email }}</p> -->
          </div>

          <div class="register-input">
            <label for="confirm-password">Confirm Password</label>
            <input class="input my-2" type="confirm-password" placeholder="********************" id="confirm-password">
            <!-- <p class="has-text-danger" v-if="formErrors.email">{{ formErrors.email }}</p> -->
          </div>

          <button class="button is-primary is-meduim has-text-black is-uppercase has-text-weight-semibold is-align-self-center mt-5">Register</button>

          <p class="mt-3">Already <span class="has-text-primary">EVENTOOK</span> memeber! <a @click="$router.push({ name: 'Login' })" class="has-text-info has-text-weight-semibold">Login to your account</a> </p>
        </div>
      </div>
      <div class="register--illustration is-flex is-justify-content-center">
        <img src="../assets/images/register.svg" alt="register illustration">
      </div>
    </div>
  </div>
</template>

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

}
</style>
