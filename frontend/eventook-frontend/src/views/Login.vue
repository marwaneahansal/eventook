<template>
  <div id="login">
    <div class="login-wrapper">
      <div class="login--illustration is-flex is-justify-content-center">
        <img src="../assets/images/login.svg" alt="login illustration">
      </div>
      <div class="login--form px-4 py-5">
        <h2 class="is-size-4 has-text-weight-bold mb-6 has-text-centered">Welcome Back!</h2>

        <div class="is-flex is-flex-direction-column is-align-items-center mb-6">
          <div class="login-input">
            <label for="email">Email</label>
            <input class="input my-2" type="email" placeholder="johndoe@email.com" id="email">
            <!-- <p class="has-text-danger" v-if="formErrors.fullName">{{ formErrors.fullName }}</p> -->
          </div>
          <div class="login-input">
            <label for="password">Password</label>
            <input class="input my-2" type="password" placeholder="********************" id="password">
            <!-- <p class="has-text-danger" v-if="formErrors.email">{{ formErrors.email }}</p> -->
          </div>

          <button class="button is-primary is-meduim has-text-black is-uppercase has-text-weight-semibold is-align-self-center mt-5">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#login {
  height: 100vh;
  width: 80%;
  margin: 0 auto;
  padding-top: 4rem;

  .login-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 60%;
    margin: 0 auto;
  }

  .login--illustration {
    background-color: #0a1e5e;
    border-radius: 8px 0 0 8px;
    // height: 60%;
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
      }
    }

  }

}
</style>
