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
              <b-button
                variant="outline-light"
                size="sm"
                @click="$bvModal.show('bv-modal-example')"
              >
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
    </div>

    <b-container class="my-4">
      <h3>Home & Living Items</h3>
      <!-- Search Function -->
      <b-row>
        <b-col>
          <b-form-input
            v-model="searchQuery"
            placeholder="Search for home & living..."
            class="my-4"
          />
        </b-col>
      </b-row>

      <!-- Electronics Items List -->
      <b-row v-if="filteredItems.length === 0">
        <b-col>
          <h4>Oops! Nothing Found!</h4>
          <p>Try searching for different keywords or check our categories!</p>
        </b-col>
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
            :img-src="item.img"
            img-alt="Item image"
            img-top
            class="custom-card shadow-sm"
          >
            <b-card-text>
              <p class="text-truncate mb-1">
                <strong class="text-dark">{{ item.name }}</strong>
              </p>
              <p class="d-flex align-items-center">
                <strong class="text-primary h5">₹{{ item.price }}</strong>
                <b-badge class="ml-2 py-1 px-2" variant="success" pill>
                  {{ item.discount }}% off
                </b-badge>
              </p>
              <p class="text-muted text-truncate">{{ item.description }}</p>

              <!-- Rating of product -->
              <div class="rating d-flex mb-2">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="star"
                  :class="{
                    'text-warning': star <= item.rating,
                    'text-secondary': star > item.rating,
                  }"
                >
                  ★
                </span>
                <small class="ml-2 text-muted">{{ item.rating }} / 5</small>
              </div>
            </b-card-text>

            <b-button
              :variant="isInCart(item) ? 'outline-danger' : 'outline-primary'"
              @click="toggleCartItem(item)"
              size="sm"
              block
              class=""
            >
              {{ isInCart(item) ? "Remove" : "Add to Cart" }}
            </b-button>
          </b-card>
        </b-col>
      </b-row>
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
          id: "hl1",
          quantity: 1,
          name: "Sofa Set",
          price: 19999,
          discount: 15,
          rating: 4.8,
          description:
            "A comfortable and stylish sofa set that adds elegance to your living room.",
          img: "data:image/jpeg;base64,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",
        },
        {
          id: "hl2",
          quantity: 1,
          name: "Coffee Table",
          price: 2499,
          discount: 10,
          rating: 4.2,
          description:
            "A modern coffee table made of high-quality wood, perfect for your living space.",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBuUhlgaLKsDdVi6XiQjoLKmMu-xmWOkoEkA&s",
        },
        {
          id: "hl3",
          quantity: 2,
          name: "Wall Art",
          price: 999,
          discount: 20,
          rating: 4.6,
          description:
            "Beautiful abstract wall art to enhance the look of any room.",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuipqpbTcVrRRethLJnOztDPsJ04TKr6irJQ&s",
        },
        {
          id: "hl4",
          quantity: 1,
          name: "Floor Lamp",
          price: 2999,
          discount: 12,
          rating: 4.7,
          description:
            "An elegant floor lamp with adjustable lighting for a cozy ambiance.",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-x7l84bG_BEr27BVUq_XZllLLCWevVV2WMA&s",
        },
        {
          id: "hl5",
          quantity: 1,
          name: "Dining Set",
          price: 15999,
          discount: 18,
          rating: 4.9,
          description:
            "A premium dining set with six chairs, perfect for family meals and gatherings.",
          img: "data:image/jpeg;base64,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",
        },
        {
          id: "hl6",
          quantity: 3,
          name: "Cushion Covers",
          price: 599,
          discount: 25,
          rating: 4.4,
          description:
            "Set of three colorful cushion covers made from high-quality fabric.",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE7QXtDp38E5MfxKo2tHs_r-T_369b0tQQ6w&s",
        },
        {
          id: "hl7",
          quantity: 1,
          name: "Curtains",
          price: 1499,
          discount: 15,
          rating: 4.3,
          description:
            "Elegant blackout curtains to give you privacy and block out sunlight.",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ8tV81EmjysZwrpwP4YgDyYJjh6pYCgLjAw&s",
        },
        {
          id: "hl8",
          quantity: 1,
          name: "Bookshelf",
          price: 3999,
          discount: 20,
          rating: 4.5,
          description:
            "A spacious wooden bookshelf to keep your books organized and on display.",
          img: "data:image/jpeg;base64,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",
        },
        {
          id: "hl9",
          quantity: 2,
          name: "Throw Blanket",
          price: 799,
          discount: 30,
          rating: 4.6,
          description:
            "Soft and cozy throw blanket, perfect for keeping warm on chilly nights.",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfOG4ovjmtY03zdX1__FMLrNRPwFXt8Y08fA&s",
        },
        {
          id: "hl10",
          quantity: 1,
          name: "Mirror",
          price: 1999,
          discount: 10,
          rating: 4.7,
          description:
            "A stylish decorative mirror that adds light and space to any room.",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_XObNm-T_3zMIFPaYexx3AnTppLA7s_l76Q&s",
        },
        {
          id: "hl11",
          quantity: 1,
          name: "Rug",
          price: 3499,
          discount: 20,
          rating: 4.8,
          description:
            "A soft and durable area rug that adds warmth and texture to your home.",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKuTnztxQHHf7iytwhYxAK075jm54mHqDyhQ&s",
        },
        {
          id: "hl12",
          quantity: 1,
          name: "Table Lamp",
          price: 1299,
          discount: 15,
          rating: 4.6,
          description:
            "A modern table lamp with a sleek design, perfect for reading or working.",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-UnyQNFip-OYJzWI4uA_-3WnHjaSkK_38jA&s",
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

<style scoped>
.custom-card img {
  width: 100px;
  height: 100px;
  margin-left: 40px;
}
.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>
