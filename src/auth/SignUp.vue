<template>
  <div
    class="signup-container d-flex justify-content-center align-items-center"
  >
    <b-card class="signup-card shadow border-0">
      <div class="d-flex justify-space-between align-center mb-4">
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/128/3799/3799978.png"
            alt="PrimeBazaar Logo"
            class="company-logo mb-3"
          />
        </div>
        <div class="ml-4">
          <h2 class="brand-text">PrimeBazaar</h2>
          <p class="text-muted">Create your account</p>
        </div>
      </div>

      <b-form @submit.prevent="handleSubmit">
        <b-form-group label="Full Name" label-for="input-name">
          <b-input-group>
            <b-input-group-prepend>
              <b-input-group-text>
                <i class="fas fa-user"></i>
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input
              id="input-name"
              v-model="formData.name"
              placeholder="Enter your name"
              required
            ></b-form-input>
          </b-input-group>
        </b-form-group>

        <b-form-group label="Email Address" label-for="input-email">
          <b-input-group>
            <b-input-group-prepend>
              <b-input-group-text>
                <i class="fas fa-envelope"></i>
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input
              id="input-email"
              type="email"
              v-model="formData.email"
              placeholder="Enter your email"
              required
            ></b-form-input>
          </b-input-group>
        </b-form-group>

        <b-form-group label="Phone Number" label-for="input-phone">
          <b-input-group>
            <b-input-group-prepend>
              <b-input-group-text>
                <i class="fas fa-phone"></i>
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input
              id="input-phone"
              type="tel"
              v-model="formData.phone"
              placeholder="Enter your phone number"
              required
            ></b-form-input>
          </b-input-group>
        </b-form-group>

        <b-form-group label="Password" label-for="input-password">
          <b-input-group>
            <b-input-group-prepend>
              <b-input-group-text>
                <i class="fas fa-lock"></i>
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input
              :type="passwordFieldType"
              id="input-password"
              v-model="formData.password"
              placeholder="Enter your password"
              required
            ></b-form-input>
            <b-input-group-append>
              <b-button
                variant="outline-secondary"
                @click="togglePasswordVisibility"
                class="password-toggle"
              >
                <i
                  :class="
                    passwordFieldType === 'password'
                      ? 'fas fa-eye'
                      : 'fas fa-eye-slash'
                  "
                ></i>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <div class="form-check mb-4">
          <input class="form-check-input" type="checkbox" id="terms" required />
          <label class="form-check-label" for="terms">
            I agree to the
            <b-link href="#" class="terms-link">Terms of Service</b-link> and
            <b-link href="#" class="terms-link">Privacy Policy</b-link>
          </label>
        </div>

        <b-button type="submit" variant="primary" block class="signup-button">
          <i class="fas fa-user-plus mr-2"></i> Create Account
        </b-button>
      </b-form>

      <div class="mt-4 text-center">
        <p class="mb-0">
          Already have an account?
          <b-link to="/login" class="login-link">Log In</b-link>
        </p>
      </div>
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
      this.$bvToast.toast("Sign-up successful!", {
        title: "Success",
        variant: "success",
        solid: true,
      });
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
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 1rem;
}

.signup-card {
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 12px;
  background-color: white;
}

.company-logo {
  max-width: 70px;
  height: auto;
  transition: transform 0.3s ease;
}

.company-logo:hover {
  transform: scale(1.05);
}

.brand-text {
  color: #3a5998;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.signup-button {
  background-color: #3a5998;
  border-color: #3a5998;

  transition: all 0.3s ease;
}

.signup-button:hover {
  background-color: #2d4373;
  border-color: #2d4373;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-link,
.terms-link {
  color: #3a5998;
  font-weight: 600;
  transition: color 0.3s ease;
}

.login-link:hover,
.terms-link:hover {
  color: #2d4373;
  text-decoration: none;
}

.password-toggle {
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
}

/* Add responsive adjustments */
@media (max-width: 576px) {
  .signup-card {
    margin: 1rem 0;
    padding: 1.5rem;
  }
}
</style>
