<template>
  <div class="checkout-container">
    <h2 class="text-center mb-4">Checkout</h2>

    <!-- Cart Items List -->
    <div v-if="cart.length">
      <b-card v-for="(cartItem, idx) in cart" :key="idx" class="mb-3">
        <div class="d-flex justify-content-between">
          <div>
            <h5>{{ cartItem.name }}</h5>
            <p>Qty: {{ cartItem.quantity }}</p>
            <p>Price: ₹{{ cartItem.price }}</p>
          </div>
          <div>
            <h6>Total: ₹{{ calculateItemTotal(cartItem).toFixed(2) }}</h6>
          </div>
        </div>
      </b-card>

      <!-- Total Amount -->
      <b-card class="text-right font-weight-bold">
        Total Amount: ₹{{ totalAmount.toFixed(2) }}
      </b-card>

      <!-- Checkout Button -->
      <b-button class="mt-4" block variant="success" @click="sendWhatsApp">
        Proceed to Payment
      </b-button>
    </div>

    <!-- No Items Message -->
    <p v-else class="text-center text-muted mt-3">
      Your cart is empty. Add some items to proceed.
    </p>
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
    const upiId = 'krrohit6@ybl';

    // Get total price from computed property
    const totalPrice = this.totalPrice; 

    // Check if totalPrice is valid
    if (totalPrice === 0) {
        alert("Your cart is empty. Please add items before proceeding.");
        return;
    }

    // Create an order summary
    let orderSummary = 'Order Summary:\n';
    this.cart.forEach(item => {
        orderSummary += `- ${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}\n`;
    });

    // Create the message with order summary and payment details
    
const message = `🚨 Your order is ready for payment! 🚨\n\n Hey there! 👋\n\nThank you for shopping with us! Here’s a summary of your order:\n\n${orderSummary}\n\n💰 **Total Price:** ₹${this.totalAmount.toFixed(2)}\n\nTo complete your purchase, please tap the link below to pay via PhonePe:\n\n[Pay Now]\n(upi://pay?pa=${upiId}&pn=MyShop&am=${this.totalAmount.toFixed(2)})`;

    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    // Open WhatsApp with the message
    window.open(whatsappUrl, '_blank');
},


    // Load cart from localStorage
    loadCart() {
      const cartFromStorage = localStorage.getItem("cart");
      if (cartFromStorage) {
        this.cart = JSON.parse(cartFromStorage);
      }
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
