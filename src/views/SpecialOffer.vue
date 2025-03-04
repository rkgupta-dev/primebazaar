<template>
  <b-container class="py-4 100vh">
    <h2 class="text-center mb-1">Special Offers</h2>
    <p class="text-center text-muted mb-4">
      Limited time offers you won't want to miss
    </p>

    <b-row>
      <!-- 24 Hour Deal Card -->
      <b-col md="4" class="my-2">
        <b-card
          text-variant="white"
          class="h-100 shadow-sm"
          style="
            background: linear-gradient(135deg, #ff5f6d, #ff4778);
            border-radius: 15px;
          "
        >
          <b-badge variant="light" class="text-danger px-2 py-1 rounded-pill"
            >Flash Sale</b-badge
          >
          <h4 class="fw-bold mt-2">24 Hour Deal</h4>
          <p>Up to 70% off on selected items</p>
          <b-row class="text-center mb-3">
            <b-col>
              <div class="d-flex justify-content-center align-items-center">
                <b-badge variant="light" class="px-3 py-2 mx-2">
                  <div class="h3 mb-0">{{ hours }}</div>
                  <small class="d-block">Hours</small>
                </b-badge>
                <b-badge variant="light" class="px-3 py-2 mx-2">
                  <div class="text-center">
                    <div class="h3 mb-0">{{ minutes }}</div>
                    <small class="d-block">Minutes</small>
                  </div>
                </b-badge>

                <b-badge variant="light" class="px-3 py-2 mx-2">
                  <div class="h3 mb-0">{{ seconds }}</div>
                  <small class="d-block">Seconds</small>
                </b-badge>
              </div>
            </b-col>
          </b-row>
          <b-button variant="light" class="text-danger rounded-pill"
            >Shop Now</b-button
          >
        </b-card>
      </b-col>

      <!-- Buy 2 Get 1 Free Card -->
      <b-col md="4" class="my-2">
        <b-card
          bg-variant="primary"
          text-variant="white"
          class="h-100 shadow-sm"
          style="
            background: linear-gradient(135deg, #4e54c8, #3f78e0);
            border-radius: 15px;
          "
        >
          <b-badge variant="light" class="text-primary px-2 py-1 rounded-pill"
            >Bundle Deal</b-badge
          >
          <h4 class="fw-bold mt-2">Buy 2 Get 1 Free</h4>
          <p>On all accessories and watches</p>
          <p>
            <i class="fa-solid fa-check mr-1"></i> Mix and match any items
            <br />
            <i class="fa-solid fa-check mr-1"></i> Free shipping included<br />
            <i class="fa-solid fa-check mr-1"></i> Limited time offer
          </p>
          <b-button variant="light" class="text-primary fw-bold rounded-pill"
            >View Bundles</b-button
          >
        </b-card>
      </b-col>

      <!-- Summer Collection Card -->
      <b-col md="4" class="my-2">
        <b-card
          bg-variant="warning"
          text-variant="white"
          class="h-100 shadow-sm"
          style="
            background: linear-gradient(135deg, #ff9966, #ff7e29);
            border-radius: 15px;
          "
        >
          <b-badge variant="light" class="text-danger px-2 py-1 rounded-pill"
            >Season Special</b-badge
          >
          <h4 class="fw-bold mt-2">Summer Collection</h4>
          <p>30% off on new arrivals</p>
          <b-alert show class="mb-2" variant="warning">
            <div>
              <span class="h6 text-dark">Use Code: SUMMER20</span> <br />
              <span class="small text-dark">Valid until August 31st</span>
            </div>
          </b-alert>
          <b-button variant="light" class="text-danger fw-bold rounded-pill"
            >Claim Offer</b-button
          >
        </b-card>
      </b-col>

      <!-- Student Discount Card -->
      <b-col md="6" class="my-2">
        <b-card
          bg-variant="dark"
          text-variant="white"
          class="h-100 shadow-sm"
          style="
            background: linear-gradient(135deg, #141e30, #243b55);
            border-radius: 15px;
          "
        >
          <b-badge variant="light" class="text-dark px-2 py-1 rounded-pill"
            >Education Only</b-badge
          >
          <h4 class="fw-bold mt-2">20% Student Discount</h4>
          <p>Valid student ID required</p>
          <b-button variant="light" class="text-dark fw-bold rounded-pill"
            >Verify Now</b-button
          >
        </b-card>
      </b-col>

      <!-- First Purchase Card -->
      <b-col md="6" class="my-2">
        <b-card
          bg-variant="success"
          text-variant="white"
          class="h-100 shadow-sm"
          style="
            background: linear-gradient(135deg, #11998e, #38ef7d);
            border-radius: 15px;
          "
        >
          <b-badge variant="light" class="text-success px-2 py-1 rounded-pill"
            >New Customers</b-badge
          >
          <h4 class="fw-bold mt-2">15% Off First Purchase</h4>
          <p>Sign up now to claim your discount</p>
          <b-button
            variant="light"
            class="text-success fw-bold rounded-pill"
            to="/signup"
            >Sign Up</b-button
          >
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "SpecialOffers",
  data() {
    return {
      targetTime: null,
      remainingMs: 0,
      timer: null,
    };
  },
  computed: {
    hours() {
      return this.pad(Math.floor(this.remainingMs / 3600000));
    },
    minutes() {
      return this.pad(Math.floor((this.remainingMs % 3600000) / 60000));
    },
    seconds() {
      return this.pad(Math.floor((this.remainingMs % 60000) / 1000));
    },
  },
  methods: {
    startCountdown() {
      this.timer = setInterval(() => {
        if (this.remainingMs <= 0) {
          this.stopCountdown();
          this.remainingMs = 0;
        } else {
          this.remainingMs -= 1000; // Reduce by 1 second
        }
      }, 1000);
    },
    stopCountdown() {
      clearInterval(this.timer);
    },
    pad(num) {
      return String(num).padStart(2, "0");
    },
    initializeCountdown() {
      const now = new Date();
      this.targetTime = new Date();
      this.targetTime.setDate(this.targetTime.getDate() + 1); // Next midnight
      this.targetTime.setHours(0, 0, 0, 0); // Set to 00:00:00

      const countdownStart = new Date(
        this.targetTime.getTime() - 24 * 60 * 60 * 1000
      );
      this.remainingMs = Math.max(0, this.targetTime - now);

      if (now >= countdownStart) {
        this.startCountdown();
      }
    },
  },
  mounted() {
    this.initializeCountdown();
  },
  beforeUnmount() {
    this.stopCountdown();
  },
};
</script>
