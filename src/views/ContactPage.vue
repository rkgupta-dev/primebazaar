<template>
  <b-container class="mt-5">
    <b-row>
      <b-col>
        <h1 class="text-center mb-4">Contact Us</h1>
        <p class="lead text-center">
          We're here to help! Feel free to reach out to us with any questions or
          feedback.
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
        :img-src="require('@/assets/contact.png')"
      ></b-carousel-slide>
    </b-carousel>

    <!-- Contact Info Section -->
    <b-row class="mt-5">
      <b-col md="6" class="mb-4">
        <b-card title="Contact Information" class="h-100">
          <p>
            <strong>Phone:</strong> +1 (123) 456-7890 <br />
            <strong>Email:</strong> support@primebazaar.com <br />
            <strong>Address:</strong> 123 Hanumanagar Street, Bengaluru, India
          </p>
          <p>Follow us on social media for updates:</p>
          <b-button size="sm" variant="outline-primary" href="#"
            ><i class="fab fa-facebook"></i> Facebook</b-button
          >
          <b-button size="sm" variant="outline-info" href="#" class="ml-2"
            ><i class="fab fa-twitter"></i> Twitter</b-button
          >
          <b-button size="sm" variant="outline-danger" href="#" class="ml-2"
            ><i class="fab fa-instagram"></i> Instagram</b-button
          >
          <p class="mt-4 text-muted">
            At PrimeBazaar, we value your feedback and are always here to assist
            you with any inquiries. Whether you have questions about our
            products, need help with an order, or simply want to share your
            experience, our customer service team is ready to help.
            <br />
            <br />
            Feel free to get in touch, and we’ll respond as quickly as possible
            to ensure your experience with us is seamless and enjoyable.
          </p>
        </b-card>
      </b-col>

      <!-- Contact Form -->
      <b-col md="6" class="mb-4">
        <b-card title="Send Us a Message" class="h-100">
          <b-form @submit.prevent="onSubmit">
            <b-form-group label="Full Name" label-for="full-name">
              <b-form-input
                id="full-name"
                v-model="form.name"
                required
                placeholder="Enter your full name"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Email Address" label-for="email">
              <b-form-input
                id="email"
                type="email"
                v-model="form.email"
                required
                placeholder="Enter your email"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Message" label-for="message">
              <b-form-textarea
                id="message"
                v-model="form.message"
                rows="4"
                required
                placeholder="Write your message here..."
              ></b-form-textarea>
            </b-form-group>

            <b-button type="submit" variant="primary" block
              >Send Message</b-button
            >
          </b-form>
        </b-card>
      </b-col>
    </b-row>

    <!-- Map Section -->
    <b-row class="my-4 text-center">
      <b-col>
        <h3>Visit Us</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497698.7749179518!2d77.30126246150182!3d12.954459536902316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1728632426786!5m2!1sen!2sin"
          width="100%"
          height="350"
          class="border rounded"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "ContactPage",
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$bvToast.toast(
        `Thank you, ${this.form.name}! Your message has been sent.`,
        {
          title: "Thank You!",
          variant: "success",
          solid: true,
          toaster: "b-toaster-bottom-center",
          autoHideDelay: 3000,
        }
      );
      this.form.name = "";
      this.form.email = "";
      this.form.message = "";
    },
  },
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
