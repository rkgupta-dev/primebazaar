<template>
  <b-container class="my-4">
    <b-row>
      <b-col>
        <h1 class="text-center mb-4">Frequently Asked Questions (FAQs)</h1>
        <p class="lead text-center">
          Got questions? We have answers! Browse our most common FAQs below.
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
        :img-src="require('@/assets/faq.png')"
      ></b-carousel-slide>
    </b-carousel>

    <b-row class="justify-content-center">
      <b-col cols="12" md="10">
        <!-- Search Bar -->
        <b-input-group class="mb-3">
          <b-form-input
            v-model="searchQuery"
            placeholder="Search FAQs..."
          ></b-form-input>
          <b-input-group-append> </b-input-group-append>
        </b-input-group>
        <!-- Conditional rendering for "Not Found" message -->
        <div v-if="filteredFAQs.length === 0" class="not-found-container">
          <p class="not-found-message">No FAQs match your search query.</p>
        </div>
        <div v-else>
          <b-card
            v-for="(faq, index) in filteredFAQs"
            :key="index"
            class="mb-3 shadow-sm"
          >
            <b-button
              :id="'question-' + index"
              v-b-toggle="'collapse-' + index"
              variant="light"
              class="w-100 text-left d-flex justify-content-between align-items-center"
              aria-controls="'collapse-' + index"
              aria-expanded="false"
              @click="toggleIcon(index)"
            >
              <span>{{ faq.question }}</span>
              <b-icon
                :icon="faq.isOpen ? 'dash' : 'plus'"
                class="ml-2"
              ></b-icon>
            </b-button>

            <b-collapse :id="'collapse-' + index" accordion="faq-accordion">
              <b-card-body class="p-2" style="font-size: small">
                {{ faq.answer }}
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "FaqsPage",
  data() {
    return {
      searchQuery: "",
      // Array of FAQs
      FAQs: [
        {
          question: "What is the purpose of PrimeBazaar?",
          answer:
            "PrimeBazaar is an online shopping platform offering a wide variety of products including electronics, fashion, and home & living items. We provide the best prices and deals for our customers.",
          isOpen: false,
        },
        {
          question: "How can I track my order?",
          answer:
            "Once your order is shipped, you will receive an email with tracking information. You can also track your order from your PrimeBazaar account under 'My Orders'.",
          isOpen: false,
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit and debit cards, as well as online payment systems like PayPal. We also offer Cash on Delivery (COD) for certain regions.",
          isOpen: false,
        },
        {
          question: "How do I return an item?",
          answer:
            "You can initiate a return request through your PrimeBazaar account or by contacting our customer service team. Returns are accepted within 30 days of purchase, provided the item is unused and in its original packaging.",
          isOpen: false,
        },
        {
          question: "Do you offer international shipping?",
          answer:
            "Yes, PrimeBazaar offers international shipping to select countries. Shipping charges and delivery times vary based on the destination.",
          isOpen: false,
        },
        {
          question: "How can I contact customer support?",
          answer:
            "You can reach our customer support team by emailing support@primebazaar.com or by visiting our Contact Us page for more options.",
          isOpen: false,
        },
      ],
    };
  },
  computed: {
    filteredFAQs() {
      if (this.searchQuery.trim() === "") {
        return this.FAQs;
      }
      const query = this.searchQuery.toLowerCase();
      return this.FAQs.filter((faq) =>
        faq.question.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    toggleIcon(index) {
      // Toggle the isOpen property for the clicked item
      this.FAQs[index].isOpen = !this.FAQs[index].isOpen;
      // Close other items
      this.FAQs.forEach((faq, idx) => {
        if (idx !== index) {
          faq.isOpen = false;
        }
      });
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
