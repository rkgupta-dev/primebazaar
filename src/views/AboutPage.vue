<template>
  <b-container class="my-4">
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

    <b-row class="my-5">
      <b-col>
        <b-card>
          <h3>Our Story</h3>
          <p>
            Founded in 2024, PrimeBazaar started with a small team passionate
            about bringing the best online shopping experience to customers.
            Over the years, we have grown into a trusted platform with a wide
            range of products, from electronics to home & living. Our journey
            has been one of constant innovation, always adapting to meet the
            needs of our customers.
          </p>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="my-5">
      <b-col md="6" class="">
        <b-card
          :img-src="require('@/assets/our-vision.png')"
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

      <b-col md="6" class="">
        <b-card
          :img-src="require('@/assets/our-mission.png')"
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

    <b-row class="my-4">
      <b-col>
        <b-card>
          <h3>Our Core Values</h3>
          <ul>
            <li>
              <strong>Customer Satisfaction:</strong> We put our customers first
              and ensure that every purchase leads to a great experience.
            </li>
            <li>
              <strong>Innovation:</strong> We continuously innovate to bring the
              latest products and features to our platform.
            </li>
            <li>
              <strong>Integrity:</strong> We believe in being transparent and
              honest with our customers in everything we do.
            </li>
            <li>
              <strong>Quality:</strong> We ensure that every product we offer
              meets the highest standards of quality and durability.
            </li>
          </ul>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="6" class="my-4">
        <b-card title="Who We Are">
          <p>
            PrimeBazaar is powered by a team of passionate individuals with a
            vision to revolutionize the online shopping experience. From the
            latest electronics to fashion and home essentials, we bring you the
            best in every category.
          </p>
        </b-card>
      </b-col>

      <b-col md="6" class="my-4">
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

    <!-- Meet the Team Section -->
    <b-card class="my-4">
      <b-row>
        <b-col>
          <h3>Meet Our Team</h3>
          <p>
            Our dedicated team of professionals works behind the scenes to
            ensure that PrimeBazaar runs smoothly and efficiently. We are
            committed to providing excellent service and support to all of our
            customers.
          </p>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <!-- Team Member 1 -->
        <b-col md="4" class="text-center">
          <img
            src="https://media.licdn.com/dms/image/v2/D5603AQGTA6zhKq8uSA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727696827510?e=1733961600&v=beta&t=-sf8txmkSYgb7Fzf6pDE5Glc6mf2WZOKS_rqb7fOV_Y"
            class="rounded-circle mb-3"
            alt="Team Member 1"
          />
          <h5>Rohit Kr. Gupta</h5>
          <p class="text-muted">Founder & CEO</p>
        </b-col>

        <!-- Team Member 2 -->
        <b-col md="4" class="text-center">
          <img
            src="https://media.licdn.com/dms/image/v2/C5603AQG89Rwlb6MiCQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1658983866670?e=1733961600&v=beta&t=YfnMX_CxX9Ky7HpEXGHk5Ehi1_SDg0hMMWnbgiZ2IzE"
            class="rounded-circle mb-3"
            alt="Team Member 2"
          />
          <h5>Shilton Rodrigues</h5>
          <p class="text-muted">Chief Marketing Officer</p>
        </b-col>

        <!-- Team Member 3 -->
        <b-col md="4" class="text-center">
          <img
            src="https://media.licdn.com/dms/image/v2/D4E03AQFX_8WluBwkGQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1712950005824?e=1733961600&v=beta&t=59UJDkaFwJ6m8uNck1qTXCXZAaLGVSGZjYO-Uf-pJ_M"
            class="rounded-circle mb-3"
            alt="Team Member 3"
          />
          <h5>Divisha Jain</h5>
          <p class="text-muted">Head of Customer Support</p>
        </b-col>
      </b-row>
    </b-card>

    <!-- Commitment to Customers Section -->
    <b-row class="mt-5">
      <b-col>
        <b-card>
          <h3>Our Commitment to You</h3>
          <p>
            At PrimeBazaar, we are committed to offering a seamless and
            enjoyable shopping experience. Our customer service team is always
            here to help, whether you have questions about a product, need help
            with your order, or simply want some recommendations.
          </p>
        </b-card>
      </b-col>
    </b-row>

    <!-- Customer Testimonials Section -->
    <b-row class="mt-5">
      <b-col>
        <b-card>
          <h3>What Our Customers Are Saying</h3>
          <b-card-group deck>
            <b-card
              title="Best Shopping Experience!"
              class="my-4"
              footer="– Jitendra Kumar"
            >
              <p class="card-text">
                I've been shopping at PrimeBazaar for months, and the experience
                has been excellent. The products are top-notch, and their
                customer service is always helpful!
              </p>
            </b-card>

            <b-card
              title="Fast Shipping and Great Products!"
              class="my-4"
              footer="– Akhil Gupta"
            >
              <p class="card-text">
                PrimeBazaar never disappoints. I got my order delivered in no
                time, and the quality of the products exceeded my expectations.
              </p>
            </b-card>

            <b-card
              title="Highly Recommended!"
              class="my-4"
              footer="– Rajeev Mishra"
            >
              <p class="card-text">
                I love shopping here. The site is easy to navigate, and they
                have everything I need. I’ve recommended PrimeBazaar to all my
                friends and family.
              </p>
            </b-card>
          </b-card-group>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="my-4 text-center">
      <b-col>
        <b-button variant="success" to="/" href="#categories"
          >Shop Now</b-button
        >
        <b-button variant="primary" to="/contacts" class="ml-2"
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
