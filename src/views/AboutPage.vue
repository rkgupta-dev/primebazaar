<template>
  <b-container class="mt-5">
    <b-row>
      <b-col>
        <h1 class="text-center mb-4">About Us</h1>
        <p class="lead text-center">
          Welcome to
          <span class="text-primary font-weight-bold">PrimeBazaar</span>, your
          one-stop destination for Electronics, Fashion, and Home & Living
          products, offering unbeatable deals, top-quality items, exclusive
          discounts, and a seamless shopping experience!
        </p>
        <hr />
      </b-col>
    </b-row>

    <b-carousel
      id="carousel-fade"
      :interval="3000"
      fade
      class="my-4 border border-dark rounded-lg"
    >
      <b-carousel-slide
        :img-src="require('@/assets/about.png')"
      ></b-carousel-slide>
    </b-carousel>

    <b-row class="mt-5">
      <b-col md="6" class="mb-4">
        <b-card
          :img-src="require('@/assets/about-vision.webp')"
          img-alt="Our Vision"
          img-top
          title="Our Vision"
        >
          <p>
            At PrimeBazaar online store, we aim to bring the best shopping
            experience to every household by offering a wide range of
            high-quality products at the best prices. Our collection spans
            Electronics, Fashion, Home & Living essentials, ensuring you find
            everything you need, all while enjoying unbeatable deals,
            exceptional service, and fast delivery.
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
            Our mission is to become the go-to platform for all your shopping
            needs by offering the highest quality products across various
            categories, including Electronics, Fashion, and Home & Living. We
            are committed to delivering exceptional customer service, ensuring a
            seamless shopping experience, fast delivery, and unbeatable value
            every time.
          </p>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-5">
      <b-col md="6" class="mb-4">
        <b-card title="Who We Are">
          <p>
            PrimeBazaar is powered by a team of passionate individuals with a
            vision to revolutionize the online shopping experience. From the
            latest electronics to fashion and home essentials, we bring you the
            best in every category.
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

    <b-row class="my-4 text-center">
      <b-col>
        <b-button variant="primary" to="/" href="#categories"
          >Shop Now</b-button
        >
        <b-button variant="info" to="/contacts" class="ml-2"
          >Contact Us</b-button
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "AboutPage",
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
