<!-- NotFound.vue -->
<template>
  <div class="text-center 100vh my-5">
    <b-container>
      <!-- <b-icon
        icon="emoji-frown"
        variant="danger"
        font-scale="4"
        class="mb-3"
      ></b-icon> -->
      <b-img
        src="https://img.freepik.com/free-vector/404-concept-illustration_114360-26118.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid"
        width="280"
        height="240"
      ></b-img>

      <h2>Oops! Page Not Found</h2>
      <p class="lead mb-4">
        The page you're looking for might have been removed or doesn't exist.
      </p>
      <div>
        <b-button variant="primary" @click="goBack" class="mr-2"
          >Go Back</b-button
        >
        <b-button variant="secondary" href="/">Home</b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      window.history.back();
    },
  },
};
</script>
