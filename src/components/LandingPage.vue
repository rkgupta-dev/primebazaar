<template>
  <div>
    <b-navbar toggleable="md" variant="light" class="shadow-md">
      <b-container>
        <b-navbar-brand href="/" class="text-primary">
          <h4>PrimeBazaar</h4>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="/">Home</b-nav-item>
            <b-nav-item href="#products">Products</b-nav-item>
            <b-nav-item href="#categories">Categories</b-nav-item>
            <b-nav-item href="/deals">Deals</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <b-button variant="outline-secondary" size="sm">
                <i class="fas fa-user"></i>
                <span class="sr-only">User account</span>
              </b-button>
            </b-nav-item>

            <b-nav-item>
              <b-button variant="outline-secondary" size="sm">
                <i class="fas fa-shopping-cart"></i>
                <span class="sr-only">Shopping cart</span>
              </b-button>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-container fluid>
      <b-jumbotron
        img-src="https://via.placeholder.com/1500x400"
        img-alt="Hero Image"
        img-top
        class="text-center"
      >
        <h1 class="display-4">Welcome to Our Shop!</h1>
        <p class="lead">Discover amazing products at unbeatable prices!</p>
        <b-button variant="success" href="#" size="lg">Shop Now</b-button>
      </b-jumbotron>
    </b-container>

    <b-container id="categories">
      <h2 class="text-center my-4">Shop by Category</h2>
      <b-row>
        <b-col md="4" v-for="category in categories" :key="category.id">
          <b-card :title="category.name" img-src="https://via.placeholder.com/300" img-alt="Category Image">
            <b-card-text>
              {{ category.description }}
            </b-card-text>
            <b-button variant="primary" href="#">View Products</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- Featured Products -->
    <b-container  id="products">
      <h2 class="text-center my-4">Featured Products</h2>
      <b-row>
        <b-col md="3" v-for="product in products" :key="product.id">
          <b-card :title="product.name" img-src="https://via.placeholder.com/200" img-alt="Product Image">
            <b-card-text>
              {{ product.description }} <br />
              <strong>\${{ product.price }}</strong>
            </b-card-text>
            <b-button variant="success">Add to Cart</b-button>
          </b-card>
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
      categories: [
        {
          id: 1,
          name: "Electronics",
          description: "Latest gadgets and devices",
        },
        {
          id: 2,
          name: "Fashion",
          description: "Trendy clothing and accessories",
        },
        {
          id: 3,
          name: "Home & Living",
          description: "Essentials for your home",
        },
      ],
      products: [
        {
          id: 1,
          name: "Product 1",
          description: "Description for product 1",
          price: 19.99,
        },
        {
          id: 2,
          name: "Product 2",
          description: "Description for product 2",
          price: 29.99,
        },
        {
          id: 3,
          name: "Product 3",
          description: "Description for product 3",
          price: 39.99,
        },
        {
          id: 4,
          name: "Product 4",
          description: "Description for product 4",
          price: 49.99,
        },
      ],
    };
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

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
