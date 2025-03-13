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
        <b-col md="8" sm="6"><h3>Books And Media</h3></b-col>
        <b-col md="4" sm="6">
          <b-form-input
            v-model="searchQuery"
            placeholder="Search for books & media..."
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
                <div class="d-flex justify-content-center">
                  <b-card-img
                    :src="item.img"
                    :alt="item.name"
                    top
                    class="w-50 h-auto"
                  ></b-card-img>
                </div>
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
          id: "bam1",
          quantity: 1,
          name: "The Alchemist",
          price: 399,
          discount: 20,
          rating: 5,
          description:
            "A novel by Paulo Coelho that explores following one’s dreams.",
          img: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
        },
        {
          id: "bam2",
          quantity: 1,
          name: "Atomic Habits",
          price: 499,
          discount: 15,
          rating: 5,
          description:
            "James Clear's guide to building good habits and breaking bad ones.",
          img: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
        },
        {
          id: "bam3",
          quantity: 1,
          name: "Sapiens: A Brief History of Humankind",
          price: 699,
          discount: 10,
          rating: 5,
          description: "Yuval Noah Harari's exploration of human history.",
          img: "https://m.media-amazon.com/images/I/713jIoMO3UL.jpg",
        },
        {
          id: "bam4",
          quantity: 1,
          name: "Harry Potter and the Sorcerer's Stone",
          price: 799,
          discount: 25,
          rating: 5,
          description: "J.K. Rowling's magical tale of a young wizard.",
          img: "https://m.media-amazon.com/images/I/81iqZ2HHD-L.jpg",
        },

        {
          id: "bam5",
          quantity: 1,
          name: "Rich Dad Poor Dad",
          price: 449,
          discount: 20,
          rating: 5,
          description: "Robert Kiyosaki's take on financial education.",
          img: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg",
        },

        {
          id: "bam6",
          quantity: 1,
          name: "The Subtle Art of Not Giving a F*ck",
          price: 499,
          discount: 10,
          rating: 4,
          description:
            "Mark Manson's counterintuitive approach to living a good life.",
          img: "https://m.media-amazon.com/images/I/71QKQ9mwV7L.jpg",
        },
        {
          id: "bam7",
          quantity: 1,
          name: "To Kill a Mockingbird",
          price: 599,
          discount: 20,
          rating: 5,
          description:
            "Harper Lee's tale of racial injustice and moral growth.",
          img: "https://m.media-amazon.com/images/I/81OthjkJBuL.jpg",
        },
        {
          id: "bam8",
          quantity: 1,
          name: "Think and Grow Rich",
          price: 399,
          discount: 15,
          rating: 4,
          description: "Napoleon Hill’s classic on personal achievement.",
          img: "https://m.media-amazon.com/images/I/71UypkUjStL.jpg",
        },

        {
          id: "bam9",
          quantity: 1,
          name: "Ikigai: The Japanese Secret to a Long and Happy Life",
          price: 499,
          discount: 10,
          rating: 4,
          description: "Discover the Japanese concept of finding purpose.",
          img: "https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg",
        },
        {
          id: "bam10",
          quantity: 1,
          name: "The 5 AM Club",
          price: 499,
          discount: 10,
          rating: 4,
          description:
            "Robin Sharma's powerful morning routine to maximize productivity.",
          img: "https://m.media-amazon.com/images/I/81N7FmJhbhL.jpg",
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
