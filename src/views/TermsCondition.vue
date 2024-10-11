<template>
    <b-container class="my-4">
      <b-row>
        <b-col>
          <h1 class="text-center mb-4">Terms & Conditions</h1>
          <p class="lead text-center">
            Please read these Terms and Conditions carefully before using PrimeBazaar. By accessing or using our website, you agree to be bound by these terms.
          </p>
          <hr>
        </b-col>
      </b-row>
  
      <!-- Introduction Section -->
      <b-row class="mt-4">
        <b-col>
          <h3>Introduction</h3>
          <p>
            Welcome to PrimeBazaar! These Terms and Conditions outline the rules and regulations for using our website, located at www.primebazaar.com. By accessing this site, you agree to comply with these terms. If you disagree with any part of these terms, you must not use our services.
          </p>
        </b-col>
      </b-row>
  
      <!-- User Obligations Section -->
      <b-row class="mt-4">
        <b-col>
          <h3>User Obligations</h3>
          <p>As a user of PrimeBazaar, you agree to:</p>
          <ul>
            <li>Provide accurate, up-to-date information during account registration and at checkout.</li>
            <li>Use the site for lawful purposes and refrain from engaging in activities that violate any applicable laws or regulations.</li>
            <li>Respect the rights of other users and not engage in any behavior that is harmful, harassing, or disruptive to others.</li>
            <li>Keep your account credentials secure and not share them with others.</li>
          </ul>
        </b-col>
      </b-row>
  
      <!-- Purchases Section -->
      <b-row class="mt-4">
        <b-col>
          <h3>Purchases and Payment</h3>
          <p>
            When purchasing any products from PrimeBazaar, you agree to provide accurate payment and shipping information. Prices and availability of products are subject to change at any time without notice.
          </p>
          <ul>
            <li>We accept major credit cards, debit cards, and other forms of online payment as indicated during checkout.</li>
            <li>All transactions are processed securely, and we do not store your payment details on our servers.</li>
            <li>If a product is incorrectly priced, we reserve the right to cancel or refuse the order, even after confirmation.</li>
          </ul>
        </b-col>
      </b-row>
  
      <!-- Shipping and Returns Section -->
      <b-row class="mt-4">
        <b-col>
          <h3>Shipping and Returns</h3>
          <p>
            Please review our <b-link href="/shipping-returns">Shipping & Returns</b-link> page for detailed information on shipping, return policies, and procedures.
          </p>
        </b-col>
      </b-row>
  
      <!-- Intellectual Property Section -->
      <b-row class="mt-4">
        <b-col>
          <h3>Intellectual Property</h3>
          <p>
            All content published on PrimeBazaar, including text, graphics, logos, images, and software, is the property of PrimeBazaar or its licensors and is protected by copyright and trademark laws. You may not use or reproduce this content without our explicit permission.
          </p>
        </b-col>
      </b-row>
  
      <!-- Termination Section -->
      <b-row class="mt-4">
        <b-col>
          <h3>Termination</h3>
          <p>
            We reserve the right to terminate or suspend your access to PrimeBazaar without notice if we determine that you have violated these terms or engaged in unlawful activities. Upon termination, your right to use the website and its services will cease immediately.
          </p>
        </b-col>
      </b-row>
  
      <!-- Limitation of Liability Section -->
      <b-row class="mt-4">
        <b-col>
          <h3>Limitation of Liability</h3>
          <p>
            To the fullest extent permitted by law, PrimeBazaar will not be held liable for any indirect, incidental, or consequential damages resulting from the use of, or the inability to use, our website or services.
          </p>
          <p>
            We do not guarantee that our website will be available at all times, free from errors, or secure from unauthorized access.
          </p>
        </b-col>
      </b-row>
  
      <!-- Governing Law Section -->
      <b-row class="mt-4">
        <b-col>
          <h3>Governing Law</h3>
          <p>
            These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which PrimeBazaar operates. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.
          </p>
        </b-col>
      </b-row>
  
      <!-- Contact Section -->
      <b-row class="mt-5">
        <b-col>
          <h3>Contact Us</h3>
          <p>If you have any questions about these Terms and Conditions, please feel free to contact us.</p>
          <b-button variant="primary" to="/contacts">Contact Us</b-button>
        </b-col>
      </b-row>
  
      <!-- Last Updated Section -->
      <b-row class="mt-5">
        <b-col>
          <p class="text-muted text-center">These Terms and Conditions were last updated on October 11, 2024.</p>
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  export default {
    name: "TermsAndConditionsPage",
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
  </style>
  