import { createRouter, createWebHistory } from 'vue-router';
import BrowseMoviesPage from '../pages/BrowseMoviesPage.vue';
import UserDetailsPage from '../pages/UserDetailsPage.vue';
import MovieDetailsPage from "../pages/MovieDetailsPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import PageNotFound from "../pages/PageNotFound.vue";
import CreateMoviePage from "../pages/CreateMoviePage.vue";
import EditMoviePage from "../pages/EditMoviePage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage.vue";
import TermsAndConditionsPage from "../pages/TermsAndConditionsPage.vue";
import AboutUsPage from "../pages/AboutUsPage.vue";
import EditUserPage from "../pages/EditUserPage.vue";
import AdminActionsPage from "../pages/AdminActionsPage.vue";
import CreateBranchPage from "../pages/CreateBranchPage.vue";
import CreateTheaterPage from "../pages/CreateTheaterPage.vue";
import CreateSeatPage from "../pages/CreateSeatPage.vue";
import CartPage from '../pages/CartPage.vue';
import CheckoutPage from '../pages/CheckoutPage.vue';
import {ref} from "vue";



//Renders page components when user navigates
const routes = [
    { path: '/', name: 'BrowseMovies', component: BrowseMoviesPage },
    { path: '/movies', name: 'BrowseMoviesPage', component: BrowseMoviesPage },
    { path: "/profile/edit", name: "EditProfilePage", component: EditUserPage },
    { path: '/user-details', name: 'UserDetailsPage', component: UserDetailsPage },
    { path: '/movie/:id', name: 'MovieDetailsPage', component: MovieDetailsPage},
    {path: '/login', name: "LoginPage", component: LoginPage},
    {path: '/movie/create', name: "CreateMoviePage", component: CreateMoviePage},
    {path: '/movie/edit/:id', name: "EditMoviePage", component: EditMoviePage},
    {path: '/branch/create', name: "CreateBranchPage", component: CreateBranchPage},
    {path: '/theater/create', name: "CreateTheaterPage", component: CreateTheaterPage},
    {path: '/seat/create', name: "CreateSeatPage", component: CreateSeatPage},
    { path: '/signup', name: "SignUpPage", component: SignUpPage },
    { path: '/privacy-policy', name: "PrivacyPolicyPage", component: PrivacyPolicyPage },
    { path: '/terms-and-conditions', name: "TermsAndConditionsPage", component: TermsAndConditionsPage },
    {path: '/about-us',name:"AboutUsPage",component: AboutUsPage},
    {path: '/CRUD/:id',name:"AdminActionsPage",component: AdminActionsPage},
    {path: '/cart', name: "CartPage", component: CartPage},
    {path: '/checkout', name: "CheckoutPage", component: CheckoutPage},
    { path: '/:catchAll(.*)*', name: "PageNotFound", component: PageNotFound}, //This catches our error page not found

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    const authenticatedUserId = localStorage.getItem("authenticatedUserId");
    const isAdmin = ref(localStorage.getItem("isAdmin") === 'true');

    // Redirect to /movies if not authenticated
    if (!authenticatedUserId && to.path !== "/login" && to.path !== "/signup" && to.path !== "/privacy-policy" && to.path !== "/terms-and-conditions") {
        next("/login");
    }
    else if (!isAdmin.value && to.path.includes("/CRUD")) {
        next("/:catchAll(.*)*"); // redirect back
    }
    else {
        next();
    }
});

export default router;