import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignUp.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/comments",
    name: "Comments",
    component: () =>
      import(/* webpackChunkName: "comments" */ "../views/Comments.vue")
  },
  {
    path: "/comments/:id",
    name: "Comment",
    component: () =>
      import(/* webpackChunkName: "comments" */ "../views/Comment.vue"),
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  routes: routes,
});

export default router;
