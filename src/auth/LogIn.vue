<template>
  <div class="login-container d-flex justify-content-center align-items-center">
    <b-card
      title="Login to PrimeBazaar"
      bg-variant="light"
      border-variant="info"
      class="my-5 shadow-sm"
    >
      <b-form @submit.prevent="handleLogin">
        <b-form-group label="Phone Number" label-for="input-phone">
          <b-form-input
            id="input-phone"
            type="tel"
            v-model="loginData.phone"
            placeholder="Enter your phone number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Password" label-for="input-password">
          <div class="input-group">
            <b-form-input
              :type="passwordFieldType"
              id="input-password"
              v-model="loginData.password"
              placeholder="Enter your password"
              required
            ></b-form-input>
            <div class="input-group-append">
              <span
                class="input-group-text"
                @click="togglePasswordVisibility"
                style="cursor: pointer"
              >
                <i
                  :class="
                    passwordFieldType === 'password'
                      ? 'fas fa-eye'
                      : 'fas fa-eye-slash'
                  "
                ></i>
              </span>
            </div>
          </div>
        </b-form-group>

        <b-button type="submit" variant="primary" block>Login</b-button>
      </b-form>

      <p class="mt-3 text-center">
        Don't have an account? <b-link to="/signup">Sign Up</b-link>
      </p>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        phone: "",
        password: "",
      },
      passwordFieldType: "password",
    };
  },
  methods: {
    handleLogin() {
      const storedUser = JSON.parse(localStorage.getItem("userData"));
      if (
        storedUser &&
        storedUser.phone === this.loginData.phone &&
        storedUser.password === this.loginData.password
      ) {
        localStorage.setItem("isLoggedIn", "true"); // ✅ Store login status
        alert("Login successful!");
        this.$router.push("/");
      } else {
        alert("Invalid phone number or password.");
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>
