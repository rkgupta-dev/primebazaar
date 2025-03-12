<template>
  <div>
    <b-navbar toggleable="md" variant="light" class="d-none d-md-block">
      <b-container
        fluid
        class="d-flex justify-content-between align-items-center"
      >
        <b-navbar-nav>
          <b-nav-text>Free shipping on orders over ₹2000</b-nav-text>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto small d-flex">
          <b-nav-item href="/">Track Order</b-nav-item>
          <b-nav-item to="/contacts">Contact</b-nav-item>
          <b-nav-item to="/shipping-returns">Help</b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>

    <b-navbar variant="light" class="d-lg-none">
      <b-container
        fluid
        class="d-flex justify-content-between align-items-center"
      >
        <b-navbar-nav class="ml-auto small d-flex">
          <b-nav-item href="/">Track Order</b-nav-item>
          <b-nav-item href="/contacts">Contact</b-nav-item>
          <b-nav-item href="/help">Help</b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>

    <hr class="m-0 p-0" />
    <b-navbar toggleable="md" variant="light" class="shadow-md sticky-top">
      <b-container fluid>
        <b-navbar-brand href="/" class="text-primary">
          <h4>PrimeBazaar</h4>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="/">Home</b-nav-item>
            <b-nav-item href="#new-arrival">New Arrivals</b-nav-item>
            <b-nav-item to="/womens-collection">Women</b-nav-item>
            <b-nav-item to="/mens-collection">Men</b-nav-item>
            <b-nav-item to="/accessories">Accessories</b-nav-item>
            <b-nav-item>Sale</b-nav-item>
            <b-nav-item href="#special-offer">Special Offers</b-nav-item>
            <!-- <b-nav-item href="#products">Products</b-nav-item> -->
            <!-- <b-nav-item href="#categories">Categories</b-nav-item> -->
            <!-- <b-nav-item-dropdown href="#categories" text="Categories" right>
              <b-dropdown-item to="/electronics">Electronics</b-dropdown-item>
              <b-dropdown-item to="/fashions">Fashion</b-dropdown-item>
              <b-dropdown-item to="/home&living">Home & Living</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item to="/dealsoftheday">Deals</b-nav-item> -->
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
              <b-button variant="outline-primary" size="sm" to="/profile">
                <i class="fas fa-user"></i>
                <span class="ml-2">Account</span>
              </b-button>
            </b-nav-item>

            <b-nav-item>
              <b-button
                variant="outline-primary"
                size="sm"
                :to="redirectToCart()"
              >
                <i class="fas fa-shopping-cart"></i> Cart ({{ cart.length }})
              </b-button>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <!-- Home Section -->
    <b-container
      fluid
      style="padding-top: 50px; height: 700px; background-color: #0b192c"
    >
      <b-row>
        <b-col md="6" class="d-flex justify-content-center">
          <b-img
            :src="require('@/assets/shopping.png')"
            alt="PrimeBazzar"
            style="max-width: 90%; height: auto"
            class="hover-effect"
          ></b-img>
        </b-col>

        <!-- <b-col md="6" class="d-flex justify-content-center">
          <video
            src="@/assets/SaleVideo.mp4"
            autoplay
            muted
            loop
            style="max-width: 100%; height: 100%"
            class="show-controls-on-hover"
          ></video>
        </b-col> -->

        <b-col md="6" class="d-flex align-items-center">
          <div
            img-src="https://via.placeholder.com/1500x400"
            img-alt="Hero Image"
            img-top
            class="text-center"
          >
            <h1 class="display-4 text-light">Welcome to Our Shop!</h1>
            <p class="lead text-light">
              Discover amazing products at unbeatable prices!
            </p>
            <b-button variant="success" href="#categories" size="lg"
              >Shop Now</b-button
            >
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div>
      <b-card no-body class="text-center p-0 m-0">
        <div class="bg-primary text-light">
          <div class="my-2">
            <b-icon-tag-fill class="mr-2"></b-icon-tag-fill>
            Limited Time Offer: Get 20% OFF with code <strong>SUMMER20</strong>
            <a href="#categories" class="ml-2 text-light">Shop Now</a>
          </div>
        </div>
      </b-card>
    </div>

    <!-- Shop by Catogory -->
    <b-container
      fluid
      id="categories"
      style="padding-top: 75px; background-color: #f5efff"
    >
      <ShopByCategory />
    </b-container>

    <!-- New Arrival -->
    <b-container fluid id="new-arrival" style="padding-top: 75px">
      <NewArrival />
    </b-container>

    <!-- Best Seller -->
    <b-container
      fluid
      id="best-seller"
      style="padding-top: 75px; background-color: #f5efff"
    >
      <BestSellerSection />
    </b-container>

    <!-- Special Offers -->
    <b-container fluid id="special-offer" style="padding-top: 75px">
      <SpecialOffer />
    </b-container>

    <!-- Featured Products -->
    <!-- <b-container id="products" class="my-4" style="padding-top: 75px">
      <h2 class="text-center">Featured Products</h2>
      <div class="overflow-auto">
        <div class="d-flex flex-row flex-nowrap">
          <b-col
            md="3"
            cols="6"
            sm="6"
            v-for="product in products"
            :key="product.id"
            class="p-2"
          >
            <b-card :img-src="product.img" img-alt="Product Image" class="my-4">
              <b-card-text class="text-truncate">
                <h5>
                  <strong>{{ product.name }}</strong>
                </h5>
                <strong>₹ {{ product.price }}</strong
                ><b-badge variant="success" class="ml-2"
                  >{{ product.discount }}% off</b-badge
                ><br />
                {{ product.description }}
              </b-card-text>
              <b-button size="" variant="primary" @click="addToCart(product)"
                >Add to Cart</b-button
              >
            </b-card>
          </b-col>
        </div>
      </div>
    </b-container> -->

    <!-- Footer Section -->
    <b-container fluid class="bg-dark text-light pt-4">
      <b-row>
        <!-- Column 1: Company Info -->
        <b-col md="3">
          <h5 class="text-warning">
            <i class="fas fa-shopping-cart text-warning"></i> PRIMEBAZAAR
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
import BestSellerSection from "@/views/BestSellerSection.vue";
import NewArrival from "@/views/NewArrival.vue";
import ShopByCategory from "@/views/ShopByCategory.vue";
import SpecialOffer from "@/views/SpecialOffer.vue";

