<template>
  <div
    class="signup-container d-flex justify-content-center align-items-center"
  >
    <b-card
      title="Sign Up for PrimeBazaar"
      bg-variant="light"
      border-variant="info"
      class="my-5 shadow-sm"
    >
      <b-form @submit.prevent="handleSubmit">
        <b-form-group label="Full Name" label-for="input-name" class="mt-4">
          <b-form-input
            id="input-name"
            v-model="formData.name"
            placeholder="Enter your name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Email Address" label-for="input-email">
          <b-form-input
            id="input-email"
            type="email"
            v-model="formData.email"
            placeholder="Enter your email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Phone Number" label-for="input-phone">
          <b-form-input
            id="input-phone"
            type="number"
            v-model="formData.phone"
            placeholder="Enter your phone number"
            required
          ></b-form-input>
        </b-form-group>

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

        <b-button type="submit" variant="primary" block>Sign Up</b-button>
      </b-form>

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
      passwordFieldType: "password",
    };
  },
  methods: {
    handleSubmit() {
      localStorage.setItem("userData", JSON.stringify(this.formData));
      alert("Sign-up successful!");
      this.$router.push("/login");
    },
    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
};
</script>

<style scoped>
.signup-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 1rem;
}
</style>
