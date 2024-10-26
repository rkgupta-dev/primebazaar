<template>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-container>
            <b-navbar-brand href="#">PrimeBazaar</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/dealsoftheday">Deals of the day</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item>
                        <b-button variant="outline-light" size="sm" @click="$bvModal.show('bv-modal-example')">
                            <i class="fas fa-shopping-cart d-none d-md-inline"></i>
                            <span class=""> My Cart ({{ cart.length }})</span>
                        </b-button>
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
    <div class="d-flex justify-content-center">

        <b-card title="Add New Item" class="mb-4">
            <b-form @submit.prevent="addItem">
                <b-row>
                    <!-- Item Name -->
                    <b-col cols="12" lg="6" sm="12">
                        <b-form-group label="Item Name" label-for="item-name">
                            <b-form-input id="item-name" v-model="item.name" placeholder="Enter item name"
                                required></b-form-input>
                        </b-form-group>
                    </b-col>

                    <!-- Price -->
                    <b-col cols="12" lg="6" sm="12">
                        <b-form-group label="Price (₹)" label-for="item-price">
                            <b-form-input id="item-price" v-model="item.price" type="number" min="0"
                                placeholder="Enter price" required></b-form-input>
                        </b-form-group>
                    </b-col>

                    <!-- Discount -->
                    <b-col cols="12" lg="6" sm="12">
                        <b-form-group label="Discount (%)" label-for="item-discount">
                            <b-form-input id="item-discount" v-model="item.discount" type="number" min="0" max="100"
                                placeholder="Enter discount percentage"></b-form-input>
                        </b-form-group>
                    </b-col>



                    <!-- Rating -->
                    <b-col cols="12" lg="6" sm="12">
                        <b-form-group label="Rating" label-for="item-rating">
                            <b-form-input id="item-rating" v-model="item.rating" type="number" min="0" max="5"
                                step="0.1" placeholder="Enter rating out of 5"></b-form-input>
                        </b-form-group>
                    </b-col>

                    <!-- Description -->
                    <b-col cols="12" lg="6" sm="12">
                        <b-form-group label="Description" label-for="item-description">
                            <b-form-textarea id="item-description" v-model="item.description"
                                placeholder="Enter item description" rows="3"></b-form-textarea>
                        </b-form-group>
                    </b-col>

                    <!-- Image URL -->
                    <b-col cols="12" lg="6" sm="12">
                        <b-form-group label="Image URL" label-for="item-img">
                            <b-form-input id="item-img" v-model="item.img" placeholder="Enter image URL"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <!-- Submit Button -->
                <b-button type="submit" variant="primary" block>
                    Add Item
                </b-button>
            </b-form>
        </b-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            item: {
                name: "",
                price: "",
                discount: "",
                description: "",
                rating: "",
                img: "",
            },
        };
    },
    methods: {
        addItem() {
            // Code to handle item addition, e.g., sending to backend or storing in a list
            console.log("Item added:", this.item);
            this.resetForm();
        },
        resetForm() {
            // Reset form fields after submission
            this.item = {
                name: "",
                price: 0,
                discount: 0,
                description: "",
                rating: 0,
                img: "",
            };
        },
    },
};
</script>

<style scoped>
/* Optional styling for the admin page */
</style>