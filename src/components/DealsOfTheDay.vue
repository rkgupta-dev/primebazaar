<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="primary"
      class="mb-4 sticky-top"
    >
      <b-navbar-brand href="#">PrimeBazaar</b-navbar-brand>

      <b-navbar-toggle target="navbar-nav" />

      <b-collapse id="navbar-nav" is-nav>
        <b-navbar-nav class="ml-auto">
          <!-- Search input placed in the center -->
          <b-form inline class="mx-auto">
            <b-form-input
              v-model="searchQuery"
              type="text"
              :placeholder="placeholders[currentPlaceholderIndex]"
              class="mx-2 d-none d-sm-block"
              size="sm"
            ></b-form-input>
            <b-button
              size="sm"
              class="d-none d-sm-block"
              variant="outline-light"
              >Search</b-button
            >
          </b-form>
          <b-nav-item>
            <b-button
              variant="outline-light"
              size="sm"
              v-b-toggle.sidebar-right
            >
              <i class="fas fa-shopping-cart d-none d-md-inline"></i>
              <span class="d-inline d-md-none">Shopping cart</span>
            </b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- My Cart Sidebar -->
    <b-sidebar id="sidebar-right" title="My Cart" right shadow>
      <div class="px-3 py-2">
        <p>
          <strong>Your Cart Empty!</strong>
          <br />
          It's on Development Mode.
        </p>
        <b-img
          src="https://picsum.photos/500/500/?image=54"
          fluid
          thumbnail
        ></b-img>
      </div>
    </b-sidebar>

    <b-container>
      <!-- Carousel Section -->
      <b-carousel
        id="carousel-fade"
        :interval="3000"
        fade
        indicators
        class="my-4 border border-dark rounded-lg"
      >
        <b-carousel-slide
          :img-src="require('@/assets/deal0.png')"
        ></b-carousel-slide>
        <b-carousel-slide
          :img-src="require('@/assets/deal1.png')"
        ></b-carousel-slide>
        <b-carousel-slide
          :img-src="require('@/assets/deal2.png')"
        ></b-carousel-slide>
        <b-carousel-slide
          :img-src="require('@/assets/deal3.png')"
        ></b-carousel-slide>
      </b-carousel>

      <!-- Introduction Section -->
      <b-card class="my-4">
        <div class="row">
          <div class="col-md-8">
            <h1
              class="display-5 font-weight-bold text-primary mb-3"
              style="font-family: 'Dancing Script', cursive"
            >
              Incredible Deals Await!
            </h1>
            <p class="lead text-">
              Unlock unbeatable discounts on our best-selling, top-rated
              products. Act fast, these offers won’t last long! Enjoy up to
              <span class="text-danger font-weight-bold">50% off</span> on
              selected items and bring home your favorites today!
            </p>
          </div>
          <div class="col-md-4">
            <b-img
              :src="require('@/assets/hurry-up.png')"
              style="width: 100%; height: auto"
            >
            </b-img>
          </div>
        </div>
      </b-card>

      <!-- Countdown Section -->
      <div class="text-center my-4">
        <h2 class="text-3xl font-bold bg-light rounded mb-4">
          Deals of the Day Ends In
        </h2>
        <flip-countdown
          deadline="2024-12-25 06:30:00"
          :showDays="false"
        ></flip-countdown>
      </div>
    </b-container>

    <!-- Deals Section -->
    <b-container>
      <b-row>
        <b-col
          v-for="deal in deals"
          :key="deal.id"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          class="my-4"
        >
          <b-card class="h-100 d-flex flex-column">
            <b-card-img
              :src="deal.image"
              :alt="deal.title"
              top
              class="mb-3 rounded"
              style="width: 100%; height: 200px; object-fit: cover"
            ></b-card-img>

            <b-card-title>
              {{ deal.title }}
              <b-badge
                variant="success"
                class="position-absolute top-0 end-0 m-2"
                style="font-size: 0.75rem"
              >
                {{ deal.discount }}% OFF
              </b-badge>
            </b-card-title>

            <div class="d-flex justify-content-between">
              <span class="text-primary font-weight-bold"
                >${{ deal.salePrice.toFixed(2) }}</span
              >
              <span class="text-muted text-decoration-line-through"
                >${{ deal.originalPrice.toFixed(2) }}</span
              >
            </div>

            <b-button variant="primary" class="mt-auto w-100"
              >Add to Cart</b-button
            >
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <footer class="footer py-4" style="background-color: #343a40; color: white">
      <div class="container text-center">
        <p>&copy; 2024 PrimeBazaar - All Rights Reserved</p>
        <div class="d-flex justify-content-center mb-3">
          <b-button variant="link" to="/about-primebazarr" class="text-white mr-3" href="#"
            >About Us</b-button
          >
          <b-button variant="link" class="text-white mr-3" href="#"
            >Privacy Policy</b-button
          >
          <b-button variant="link" class="text-white mr-3" href="#"
            >Terms of Service</b-button
          >
        </div>
        <div class="d-flex justify-content-center">
          <b-icon
            icon="facebook"
            class="text-white mx-2"
            style="font-size: 1.5rem"
          ></b-icon>
          <b-icon
            icon="twitter"
            class="text-white mx-2"
            style="font-size: 1.5rem"
          ></b-icon>
          <b-icon
            icon="instagram"
            class="text-white mx-2"
            style="font-size: 1.5rem"
          ></b-icon>
          <b-icon
            icon="linkedin"
            class="text-white mx-2"
            style="font-size: 1.5rem"
          ></b-icon>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import FlipCountdown from "vue2-flip-countdown";

