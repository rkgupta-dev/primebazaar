import Vue from "vue";
import Router from "vue-router";
import LandingPage from "./components/LandingPage.vue";
import DealsOfTheDay from "./components/DealsOfTheDay.vue";
import AboutPage from "./views/AboutPage.vue";
import ContactPage from "./views/ContactPage.vue";

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
      path: "/about-primebazarr",
      name: "about",
      component: AboutPage,
    },
    {
      path: "/contacts",
      name: "about",
      component: ContactPage,
    },
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
