<template>
  <div class="container my-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h4>New Arrivals</h4>
        <p class="text-muted">Check out our latest products</p>
      </div>
      <div>
        <b-button
          variant="outline-primary"
          size="sm"
          class="mr-2"
          @click="scrollLeft"
          pill
        >
          <b-icon icon="chevron-left"></b-icon>
        </b-button>
        <b-button variant="outline-primary" size="sm" @click="scrollRight" pill>
          <b-icon icon="chevron-right"></b-icon>
        </b-button>
      </div>
    </div>
    <div class="scroll-container" ref="scrollContainer">
      <div class="d-flex">
        <b-card
          v-for="(product, index) in products"
          :key="index"
          class="border-2 shadow-sm rounded-lg my-2 ml-2"
          style="min-width: 250px"
        >
          <b-badge variant="danger">New</b-badge>
          <div class="position-relative">
            <b-img
              :src="product.image"
              class="w-100"
              height="160"
              alt="Product Image"
            ></b-img>
          </div>
          <b-card-body>
            <div>{{ product.name }}</div>
            <div class="text-muted">{{ product.category }}</div>
            <div class="mt-2">
              <span class="fw-bold">₹{{ product.price }}</span>
              <small class="text-muted ml-1" v-if="product.oldPrice">
                <del>₹{{ product.oldPrice }}</del>
              </small>
            </div>
          </b-card-body>
        </b-card>
      </div>
    </div>
    <div class="text-center mt-5">
      <b-link href="#">View All New Arrivals →</b-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          name: "Premium Cotton T-Shirt",
          category: "Classic Fit",
          price: 299.99,
          oldPrice: 399.99,
          image:
            "https://img.freepik.com/free-photo/shirt-mockup-concept-with-plain-clothing_23-2149448751.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
        {
          name: "Slim Fit Jeans",
          category: "Dark Blue",
          price: 429.99,
          image:
            "https://img.freepik.com/free-photo/close-up-stylish-traveler-jeans_23-2148357267.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
        {
          name: "Leather Crossbody Bag",
          category: "Genuine Leather",
          price: 549.99,
          oldPrice: 659.99,
          image:
            "https://img.freepik.com/free-photo/vintage-leather-briefcase-blue_155003-735.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
        {
          name: "Running Sneakers",
          category: "Lightweight",
          price: 779.99,
          image:
            "https://img.freepik.com/free-photo/sporty-man-training-outdoors-london_181624-28390.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
        {
          name: "Classic Leather Wallet",
          category: "Handmade",
          price: 339.99,
          image:
            "https://img.freepik.com/free-photo/fashion-portrait-young-businessman-handsome-model-man-dressed-elegant-brown-suit-with-accessories_158538-11193.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
        {
          name: "Casual Canvas Backpack",
          category: "Outdoor",
          price: 859.99,
          image:
            "https://img.freepik.com/free-photo/backpack-with-sunset_1150-7720.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
      ],
    };
  },
  methods: {
    scrollLeft() {
      this.$refs.scrollContainer.scrollBy({ left: -250, behavior: "smooth" });
    },
    scrollRight() {
      this.$refs.scrollContainer.scrollBy({ left: 250, behavior: "smooth" });
    },
  },
};
</script>

<style>
.badge {
  font-size: 0.75rem;
}

.scroll-container {
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 10px;
  scroll-behavior: smooth;
}
.scroll-container::-webkit-scrollbar {
  height: 8px;
}
.scroll-container::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}
</style>
