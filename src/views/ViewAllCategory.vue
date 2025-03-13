<template>
  <div class="category-page">
    <!-- Hero Banner -->
    <div class="hero-banner mb-5">
      <b-container>
        <div class="hero-content py-5">
          <h1 class="display-4 font-weight-bold text-white mb-3">
            Discover Our Collections
          </h1>
          <p class="lead text-white mb-4">
            Find exactly what you're looking for in our carefully curated
            categories
          </p>
          <b-form-input
            v-model="searchQuery"
            placeholder="Search categories..."
            class="search-input mb-0 w-75 w-md-50"
          ></b-form-input>
        </div>
      </b-container>
    </div>

    <!-- All Categories -->
    <b-container class="mb-5">
      <div class="section-header mb-4">
        <h2 class="mb-2"><span class="highlight">All</span> Categories</h2>
        <p class="text-muted">
          Browse through our complete collection of product categories
        </p>
      </div>

      <b-row>
        <b-col
          v-for="(category, index) in filteredCategories"
          :key="index"
          cols="12"
          sm="6"
          lg="4"
          class="mb-4"
        >
          <b-card no-body class="h-100 category-card border-0">
            <div class="card-img-wrapper">
              <b-card-img-lazy
                :src="category.image"
                :alt="category.name"
                top
              ></b-card-img-lazy>
              <div class="card-img-overlay">
                <b-badge
                  v-if="category.popular"
                  variant="danger"
                  class="position-absolute badge-popular"
                  >Popular</b-badge
                >
              </div>
            </div>
            <b-card-body>
              <div class="d-flex align-items-center mb-2">
                <i :class="category.icon" class="category-icon mr-2"></i>
                <b-card-title class="mb-0">{{ category.name }}</b-card-title>
              </div>
              <b-card-text>{{ category.description }}</b-card-text>
              <div class="d-flex justify-content-between align-items-center">
                <b-button
                  variant="primary"
                  :href="category.url"
                  class="px-4 rounded-pill"
                  >Shop Now</b-button
                >
                <small class="text-muted">{{ category.itemCount }} items</small>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "CategoryPage",
  data() {
    return {
      searchQuery: "",
      categories: [
        {
          name: "Electronics",
          description:
            "Discover the latest gadgets and electronic devices for your home and office.",
          image: "https://placehold.co/600x400/e9ecef/495057?text=Electronics",
          url: "/category/electronics",
          icon: "fas fa-laptop",
          popular: true,
          itemCount: 243,
        },
        {
          name: "Clothing",
          description:
            "Browse our collection of trendy clothing for men, women, and children.",
          image: "https://placehold.co/600x400/e9ecef/495057?text=Clothing",
          url: "/category/clothing",
          icon: "fas fa-tshirt",
          popular: true,
          itemCount: 518,
        },
        {
          name: "Home & Kitchen",
          description: "Find everything you need to make your house a home.",
          image:
            "https://placehold.co/600x400/e9ecef/495057?text=Home+%26+Kitchen",
          url: "/home-&-kitchen",
          icon: "fas fa-home",
          popular: false,
          itemCount: 327,
        },
        {
          name: "Beauty & Personal Care",
          description:
            "Shop premium beauty products and personal care essentials.",
          image: "https://placehold.co/600x400/e9ecef/495057?text=Beauty",
          url: "/category/beauty",
          icon: "fas fa-spa",
          popular: true,
          itemCount: 184,
        },
        {
          name: "Sports & Outdoors",
          description:
            "Gear up for your next adventure with our sports and outdoor equipment.",
          image: "https://placehold.co/600x400/e9ecef/495057?text=Sports",
          url: "/category/sports",
          icon: "fas fa-running",
          popular: false,
          itemCount: 156,
        },
        {
          name: "Books & Media",
          description:
            "Explore our vast collection of books, movies, music, and more.",
          image:
            "https://placehold.co/600x400/e9ecef/495057?text=Books+%26+Media",
          url: "/category/books-media",
          icon: "fas fa-book",
          popular: false,
          itemCount: 412,
        },
      ],
    };
  },
  computed: {
    filteredCategories() {
      if (!this.searchQuery) return this.categories;
      const query = this.searchQuery.toLowerCase();
      return this.categories.filter(
        (category) =>
          category.name.toLowerCase().includes(query) ||
          category.description.toLowerCase().includes(query)
      );
    },
  },
};
</script>

<style scoped>
/* Hero Banner */
.hero-banner {
  background: linear-gradient(135deg, #6f42c1 0%, #007bff 100%);
  color: white;
  position: relative;
}

.hero-content {
  padding: 4rem 0;
}

.search-input {
  height: 50px;
  border-radius: 25px;
  padding-left: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: none;
}

/* Section Headers */
.section-header h2 {
  font-weight: 700;
  position: relative;
}

.highlight {
  position: relative;
  z-index: 1;
}

.highlight::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 30%;
  width: 100%;
  background-color: rgba(0, 123, 255, 0.2);
  z-index: -1;
}

/* Category Cards */
.category-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.card-img-wrapper {
  position: relative;
  overflow: hidden;
}

.card-img-wrapper img {
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.category-card:hover .card-img-wrapper img {
  transform: scale(1.05);
}

.badge-popular {
  top: 10px;
  right: 10px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
}

.category-icon {
  color: #007bff;
  font-size: 1.2rem;
}

/* Category Promotion */
.category-promotion {
  background: linear-gradient(135deg, #007bff 0%, #6f42c1 100%);
  padding: 4rem 0;
}

/* Responsive Adjustments */
@media (max-width: 767.98px) {
  .hero-content {
    padding: 3rem 0;
  }

  .featured-category {
    height: 250px;
  }
}
</style>
