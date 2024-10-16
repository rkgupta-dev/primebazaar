<template>
  <div class="checkout-container">
    <h2 class="text-center mb-4">Checkout</h2>

    <!-- Cart Items List -->
    <div v-if="cart.length">
      <!-- Loop through cart items -->
      <b-card
        v-for="(cartItem, idx) in cart"
        :key="idx"
        class="my-2 shadow-sm border-secondary"
      >
        <div class="d-flex align-items-center">
          <!-- Image section -->
          <b-img
            :src="cartItem.img"
            alt="Product image"
            fluid
            class="cart-item-image rounded mr-4 border"
            style="width: 100px; height: auto"
          ></b-img>

          <!-- Details section -->
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between align-items-center">
              <!-- Product name with truncation -->
              <h5 class="mb-2 text">{{ cartItem.name }}</h5>

              <!-- Remove button with tooltip -->
              <b-button
                variant="outline-danger"
                size="sm"
                @click="removeFromCart(cartItem)"
                class="ml-2 remove-btn"
                v-b-tooltip.hover.bottom="'Remove item'"
              >
                <b-icon icon="trash"></b-icon>
              </b-button>
            </div>

            <small class="text-muted">Qty: {{ cartItem.quantity }}</small>
            <div>
              <p class="mb-0 d-flex justify-content-between font-weight-bold">
                <span class="text-primary"> Price: ₹{{ cartItem.price }} </span>
                <span class="text-success text-right">
                  Total: ₹{{ calculateItemTotal(cartItem).toFixed(2) }}
                </span>
              </p>
            </div>
          </div>

          <!-- Total Price section -->
        </div>
      </b-card>

      <!-- Total Amount -->
      <b-card class="text-right my-4 shadow-sm border-primary">
        <h5 class="font-weight-bold">
          Total Amount: ₹{{ totalAmount.toFixed(2) }}
        </h5>
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

    <!-- No Items Message -->
    <b-card v-else class="text-center py-5 shadow-sm border-light">
      <b-icon icon="cart" variant="muted" font-scale="2" class="mb-3"></b-icon>
      <h4 class="text-muted mb-2">Your cart is empty</h4>
      <p class="text-muted">
        Looks like you haven't added anything yet. Start shopping to fill your
        cart!
      </p>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [], // Initialize an empty cart, load it from localStorage
    };
  },
  computed: {
    // Calculate total amount for the entire cart
    totalAmount() {
      return this.cart.reduce((total, item) => {
        return total + this.calculateItemTotal(item);
      }, 0);
    },
  },
  methods: {
    sendWhatsApp() {
      const upiId = "krrohit6@ybl";

      // Get total price from computed property
      const totalPrice = this.totalPrice;

      // Check if totalPrice is valid
      if (totalPrice === 0) {
        alert("Your cart is empty. Please add items before proceeding.");
        return;
      }

      // Create an order summary
      let orderSummary = "Order Summary:\n";
      this.cart.forEach((item) => {
        orderSummary += `- ${item.name} (Qty: ${item.quantity}) - ₹${
          item.price * item.quantity
        }\n`;
      });

      // Create the message with order summary and payment details

      const message = `🚨 Your order is ready for payment! 🚨\n\n Hey there! 👋\n\nThank you for shopping with us! Here’s a summary of your order:\n\n${orderSummary}\n\n💰 **Total Price:** ₹${this.totalAmount.toFixed(
        2
      )}\n\nTo complete your purchase, please tap the link below to pay via PhonePe:\n\n[Pay Now]\n(upi://pay?pa=${upiId}&pn=MyShop&am=${this.totalAmount.toFixed(
        2
      )})`;

      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

      // Open WhatsApp with the message
      window.open(whatsappUrl, "_blank");
    },

    // Load cart from localStorage
    loadCart() {
      const cartFromStorage = localStorage.getItem("cart");
      if (cartFromStorage) {
        this.cart = JSON.parse(cartFromStorage);
        console.log(cartFromStorage);
      }
    },
    removeFromCart(item) {
      const index = this.cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
        this.saveCartToLocalStorage();
      }
      this.$bvToast.toast(`${item.name} removed from the cart!`, {
        title: "Item Removed",
        variant: "danger",
        autoHideDelay: 2000, // Auto hide after 2 seconds
        solid: true,
        toaster: "b-toaster-bottom-center",
      });
    },
    // Calculate the total price of a single item (without discount)
    calculateItemTotal(item) {
      return item.quantity * item.price;
    },
    // Proceed to checkout (you can replace this with actual payment processing)
  },
  mounted() {
    this.loadCart(); // Load the cart when the component is mounted
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
