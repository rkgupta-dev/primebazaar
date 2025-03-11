<template>
  <div>
    <b-container class="my-4">
      <h3 class="mb-4">My Cart ({{ cart.length }})</h3>
      <div class="d-lg-none my-2" v-if="cart.length">
        <b-card no-body class="p-2 shadow-sm border rounded-lg">
          <h3 class="text-muted font-weight-bold">
            <b-button
              variant="link"
              class="p-2 text-dark d-flex justify-content-between w-100"
              @click="toggleSummary"
            >
              <span>Order Summary</span>
              <b-icon
                :icon="isSummaryOpen ? 'chevron-up' : 'chevron-down'"
              ></b-icon>
            </b-button>
          </h3>

          <b-collapse v-model="isSummaryOpen" class="p-2">
            <b-row class="mb-2">
              <b-col>Price ({{ totalItems }} items)</b-col>
              <b-col class="text-right font-weight-bold"
                >₹{{ totalPrice }}</b-col
              >
            </b-row>

            <b-row class="mb-2">
              <b-col>Discount</b-col>
              <b-col class="text-right text-success">- ₹{{ discount }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col>Coupon Discount</b-col>
              <b-col class="text-right text-success"
                >- ₹{{ appliedCoupon }}</b-col
              >
            </b-row>

            <b-row class="mb-2">
              <b-col>Delivery Charges</b-col>
              <b-col class="text-right text-success">
                <del class="text-muted">₹{{ deliveryCharge }}</del> Free
              </b-col>
            </b-row>

            <b-row class="mb-3">
              <b-col>
                Protect Promise Fee
                <!-- <b-icon icon="info-circle" class="ml-1"></b-icon> -->
              </b-col>
              <b-col class="text-right">₹{{ protectionFee }}</b-col>
            </b-row>

            <hr />

            <b-row class="mb-3 font-weight-bold h6">
              <b-col>Total Amount</b-col>
              <b-col class="text-right">₹{{ totalAmount }}</b-col>
            </b-row>

            <p class="text-success font-weight-bold">
              You will save ₹{{ totalSavings }} on this order
            </p>

            <hr />

            <div class="mb-3">
              <b-input-group v-if="!couponApplied">
                <b-form-input
                  v-model="couponCode"
                  placeholder="Enter Coupon Code"
                ></b-form-input>
                <b-input-group-append>
                  <b-button variant="primary" @click="applyCoupon"
                    >Apply</b-button
                  >
                </b-input-group-append>
              </b-input-group>

              <p v-if="couponError" class="text-danger mt-2">
                {{ couponError }}
              </p>

              <!-- Show Coupon Badge when applied -->
              <b-badge v-if="couponApplied" variant="success" class="mt-2" pill>
                {{ couponCode }} Applied
                <b-icon
                  icon="x-circle"
                  class="ml-1"
                  @click="removeCoupon"
                ></b-icon>
              </b-badge>
            </div>

            <div class="d-flex align-items-center text-muted">
              <b-icon icon="shield-lock" class="mr-2"></b-icon>
              Safe and Secure Payments. Easy returns. 100% Authentic products.
            </div>
          </b-collapse>
        </b-card>
      </div>
      <b-row>
        <b-col md="8" class="my-2">
          <div v-if="cart.length">
            <b-card v-for="(cartItem, idx) in cart" :key="idx" class="my-2">
              <div class="d-flex align-items-start">
                <b-img
                  :src="cartItem.img"
                  alt="Product image"
                  fluid
                  class="cart-item-image rounded-lg mr-3"
                ></b-img>

                <div class="ml-3">
                  <h5 class="mb-1">{{ cartItem.name }}</h5>
                  <p class="text-muted">{{ cartItem.description }}</p>
                  <p>
                    <span class="text-danger h6">₹{{ cartItem.price }}</span>
                    <b-badge variant="success" class="ml-2"
                      >{{ cartItem.discount }}% off</b-badge
                    >
                  </p>

                  <div class="d-flex">
                    <label class="mr-2">Qty:</label>
                    <b-form-spinbutton
                      v-model="cartItem.quantity"
                      min="1"
                      max="100"
                      inline
                      size="sm"
                      @change="updateCartQuantity(cartItem, cartItem.quantity)"
                    ></b-form-spinbutton>

                    <b-button
                      variant="outline-danger"
                      size="sm"
                      class="ml-3"
                      @click="removeFromCart(cartItem)"
                    >
                      Remove
                    </b-button>
                  </div>
                </div>
              </div>
            </b-card>
          </div>

          <b-card v-else class="text-center justify-content-center py-5">
            <b-icon icon="cart" variant="muted" font-scale="2"></b-icon>
            <h4 class="text-muted">Your cart is empty</h4>
            <p>Browse our collection and add items to your cart.</p>
            <b-button to="/mens-collection">Shop Now</b-button>
          </b-card>
        </b-col>
        <b-col md="4" class="my-2 d-none d-md-block">
          <div class="sticky-container" v-if="cart.length">
            <b-card class="shadow-sm border rounded-lg">
              <h5 class="text-muted font-weight-bold mb-3">PRICE DETAILS</h5>

              <b-row class="mb-2">
                <b-col>Price ({{ totalItems }} items)</b-col>
                <b-col class="text-right font-weight-bold"
                  >₹{{ totalPrice }}</b-col
                >
              </b-row>

              <b-row class="mb-2">
                <b-col>Discount</b-col>
                <b-col class="text-right text-success">- ₹{{ discount }}</b-col>
              </b-row>

              <b-row class="mb-2">
                <b-col>Coupon Discount</b-col>
                <b-col class="text-right text-success"
                  >- ₹{{ appliedCoupon }}</b-col
                >
              </b-row>

              <b-row class="mb-2">
                <b-col>Delivery Charges</b-col>
                <b-col class="text-right text-success"
                  ><del class="text-muted">₹{{ deliveryCharge }}</del>
                  Free</b-col
                >
              </b-row>

              <b-row class="mb-3">
                <b-col>Protect Promise Fee ></b-col>
                <b-col class="text-right">₹{{ protectionFee }}</b-col>
              </b-row>

              <hr />

              <b-row class="mb-3 font-weight-bold h6">
                <b-col>Total Amount</b-col>
                <b-col class="text-right">₹{{ totalAmount }}</b-col>
              </b-row>

              <p class="text-success font-weight-bold">
                You will save ₹{{ totalSavings }} on this order
              </p>

              <hr />

              <div class="mb-3">
                <b-input-group v-if="!couponApplied">
                  <b-form-input
                    v-model="couponCode"
                    placeholder="Enter Coupon Code"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button variant="primary" @click="applyCoupon"
                      >Apply</b-button
                    >
                  </b-input-group-append>
                </b-input-group>

                <p v-if="couponError" class="text-danger mt-2">
                  {{ couponError }}
                </p>

                <!-- Show Coupon Badge when applied -->
                <b-badge
                  v-if="couponApplied"
                  variant="success"
                  class="mt-2"
                  pill
                >
                  {{ couponCode }} Applied
                  <b-icon
                    icon="x-circle"
                    class="ml-1"
                    @click="removeCoupon"
                  ></b-icon>
                </b-badge>
              </div>

              <div class="d-flex align-items-center text-muted">
                <b-icon icon="shield-lock" class="mr-2"></b-icon>
                Safe and Secure Payments. Easy returns. 100% Authentic products.
              </div>
            </b-card>
            <div class="my-4">
              <b-button variant="success" block @click="checkoutFn">
                Proceed to Checkout
              </b-button>
            </div>
          </div>
        </b-col>
      </b-row>
      <div
        :class="{ 'd-md-none fixed-bottom bg-white p-2': true }"
        v-if="cart.length"
      >
        <b-button variant="success" block @click="checkoutFn">
          Proceed to Checkout
        </b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSummaryOpen: false,
      cart: [],
      couponCode: "",
      appliedCoupon: 0, // Default no coupon applied
      couponApplied: false, // Flag to check if coupon is applied
      couponError: "",
      deliveryCharge: 40, // Set delivery charge, change to 0 if free
      protectionFee: 10, // Additional charges if applicable
    };
  },
  computed: {
    totalItems() {
      return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    },
    totalPrice() {
      return this.cart
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2);
    },
    discount() {
      return this.cart
        .reduce(
          (sum, item) =>
            sum + (item.price * item.discount * item.quantity) / 100,
          0
        )
        .toFixed(2);
    },
    totalAmount() {
      return Math.round(
        this.totalPrice -
          this.discount -
          this.appliedCoupon +
          this.protectionFee
      );
    },
    totalSavings() {
      return Math.round(parseFloat(this.discount) + this.appliedCoupon);
    },
  },
  mounted() {
    this.loadCartFromLocalStorage();
  },
  methods: {
    toggleSummary() {
      this.isSummaryOpen = !this.isSummaryOpen;
    },
    loadCartFromLocalStorage() {
      const cartFromStorage = localStorage.getItem("cart");
      if (cartFromStorage) {
        this.cart = JSON.parse(cartFromStorage);
      }
    },
    updateCartQuantity(item, quantity) {
      if (item && quantity > 0) {
        this.$set(item, "quantity", quantity);
        this.saveCartToLocalStorage();
      }
    },
    removeFromCart(item) {
      this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id);
      this.saveCartToLocalStorage();
    },
    saveCartToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    applyCoupon() {
      if (this.couponCode === "SUMMER20") {
        this.appliedCoupon = Math.round((this.totalPrice * 20) / 100);
        this.couponApplied = true;
        this.couponError = "";
      } else {
        this.appliedCoupon = 0;
        this.couponApplied = false;
        this.couponError = "Invalid Coupon Code!";
      }
    },
    removeCoupon() {
      this.appliedCoupon = 0;
      this.couponApplied = false;
      this.couponCode = "";
    },
    checkoutFn() {
      this.$router.push({
        path: "/checkout",
        query: {
          totalAmount: this.totalAmount,
          totalItems: this.totalItems,
          totalSavings: this.totalSavings,
        },
      });
    },
  },
};
</script>

<style scoped>
.sticky-container {
  position: sticky;
  top: 20px;
  z-index: 1000;
}

.cart-item-image {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border: 2px solid #ddd;
  padding: 4px;
  transition: transform 0.2s ease-in-out;
}

.cart-item-image:hover {
  transform: scale(1.05);
}
</style>
