<!-- NotFound.vue -->
<template>
    <div class="text-center my-5">
      <b-icon icon="emoji-frown" variant="danger" font-scale="4" class="mb-3"></b-icon>
      <h1 class="display-8">Oops! Page Not Found</h1>
      <p class="lead mb-4">The page you're looking for might have been removed or doesn't exist.</p>
      <div>
        <b-button variant="primary" @click="goBack" class="mr-2">Go Back</b-button>
        <b-button variant="secondary" href="/">Home</b-button>
      </div>
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
  