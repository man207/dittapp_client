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
      {path: '', component: SettingsWelcome , meta: {name: 'تنظیمات'}},
      {path: 'changepassword', component: ChangePassword , meta: {name: 'تغییر رمز'}},
      {path: 'editbiometric', component: EditBiometric , meta: {name: 'تغییر اطلاعات جسمی'}},
      {path: 'themes', component: ThemeSelect , meta: {name: 'تم‌ها'}},
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
      {path: '', component: FoodWelcome , meta: {name: 'غذاها'}},
      {path: 'addfood', component: AddFood , meta: {name: 'اضافه کرن غذا'}},
      {path: 'myfoods', component: MyFoods , meta: {name: 'غذاهای من'}},
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
      {path: '', component: ActivityWelcome , meta: {name: 'فعالیت‌ها'}},
      {path: 'addactivity', component: AddActivity , meta: {name: 'اضافه کردن فعالیت'}},
      {path: 'myactivities', component: MyActivities , meta: {name: 'فعالیت‌های من'}},
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