export default {
  components: { FlipCountdown },
  data() {
    return {
      currentPlaceholderIndex: 0,
      searchQuery: "",
      placeholders: [
        "Search products...",
        "Search electronics...",
        "Search fashion...",
        "Search home & living...",
      ],

      deals: [
        {
          id: 1,
          title: "Wireless Earbuds",
          originalPrice: 99.99,
          salePrice: 79.99,
          discount: 20,
          image:
            "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRj_TPQrSzXbfjLi0nPVtRvvcDnRhJX7UVh2mykx4lsZZoVOA8O1WbR82TufVqhG1GhJbLvm9fNAg2D404LgLLlEzKumFDyWyilgS8Woz-bEgOWLVcKTgWGrmHx9F-si61y46LUh5k&usqp=CAc",
        },
        {
          id: 2,
          title: "Smart Watch",
          originalPrice: 199.99,
          salePrice: 149.99,
          discount: 25,
          image:
            "data:image/webp;base64,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",
        },
        {
          id: 3,
          title: "4K Ultra HD TV",
          originalPrice: 799.99,
          salePrice: 599.99,
          discount: 25,
          image:
            "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSisYItfkk8ym3ENzQezwj7hcp9FUdfmbqtUTmCi2_Fl6AC8HXrD-xs4LQKZHMD-kd5Ykfy8lmMV6psereLwe7cdlZQZ7mOXMEYtvxTYH3rXCpNiSK_qeyeoYW7F42gmgJeLY2aTaBaqOc&usqp=CAc",
        },
        {
          id: 4,
          title: "Robot Vacuum Cleaner",
          originalPrice: 299.99,
          salePrice: 199.99,
          discount: 33,
          image:
            "data:image/jpeg;base64,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",
        },
        {
          id: 5,
          title: "Espresso Machine",
          originalPrice: 449.99,
          salePrice: 349.99,
          discount: 22,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyd22Fz0xcSaow2ypgiDrX6asfxEU17m4_uQ&s",
        },
        {
          id: 6,
          title: "Headphones",
          originalPrice: 249.99,
          salePrice: 199.99,
          discount: 20,
          image:
            "data:image/jpeg;base64,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",
        },
      ],
    };
  },
  created() {
    setInterval(() => {
      this.currentPlaceholderIndex =
        (this.currentPlaceholderIndex + 1) % this.placeholders.length;
    }, 3000);
  },
};
</script>

<style scoped></style>
