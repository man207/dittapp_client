import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

import WelcomePage from '../components/welcome/welcome.vue'

import DashboardPage from '../components/dashboard/dashboard.vue'

import SignupPage from '../components/auth/signup.vue'
import SigninPage from '../components/auth/signin.vue'

import AddBiometric from '../components/firstTime/AddBiometric.vue'

import SettingsPage from '../components/settings/SettingsPage.vue'
import ChangePassword from '../components/settings/ChangePassword.vue'
import EditBiometric from '../components/settings/EditBiometric.vue'
import SettingsWelcome from '../components/settings/SettingsWelcome.vue'
import ThemeSelect from '../components/settings/ThemeSelect.vue'

import FoodPage from '../components/food/FoodPage.vue'
import AddFood from '../components/food/AddFood.vue'
import MyFoods from '../components/food/MyFoods.vue'
import FoodWelcome from '../components/food/FoodWelcome.vue'

import ActivityPage from '../components/activity/ActivityPage.vue'
import AddActivity from '../components/activity/AddActivity.vue'
import MyActivities from '../components/activity/MyActivities.vue'
import ActivityWelcome from '../components/activity/ActivityWelcome.vue'


Vue.use(VueRouter)

let isExpired = () => {
  const expirationDate = localStorage.getItem('expirationDate');
  const now = new Date();
  return now >= expirationDate;
}

const routes = [
  {
    path: '/',
    component: WelcomePage,
    beforeEnter(to, from, next) {
      if (localStorage.getItem('token') || store.state.token) {
        if (isExpired()) {
          next();
        }
        next('/dashboard');
      } else {
        next();
      }
    }
  },
  {
    path: '/signup', component: SignupPage, beforeEnter(to, from, next) {
      if (localStorage.getItem('token') || store.state.token) {
        if (isExpired()) {
          next();
        }
        next('/dashboard');
      } else {
        next();
      }
    }
  },
  {
    path: '/firsttime', component: AddBiometric, beforeEnter(to, from, next) {
      console.log(store.state.recommended)
      if (store.state.recommended) {
        next('/dashboard');
      } else {
        next();
      }
    }
  },
  {
    path: '/signin', component: SigninPage, beforeEnter(to, from, next) {
      if (localStorage.getItem('token') || store.state.token) {
        if (isExpired()) {
          next();
        }
        next('/dashboard');
      } else {
        next();
      }
    }
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    beforeEnter(to, from, next) {

      if (localStorage.getItem('token') || store.state.token) {
        if (isExpired()) {
          next('/signin');
        }
        next();
      } else {
        next('/signin');
      }
    }
  },
  {
    path: '/settings',
    component: SettingsPage,
    children: [
      {path: '', component: SettingsWelcome , meta: {name: '??????????????'}},
      {path: 'changepassword', component: ChangePassword , meta: {name: '?????????? ??????'}},
      {path: 'editbiometric', component: EditBiometric , meta: {name: '?????????? ?????????????? ????????'}},
      {path: 'themes', component: ThemeSelect , meta: {name: '???????????'}},
    ],
    beforeEnter(to, from, next) {

      if (localStorage.getItem('token') || store.state.token) {
        if (isExpired()) {
          next('/signin');
        }
        next();
      } else {
        next('/signin');
      }
    }
  },
  {
    path: '/foods',
    component: FoodPage,
    children: [
      {path: '', component: FoodWelcome , meta: {name: '??????????'}},
      {path: 'addfood', component: AddFood , meta: {name: '?????????? ?????? ??????'}},
      {path: 'myfoods', component: MyFoods , meta: {name: '???????????? ????'}},
    ],
    beforeEnter(to, from, next) {

      if (localStorage.getItem('token') || store.state.token) {
        if (isExpired()) {
          next('/signin');
        }
        next();
      } else {
        next('/signin');
      }
    }
  },
  {
    path: '/activity',
    component: ActivityPage,
    children: [
      {path: '', component: ActivityWelcome , meta: {name: '???????????????????'}},
      {path: 'addactivity', component: AddActivity , meta: {name: '?????????? ???????? ????????????'}},
      {path: 'myactivities', component: MyActivities , meta: {name: '????????????????????? ????'}},
    ],
    beforeEnter(to, from, next) {

      if (localStorage.getItem('token') || store.state.token) {
        if (isExpired()) {
          next('/signin');
        }
        next();
      } else {
        next('/signin');
      }
    }
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
