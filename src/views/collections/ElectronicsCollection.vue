<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-container>
        <b-navbar-brand href="#">PrimeBazaar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/dealsoftheday">Deals of the day</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <b-button variant="outline-light" size="sm" to="/cart">
                <!-- @click="$bvModal.show('bv-modal-example')" -->
                <i class="fas fa-shopping-cart d-none d-md-inline"></i>
                <span class=""> My Cart ({{ cart.length }})</span>
              </b-button>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-container class="my-4">
      <!-- Search Function -->
      <b-row class="my-4">
        <b-col md="8" sm="6"><h3>Electronics</h3></b-col>
        <b-col md="4" sm="6">
          <b-form-input
            v-model="searchQuery"
            placeholder="Search for electronics..."
          />
        </b-col>
      </b-row>

      <div>
        <b-row v-if="filteredItems.length === 0">
          <b-container
            class="d-flex flex-column align-items-center justify-content-center my-5"
          >
            <b-col cols="12" md="8" lg="6" class="text-center">
              <div class="mb-3">
                <b-icon
                  icon="search"
                  variant="secondary"
                  font-scale="2"
                ></b-icon>
              </div>
              <h4 class="font-weight-bold">Oops! Nothing Found!</h4>
              <p class="text-muted">
                Try searching for different keywords or check our categories!
              </p>
            </b-col>
          </b-container>
        </b-row>
        <b-row v-else>
          <b-col
            v-for="(item, index) in filteredItems"
            :key="index"
            md="3"
            cols="6"
            sm="6"
            class="my-2"
          >
            <b-card
              img-alt="Item image"
              img-top
              class="h-100 rounded-lg shadow-sm product-card"
              no-body
            >
              <div class="position-relative">
                <b-badge
                  v-if="item.discount"
                  variant="success"
                  pill
                  class="position-absolute m-2 px-2 py-1"
                >
                  {{ item.discount }}% OFF
                </b-badge>
                <b-card-img :src="item.img" :alt="item.name" top></b-card-img>
              </div>

              <b-card-body class="d-flex flex-column">
                <div class="mb-2">
                  <h5 class="font-weight-bold text-truncate mb-1">
                    {{ item.name }}
                  </h5>
                  <div class="d-flex align-items-center mb-2">
                    <h4 class="text-primary mb-0 mr-2">₹{{ item.price }}</h4>
                    <small
                      v-if="item.originalPrice"
                      class="text-muted text-decoration-line-through"
                    >
                      ₹{{ item.originalPrice }}
                    </small>
                  </div>
                  <p class="text-muted small text-truncate mb-2">
                    {{ item.description }}
                  </p>
                </div>

                <div class="d-flex align-items-center mb-3">
                  <div class="d-flex">
                    <b-icon
                      v-for="star in 5"
                      :key="star"
                      :icon="star <= item.rating ? 'star-fill' : 'star'"
                      :variant="star <= item.rating ? 'warning' : 'secondary'"
                      class="mr-1"
                    ></b-icon>
                  </div>
                  <small class="ml-2 text-muted">{{ item.rating }}/5</small>
                </div>

                <b-button
                  :variant="isInCart(item) ? 'danger' : 'primary'"
                  @click="toggleCartItem(item)"
                  class="mt-auto"
                  pill
                  size="sm"
                >
                  <b-icon
                    :icon="isInCart(item) ? 'cart-dash' : 'cart-plus'"
                    class="mr-1"
                  ></b-icon>
                  {{ isInCart(item) ? "Remove" : "Add to Cart" }}
                </b-button>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      items: [
        {
          id: "ele1",
          quantity: 1,
          name: "MacBook Air M2",
          price: 114999,
          discount: 10,
          rating: 5,
          description: "Apple's lightweight laptop powered by the M2 chip.",
          img: "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SX679_.jpg",
        },
        {
          id: "ele2",
          quantity: 1,
          name: "Dell XPS 13",
          price: 99999,
          discount: 12,
          rating: 4,
          description: "Sleek ultrabook with a stunning InfinityEdge display.",
          img: "https://img.freepik.com/free-photo/laptop-device-with-minimalist-monochrome-background_23-2150763336.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "ele3",
          quantity: 1,
          name: "iPhone 14 Pro",
          price: 129999,
          discount: 8,
          rating: 5,
          description:
            "Apple's latest smartphone with Dynamic Island and ProMotion.",
          img: "https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437073.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "ele4",
          quantity: 1,
          name: "Samsung Galaxy S23 Ultra",
          price: 124999,
          discount: 10,
          rating: 5,
          description:
            "Samsung's flagship phone with a powerful camera system.",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9vXiqTZoR8lykhTwyScB2dVyj6TyPWACwug&s",
        },
        {
          id: "ele5",
          quantity: 1,
          name: "iPad Pro 12.9",
          price: 112999,
          discount: 10,
          rating: 5,
          description:
            "Apple's most advanced tablet with a Liquid Retina XDR display.",
          img: "https://images.pexels.com/photos/6849081/pexels-photo-6849081.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "ele6",
          quantity: 1,
          name: "Samsung Galaxy Tab S8",
          price: 75999,
          discount: 15,
          rating: 4,
          description: "High-performance tablet with AMOLED display.",
          img: "https://img.freepik.com/premium-photo/modern-smartphones-with-blank-screens-hand-isolated-colorful-backgrounds_950414-137978.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "ele7",
          quantity: 1,
          name: "Asus ROG Strix Gaming Laptop",
          price: 149999,
          discount: 12,
          rating: 5,
          description: "High-performance gaming laptop with RGB lighting.",
          img: "https://img.freepik.com/free-photo/high-angle-gamer-playing-laptop_23-2149829167.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "ele8",
          quantity: 1,
          name: "Lenovo ThinkPad X1 Carbon",
          price: 124999,
          discount: 10,
          rating: 4,
          description: "Lightweight business laptop with exceptional keyboard.",
          img: "https://img.freepik.com/free-photo/desk-arrangement-with-ssd-laptop-flat-lay_23-2149328279.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "ele9",
          quantity: 1,
          name: "Sony WH-1000XM5",
          price: 29999,
          discount: 10,
          rating: 5,
          description: "Industry-leading noise-canceling wireless headphones.",
          img: "https://img.freepik.com/free-photo/pink-headphones-wireless-digital-device_53876-96804.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "ele10",
          quantity: 1,
          name: "Apple Watch Series 8",
          price: 45999,
          discount: 8,
          rating: 5,
          description: "Advanced health tracking with always-on display.",
          img: "https://img.freepik.com/free-photo/rendering-smart-home-device_23-2151039302.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "ele11",
          quantity: 1,
          name: "Fitbit Charge 5",
          price: 14999,
          discount: 15,
          rating: 4,
          description:
            "Fitness tracker with health metrics and sleep monitoring.",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGIk6gaiWF1gsG3IS399LejVFN1SNRXdXsw&s",
        },
        {
          id: "ele12",
          quantity: 1,
          name: "Canon EOS R5",
          price: 319999,
          discount: 5,
          rating: 5,
          description: "High-resolution mirrorless camera for professionals.",
          img: "https://img.freepik.com/free-photo/top-view-photo-camera-indoors-still-life_23-2150630663.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "ele13",
          quantity: 1,
          name: "Sony PlayStation 5",
          price: 59999,
          discount: 10,
          rating: 5,
          description: "Next-gen console with immersive gaming experience.",
          img: "https://img.freepik.com/free-photo/view-3d-video-game-controller_23-2151005826.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "ele14",
          quantity: 1,
          name: "Xbox Series X",
          price: 57999,
          discount: 8,
          rating: 5,
          description: "Microsoft's most powerful gaming console.",
          img: "https://img.freepik.com/free-photo/high-angle-controller-vr-glasses_23-2149829130.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "ele15",
          quantity: 1,
          name: "Razer DeathAdder V2",
          price: 6999,
          discount: 20,
          rating: 4,
          description: "Ergonomic gaming mouse with precision sensors.",
          img: "https://img.freepik.com/free-photo/view-neon-illuminated-gaming-desk-setup-with-keyboard_23-2149529380.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "ele16",
          quantity: 1,
          name: "Corsair K95 RGB Platinum",
          price: 17999,
          discount: 15,
          rating: 5,
          description: "Mechanical gaming keyboard with customizable lighting.",
          img: "https://img.freepik.com/free-photo/high-angle-blue-keyboard-with-lights_23-2149680224.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
      ],

      cart: [],
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(
        (item) =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
    },
  },
  mounted() {
    this.loadCartFromLocalStorage(); // Load the cart from localStorage when the component mounts
  },
  methods: {
    isInCart(item) {
      return this.cart.some((cartItem) => cartItem.id === item.id);
    },
    toggleCartItem(item) {
      if (this.isInCart(item)) {
        this.removeFromCart(item);
      } else {
        this.addToCart(item);
      }
    },
    addToCart(item) {
      this.cart.push(item);
      this.saveCartToLocalStorage();
      this.$bvToast.toast(`${item.name} added to the cart!`, {
        title: "Item Added",
        variant: "success",
        autoHideDelay: 2000, // Auto hide after 2 seconds
        solid: true,
        toaster: "b-toaster-bottom-center",
      });

      const existingProduct = this.cart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingProduct) {
        existingProduct.quantity += 0; // Increase quantity if the product is already in the cart
      } else {
        // Add new product to the cart with default quantity 1
        this.cart.push({
          ...item,
          quantity: 1,
          img: item.img || "path/to/default/image.jpg", // Use item's img or default image
        });
        this.$bvToast.toast(`${item.name} added to the cart!`, {
          title: "Item Added",
          variant: "success",
          autoHideDelay: 2000,
          solid: true,
          toaster: "b-toaster-bottom-center",
        });
      }

      this.saveCartToLocalStorage();
    },
    updateCartQuantity(item, quantity) {
      // Correct comparison: Find the cart item by comparing the ids
      const cartItem = this.cart.find((cartItem) => cartItem.id === item.id);

      if (cartItem && quantity > 0) {
        cartItem.quantity = quantity; // Update the quantity
        this.saveCartToLocalStorage(); // Save updated cart to localStorage

        this.$bvToast.toast(`${item.name} quantity updated!`, {
          title: "Quantity Updated",
          variant: "info",
          autoHideDelay: 2000,
          solid: true,
          toaster: "b-toaster-bottom-center",
        });
      }
    },
    removeFromCart(item) {
      const index = this.cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
        this.saveCartToLocalStorage();
      }
      this.$bvToast.toast(`${item.name} removed from the cart!`, {
        title: "Item Removed",
        variant: "danger",
        autoHideDelay: 2000, // Auto hide after 2 seconds
        solid: true,
        toaster: "b-toaster-bottom-center",
      });
    },
    saveCartToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    loadCartFromLocalStorage() {
      const cartFromStorage = localStorage.getItem("cart");
      if (cartFromStorage) {
        this.cart = JSON.parse(cartFromStorage);
      }
    },
    checkoutFn() {
      this.$router.push("/checkout");
    },
  },
};
</script>

<style scoped></style>
