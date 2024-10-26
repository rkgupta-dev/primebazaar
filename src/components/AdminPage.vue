<template>
  <div>
    <!-- Navbar -->
    <b-navbar toggleable="lg" type="dark" variant="primary" class="mb-4">
      <b-navbar-brand href="#">PrimeBazaar</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#">Admin Panel</b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <!-- Main Content -->
    <b-container>
      <b-card title="Add New Item" class="mb-4">
        <b-form @submit.prevent="addItem">
          <b-row>
            <!-- Category Selection -->
            <b-col cols="12" lg="6" sm="12">
              <b-form-group label="Category" label-for="item-category">
                <b-form-select
                  id="item-category"
                  v-model="item.category"
                  :options="categories"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>

            <!-- Item Name -->
            <b-col cols="12" lg="6" sm="12">
              <b-form-group label="Item Name" label-for="item-name">
                <b-form-input
                  id="item-name"
                  v-model="item.name"
                  placeholder="Enter item name"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Price -->
            <b-col cols="12" lg="6" sm="12">
              <b-form-group label="Price (₹)" label-for="item-price">
                <b-form-input
                  id="item-price"
                  v-model.number="item.price"
                  type="number"
                  min="0"
                  placeholder="Enter price"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Discount -->
            <b-col cols="12" lg="6" sm="12">
              <b-form-group label="Discount (%)" label-for="item-discount">
                <b-form-input
                  id="item-discount"
                  v-model.number="item.discount"
                  type="number"
                  min="0"
                  max="50"
                  placeholder="Enter discount percentage"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Rating -->
            <b-col cols="12" lg="6" sm="12">
              <b-form-group label="Rating" label-for="item-rating">
                <b-form-input
                  id="item-rating"
                  v-model.number="item.rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="Enter rating out of 5"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Image URL -->
            <b-col cols="12" lg="6" sm="12">
              <b-form-group label="Image URL" label-for="item-img">
                <b-form-input
                  id="item-img"
                  v-model="item.img"
                  placeholder="Enter image URL"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Description -->
            <b-col cols="12" lg="6" sm="12">
              <b-form-group label="Description" label-for="item-description">
                <b-form-textarea
                  id="item-description"
                  v-model="item.description"
                  placeholder="Enter item description"
                  rows="2"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>

          <!-- Submit Button -->
          <b-button type="submit" variant="primary" block>Add Item</b-button>
        </b-form>
      </b-card>

      <!-- Display Added Items -->
      <h2>Added Items</h2>
      <b-row>
        <b-col
          v-for="(item, index) in items"
          :key="index"
          cols="12"
          md="6"
          lg="3"
          class="my-4"
        >
          <b-card
            :title="item.name"
            :img-src="item.img"
            img-alt="Product image"
            img-top
            class="custom-card shadow-sm"
          >
            <b-button
              @click="removeItem(index)"
              variant="danger"
              size="sm"
              class="position-absolute"
              style="top: 5px; right: 5px"
            >
              ✕
            </b-button>
            <b-card-text>
              <p class="d-flex align-items-center">
                <strong class="text-primary h5">₹{{ item.price }}</strong>
                <b-badge class="ml-2 py-1 px-2" variant="success" pill>
                  {{ item.discount }}% off
                </b-badge>
              </p>
              <p class="text-muted text-truncate">{{ item.description }}</p>

              <!-- Rating of product -->
              <div class="rating d-flex mb-2">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="star"
                  :class="{
                    'text-warning': star <= item.rating,
                    'text-secondary': star > item.rating,
                  }"
                >
                  ★
                </span>
                <small class="ml-2 text-muted">{{ item.rating }} / 5</small>
              </div>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {
        category: "",
        name: "",
        price: null, // Use null for number fields
        discount: null, // Use null for number fields
        description: "",
        rating: null, // Use null for number fields
        img: "",
      },
      items: [],
      categories: [
        { value: null, text: "Select Category" },
        { value: "Electronics", text: "Electronics" },
        { value: "Fashion", text: "Fashion" },
        { value: "HomeLiving", text: "Home Living" },
      ],
    };
  },
  mounted() {
    // Load items from localStorage on component mount
    this.items = JSON.parse(localStorage.getItem("items")) || [];
  },
  methods: {
    addItem() {
      // Validate form before adding item
      if (!this.item.category || !this.item.name || !this.item.price) {
        this.$bvToast.toast(`Please fill in all required fields.`, {
          title: "Warning",
          variant: "warning",
          solid: true,
          autoHideDelay: 3000,
          toaster: "b-toaster-bottom-center",
        });
        return;
      }

      // Retrieve existing items from localStorage, or initialize with an empty array
      let items = JSON.parse(localStorage.getItem("items")) || [];

      // Add the new item to the array
      items.push({ ...this.item });

      // Save the updated array back to localStorage
      localStorage.setItem("items", JSON.stringify(items));

      // Update local items array to re-render the added items in the UI
      this.items = items;

      // Show toast notification for success
      this.$bvToast.toast(
        `Added "${this.item.name}" with price ₹${this.item.price} successfully!`,
        {
          title: "Success",
          variant: "success",
          solid: true,
          autoHideDelay: 3000,
          toaster: "b-toaster-bottom-center",
        }
      );

      // Reset form after submission
      this.resetForm();
    },
    removeItem(index) {
      const removedItem = this.items[index].name; // Capture item name for notification
      // Remove item from the items array
      this.items.splice(index, 1);

      // Update localStorage with the new items array
      localStorage.setItem("items", JSON.stringify(this.items));

      // Show toast notification for removal
      this.$bvToast.toast(`Removed "${removedItem}" successfully!`, {
        title: "Removed",
        variant: "danger",
        solid: true,
        autoHideDelay: 3000,
        toaster: "b-toaster-bottom-center",
      });
    },
    resetForm() {
      // Reset form fields after submission
      this.item = {
        category: "",
        name: "",
        price: null,
        discount: null,
        description: "",
        rating: null,
        img: "",
      };
    },
  },
};
</script>

<style scoped>
.custom-card img {
  width: 100px;
  height: 100px;
  margin-left: 40px;
}
</style>
