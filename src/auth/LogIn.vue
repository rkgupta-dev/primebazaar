<template>
  <div class="login-container d-flex justify-content-center align-items-center">
    <b-card class="login-card shadow border-0">
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
          <p class="text-muted">Sign in to your account</p>
        </div>
      </div>

      <b-form @submit.prevent="handleLogin">
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
              v-model="loginData.phone"
              placeholder="Enter your phone number"
              required
              class=""
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
              v-model="loginData.password"
              placeholder="Enter your password"
              required
              class=""
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

        <div class="d-flex justify-content-between align-items-center mb-4">
          <b-form-checkbox name="remember-me" value="true">
            Remember me
          </b-form-checkbox>
          <b-link href="#" class="forgot-password">Forgot password?</b-link>
        </div>

        <b-button type="submit" block class="login-button">
          <i class="fas fa-sign-in-alt mr-2"></i> Login
        </b-button>
      </b-form>

      <div class="mt-4 text-center">
        <p class="mb-0">
          Don't have an account?
          <b-link to="/signup" class="signup-link">Sign Up</b-link>
        </p>
      </div>
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
        this.$bvToast.toast("Login successful!", {
          title: "Success",
          variant: "success",
          solid: true,
        });
        this.$router.push("/");
      } else {
        this.$bvToast.toast("Invalid phone number or password.", {
          title: "Error",
          variant: "danger",
          solid: true,
        });
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
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-card {
  width: 100%;
  max-width: 450px;
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

.login-button {
  background-color: #3a5998;
  border-color: #3a5998;

  transition: all 0.3s ease;
}

.login-button:hover {
  background-color: #2d4373;
  border-color: #2d4373;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.signup-link {
  color: #3a5998;
  font-weight: 600;
  transition: color 0.3s ease;
}

.signup-link:hover {
  color: #2d4373;
  text-decoration: none;
}

.forgot-password {
  color: #6c757d;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #3a5998;
  text-decoration: none;
}

.password-toggle {
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
}

/* Add responsive adjustments */
@media (max-width: 576px) {
  .login-card {
    margin: 1rem;
    padding: 1.5rem;
  }
}
</style>
