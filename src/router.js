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
import ElectronicsPage from "./components/ElectronicsPage.vue";
import CheckOut from "./components/CheckOut.vue";
import FashionPage from "./components/FashionPage.vue";
import HomeLivingPage from "./components/HomeLivingPage.vue";
import AdminPage from "./components/AdminPage.vue";
import SignUp from "./auth/SignUp.vue";
import LogIn from "./auth/LogIn.vue";
import PageNotFound from "./auth/error/PageNotFound.vue";

Vue.use(Router);

export default new Router({
  mode: "history", // Use 'history' mode to remove the hash from URLs
  routes: [
    {
      path: "/",
      name: "landing-page",
      component: LandingPage,
    },
    {
      path: "/dealsoftheday",
      name: "deals",
      component: DealsOfTheDay,
    },
    {
      path: "/electronics",
      name: "electronics",
      component: ElectronicsPage,
    },
    {
      path: "/fashions",
      name: "fashions",
      component: FashionPage,
    },
    {
      path: "/home&living",
      name: "home&living",
      component: HomeLivingPage,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckOut,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminPage,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
    {
      path: "/login",
      name: "login",
      component: LogIn,
    },
    {
      path: "/about-us",
      name: "about",
      component: AboutPage,
    },
    {
      path: "/contacts",
      name: "contact",
      component: ContactPage,
    },
    {
      path: "/faqs",
      name: "faqs",
      component: FaqPage,
    },
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
    { path: '*', component: PageNotFound }, // wildcard route for 404 page
  ],
  scrollBehavior(to, from, savedPosition) {
    // If there is a saved scroll position, return it (for navigating back)
    if (savedPosition) {
      return savedPosition;
    } else {
      // If not, scroll to the top
      return { x: 0, y: 0 };
    }
  },
});
