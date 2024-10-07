<template>
  <div>
    <b-navbar toggleable="md" variant="light" class="shadow-md sticky-top">
      <b-container>
        <b-navbar-brand href="/" class="text-primary">
          <h4>PrimeBazaar</h4>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="/">Home</b-nav-item>
            <b-nav-item href="#products">Products</b-nav-item>
            <b-nav-item href="#categories">Categories</b-nav-item>
            <b-nav-item to="/dealsoftheday">Deals</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <b-button
                variant="outline-secondary"
                size="sm"
                @click="showModal = true"
              >
                <i class="fas fa-user"></i>
                <span class="sr-only">User account</span>
              </b-button>
            </b-nav-item>

            <b-nav-item>
              <b-button variant="outline-secondary" size="sm">
                <i class="fas fa-shopping-cart"></i>
                <span class="sr-only">Shopping cart</span>
              </b-button>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-modal v-model="showModal" title="User Account" hide-footer>
      <b-tabs pills>
        <!-- Login Tab -->
        <b-tab title="Login" active>
          <div class="p-3">
            <b-form @submit.prevent="handleLogin">
              <b-form-group label="Email" label-for="login-email">
                <b-form-input
                  id="login-email"
                  type="email"
                  v-model="loginForm.email"
                  placeholder="Enter email"
                  required
                />
              </b-form-group>

              <b-form-group label="Password" label-for="login-password">
                <b-form-input
                  id="login-password"
                  type="password"
                  v-model="loginForm.password"
                  placeholder="Enter password"
                  required
                />
              </b-form-group>

              <b-button type="submit" variant="primary" block>Login</b-button>
            </b-form>
          </div>
        </b-tab>

        <!-- Register Tab -->
        <b-tab title="Register">
          <div class="p-3">
            <b-form @submit.prevent="handleRegister">
              <b-form-group label="Full Name" label-for="register-name">
                <b-form-input
                  id="register-name"
                  type="text"
                  v-model="registerForm.name"
                  placeholder="Enter full name"
                  required
                />
              </b-form-group>

              <b-form-group label="Email" label-for="register-email">
                <b-form-input
                  id="register-email"
                  type="email"
                  v-model="registerForm.email"
                  placeholder="Enter email"
                  required
                />
              </b-form-group>

              <b-form-group label="Password" label-for="register-password">
                <b-form-input
                  id="register-password"
                  type="password"
                  v-model="registerForm.password"
                  placeholder="Enter password"
                  required
                />
              </b-form-group>

              <b-button type="submit" variant="success" block
                >Register</b-button
              >
            </b-form>
          </div>
        </b-tab>
      </b-tabs>
    </b-modal>

    <!-- Home Section -->
    <b-container class="my-4" fluid style="padding-top: 55px; height: 650px">
      <b-row>
        <b-col md="6" class="d-flex justify-content-center">
          <b-img
            src="https://cdni.iconscout.com/illustration/premium/thumb/online-shopping-illustration-download-in-svg-png-gif-file-formats--add-to-cart-bag-money-transfer-and-e-payments-pack-business-illustrations-3748971.png?f=webp"
            alt="Web Developer"
            style="max-width: 90%; height: auto"
            class="hover-effect"
          />
        </b-col>

        <b-col md="6" class="d-flex align-items-center">
          <div
            img-src="https://via.placeholder.com/1500x400"
            img-alt="Hero Image"
            img-top
            class="text-center"
          >
            <h1 class="display-4">Welcome to Our Shop!</h1>
            <p class="lead">Discover amazing products at unbeatable prices!</p>
            <b-button variant="success" href="#categories" size="lg"
              >Shop Now</b-button
            >
          </div>
        </b-col>
      </b-row>
    </b-container>

    <!-- Shop by Catogory -->
    <b-container id="categories" style="padding-top: 75px">
      <h2 class="text-center">Shop by Category</h2>
      <b-row>
        <b-col md="4" v-for="category in categories" :key="category.id">
          <b-card
            :title="category.name"
            img-src="https://via.placeholder.com/300"
            img-alt="Category Image"
            class="my-4"
          >
            <b-card-text>
              {{ category.description }}
            </b-card-text>
            <b-button variant="primary" href="#">View Products</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- Featured Products -->
    <b-container id="products" class="my-4" style="padding-top: 75px; height: 650px">
      <h2 class="text-center">Featured Products</h2>
      <b-row>
        <b-col md="3" sm="6" v-for="product in products" :key="product.id">
          <b-card
            :title="product.name"
            img-src="https://via.placeholder.com/200"
            img-alt="Product Image"
            class="my-4"
          >
            <b-card-text>
              {{ product.description }} <br />
              <strong>\${{ product.price }}</strong>
            </b-card-text>
            <b-button variant="success">Add to Cart</b-button>
          </b-card>
        </b-col>
      </b-row>
          <!-- Footer Section -->
    <b-container no-body class="bg-dark text-light" >
      <b-row>
        <!-- Column 1: Company Info -->
        <b-col md="3">
          <h5 class="text-uppercase"><i class="fas fa-shopping-cart text-warning"></i> PrimeBazaar</h5>
          <p>
            Your go-to marketplace for Electronics, Fashion, and Home & Living
            essentials. Bringing you top quality products at unbeatable prices.
          </p>
        </b-col>

        <!-- Column 2: Quick Links -->
        <b-col md="3">
          <h5 class="text-uppercase">Quick Links</h5>
          <ul class="list-unstyled">
            <li><b-link href="/">Home</b-link></li>
            <li><b-link href="#categories">Shop</b-link></li>
            <li><b-link href="#">About Us</b-link></li>
            <li><b-link href="#">Contact</b-link></li>
          </ul>
        </b-col>

        <!-- Column 3: Customer Service -->
        <b-col md="3">
          <h5 class="text-uppercase">Customer Service</h5>
          <ul class="list-unstyled">
            <li><b-link href="#">FAQs</b-link></li>
            <li><b-link href="#">Shipping & Returns</b-link></li>
            <li><b-link href="#">Privacy Policy</b-link></li>
            <li><b-link href="#">Terms & Conditions</b-link></li>
          </ul>
        </b-col>

        <!-- Column 4: Newsletter Signup -->
        <b-col md="3">
          <h5 class="text-uppercase">Stay Connected</h5>
          <p>Subscribe to our newsletter for the latest deals and updates.</p>
          <b-form inline @submit.prevent="subscribe">
            <b-form-input placeholder="Enter your email" v-model="email" />
            <b-button variant="primary" type="submit">Subscribe</b-button>
          </b-form>
        </b-col>
      </b-row>

      <hr class="my-4" />

      <b-row>
        <!-- Social Media Icons -->
        <b-col md="6">
          <b-button variant="outline-light" href="#" class="mr-2">
            <i class="fab fa-facebook-f"></i>
          </b-button>
          <b-button variant="outline-light" href="#" class="mr-2">
            <i class="fab fa-twitter"></i>
          </b-button>
          <b-button variant="outline-light" href="#" class="mr-2">
            <i class="fab fa-instagram"></i>
          </b-button>
          <b-button variant="outline-light" href="#">
            <i class="fab fa-linkedin"></i>
          </b-button>
        </b-col>

        <!-- Footer Credits -->
        <b-col md="6" class="text-md-right">
          <p>&copy; 2024 PrimeBazaar - All Rights Reserved</p>
        </b-col>
      </b-row>
    </b-container>
    </b-container>


  </div>
