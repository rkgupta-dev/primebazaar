<template>
  <div class="login-container d-flex justify-content-center align-items-center">
    <b-card
      title="Login to PrimeBazaar"
      bg-variant="light"
      border-variant="info"
      class="my-5 shadow-sm"
    >
      <b-form @submit.prevent="handleLogin">
        <!-- Phone Number Input -->
        <b-form-group label="Phone Number" label-for="input-phone">
          <b-form-input
            id="input-phone"
            type="tel"
            v-model="loginData.phone"
            placeholder="Enter your phone number"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Password Input with Icon Toggle -->
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

        <!-- Submit Button -->
        <b-button type="submit" variant="primary" block>Login</b-button>
      </b-form>

      <!-- Sign Up Link -->
      <p class="mt-3 text-center">
        Don't have an account? <b-link href="/signup">Sign Up</b-link>
      </p>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginData: {
        phone: "",
        password: "",
      },
      passwordFieldType: "password", // Initial type for password field
    };
  },
  mounted() {
    // Check if the user is already logged in and redirect to home if so
    const user = localStorage.getItem("signupData");
    if (user) {
      this.$router.push("/");
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.get(
          `http://localhost:3000/users?phone=${this.loginData.phone}&password=${this.loginData.password}`
        );

        // Check if exactly one user is found with the provided credentials
        if (response.status === 200 && response.data.length === 1) {
          const userData = response.data[0]; // Retrieve the user data

          // Store user data in localStorage
          localStorage.setItem("signupData", JSON.stringify(userData));

          // Redirect to home page
          this.$router.push("/");
          alert("Login successful!");
        } else {
          alert("Invalid phone number or password.");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login. Please try again.");
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
