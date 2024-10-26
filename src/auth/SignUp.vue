<template>
  <div
    class="signup-container d-flex justify-content-center align-items-center"
  >
    <b-card
      title="Sign Up for PrimeBazaar"
      bg-variant="light"
      border-variant="info"
      class="my-5 shadow-sm w-25"
    >
      <b-form @submit.prevent="handleSubmit">
        <!-- Name Input -->
        <b-form-group label="Full Name" label-for="input-name" class="mt-4">
          <b-form-input
            id="input-name"
            v-model="formData.name"
            placeholder="Enter your name"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Email Input -->
        <b-form-group label="Email Address" label-for="input-email">
          <b-form-input
            id="input-email"
            type="email"
            v-model="formData.email"
            placeholder="Enter your email"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Phone Number Input -->
        <b-form-group label="Phone Number" label-for="input-phone">
          <b-form-input
            id="input-phone"
            type="tel"
            v-model="formData.phone"
            placeholder="Enter your phone number"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Password Input -->
        <!-- Password Input with Icon Toggle -->
        <b-form-group label="Password" label-for="input-password">
          <div class="input-group">
            <b-form-input
              :type="passwordFieldType"
              id="input-password"
              v-model="formData.password"
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
        <b-button type="submit" variant="primary" block>Sign Up</b-button>
      </b-form>

      <!-- Login Link -->
      <p class="mt-3 text-center">
        Already have an account? <b-link to="/login">Log In</b-link>
      </p>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        phone: "",
        password: "",
      },
      passwordFieldType: "password", // Initial type for password field
    };
  },
  methods: {
    handleSubmit() {
      // Perform sign-up logic (API call, etc.)
      alert("Sign-up successful!");
    },
    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
};
</script>