export default {
  name: "LandingPage",
  components: {
    ShopByCategory,
    NewArrival,
    BestSellerSection,
    SpecialOffer,
  },

  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),
      cart: [],
      email: "",
      currentPlaceholderIndex: 0,
      searchQuery: "",
      placeholders: [
        "Search products...",
        "Search electronics...",
        "Search fashion...",
        "Search home & living...",
      ],
      products: [
        {
          id: "fp1",
          name: "Laptop",
          price: 74999,
          discount: 5,
          rating: 4.7,
          description:
            "High-performance gaming laptop with a powerful GPU and high refresh rate display.",
          img: "",
        },
        {
          id: "fp2",
          name: "Smart LED TV",
          price: 49999,
          discount: 15,
          rating: 4.8,
          description:
            "55-inch Smart LED TV with 4K resolution and smart features for a cinematic experience.",
          img: "",
        },
        {
          id: "fp3",
          name: "R Vacuum Cleaner",
          price: 19999,
          discount: 15,
          rating: 4.5,
          description:
            "Smart robot vacuum with advanced navigation and mapping technology for effortless cleaning.",
          img: "",
        },
        {
          id: "fp4",
          name: "5G Smartphone",
          price: 24999,
          discount: 10,
          rating: 4.6,
          description:
            "Latest 5G smartphone with a powerful camera, long battery life, and sleek design.",
          img: "",
        },
        {
          id: "fp5",
          name: "5G Smartphone",
          price: 24999,
          discount: 10,
          rating: 4.6,
          description:
            "Latest 5G smartphone with a powerful camera, long battery life, and sleek design.",
          img: "",
        },
        {
          id: "fp6",
          name: "5G Smartphone",
          price: 24999,
          discount: 10,
          rating: 4.6,
          description:
            "Latest 5G smartphone with a powerful camera, long battery life, and sleek design.",
          img: "",
        },
      ],
    };
  },

  created() {
    setInterval(() => {
      this.currentPlaceholderIndex =
        (this.currentPlaceholderIndex + 1) % this.placeholders.length;
    }, 3000);
  },
  mounted() {
    this.loadCartFromLocalStorage();
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (this.isLoggedIn) {
      this.userData = JSON.parse(localStorage.getItem("userData"));
    }
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
    saveCartToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    loadCartFromLocalStorage() {
      const cartFromStorage = localStorage.getItem("cart");

      // Ensure the parsed cart is an array
      if (cartFromStorage && Array.isArray(JSON.parse(cartFromStorage))) {
        this.cart = JSON.parse(cartFromStorage);
      } else {
        this.cart = []; // Default to an empty array if nothing is found or invalid data
      }
    },
    removeFromCart(cartItem) {
      // Filter out the item to be removed
      this.cart = this.cart.filter((item) => item !== cartItem);

      // Update localStorage after removal
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    addToCart(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if the product is already in the cart
      } else {
        // Add new product to the cart
        this.cart.push({
          ...product,
          quantity: 1, // Default quantity is 1 when adding a new product
          img: product.img || "path/to/default/image.jpg", // Use item's img or default image
        });
      }

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(this.cart));
      this.$bvToast.toast(`${product.name} added to the cart!`, {
        title: "Item Added",
        variant: "success",
        autoHideDelay: 2000, // Auto hide after 2 seconds
        solid: true,
        toaster: "b-toaster-bottom-center",
      });
    },
    updateCartQuantity(item, quantity) {
      const cartItem = this.cart.find((cartItem) => cartItem.id === item.id);

      if (cartItem && quantity > 0) {
        cartItem.quantity = quantity; // Update the quantity
        this.saveCartToLocalStorage();
        this.$bvToast.toast(`${item.name} quantity updated!`, {
          title: "Quantity Updated",
          variant: "info",
          autoHideDelay: 2000,
          solid: true,
          toaster: "b-toaster-bottom-center",
        });
      }
    },
    checkoutFn() {
      this.$router.push("/checkout");
    },
    redirectToCart() {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      return isLoggedIn ? "/cart" : "/login";
    },
    logout() {
      localStorage.setItem("isLoggedIn", "false");
      this.isLoggedIn = false; // Update reactive variable
      this.userData = null;
      this.$router.push("/login");
      alert("You have logged out.");
    },
  },
};
</script>

<style scoped>
.home-bg {
  background-image: linear-gradient(
    85.2deg,
    rgba(33, 3, 40, 1) 7.5%,
    rgba(65, 5, 72, 1) 88.7%
  );
}
.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
.show-controls-on-hover {
  pointer-events: auto;
}

.show-controls-on-hover::-webkit-media-controls {
  display: none !important;
}

.show-controls-on-hover:hover::-webkit-media-controls {
  display: block !important;
}
</style>
