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
        <b-col md="8" sm="6"><h3>Home & Kitchen</h3></b-col>
        <b-col md="4" sm="6">
          <b-form-input
            v-model="searchQuery"
            placeholder="Search for men's home & kitchen..."
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
          id: "hk1",
          quantity: 1,
          name: "Non-Stick Cookware Set",
          price: 2999,
          discount: 20,
          rating: 5,
          description:
            "Premium non-stick cookware set for hassle-free cooking and easy cleanup.",
          img: "https://img.freepik.com/free-photo/grayscale-overhead-shot-metal-pot-frying-pan-lid_181624-19530.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "hk2",
          quantity: 1,
          name: "Electric Kettle",
          price: 1499,
          discount: 15,
          rating: 4,
          description:
            "Fast-boiling electric kettle with auto shut-off feature.",
          img: "https://img.freepik.com/free-photo/kettle-cup-wall-background_1339-7169.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "hk3",
          quantity: 1,
          name: "Dinner Set",
          price: 2499,
          discount: 25,
          rating: 5,
          description: "Elegant dinner set perfect for family gatherings.",
          img: "https://img.freepik.com/free-photo/top-view-dining-tables-without-food_23-2150157775.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "hk4",
          quantity: 1,
          name: "Microwave Oven",
          price: 8999,
          discount: 10,
          rating: 4,
          description: "Compact microwave oven with multiple cooking modes.",
          img: "https://img.freepik.com/free-photo/small-oven-white-background_1232-1348.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "hk5",
          quantity: 1,
          name: "Storage Containers",
          price: 999,
          discount: 20,
          rating: 5,
          description: "Set of airtight storage containers to keep food fresh.",
          img: "https://img.freepik.com/free-photo/png-jelly-candy-isolated-white-background_185193-164925.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "hk6",
          quantity: 1,
          name: "Blender",
          price: 3499,
          discount: 15,
          rating: 4,
          description: "High-speed blender for smoothies, soups, and sauces.",
          img: "https://img.freepik.com/free-photo/brown-retro-electronic-blender-device_23-2151002847.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "hk7",
          quantity: 1,
          name: "Cutlery Set",
          price: 1299,
          discount: 10,
          rating: 5,
          description:
            "Stylish cutlery set to complement your dining experience.",
          img: "https://img.freepik.com/free-photo/top-view-black-plates-with-golden-spoons-knife-fork-dark-background-color-food-dinner-kitchen-restaurant-cutlery_179666-19701.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "hk8",
          quantity: 1,
          name: "Pressure Cooker",
          price: 2599,
          discount: 20,
          rating: 4,
          description: "Durable pressure cooker for quick and healthy meals.",
          img: "https://image.shutterstock.com/image-photo/high-pressure-aluminum-cooking-pot-260nw-2425872803.jpg",
        },
        {
          id: "hk9",
          quantity: 1,
          name: "Wall Clock",
          price: 799,
          discount: 15,
          rating: 5,
          description: "Minimalist wall clock to enhance your home decor.",
          img: "https://img.freepik.com/free-photo/flat-lay-wall-clock-still-life_23-2150417218.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "hk10",
          quantity: 1,
          name: "Table Lamp",
          price: 1599,
          discount: 10,
          rating: 4,
          description: "Modern table lamp for ambient lighting.",
          img: "https://img.freepik.com/free-photo/books-lamp_23-2147617638.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "hk11",
          quantity: 1,
          name: "Wooden Chopping Board",
          price: 699,
          discount: 20,
          rating: 5,
          description:
            "Durable wooden chopping board perfect for slicing and dicing.",
          img: "https://img.freepik.com/free-photo/top-view-vegetables-as-pepper-bunch-dill-tomato-cucumber-around-cutting-board-wooden-surface_141793-16462.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "hk12",
          quantity: 1,
          name: "Ceramic Vase",
          price: 1199,
          discount: 15,
          rating: 4,
          description: "Elegant ceramic vase to enhance your home decor.",
          img: "https://img.freepik.com/free-photo/still-life-with-plants-deco_23-2149192255.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "hk13",
          quantity: 1,
          name: "LED String Lights",
          price: 899,
          discount: 10,
          rating: 5,
          description: "Warm LED string lights to add a cozy ambiance.",
          img: "https://img.freepik.com/free-photo/glowing-christmas-yellow-fairy-light-against-black-backdrop_23-2148055528.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "hk14",
          quantity: 1,
          name: "Spice Rack Organizer",
          price: 1599,
          discount: 25,
          rating: 4,
          description:
            "Space-saving spice rack to keep your kitchen organized.",
          img: "https://img.freepik.com/free-photo/organised-filled-spice-jars_52683-86281.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
        },
        {
          id: "hk15",
          quantity: 1,
          name: "Luxury Bed Sheets",
          price: 2999,
          discount: 15,
          rating: 5,
          description:
            "Soft and luxurious bed sheets for a perfect night's sleep.",
          img: "https://img.freepik.com/free-photo/tidy-room-with-lit-lamps_1203-635.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_authors_boost",
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
