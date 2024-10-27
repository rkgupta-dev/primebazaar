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
              <b-dropdown-item to="/fashions">Fashion</b-dropdown-item>
              <b-dropdown-item to="/home&living">Home & Living</b-dropdown-item>
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
                @click="$bvModal.show('bv-modal-example')"
              >
                <i class="fas fa-shopping-cart d-none d-md-inline"></i> ({{
                  cart.length
                }})
                <span class="d-inline d-md-none">Shopping cart</span>
              </b-button>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <!-- My Cart Modal -->
    <b-modal
      id="bv-modal-example"
      scrollable
      hide-footer
      title-class="font-weight-bold text-center"
      class="custom-modal"
    >
      <!-- Custom Modal Title -->
      <template #modal-title>
        <h4 class="text-dark mb-0">
          My <code>Cart</code> | ({{ cart.length }}) Items
        </h4>
      </template>

      <!-- Cart Items List -->
      <div class="cart-items-list">
        <!-- Display Cart Items if available -->
        <div v-if="cart.length">
          <!-- Iterate through cart items -->
          <b-card
            v-for="(cartItem, idx) in cart"
            :key="idx"
            class="my-3 shadow-sm rounded-lg cart-item-card border-dark"
          >
            <!-- Row layout for Image and Details -->
            <div class="d-flex align-items-start">
              <!-- Product Image -->
              <b-img
                :src="cartItem.img"
                alt="Product image"
                fluid
                class="cart-item-image rounded"
              ></b-img>

              <!-- Product Details -->
              <div class="cart-item-details ml-3">
                <!-- Product Name -->
                <h5 class="mb-1 text-dark font-weight-bold">
                  {{ cartItem.name }}
                </h5>

                <!-- Product Price and Discount -->
                <p class="mb-2">
                  <span class="text-danger font-weight-bold h6"
                    >₹{{ cartItem.price }}</span
                  >
                  <b-badge variant="success" class="ml-2"
                    >{{ cartItem.discount }}% off</b-badge
                  >
                </p>

                <!-- Quantity control -->
                <div class="d-flex align-items-center my-2">
                  <label class="mr-2 font-weight-bold">Qty:</label>
                  <b-form-spinbutton
                    :id="'sb-inline-' + idx"
                    v-model="cartItem.quantity"
                    inline
                    min="1"
                    max="100"
                    size="sm"
                    class="quantity-spinner"
                    @change="updateCartQuantity(cartItem, cartItem.quantity)"
                  ></b-form-spinbutton>

                  <!-- Remove Button -->
                  <b-button
                    variant="outline-danger"
                    size="sm"
                    @click="removeFromCart(cartItem)"
                    class="ml-2 remove-btn"
                    v-b-tooltip.hover.bottom="'Remove item'"
                  >
                    <b-icon icon="trash"></b-icon>
                  </b-button>
                </div>
              </div>
            </div>
          </b-card>
        </div>

        <!-- No Items Message -->
        <p v-else class="text-center text-muted mt-3 no-items-message">
          Bhaiya please shopping kar ligiye na, garib company hai.
        </p>
      </div>

      <!-- Checkout Button -->
      <b-button
        variant="success"
        class="mt-4 checkout-btn"
        @click="checkoutFn()"
        block
      >
        Check Out
      </b-button>
    </b-modal>

    <!-- User Profile -->
    <b-modal v-model="showModal" title="User Account" hide-footer>
      <div>
        <!-- User Avatar -->
        <b-avatar
          src=""
          alt="User Avatar"
          rounded
          size="lg"
          class="mb-3"
        ></b-avatar>

        <!-- User Name -->
        <h5 class="mb-1">{{ userData.name }}</h5>

        <!-- User Email -->
        <p class="text-muted">{{ userData.email }}</p>

        <!-- User phone -->
        <p class="text-muted">{{ userData.phone }}</p>

        <!-- Logout Button -->
        <div class="text-center">
          <b-button variant="danger" @click="logout">Logout</b-button>
        </div>
      </div>
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
    </b-container>

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
export default {
  name: "LandingPage",

  data() {
    return {
      cart: [],
      email: "",
      showModal: false,
      userData: {},
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
          link: "/fashions",
        },
        {
          id: 3,
          name: "Home & Living",
          description: "Essentials for your home",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTglY1QOmC3t0sKC0zyMoITKaZ1qsPKknMu4w&s",
          link: "/home&living",
        },
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
          img: "data:image/jpeg;base64,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",
        },
        {
          id: "fp2",
          name: "Smart LED TV",
          price: 49999,
          discount: 15,
          rating: 4.8,
          description:
            "55-inch Smart LED TV with 4K resolution and smart features for a cinematic experience.",
          img: "data:image/jpeg;base64,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",
        },
        {
          id: "fp3",
          name: "R Vacuum Cleaner",
          price: 19999,
          discount: 15,
          rating: 4.5,
          description:
            "Smart robot vacuum with advanced navigation and mapping technology for effortless cleaning.",
          img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBAPEA8PEBAQDw8PDhAPDxAPDxAQFhUWFxYRFRYaHSggGBolGxUVITEhJSkrLy4uFx81ODMxOCgtMCsBCgoKDQ0NGg0PFSsZFR0vNy4tNystNzctNzAwNzAwLzQ3Nys1Ly8rNy0tNzguNy43NzctKzg3NzE3Kzc3NystMf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xABEEAABAwIDBAcEBQoGAwEAAAABAAIDBBESITEFQVFhBhMiMnGBkQdCobEUI5LB0VJicnOCorLh8PEVJDNDU5Rjo8IW/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAEDAgT/xAAkEQEAAgEBBwUAAAAAAAAAAAAAARECAxIhMVFhkdETQYGh4f/aAAwDAQACEQMRAD8A9xREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBFQZW8QqmuB0N0EoiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIqJX4RdBWoJWI6dx328Fac7igzXTNG/0zVt1VwHqsMuVJcgyXVDvDwVtzydTdWS7K+gGpOQHmtFtHpls6nv1lZCSMi2ImdwPAhl7edkHQlyqZLY3BXmO1fa5A24p6WWQ7nTvbAw8wG4nEei4/a3tR2lLdsckVMDe3UxtxkeLy4+Yt5IPoyKTEL+qrXE+x+ofJstj5Hvke6acvfI4ve449STmV2yAiIgIiICIiAiIgIiICIiAiIgIiICIiArFYOweVj8VfVEwu1w4tPyQc5W9IKWB7Yqiphgke3EwTSNjxNuRcF2W4rCrOmWzYxd1dA7lC76Q70juvP/AG2wdqiktqJ2E+BYQP3ivJ6urLLNte442CD3HantWpmXEFNNKdzpnNp4zzHeJ9AuT2n7U66S4jfBTjd1UYe+36bsQ9AF5vs6CpqpBFTQPlkPuxMc8gcTwHM5L0fo/wCx2qlwvrqltO02JhhtLNbgXd1p8MSDkdq9I5pyTPPNNnf62QloPIEkDyAWLRRVVUbU1PPOQbfUQySWPNwBw/Be87E9nWy6WxbSNmeLfWVZ69xI34T2QfBoXWxkgBos1oyDWgNaPABB880fsw23NmadlOD7088bT6Al3wW5oPYlVXDpq+lY7U9WyWf54V7BU7ThZqS88GjF8dFr5ek4b3adxHN4b9xQZ3QfY/8AhtI2lM3XkPe/rOqMQ7W7Did810H0n+rLjY+mMej4JG/olr7fJbjZ214agExSBxHebm17fFpz80G6+kf1ZSKgf0CsIPVYKozBMOIVYeP7WKwUUGfdSsEPPEqpsxH8kGYisNqOP4K614KCpERAREQEREBERAREQERQSg8i9tFMTRwuAJLKtrLAXJxNeLDiSQAuc6L+yV9RgqNol0EerKZhAqJBl3z/ALY5d7PcV7VNE0uvhDiH423AOA55jgcypwINdsjY9PSRiGmgjgjFuywZuPFztXHmSSs8Nsq7KcKCyVj1wJaGjR178wNyy3sWAyvYJJYZy2MNdF1L3HCHNe0AXJyvjxDnlvQc7U7Vp2l7GF08jHBj4qdvWPa65GEjLMEZ8Li+ovhvgrJr4aZlOztgSVD7l25jhGLEDeQbG1hkb27z6ERewBvmcNgSbWufIBY01E4+44+RKzy9WZqJiI7+K+3W553UdHQbmpq5pLgXipmCGMG9+8cznlpmAL7yYcOpdG6na+IxAYSZHSuy3ucdcsl28mxZX6MtzcQAPvVDdmU1I6N9TI10r3hsEQF8cmvZbq8jW+gAJOl0x0qnanKcp6+IqCZbYudkSCLtaS0agkZhTTudffbfeyt7OlfKHSO0dK8xfqhYN+RN+azgFnOhM5XtTxv841XwbXRKIi9LkREQEBI0REF+Ko3FZK1xCyKea3ZPkfuUGSiIgIiICIiAiIgLDq5vdH9c1kzPsD6Ba5mZJ8h4IJa1SpRURZW5iQMvPirqLPVwnPCcYmliam2JiJ0xX8Sbeqt7S2XHUMwyNB7Lm3sHAtd3mOacnMO8H4HNZ6LjS0YwymY9+W6O3NZytoaPZVRS0z4Kad2LrGvgc9wlbEwYbwhsmYYQHWF3WxZHIBZLa2vGsMRPEOeR/AFtlFgt3LUSO2hILYooRxAxn0Ib81YoejMbZDNK988zhhfI9xc9zfyMVhhZp2WgXtmSt9YKboIAtytkAMgBwREQFKhEEooRBKKEQEREGRTTe6fI/csla0j+Xis6nlxNB36HxUFxERAREQERQUGLXP3cAT934rFh7rfAH1zV2rN3O/RH3qzTG7Byu30NvuQXUUIqJRQiCUUIglFCIJRQiCUUIglFCIJRQiAiIgIiICuUTrOI439R/dW1yvR3bL3bQnjLi6J08jWAkkNLLtu3gDYqDvEREBERAVLiqlbkKDBnPb8h96sQ9l7mnR3ab47x8j6qZX9vyWv6QbWjp2xhzgJppBDTA6vlJFh4Z5k5WQbZFZo5jIwFzcD7dtmuF2+x3jgVeVBFCIJRQiIIiIoii6IJRQl0EooS6glFChBUl1TdLoKrqLqFD3tY1z3uDWNBc5ziA1rQLlxO4IMDpDtMUtPJLcY7YIgfeld3R5ankCuP6ARf5mO+4OJvrfC45rF6Q7QdWu6+zmUsRLaZrgQZD70pHO2V9BzJW09n4vPf/wAb3eWQ+9RXpQUqlqqVQREQFal0V1W5Ag08nePIj4/2XP8ASCgE1fssvzbFNNLY6FzYnOb+8GnyW92i7A4O3Xs7w4rXbXH+Y2e/hPK0/tQPA+KDoZmB1nA2cN/3HkrbX3yIs7hx5jiscVYaSHZWbjc45MY3mTvyJ5ZX3XynNDhYj8QqIIUKO0388fvD8VLXA6HPeNCPJARSQqUBFCKAiKEEooUoCIiAoQlUkoKrqLq3NM1jS97msY0Xc5zg1rRxJOQXCbe9qdLETFRt+ly53eDhp2c8Wsn7OXNB3VdWRU8ZlnkbGxupdxOjQNXOO4DMrkaiol2m67g6GhY4FsZykqHA5OktoODdBrmbYeHqukElS9s0zy/IHPJrbjNsbdGN3cTbMlZ9R0skewQxDq22sXb7cBwRWd0jrWve2CO2CPJ2HS490LoegTPrJHcGNYPM3/8AlcLTNXo/RCn6trQe88dYfA5D4C/moO1j0VSoj0VaqCIiAqXBVKCg1m0IMQIXH1tTIyWkhczE1tXEWyXsWtN24SLZ97Vd5My657bOz8Y4EZgjUEaEIKdpEhzLdo4rxxnIOeM+seR7o1P6IG+xuUddl3i5ocGl5BvLJkCGDcBdtyBbv3AsVjUVYJ7xSdmZos8DIys/N5E2uOXBT1DmuBGEOGl7dXTszsL73nFa97/WPsTZBu4Zg7LR1g5zcrtvfI2y1aRlwVbmB2o8DvWkheAGCziwkFjDbrKh1iS94tqQA73TiY5ZkNU7MFwcRnK4ZxsIawmNg73aacY1356KjNwOGjr8nC/xWLX7QZBGZJg5rG2uWgyZncAMyfALMgnDmhwza4BzTxaRcFaXpY+jf1MFW9rIn432cS1rntLQ2500c7VBNL0moJbBtXC1x0bK7qH/AGZLH4Lass4XaQ4cQbj1C4mbojSyC8E7sO4NkD4/TMLR1XRWSC7ojHfW7WiJ3qyxUtXqJCheE122a6BxtNUttlZtZVhv2TIW/BYv/wC8r2/79T/2Gn+KMoj6AVQC8Dh6fVrsjUVN/wBdEPlEFmxdJq14F6ip/wC1K3+AtQe4YCsKt2rSwf61TBFyfMxpPgCbleVx0lTVd6S4OvWPllHo9xW3oOiUbR25D4RBsI/dAS1pvtqdP6GFrnME9RhF/qoS1p8HyYWnyJXB7Z9rlW4D6NSxU7XE4ZJ3GZ5HJos1ruRxLsG0FFT9pzYWne6Qgu9SuP6Us2dLMJou0+2GRrY3dU+2ju80B269nXFsskHD7S2nV1zgaiaepINwHnDG08WxgANPg0eKin2Y4nM2PBu4HW38z5rozHiFmMwt4C1vgAPMAKWxhv4BQWhAG4RuAAA5K/1R1srrYMXaJstnsjZzqh7Y2+btwCDN6JbKNRKLg9WyzpDy/J8SvQNjPxzSuHdDsDeFm5ZeYKxaiJlDTNiiFpH2azi55Gbz4DP0Wz6PUfVxtHIIN9Hoq1S1VKoIiICIiClwWJUw3WaqXNQcZtvZeLtNJa9pxNc02c08QVjUHSFoIgrQ1jrkNlPZgkJy7e5pzP5pvuyC6+pp7rmts7Ia8EFqDZS05zdjcLgmSUAmTDh0jAvbOzt47wtmrRYRhaW4bG8cQN2sAcztuOl2k4gLi7Ta2S4qKqrNnn6l3Wwg/wChLcsA/MOrPLLkV1HRzpNBXF0YZJDM0CSWNw1AIFxIMnN0FjY2OiDfQklrSS0usMRbm0m2eHlvXn/tbOVN4S/Ni9CijDWhrQGtaA1rWgBrWjQAcl517X3gCmudRKBzzYg89/xBze6S08QbFHbUqTl18tv1jj96wHK9C5RVipe93ee4+axTTA6ud8FnVDN6xboLP0MC2btVsaQkWGJystAKgEgoOvpZntaLPcMtxV19XIdZH/aK0lJtDsgFTJtHgi22ZWO4RtzsLrCFS5ytAFx3k8BmiWzJqu4s0LE7QOea2+zej88tjhwN4uXe9GejtPHbE3rJeLhcDmAg82rqSpjpJKwxuEUZjaAezjc97WADjm4LsehFzSxVDw2M4S57m3w3DiARfW9h6rrul1FDNTdTM7DGXxEtBsXBjg4NAGeZAyCwdn7PMmAYOrhZYRRAAAAZAm2/luQXqKF9TL18t8hhiabdlv4nf/JdXSxWCsUlMGgZLYMaqioKURAREQEREBERBQ5qxKinus5Uuag5baOzQ6+S0+wKRsFbc2b1kTmNvld2JpA8ciu4mgutNtPZLZBYjw4g8UGzwrnelvRRm0BHikLHRYsBwhwOK17+gUxz1cGR+uYNMRs+3jv/AKzWTF0hi0ka+M/nNNvUXHxQedV3swqm36p8Ug3dosPxWjqehe0ItaeQ82gOHwXuNPXwydyVjvBwKyByPooPnqfZ07RZ1NKHccLvlZap1FL/AMbvsu/BfTRCoMTTq1p8gg+aoaWTELsfa+dgVtWbHkkzjhksB2ics/NfQAgb+Q37IWl6RsJdEG5Ah99w1CK8aZsmVrHvczC2Nrnvc7QNAuT6LXbOqqSadsTqgRhxt1hY7qweZNrDnuXrdds1k0b4XA4ZGOY62Rs4WPzXn9N7MKsudjmgYzEbODHPLhfvOaQ0A+ZVHa7M9mkWT5KlzmnMBjAL+ZKy29Eeqmwxx4o9Wut8DuBW62LURUtLT0weZXQQRxEtGIuLGgXNr2vZXn19RJlFEGD8qTX0H4qCmLZIaMUzw0DOwO7xVD9qNH1dLHiOhf7njf3vL1VTNivkOKeR0m+xyYP2RktvTUDWiwACqNNSbKc93WTOL389G8gNy31PTAblkRw2V5rUEMYq0RAREQEREBERAREQEREEEK26NXUQYUlMCsSbZrXatC29lGFBzM3R6J3uD0Vr/Ay3uSSt5B7rel11RjVPVIOY+g1I7tQ/zDD8wnVVg/3r+LGrpjEFHUhBzRZW/wDKPsBUuoap57U3/rjPzC6fqVIiQc4zY8h700nkcH8NlkR7Cj1cC48XEuPxW9EaqDUGvh2exujQslkAG5ZFlKC0I1WGqpEBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//Z",
        },
        {
          id: "fp4",
          name: "5G Smartphone",
          price: 24999,
          discount: 10,
          rating: 4.6,
          description:
            "Latest 5G smartphone with a powerful camera, long battery life, and sleek design.",
          img: "data:image/jpeg;base64,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",
        },
        {
          id: "fp5",
          name: "5G Smartphone",
          price: 24999,
          discount: 10,
          rating: 4.6,
          description:
            "Latest 5G smartphone with a powerful camera, long battery life, and sleek design.",
          img: "data:image/jpeg;base64,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",
        },
        {
          id: "fp6",
          name: "5G Smartphone",
          price: 24999,
          discount: 10,
          rating: 4.6,
          description:
            "Latest 5G smartphone with a powerful camera, long battery life, and sleek design.",
          img: "data:image/jpeg;base64,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",
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

    const userData = JSON.parse(localStorage.getItem("signupData"));
    if (userData) {
      this.userData = userData[0]; // assuming userData is an array
    }
  },
  mounted() {
    this.loadCartFromLocalStorage(); // Load the cart from localStorage when the component mounts
    const user = localStorage.getItem("signupData");
    if (!user) {
      this.$router.push("/signup");
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
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    }
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
.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>
