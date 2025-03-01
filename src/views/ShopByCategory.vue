<template>
  <b-container class="py-5 100vh">
    <!-- Heading Section -->
    <b-row class="justify-content-center text-center mb-4">
      <b-col cols="12">
        <h2 class="font-weight-bold">Shop by Category</h2>
        <p class="text-muted">
          Discover our curated collection of trending categories
        </p>
      </b-col>
    </b-row>

    <!-- Categories Grid -->
    <b-row>
      <b-col
        cols="6"
        sm="6"
        md="3"
        v-for="(category, index) in categories"
        :key="index"
        class="mb-3"
      >
        <router-link :to="category.link" class="text-decoration-none">
          <div class="category-card position-relative">
            <b-img
              :src="category.image"
              alt="Category Image"
              class="category-image"
            ></b-img>
            <div class="category-overlay"></div>
            <div class="category-content text-center">
              <h5 class="category-title mb-1">{{ category.name }}</h5>
              <p class="category-count mb-0">
                {{ category.productCount }}+ Products
              </p>
            </div>
          </div>
        </router-link>
      </b-col>
    </b-row>

    <!-- View All Button -->
    <b-row class="justify-content-center mt-5">
      <b-col cols="auto">
        <b-button variant="primary" class="px-4 rounded-pill shadow-lg">
          View All Categories <i class="fas fa-arrow-right ml-2"></i>
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "ShopByCategory",
  data() {
    return {
      categories: [
        {
          name: "Women's Fashion",
          productCount: 200,
          link: "/fashions",
          image:
            "https://img.freepik.com/free-photo/happy-lady-stylish-skirt-boater-posing-pink-wall_197531-23653.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
        {
          name: "Men's Collection",
          productCount: 200,
          link: "/fashions",
          image:
            "https://img.freepik.com/free-photo/group-male-friends-standing-against-blue-background_23-2148160232.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
        {
          name: "Accessories",
          productCount: 200,
          link: "/electronics",
          image:
            "https://img.freepik.com/free-photo/workplace-business-modern-male-accessories-laptop-white_155003-3941.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
        {
          name: "Footwear",
          productCount: 200,
          link: "/footwear",
          image:
            "https://img.freepik.com/free-photo/leather-shoes-wooden-background_1203-7618.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
      ],
    };
  },
};
</script>

<style scoped>
.category-card {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.category-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.category-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}

.category-card:hover .category-image {
  transform: scale(1.1);
}

.category-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.3)
  );
  transition: background 0.3s;
}

.category-card:hover .category-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.5)
  );
}

.category-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  z-index: 2;
}

.category-count {
  font-size: 14px;
  opacity: 0.9;
}
</style>
