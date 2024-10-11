<template>
    <b-container class="mt-5">
      <b-row>
        <b-col>
          <h1 class="text-center mb-4">About Us</h1>
          <p class="lead text-center">
            Welcome to PrimeBazaar, your one-stop destination for Electronics, Fashion, and Home & Living products!
          </p>
          <hr>
        </b-col>
      </b-row>
  
      <b-row class="mt-5">
        <b-col md="6" class="mb-4">
          <b-card
            :img-src="require('@/assets/about-vision.webp')"
            img-alt="Our Vision"
            img-top
            title="Our Vision"
          >
            <p>
              At PrimeBazaar, we aim to bring the best shopping experience to every household by offering a wide range of products at the best prices.
            </p>
          </b-card>
        </b-col>
        
        <b-col md="6" class="mb-4">
          <b-card
            :img-src="require('@/assets/about-mission.webp')"
            img-alt="Our Mission"
            img-top
            title="Our Mission"
          >
            <p>
              Our mission is to become the go-to platform for all your shopping needs by delivering the highest quality products and exceptional customer service.
            </p>
          </b-card>
        </b-col>
      </b-row>
  
      <b-row class="mt-5">
        <b-col md="6" class="mb-4">
          <b-card title="Who We Are">
            <p>
              PrimeBazaar is powered by a team of passionate individuals with a vision to revolutionize the online shopping experience. From the latest electronics to fashion and home essentials, we bring you the best in every category.
            </p>
          </b-card>
        </b-col>
  
        <b-col md="6" class="mb-4">
          <b-card title="Why Choose Us?">
            <ul>
              <li>Extensive range of high-quality products</li>
              <li>Affordable prices and unbeatable deals</li>
              <li>Easy returns and customer-first policies</li>
              <li>Fast and reliable shipping</li>
            </ul>
          </b-card>
        </b-col>
      </b-row>
  
      <b-row class="my-5 text-center">
        <b-col>
          <b-button variant="primary" href="#categories">Shop Now</b-button>
          <b-button variant="info" href="/contact-us" class="ml-2">Contact Us</b-button>
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  export default {
    name: "AboutUsPage"
  };
  </script>
  
  <style scoped>
  h1 {
    font-weight: bold;
    color: #343a40;
  }
  .lead {
    font-size: 1.25rem;
  }
  </style>
  