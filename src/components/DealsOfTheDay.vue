<template>
  <div class="deals-of-the-day">
    <h1 class="text-center">Deals of the Day</h1>

    <!-- Countdown Timer -->
    <div class="text-center my-4">
      <b-card class="p-3">
        <h3>Time Remaining</h3>
        <b-badge variant="success"
          >{{ countdownTimer.days }} Days {{ countdownTimer.hours }} Hours
          {{ countdownTimer.minutes }} Minutes
          {{ countdownTimer.seconds }} Seconds</b-badge
        >
      </b-card>
    </div>

    <!-- Products Section -->
    <b-row>
      <b-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        md="6"
        lg="4"
      >
        <b-card
          class="mb-4"
          :title="product.name"
          :img-src="product.image"
          img-alt="Product image"
          img-top
        >
          <b-card-text>
            {{ product.description }}
          </b-card-text>
          <b-badge variant="primary">Deal of the Day</b-badge>
          <b-button variant="success" class="mt-3" block
            >Buy Now for ${{ product.price }}</b-button
          >
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countdownTimer: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      products: [
        {
          id: 1,
          name: "Product 1",
          description: "High-quality product",
          price: 49.99,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "Product 2",
          description: "Amazing value for the price",
          price: 39.99,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "Product 3",
          description: "Best in class performance",
          price: 59.99,
          image: "https://via.placeholder.com/150",
        },
        // Add more products as needed
      ],
      intervalId: null, // to track the interval for cleanup
    };
  },
  mounted() {
    this.startCountdown();
  },
  beforeDestroy() {
    // Clear the interval when the component is destroyed
    clearInterval(this.intervalId);
  },
  methods: {
    startCountdown() {
      const dealEndTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now
      this.updateCountdown(dealEndTime);

      // Update every second
      this.intervalId = setInterval(() => {
        this.updateCountdown(dealEndTime);
      }, 1000);
    },
    updateCountdown(endTime) {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance > 0) {
        this.countdownTimer.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.countdownTimer.hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        this.countdownTimer.minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        this.countdownTimer.seconds = Math.floor(
          (distance % (1000 * 60)) / 1000
        );
      } else {
        // Countdown has ended, clear the interval
        clearInterval(this.intervalId);
        this.countdownTimer = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    },
  },
};
</script>

<style scoped>
.deals-of-the-day {
  padding: 20px;
}
</style>
