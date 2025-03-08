<template>
  <div>
    <b-container>
      <h2 class="my-4">Checkout</h2>
      <b-row>
        <b-col md="8">
          <!-- Address Add List -->
          <b-card no-body class="p-2 shadow-sm border rounded-lg mb-2">
            <h3 class="text-muted font-weight-bold">
              <b-button
                variant="link"
                class="p-2 text-dark d-flex justify-content-between w-100 border-0"
                @click="toggleAddressForm"
              >
                <span>{{ savedAddress ? "Edit Address" : "Add Address" }}</span>
                <b-icon
                  :icon="isAddressOpen ? 'chevron-up' : 'chevron-down'"
                ></b-icon>
              </b-button>
            </h3>
            <b-alert v-if="savedAddress" variant="info" show class="mb-2">
              <strong>Deliver to:</strong> {{ userName }} - {{ savedAddress }}
            </b-alert>
            <b-collapse v-model="isAddressOpen" class="p-2">
              <div class="my-2 text-h6">Delivery Address</div>
              <b-row class="align-items-center">
                <b-col md="8">
                  <b-form-group class="mb-0">
                    <b-form-input
                      v-model="address"
                      placeholder="Enter your full address"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md="4" class="text-right">
                  <b-button variant="primary" @click="saveAddress"
                    >Save Address</b-button
                  >
                </b-col>
              </b-row>
            </b-collapse>
          </b-card>

          <!-- Cart Items List -->
          <div v-if="cart.length">
            <b-card
              v-for="(cartItem, idx) in cart"
              :key="idx"
              class="mb-2 shadow-sm border-secondary"
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
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <h5 class="mb-2">{{ cartItem.name }}</h5>

                    <!-- Remove button -->
                    <!-- <b-button
                      variant="outline-danger"
                      size="sm"
                      @click="removeFromCart(cartItem)"
                      class="ml-2"
                      v-b-tooltip.hover.bottom="'Remove item'"
                    >
                      <b-icon icon="trash"></b-icon>
                    </b-button> -->
                  </div>

                  <small class="text-muted">Qty: {{ cartItem.quantity }}</small>
                  <p
                    class="mb-0 d-flex justify-content-between font-weight-bold"
                  >
                    <span class="text-primary">
                      Price: ₹{{ cartItem.price }}
                    </span>
                    <span class="text-success">
                      Total: ₹{{
                        (cartItem.price * cartItem.quantity).toFixed(2)
                      }}
                    </span>
                  </p>
                </div>
              </div>
            </b-card>
          </div>

          <!-- Empty Cart Message -->
          <b-card v-else class="text-center py-5 shadow-sm border-light">
            <b-icon
              icon="cart"
              variant="muted"
              font-scale="2"
              class="mb-3"
            ></b-icon>
            <h4 class="text-muted mb-2">Your cart is empty</h4>
            <p class="text-muted">
              Looks like you haven't added anything yet. Start shopping now!
            </p>
          </b-card>
        </b-col>
        <b-col md="4">
          <div>
            <!-- Total Summary -->
            <b-card class="shadow-sm border-primary">
              <div class="d-flex justify-content-between">
                <h5 class="font-weight-bold">Total Items:</h5>
                <h5 class="font-weight-bold">{{ totalItems }}</h5>
              </div>

              <div class="d-flex justify-content-between">
                <h5 class="font-weight-bold text-success">Total Amount:</h5>
                <h5 class="font-weight-bold text-success">
                  ₹ {{ totalAmount }}
                </h5>
              </div>

              <div class="d-flex justify-content-between">
                <h6 class="font-weight-bold text-danger">You saved:</h6>
                <h6 class="font-weight-bold text-danger">
                  ₹ {{ totalSavings }}
                </h6>
              </div>
            </b-card>

            <!-- Checkout Button -->
            <b-button
              class="mt-4"
              block
              variant="success"
              @click="sendWhatsApp"
            >
              Proceed to Payment
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
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
      address: "",
      isAddressOpen: false,
      savedAddress: "",
      userName: "",
    };
  },
  mounted() {
    this.loadCart(); // Load cart on mount

    // Get checkout details from URL query params
    this.totalAmount = parseFloat(this.$route.query.totalAmount) || 0;
    this.totalItems = parseInt(this.$route.query.totalItems) || 0;
    this.totalSavings = parseFloat(this.$route.query.totalSavings) || 0;

    this.loadAddress(); // Load saved address on page load
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

    // Get address
    toggleAddressForm() {
      this.isAddressOpen = !this.isAddressOpen;
    },
    removeFocus() {
      this.$nextTick(() => {
        if (this.$refs.toggleButton) {
          this.$refs.toggleButton.blur();
        }
      });
    },
    saveAddress() {
      if (!this.address.trim()) {
        this.$bvToast.toast("Please enter a valid address!", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000,
        });
        return;
      }

      // Get existing userData or initialize empty object
      let userData = JSON.parse(localStorage.getItem("userData")) || {};

      // Update or add the address field
      userData.address = this.address;

      // Save updated data back to localStorage
      localStorage.setItem("userData", JSON.stringify(userData));

      // Update savedAddress for display
      this.loadAddress();

      // Show success toast notification
      this.$bvToast.toast("Address saved successfully!", {
        title: "Success",
        variant: "success",
        solid: true,
        autoHideDelay: 3000,
      });

      // Clear input field & close form
      this.address = "";
      this.isAddressOpen = false;
    },

    loadAddress() {
      try {
        // Fetch address from localStorage safely
        let userData = JSON.parse(localStorage.getItem("userData") || "{}");
        this.savedAddress = userData.address || "";
        this.userName = userData.name || "";
      } catch (error) {
        console.error("Error loading address:", error);
      }
    },
  },
};
</script>

<style scoped></style>