</template>

<script>
export default {
  name: "LandingPage",

  data() {
    return {
       email: '',
      showModal: false,
      loginForm: {
        email: "",
        password: "",
      },
      registerForm: {
        name: "",
        email: "",
        password: "",
      },
      categories: [
        {
          id: 1,
          name: "Electronics",
          description: "Latest gadgets and devices",
          img: "",
        },
        {
          id: 2,
          name: "Fashion",
          description: "Trendy clothing and accessories",
        },
        {
          id: 3,
          name: "Home & Living",
          description: "Essentials for your home",
        },
      ],
      products: [
        {
          id: 1,
          name: "Product 1",
          description: "Description for product 1",
          price: 19.99,
        },
        {
          id: 2,
          name: "Product 2",
          description: "Description for product 2",
          price: 29.99,
        },
        {
          id: 3,
          name: "Product 3",
          description: "Description for product 3",
          price: 39.99,
        },
        {
          id: 4,
          name: "Product 4",
          description: "Description for product 4",
          price: 49.99,
        },
      ],
    };
  },
  methods: {
    handleLogin() {
      // Handle login logic here
      console.log("Login form submitted:", this.loginForm);
      this.showModal = false;
    },
    handleRegister() {
      // Handle register logic here
      console.log("Register form submitted:", this.registerForm);
      this.showModal = false;
    },
    subscribe() {
      // Handle subscription logic here
      alert(`Thank you for subscribing with ${this.email}!`);
    },
  },
};
</script>

<style scoped>
.ml-auto {
  margin-left: auto !important;
  font-size: large;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.navbar {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
