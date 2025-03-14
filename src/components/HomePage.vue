<template>
  <div class="hero-section">
    <b-container fluid class="hero-container p-0">
      <!-- Animated background elements -->
      <div class="animated-bg">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
      </div>

      <b-row class="mx-0">
        <!-- Image Column -->
        <b-col
          md="6"
          class="d-flex justify-content-center align-items-center p-4 p-md-5"
        >
          <div class="image-container">
            <b-img
              :src="require('@/assets/shopping.png')"
              alt="PrimeBazzar"
              class="hero-image"
            ></b-img>
            <div class="floating-badge badge-discount">
              <span class="badge-text">UP TO</span>
              <span class="badge-value">50% OFF</span>
            </div>
            <div class="floating-badge badge-new">
              <span class="badge-text">NEW</span>
              <span class="badge-value">ARRIVALS</span>
            </div>
          </div>
        </b-col>

        <!-- Content Column -->
        <b-col md="6" class="content-col d-flex align-items-center p-4 p-md-5">
          <div class="hero-content">
            <div class="subtitle mb-2">PREMIUM SHOPPING EXPERIENCE</div>
            <h1 class="hero-title mb-3">
              Discover Your Style at <span class="highlight">PrimeBazzar</span>
            </h1>
            <p class="hero-description mb-4">
              Explore our curated collection of trending products, exclusive
              deals, and premium items that match your unique style. Shop with
              confidence and enjoy fast delivery.
            </p>

            <div class="cta-container">
              <b-button
                to="/all-categories"
                variant="primary"
                size="lg"
                class="cta-button mr-3"
              >
                Shop Now <i class="fas fa-arrow-right ml-2"></i>
              </b-button>
              <b-button
                variant="outline-light"
                size="lg"
                class="cta-button-secondary"
                to="/all-categories"
              >
                View Collections
              </b-button>
            </div>

            <div class="features-container mt-5">
              <div class="feature-item">
                <i class="fas fa-shipping-fast feature-icon"></i>
                <span>Free Shipping</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-undo feature-icon"></i>
                <span>Easy Returns</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-shield-alt feature-icon"></i>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-container {
  background: linear-gradient(135deg, #0b192c 0%, #1a365d 100%);
  min-height: 700px;
  position: relative;
}

/* Animated background */
.animated-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
}

.circle-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  right: -100px;
  animation: float 15s infinite ease-in-out;
}

.circle-2 {
  width: 300px;
  height: 300px;
  bottom: -50px;
  left: -50px;
  animation: float 20s infinite ease-in-out reverse;
}

.circle-3 {
  width: 200px;
  height: 200px;
  top: 50%;
  right: 10%;
  animation: float 25s infinite ease-in-out;
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(30px, 30px) rotate(5deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

/* Image styling */
.image-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  animation: fadeInUp 1s ease-out;
}

.hero-image {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
  transition: transform 0.5s ease;
}

.image-container:hover .hero-image {
  transform: translateY(-10px);
}

/* Floating badges */
.floating-badge {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  animation: pulse 2s infinite;
}

.badge-discount {
  background: linear-gradient(135deg, #ff4e50 0%, #f9d423 100%);
  width: 100px;
  height: 100px;
  top: 10%;
  right: 0;
}

.badge-new {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  width: 90px;
  height: 90px;
  bottom: 15%;
  left: 0;
}

.badge-text {
  font-size: 0.6rem;
  opacity: 0.9;
}

.badge-value {
  font-size: 1rem;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Content styling */
.content-col {
  position: relative;
  z-index: 2;
}

.hero-content {
  max-width: 600px;
  animation: fadeInRight 1s ease-out;
}

.subtitle {
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 2px;
  color: #4facfe;
  position: relative;
  display: inline-block;
}

.subtitle:after {
  content: "";
  position: absolute;
  width: 50px;
  height: 2px;
  background-color: #4facfe;
  left: 100%;
  top: 50%;
  margin-left: 10px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  line-height: 1.2;
}

.highlight {
  position: relative;
  color: #4facfe;
  z-index: 1;
}

.highlight:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 30%;
  background-color: rgba(79, 172, 254, 0.2);
  bottom: 0;
  left: 0;
  z-index: -1;
}

.hero-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

/* CTA buttons */
.cta-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.cta-button {
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 5px 15px rgba(79, 172, 254, 0.4);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(79, 172, 254, 0.6);
}

.cta-button-secondary {
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.cta-button-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

/* Features section */
.features-container {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.feature-icon {
  margin-right: 8px;
  color: #4facfe;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive adjustments */
@media (max-width: 767.98px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .features-container {
    gap: 15px;
  }

  .floating-badge {
    transform: scale(0.8);
  }

  .badge-discount {
    top: 5%;
    right: -10px;
  }

  .badge-new {
    bottom: 10%;
    left: -10px;
  }
}
</style>
