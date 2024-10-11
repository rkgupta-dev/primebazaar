<template>
  <b-container class="my-4">
    <b-row>
      <b-col>
        <h1 class="text-center mb-4">Shipping & Returns</h1>
        <p class="lead text-center">
          All the details you need about our shipping policies, delivery times,
          and how to handle returns.
        </p>
        <hr />
      </b-col>
    </b-row>

    <!-- Shipping Section -->
    <b-row class="mt-5">
      <b-col md="6">
        <h3>Shipping Information</h3>
        <p>
          At PrimeBazaar, we strive to deliver your order as quickly and safely
          as possible. Our shipping services include:
        </p>
        <ul>
          <li>
            <strong>Domestic Shipping:</strong> Free shipping on all domestic
            orders over $50. Delivery takes 3-5 business days.
          </li>
          <li>
            <strong>International Shipping:</strong> We ship worldwide! Shipping
            fees and delivery times vary based on your location.
          </li>
          <li>
            <strong>Expedited Shipping:</strong> If you need your items faster,
            we offer expedited shipping options for an additional fee.
          </li>
          <li>
            <strong>Order Processing:</strong> Orders are processed within 1-2
            business days after confirmation.
          </li>
        </ul>
      </b-col>

      <b-col md="6">
        <b-img
          :src="require('@/assets/shipping1.png')"
          alt="Shipping Image"
          fluid
        />
      </b-col>
    </b-row>

    <b-row class="mt-5">
      <b-col md="6">
        <h3>Returns & Exchanges</h3>
        <p>
          We understand that sometimes things don’t work out. If you need to
          return or exchange an item, here’s how it works:
        </p>
        <ul>
          <li>
            <strong>Return Window:</strong> You can return any items within 30
            days of purchase for a full refund or exchange.
          </li>
          <li>
            <strong>Condition of Items:</strong> All returned items must be in
            original, unused condition with packaging intact.
          </li>
          <li>
            <strong>Return Process:</strong> Simply visit our
            <b-link to="/contacts">Contact Us</b-link> page to initiate a
            return. You will receive instructions on how to ship the item back.
          </li>
          <li>
            <strong>Refunds:</strong> Refunds are issued to your original
            payment method once the return is processed.
          </li>
        </ul>
      </b-col>

      <b-col md="6">
        <b-img
          :src="require('@/assets/shipping2.png')"
          alt="Returns Image"
          fluid
        />
      </b-col>
    </b-row>

    <!-- Additional Information Section -->
    <b-row class="my-4">
      <b-col>
        <h3>Need More Information?</h3>
        <p>
          If you have further questions regarding shipping or returns, feel free
          to contact our customer service team. We are always happy to help!
        </p>
        <b-button variant="primary" to="/contacts">Contact Us</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "ShippingReturnsPage",
};
</script>

<style scoped>
h1 {
  font-weight: bold;
  color: #343a40;
}
h3 {
  color: #007bff;
}
.lead {
  font-size: 1.25rem;
}
ul {
  list-style-type: disc;
  margin-left: 20px;
}
b-img {
  border-radius: 8px;
}
</style>
