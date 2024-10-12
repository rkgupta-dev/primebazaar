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
            <!-- <b-nav-item href="#categories">Categories</b-nav-item> -->
            <b-nav-item-dropdown href="#categories" text="Categories" right>
              <b-dropdown-item to="/electronics">Electronics</b-dropdown-item>
              <b-dropdown-item href="#">Fashion</b-dropdown-item>
              <b-dropdown-item href="#">Home & Living</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item to="/dealsoftheday">Deals</b-nav-item>
          </b-navbar-nav>

          <!-- search on navbar -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item class="d-none d-sm-block">
              <b-input-group size="sm">
                <b-form-input
                  :placeholder="placeholders[currentPlaceholderIndex]"
                  aria-label="Search"
                ></b-form-input>
                <b-input-group-append>
                  <b-button variant="primary" @click="showMaintenanceToast">
                    <i class="fas fa-search"></i>
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-nav-item>

            <b-nav-item>
              <b-button
                variant="outline-primary"
                size="sm"
                @click="showModal = true"
              >
                <i class="fas fa-user d-none d-md-inline"></i>
                <span class="d-inline d-md-none">User account</span>
              </b-button>
            </b-nav-item>

            <b-nav-item>
              <b-button
                variant="outline-primary"
                size="sm"
                v-b-toggle.sidebar-right
              >
                <i class="fas fa-shopping-cart d-none d-md-inline"></i>
                <span class="d-inline d-md-none">Shopping cart</span>
              </b-button>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <!-- My Cart Sidebar -->
    <b-sidebar id="sidebar-right" title="My Cart" right shadow>
      <div class="px-3 py-2">
        <p>
          <strong>Your Cart Empty!</strong>
          <br />
          It's on Development Mode.
        </p>
        <b-img
          src="https://picsum.photos/500/500/?image=54"
          fluid
          thumbnail
        ></b-img>
      </div>
    </b-sidebar>

    <!-- User Login or Register -->
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
    <b-container class="my-4" fluid style="padding-top: 50px; height: 650px">
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
            :img-src="category.img"
            :img-attributes="{ height: '500px' }"
            class="my-4"
          >
            <b-card-text>
              {{ category.description }}
            </b-card-text>
            <b-button :to="category.link" variant="primary"
              >View Products</b-button
            >
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- Featured Products -->
    <b-container id="products" class="my-4" style="padding-top: 75px">
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
    </b-container>

    <!-- Footer Section -->
    <b-container fluid class="bg-dark text-light pt-4">
      <b-row>
        <!-- Column 1: Company Info -->
        <b-col md="3">
          <h5 class="text-uppercase">
            <i class="fas fa-shopping-cart text-warning"></i> PrimeBazaar
          </h5>
          <p>
            Discover the Best in Electronics, Fashion, and Home Living at
            PrimeBazaar
          </p>
        </b-col>

        <!-- Column 2: Quick Links -->
        <b-col md="3">
          <h5 class="text-uppercase">Quick Links</h5>
          <ul class="list-unstyled">
            <li><b-link href="/">Home</b-link></li>
            <li><b-link href="#categories">Shop</b-link></li>
            <li><b-link to="/about-us">About Us</b-link></li>
            <li><b-link to="/contacts">Contact</b-link></li>
          </ul>
        </b-col>

        <!-- Column 3: Customer Service -->
        <b-col md="3">
          <h5 class="text-uppercase">Customer Service</h5>
          <ul class="list-unstyled">
            <li><b-link to="/faqs">FAQs</b-link></li>
            <li><b-link to="/shipping-returns">Shipping & Returns</b-link></li>
            <li><b-link to="/privacy-policy">Privacy Policy</b-link></li>
            <li><b-link to="/terms&condition">Terms & Conditions</b-link></li>
          </ul>
        </b-col>

        <!-- Column 4: Newsletter Signup -->
        <b-col md="3">
          <h5 class="text-uppercase">Stay Connected</h5>
          <p>Subscribe to our newsletter for the latest deals and updates.</p>
          <b-form @submit.prevent="subscribe">
            <b-input-group>
              <b-form-input
                placeholder="Enter your email"
                v-model="email"
                type="email"
                required
              ></b-form-input>
              <b-input-group-append>
                <b-button variant="primary" type="submit">
                  <i class="fa-solid fa-paper-plane"></i>
                </b-button>
              </b-input-group-append>
            </b-input-group>
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
  </div>
</template>

<script>
export default {
  name: "LandingPage",

  data() {
    return {
      email: "",
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
      currentPlaceholderIndex: 0,
      searchQuery: "",
      placeholders: [
        "Search products...",
        "Search electronics...",
        "Search fashion...",
        "Search home & living...",
      ],
      categories: [
        {
          id: 1,
          name: "Electronics",
          description: "Latest gadgets and devices",
          img: "data:image/jpeg;base64,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",
          link: "/electronics",
        },
        {
          id: 2,
          name: "Fashion",
          description: "Trendy clothing and accessories",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPXX3n66CO0L6oGkjmcnw4BFsCGisuBsZFvx_Do-7JlJ3oWntDpCxbEIobaJk-ALFD7ZE&usqp=CAU",
        },
        {
          id: 3,
          name: "Home & Living",
          description: "Essentials for your home",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTglY1QOmC3t0sKC0zyMoITKaZ1qsPKknMu4w&s",
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
  computed: {},
  created() {
    setInterval(() => {
      this.currentPlaceholderIndex =
        (this.currentPlaceholderIndex + 1) % this.placeholders.length;
    }, 3000);
  },
  methods: {
    subscribe() {
      this.$bvToast.toast(`Thank you for subscribing with ${this.email}!`, {
        title: "Thank You!",
        variant: "success",
        solid: true,
        toaster: "b-toaster-bottom-center",
        autoHideDelay: 3000,
      });
    },
    showMaintenanceToast() {
      this.$bvToast.toast("Ongoing Maintenance", {
        title: "Notice",
        variant: "warning",
        solid: true,
        toaster: "b-toaster-bottom-center",
        autoHideDelay: 3000,
      });
    },
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
</style>
