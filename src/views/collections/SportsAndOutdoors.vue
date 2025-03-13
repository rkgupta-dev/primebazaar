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

    <!--Modal of Cart Section -->
    <div>
      <!-- Cart Modal -->
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
          <b-card v-else class="text-center py-5 shadow-sm border-light">
            <b-icon
              icon="cart"
              variant="muted"
              font-scale="2"
              class="mb-3"
            ></b-icon>
            <h4 class="text-muted mb-2">Your cart is empty</h4>
            <p class="text-muted">
              Your shopping cart is empty! Start browsing and add some items you
              love!
            </p>
          </b-card>
        </div>

        <!-- Checkout Button -->
        <b-button
          variant="success"
          class="mt-4 checkout-btn"
          @click="checkoutFn()"
          block
          :disabled="!cart.length"
        >
          Check Out
        </b-button>
      </b-modal>
    </div>

    <b-container class="my-4">
      <!-- Search Function -->
      <b-row class="my-4">
        <b-col md="8" sm="6"><h3>Sports & Outdoors</h3></b-col>
        <b-col md="4" sm="6">
          <b-form-input
            v-model="searchQuery"
            placeholder="Search for sports & outdoors..."
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
          id: "sao1",
          quantity: 1,
          name: "Yoga Mat",
          price: 1299,
          discount: 20,
          rating: 5,
          description:
            "Non-slip yoga mat with carrying strap for yoga and fitness workouts.",
          img: "https://img.freepik.com/free-photo/yoga-mat-hanging-wall_23-2148741923.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "sao2",
          quantity: 1,
          name: "Dumbbell Set",
          price: 2999,
          discount: 15,
          rating: 4,
          description:
            "Adjustable dumbbell set for home workouts and strength training.",
          img: "https://img.freepik.com/free-photo/dumbbell_74190-226.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "sao3",
          quantity: 1,
          name: "Resistance Bands",
          price: 899,
          discount: 10,
          rating: 4,
          description:
            "Set of resistance bands for strength training and rehabilitation exercises.",
          img: "https://img.freepik.com/free-photo/side-view-woman-training-with-elastic-band_23-2148435354.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "sao4",
          quantity: 1,
          name: "Trekking Backpack",
          price: 2499,
          discount: 25,
          rating: 5,
          description:
            "Spacious trekking backpack with multiple compartments for outdoor adventures.",
          img: "https://img.freepik.com/free-photo/binoculars-backpack-grass_23-2147833111.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "sao5",
          quantity: 1,
          name: "Camping Tent",
          price: 5999,
          discount: 30,
          rating: 5,
          description: "Waterproof camping tent suitable for 4 people.",
          img: "https://img.freepik.com/free-photo/lifestyle-people-living-camping_23-2149733059.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "sao6",
          quantity: 1,
          name: "Hiking Shoes",
          price: 3499,
          discount: 20,
          rating: 4,
          description:
            "Durable and comfortable hiking shoes with anti-slip soles.",
          img: "https://img.freepik.com/free-photo/leather-boots_1203-8146.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "sao7",
          quantity: 1,
          name: "Sports Water Bottle",
          price: 499,
          discount: 15,
          rating: 4,
          description: "Leak-proof sports water bottle with time marker.",
          img: "https://img.freepik.com/free-photo/sportsman-recommending-drink-water_1262-5826.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "sao8",
          quantity: 1,
          name: "Football",
          price: 999,
          discount: 10,
          rating: 4,
          description: "Premium quality football for practice and matches.",
          img: "https://img.freepik.com/free-photo/soccer-ball-cleats_23-2147606532.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "sao9",
          quantity: 1,
          name: "Badminton Racket",
          price: 1599,
          discount: 20,
          rating: 5,
          description:
            "Lightweight badminton racket with high-tension strings.",
          img: "https://img.freepik.com/free-photo/badminton-rackets-white_93675-132212.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "sao10",
          quantity: 1,
          name: "Cycling Helmet",
          price: 1999,
          discount: 15,
          rating: 5,
          description: "Adjustable cycling helmet for safety during rides.",
          img: "https://img.freepik.com/free-photo/close-up-metallic-bike-helmet_23-2151113086.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "sao11",
          quantity: 1,
          name: "Fitness Tracker",
          price: 3499,
          discount: 10,
          rating: 4,
          description:
            "Track your steps, heart rate, and calories with this smart fitness tracker.",
          img: "https://img.freepik.com/free-photo/smartwatch-with-digital-assistant-arrangement_23-2149108009.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "sao12",
          quantity: 1,
          name: "Climbing Rope",
          price: 2599,
          discount: 20,
          rating: 5,
          description:
            "High-strength climbing rope for mountaineering and rock climbing.",
          img: "https://img.freepik.com/free-photo/this-is-protection-knot-with-metal-carabiner-silver-colored-device-active-sports_146671-16443.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "sao13",
          quantity: 1,
          name: "Portable Air Pump",
          price: 1299,
          discount: 15,
          rating: 4,
          description:
            "Compact air pump for inflating balls, bicycles, and more.",
          img: "https://img.freepik.com/premium-photo/car-electric-pump-white-background_420001-12845.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boostg",
        },
        {
          id: "sao14",
          quantity: 1,
          name: "Skipping Rope",
          price: 499,
          discount: 15,
          rating: 4,
          description: "Adjustable skipping rope for cardio workouts.",
          img: "https://img.freepik.com/free-photo/flat-lay-jump-rope_23-2148523208.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "sao15",
          quantity: 1,
          name: "Knee Support Brace",
          price: 1299,
          discount: 10,
          rating: 5,
          description: "Compression knee brace for joint support.",
          img: "https://img.freepik.com/premium-photo/midsection-woman-wearing-bandage-standing-against-door_1048944-20523821.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "sao16",
          quantity: 1,
          name: "Multi-Function Compass",
          price: 699,
          discount: 20,
          rating: 4,
          description: "Reliable compass for hiking and navigation.",
          img: "https://img.freepik.com/free-photo/close-up-compass-wooden-background_23-2147604749.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
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
