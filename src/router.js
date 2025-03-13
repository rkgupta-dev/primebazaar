import Vue from "vue";
import Router from "vue-router";
import LandingPage from "./components/LandingPage.vue";
import DealsOfTheDay from "./components/DealsOfTheDay.vue";
import AboutPage from "./views/AboutPage.vue";
import ContactPage from "./views/ContactPage.vue";
import FaqPage from "./views/FaqPage.vue";
import ShippingReturns from "./views/ShippingReturns.vue";
import PrivacyPolicy from "./views/Privacy-Policy.vue";
import TermsCondition from "./views/TermsCondition.vue";
import CheckOut from "./components/CheckOut.vue";
import AdminPage from "./components/AdminPage.vue";
import SignUp from "./auth/SignUp.vue";
import LogIn from "./auth/LogIn.vue";
import PageNotFound from "./auth/error/PageNotFound.vue";
import BestSellerSection from "./views/BestSellerSection.vue";
import UserProfile from "./components/UserProfile.vue";
import ShopByCategory from "./views/ShopByCategory.vue";
import NewArrival from "./views/NewArrival.vue";
import SpecialOffer from "./views/SpecialOffer.vue";
import MensCollection from "./views/collections/MensCollection.vue";
import CartPage from "./views/CartPage.vue";
import WomenCollection from "./views/collections/WomenCollection.vue";
import AccessoriesCollection from "./views/collections/AccessoriesCollection.vue";
import FootwearCollection from "./views/collections/FootwearCollection.vue";
import ViewAllCategory from "./views/ViewAllCategory.vue";
import HomeAndKitchen from "./views/collections/HomeAndKitchen.vue";

Vue.use(Router);

const router = new Router({
  mode: "history", // Use 'history' mode to remove the hash from URLs and 'hash'
  routes: [
    { path: "/", name: "landing-page", component: LandingPage },
    {
      path: "/shop-by-category",
      name: "shop-by-category",
      component: ShopByCategory,
    },
    { path: "/best-seller", name: "best-seller", component: BestSellerSection },
    { path: "/new-arrival", name: "new-arrival", component: NewArrival },
    { path: "/special-offer", name: "special-offer", component: SpecialOffer },
    { path: "/dealsoftheday", name: "deals", component: DealsOfTheDay },
    {
      path: "/mens-collection",
      name: "mens-collection",
      component: MensCollection,
    },
    {
      path: "/womens-collection",
      name: "womens-collection",
      component: WomenCollection,
    },
    {
      path: "/accessories",
      name: "accessories",
      component: AccessoriesCollection,
    },
    {
      path: "/footwear",
      name: "footwear",
      component: FootwearCollection,
    },
    {
      path: "/home-&-kitchen",
      name: "home-&-kitchen",
      component: HomeAndKitchen,
    },
    {
      path: "/all-categories",
      name: "all-categories",
      component: ViewAllCategory,
    },

    // Protected Routes (Require Login)
    {
      path: "/profile",
      name: "user",
      component: UserProfile,
      meta: { requiresAuth: true },
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckOut,
      meta: { requiresAuth: true },
    },
    {
      path: "/cart",
      name: "cart",
      component: CartPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminPage,
      meta: { requiresAuth: true },
    },

    { path: "/signup", name: "signup", component: SignUp },
    { path: "/login", name: "login", component: LogIn },
    { path: "/about-us", name: "about", component: AboutPage },
    { path: "/contacts", name: "contact", component: ContactPage },
    { path: "/faqs", name: "faqs", component: FaqPage },
    {
      path: "/shipping-returns",
      name: "shipping & returns",
      component: ShippingReturns,
    },
    {
      path: "/privacy-policy",
      name: "privacy & policy",
      component: PrivacyPolicy,
    },
    {
      path: "/terms&condition",
      name: "terms & condition",
      component: TermsCondition,
    },
    { path: "*", component: PageNotFound }, // 404 Page
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }; // Scroll to top on navigation
  },
});

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("userData"); // Check if user is logged in
  if (to.matched.some((record) => record.meta.requiresAuth) && !user) {
    alert("You need to log in to access this page.");
    next("/login"); // Redirect to login if not authenticated
  } else {
    next();
  }
});

export default router;
