<template>
  <b-container class="my-4">
    <b-row>
      <b-col>
        <h1 class="text-center mb-4">Privacy Policy</h1>
        <p class="lead text-center">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information.
        </p>
        <hr />
      </b-col>
    </b-row>

    <!-- Introduction Section -->
    <b-row class="mt-4">
      <b-col>
        <h3>Introduction</h3>
        <p>
          At PrimeBazaar, we are committed to safeguarding your privacy and
          protecting your personal information. This policy describes the types
          of information we collect, how we use it, and the measures we take to
          ensure your data is secure.
        </p>
      </b-col>
    </b-row>

    <!-- Information Collection Section -->
    <b-row class="mt-4">
      <b-col>
        <h3>What Information We Collect</h3>
        <ul>
          <li>
            <strong>Personal Information:</strong> We collect personal details
            such as your name, email address, billing and shipping address, and
            payment information when you make a purchase or create an account.
          </li>
          <li>
            <strong>Non-Personal Information:</strong> We may collect
            non-personal data such as your IP address, browser type, and
            browsing behavior on our website to enhance your user experience.
          </li>
          <li>
            <strong>Cookies:</strong> We use cookies to improve site
            functionality and provide you with a personalized experience.
          </li>
        </ul>
      </b-col>
    </b-row>

    <!-- Use of Information Section -->
    <b-row class="mt-4">
      <b-col>
        <h3>How We Use Your Information</h3>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>To process your orders and provide customer service.</li>
          <li>To improve our website and services based on user behavior.</li>
          <li>
            To send you promotional emails and updates (with your consent).
          </li>
          <li>To comply with legal obligations.</li>
        </ul>
      </b-col>
    </b-row>

    <!-- Data Protection Section -->
    <b-row class="mt-4">
      <b-col>
        <h3>Data Protection and Security</h3>
        <p>
          PrimeBazaar takes the security of your personal information seriously.
          We implement appropriate technical and organizational measures to
          prevent unauthorized access, disclosure, alteration, or destruction of
          your data.
        </p>
        <p>
          We use encryption protocols for sensitive data like payment
          information, and access to your personal data is restricted to
          authorized personnel only.
        </p>
      </b-col>
    </b-row>

    <!-- Third Party Sharing Section -->
    <b-row class="mt-4">
      <b-col>
        <h3>Third-Party Sharing</h3>
        <p>
          We do not sell or share your personal information with third parties,
          except in the following situations:
        </p>
        <ul>
          <li>
            With service providers who help us operate our website and services
            (e.g., payment processors, shipping companies).
          </li>
          <li>
            When required by law or to protect the rights, property, or safety
            of PrimeBazaar or others.
          </li>
          <li>With your consent, for marketing or promotional purposes.</li>
        </ul>
      </b-col>
    </b-row>

    <!-- Your Rights Section -->
    <b-row class="mt-4">
      <b-col>
        <h3>Your Rights</h3>
        <p>
          You have the right to access, update, or delete your personal
          information at any time. You can also opt-out of receiving promotional
          emails by following the unsubscribe link in any email or contacting us
          directly.
        </p>
      </b-col>
    </b-row>

    <!-- Contact Section -->
    <b-row class="mt-5">
      <b-col>
        <h3>Contact Us</h3>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please feel free to reach out to us.
        </p>
        <b-button variant="primary" to="/contacts">Contact Us</b-button>
      </b-col>
    </b-row>

    <!-- Effective Date Section -->
    <b-row class="mt-5">
      <b-col>
        <p class="text-muted text-center">
          This Privacy Policy was last updated on October 11, 2024.
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Privacy-Policy",
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
