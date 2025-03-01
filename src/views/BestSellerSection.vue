<template>
  <div class="container py-5">
    <!-- Heading Section -->
    <div class="text-center mb-4">
      <h2 class="font-weight-bold">Best Sellers</h2>
      <p class="text-muted">Our most popular products based on sales</p>
    </div>

    <!-- Category Tabs -->
    <div class="d-flex justify-content-center mb-4">
      <b-button-group pill>
        <b-button
          v-for="(category, index) in categories"
          :key="index"
          :variant="activeCategory === category ? 'primary' : 'outline-primary'"
          @click="activeCategory = category"
          class="mx-1"
          pill
        >
          {{ category }}
        </b-button>
      </b-button-group>
    </div>

    <!-- Scrollable Products Container -->
    <b-container fluid class="overflow-auto">
      <b-row class="flex-nowrap">
        <b-col
          v-for="(product, index) in filteredProducts"
          :key="index"
          cols="auto"
        >
          <b-card class="position-relative" style="width: 16rem">
            <!-- Best Seller Badge -->
            <b-badge
              variant="warning"
              pill
              class="position-absolute"
              style="top: 10px; left: 10px"
              >Best Seller</b-badge
            >

            <!-- Wishlist & Quick View Icons -->
            <div class="position-absolute" style="top: 10px; right: 10px">
              <b-button variant="light" class="rounded-pill">
                <i class="far fa-heart"></i>
              </b-button>
              <b-button variant="light" class="rounded-pill ml-1">
                <i class="far fa-eye"></i>
              </b-button>
            </div>

            <!-- Product Image -->
            <b-img
              :src="product.image"
              fluid
              class="mb-3"
              :alt="product.name"
              style="width: 100%; height: 180px; object-fit: cover"
            />

            <!-- Product Rating -->
            <div class="mb-1">
              <i class="fas fa-star text-warning" v-for="n in 5" :key="n"></i>
              <span class="text-muted ml-1">({{ product.reviews }})</span>
            </div>

            <!-- Product Info -->
            <h5 class="mb-0">{{ product.name }}</h5>
            <p class="text-muted small mb-2">{{ product.feature }}</p>

            <!-- Product Price -->
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <span class="font-weight-bold"
                  >₹{{ product.price.toFixed(2) }}</span
                >
                <span class="text-muted ml-2" v-if="product.originalPrice">
                  <s>₹{{ product.originalPrice.toFixed(2) }}</s>
                </span>
              </div>

              <!-- Add to Cart Button -->
              <b-button variant="primary" class="rounded-circle">
                <i class="fas fa-plus"></i>
              </b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- View All Button -->
    <div class="text-center mt-4">
      <b-button variant="primary" class="px-4 rounded-pill">
        View All Best Sellers <i class="fas fa-arrow-right ml-2"></i>
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BestSellers",
  data() {
    return {
      activeCategory: "All",
      categories: ["All", "Women", "Men", "Accessories"],
      products: [
        {
          name: "Classic Leather Jacket",
          feature: "Premium Quality",
          price: 1999.99,
          originalPrice: 2499.99,
          reviews: 125,
          image:
            "https://img.freepik.com/free-photo/confident-serious-handsome-man-wears-black-leather-jacket-gray-t-shirt-stylish-eyewear-looks-directly-into-camera-isolated-people-style-concept_176420-13362.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
          category: "Men",
        },
        {
          name: "Formal Office Shoes",
          feature: "Genuine Leather",
          price: 899.99,
          originalPrice: 1299.99,
          reviews: 200,
          image:
            "https://img.freepik.com/free-photo/new-background-classic-man-black_1203-6540.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
          category: "Men",
        },
        {
          name: "Slim Fit Jeans",
          feature: "Stretchable Fabric",
          price: 599.99,
          originalPrice: 799.99,
          reviews: 180,
          image:
            "https://img.freepik.com/free-photo/jeans_1203-8093.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
          category: "Men",
        },
        {
          name: "Designer Sunglasses",
          feature: "UV Protection",
          price: 699.99,
          originalPrice: null,
          reviews: 218,
          image:
            "https://img.freepik.com/free-photo/portrait-beautiful-woman-wearing-many-sun-glasses-white-high-quality-photo_2831-10670.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
          category: "Women",
        },
        {
          name: "Floral Maxi Dress",
          feature: "Cotton & Flowy",
          price: 779.99,
          originalPrice: 999.99,
          reviews: 250,
          image:
            "https://img.freepik.com/free-photo/outdoor-portrait-woman-yellow-summer-dress-posing-bridge-happy-cheerful-mood-enjoying-sunny-summer-days_343596-6125.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
          category: "Women",
        },
        {
          name: "Luxury Handbag",
          feature: "Premium Leather",
          price: 2499.99,
          originalPrice: 2999.99,
          reviews: 150,
          image:
            "https://img.freepik.com/free-photo/bag-hanging-from-furniture-item-indoors_23-2151073514.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
          category: "Women",
        },
        {
          name: "Wireless Headphones",
          feature: "Noise Canceling",
          price: 1599.99,
          originalPrice: null,
          reviews: 98,
          image:
            "https://img.freepik.com/free-photo/headphones-with-minimalist-monochrome-background_23-2150763315.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
          category: "Accessories",
        },
        {
          name: "Smart Watch Pro",
          feature: "Fitness Tracker",
          price: 2999.99,
          originalPrice: 3499.99,
          reviews: 176,
          image:
            "https://img.freepik.com/free-photo/smartwatch-screen-digital-device_53876-97321.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
          category: "Accessories",
        },
        {
          name: "Leather Wallet",
          feature: "Slim & Durable",
          price: 499.99,
          originalPrice: 699.99,
          reviews: 220,
          image:
            "https://img.freepik.com/free-photo/leather-wallet-isolated-white_1232-1814.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
          category: "Accessories",
        },
      ],
    };
  },
  computed: {
    filteredProducts() {
      if (this.activeCategory === "All") return this.products;
      return this.products.filter(
        (product) => product.category === this.activeCategory
      );
    },
  },
};
</script>
