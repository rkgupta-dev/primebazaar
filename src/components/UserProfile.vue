<template>
  <div class="dashboard-container">
    <b-container fluid>
      <b-row>
        <!-- Sidebar -->
        <b-col cols="12" md="3" lg="2" class="sidebar py-4">
          <div class="user-profile text-center mb-4">
            <b-avatar
              size="5rem"
              src="/placeholder.svg?height=80&width=80"
              alt="User Avatar"
            ></b-avatar>
            <h5 class="mt-3 mb-0">John Doe</h5>
            <small class="text-muted">john.doe@example.com</small>
            <div class="mt-2">
              <b-button variant="outline-primary" size="sm"
                >Edit Profile</b-button
              >
            </div>
          </div>

          <b-nav vertical pills class="sidebar-nav">
            <b-nav-item active>
              <i class="fas fa-tachometer-alt mr-2"></i> Dashboard
            </b-nav-item>
            <b-nav-item>
              <i class="fas fa-shopping-cart mr-2"></i> Orders
            </b-nav-item>
            <b-nav-item>
              <i class="fas fa-heart mr-2"></i> Wishlist
            </b-nav-item>
            <b-nav-item>
              <i class="fas fa-map-marker-alt mr-2"></i> Addresses
            </b-nav-item>
            <b-nav-item>
              <i class="fas fa-credit-card mr-2"></i> Payment Methods
            </b-nav-item>
            <b-nav-item>
              <i class="fas fa-cog mr-2"></i> Account Settings
            </b-nav-item>
            <b-nav-item class="text-danger mt-4">
              <i class="fas fa-sign-out-alt mr-2"></i> Logout
            </b-nav-item>
          </b-nav>
        </b-col>

        <!-- Main Content -->
        <b-col cols="12" md="9" lg="10" class="main-content py-4">
          <!-- Stats Cards -->
          <b-row>
            <b-col cols="12" md="4" class="mb-4">
              <b-card class="h-100">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <div class="text-muted small">Total Orders</div>
                    <h3 class="mb-0">24</h3>
                    <div class="text-success small">
                      <i class="fas fa-arrow-up"></i> +12% from last month
                    </div>
                  </div>
                  <div>
                    <b-icon
                      icon="bag"
                      variant="primary"
                      font-scale="1.5"
                    ></b-icon>
                  </div>
                </div>
              </b-card>
            </b-col>

            <b-col cols="12" md="4" class="mb-4">
              <b-card class="h-100">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <div class="text-muted small">Total Spent</div>
                    <h3 class="mb-0">$1,248</h3>
                    <div class="text-success small">
                      <i class="fas fa-arrow-up"></i> +8% from last month
                    </div>
                  </div>
                  <div>
                    <b-icon
                      icon="cash"
                      variant="primary"
                      font-scale="1.5"
                    ></b-icon>
                  </div>
                </div>
              </b-card>
            </b-col>

            <b-col cols="12" md="4" class="mb-4">
              <b-card class="h-100">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <div class="text-muted small">Reward Points</div>
                    <h3 class="mb-0">840</h3>
                    <div>
                      <b-button variant="link" class="p-0 text-primary"
                        >Redeem Now</b-button
                      >
                    </div>
                  </div>
                  <div>
                    <b-icon
                      icon="gift"
                      variant="primary"
                      font-scale="1.5"
                    ></b-icon>
                  </div>
                </div>
              </b-card>
            </b-col>
          </b-row>

          <!-- Recent Orders -->
          <div class="mb-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="mb-0">Recent Orders</h5>
              <b-button variant="link" class="p-0">View All</b-button>
            </div>

            <b-table
              responsive
              :items="recentOrders"
              :fields="orderFields"
              class="border"
            >
              <template #cell(status)="data">
                <b-badge :variant="getStatusVariant(data.value)">{{
                  data.value
                }}</b-badge>
              </template>

              <template #cell(action)="">
                <b-button variant="link" size="sm" class="p-0 text-primary"
                  >View Details</b-button
                >
              </template>
            </b-table>
          </div>

          <!-- Recently Viewed -->
          <div>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="mb-0">Recently Viewed</h5>
              <b-button variant="link" class="p-0">View All</b-button>
            </div>

            <b-row>
              <b-col
                cols="12"
                md="4"
                v-for="(product, index) in recentlyViewed"
                :key="index"
                class="mb-4"
              >
                <b-card no-body class="h-100">
                  <b-card-img-lazy
                    :src="product.image"
                    :alt="product.name"
                    class="card-img-top p-4 bg-light"
                    height="200"
                  ></b-card-img-lazy>
                  <b-card-body>
                    <b-card-title class="h6">{{ product.name }}</b-card-title>
                    <b-card-text class="text-muted small">{{
                      product.color
                    }}</b-card-text>
                    <div class="font-weight-bold text-primary">
                      {{ product.price }}
                    </div>
                  </b-card-body>
                </b-card>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      orderFields: [
        { key: "orderId", label: "Order ID" },
        { key: "date", label: "Date" },
        { key: "status", label: "Status" },
        { key: "total", label: "Total" },
        { key: "action", label: "Action" },
      ],
      recentOrders: [
        {
          orderId: "#ORD-1234",
          date: "2024-02-15",
          status: "Delivered",
          total: "$249.99",
          action: "",
        },
        {
          orderId: "#ORD-1235",
          date: "2024-02-10",
          status: "In Transit",
          total: "$129.99",
          action: "",
        },
      ],
      recentlyViewed: [
        {
          name: "Wireless Headphones",
          color: "Black",
          price: "$159.99",
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          name: "Smart Watch",
          color: "Silver",
          price: "$299.99",
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          name: "Running Shoes",
          color: "Blue/White",
          price: "$89.99",
          image: "/placeholder.svg?height=200&width=200",
        },
      ],
    };
  },
  methods: {
    getStatusVariant(status) {
      const variants = {
        Delivered: "success",
        "In Transit": "warning",
        Processing: "info",
        Cancelled: "danger",
      };
      return variants[status] || "secondary";
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.sidebar {
  background-color: white;
  border-right: 1px solid #eee;
  min-height: 100vh;
}

.sidebar-nav .nav-link {
  color: #495057;
  border-radius: 0.25rem;
  margin-bottom: 0.25rem;
}

.sidebar-nav .nav-link.active {
  background-color: #e7f1ff;
  color: #0d6efd;
  font-weight: 500;
}

.main-content {
  background-color: #f8f9fa;
}

.card {
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border: none;
}

.text-success {
  color: #28a745 !important;
}

.badge-success {
  background-color: #d4edda;
  color: #155724;
}

.badge-warning {
  background-color: #fff3cd;
  color: #856404;
}

/* Responsive adjustments */
@media (max-width: 767.98px) {
  .sidebar {
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid #eee;
    margin-bottom: 1rem;
  }
}
</style>
