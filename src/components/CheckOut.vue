<template>
  <div class="checkout-container">
    <h2 class="text-center mb-4">Checkout</h2>

    <!-- Cart Items List -->
    <div v-if="cart.length">
      <b-card
        v-for="(cartItem, idx) in cart"
        :key="idx"
        class="my-2 shadow-sm border-secondary"
      >
        <div class="d-flex align-items-center">
          <!-- Image -->
          <b-img
            :src="cartItem.img"
            alt="Product image"
            fluid
            class="cart-item-image rounded mr-4 border"
            style="width: 100px; height: auto"
          ></b-img>

          <!-- Details -->
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-2">{{ cartItem.name }}</h5>

              <!-- Remove button -->
              <b-button
                variant="outline-danger"
                size="sm"
                @click="removeFromCart(cartItem)"
                class="ml-2"
                v-b-tooltip.hover.bottom="'Remove item'"
              >
                <b-icon icon="trash"></b-icon>
              </b-button>
            </div>

            <small class="text-muted">Qty: {{ cartItem.quantity }}</small>
            <p class="mb-0 d-flex justify-content-between font-weight-bold">
              <span class="text-primary"> Price: ₹{{ cartItem.price }} </span>
              <span class="text-success">
                Total: ₹{{ (cartItem.price * cartItem.quantity).toFixed(2) }}
              </span>
            </p>
          </div>
        </div>
      </b-card>

      <!-- Total Summary -->
      <b-card class="text-right my-4 shadow-sm border-primary">
        <h5 class="font-weight-bold">Total Items: {{ totalItems }}</h5>
        <h5 class="font-weight-bold text-success">
          Total Amount: ₹{{ totalAmount }}
        </h5>
        <h6 class="font-weight-bold text-danger">
          You saved: ₹{{ totalSavings }}
        </h6>
      </b-card>

      <!-- Checkout Button -->
      <b-button
        class="mt-4"
        block
        variant="success"
        size="lg"
        @click="sendWhatsApp"
      >
        Proceed to Payment
      </b-button>
    </div>

    <!-- Empty Cart Message -->
    <b-card v-else class="text-center py-5 shadow-sm border-light">
      <b-icon icon="cart" variant="muted" font-scale="2" class="mb-3"></b-icon>
      <h4 class="text-muted mb-2">Your cart is empty</h4>
      <p class="text-muted">
        Looks like you haven't added anything yet. Start shopping now!
      </p>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [], // Cart data from localStorage
      totalAmount: 0, // Extracted from URL
      totalItems: 0, // Extracted from URL
      totalSavings: 0, // Extracted from URL
    };
  },
  methods: {
    sendWhatsApp() {
      const upiId = "krrohit6@ybl";

      if (!this.totalAmount || this.totalAmount === 0) {
        alert("Your cart is empty. Please add items before proceeding.");
        return;
      }

      // Order Summary
      let orderSummary = "Order Summary:\n";
      this.cart.forEach((item) => {
        orderSummary += `- ${item.name} (Qty: ${item.quantity}) - ₹${
          item.price * item.quantity
        }\n`;
      });

      // Message for WhatsApp
      const message = `🚨 Your order is ready for payment! 🚨\n\nHey there! 👋\n\nThank you for shopping with us! Here’s a summary of your order:\n\n${orderSummary}\n\n🛍️ **Total Items:** ${this.totalItems}\n💰 **Total Price:** ₹${this.totalAmount}\n🎉 **You Saved:** ₹${this.totalSavings}\n\nTo complete your purchase, please tap the link below to pay via PhonePe:\n\n[Pay Now](upi://pay?pa=${upiId}&pn=MyShop&am=${this.totalAmount})`;

      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

      // Open WhatsApp
      window.open(whatsappUrl, "_blank");
    },

    // Load cart from localStorage
    loadCart() {
      const cartFromStorage = localStorage.getItem("cart");
      if (cartFromStorage) {
        this.cart = JSON.parse(cartFromStorage);
      }
    },

    // Remove item from cart and update storage
    removeFromCart(item) {
      const index = this.cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
        this.saveCartToLocalStorage();
      }
      this.$bvToast.toast(`${item.name} removed from the cart!`, {
        title: "Item Removed",
        variant: "danger",
        autoHideDelay: 2000,
        solid: true,
        toaster: "b-toaster-bottom-center",
      });
    },

    // Save cart to localStorage
    saveCartToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
  mounted() {
    this.loadCart(); // Load cart on mount

    // Get checkout details from URL query params
    this.totalAmount = parseFloat(this.$route.query.totalAmount) || 0;
    this.totalItems = parseInt(this.$route.query.totalItems) || 0;
    this.totalSavings = parseFloat(this.$route.query.totalSavings) || 0;
  },
};
</script>

<style scoped>
.checkout-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
