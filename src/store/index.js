import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userId: '',
    day: null,
    consume: [],
    burn: [],
    weight: {},
    recommended: {},
    theme: ''
  },
  mutations: {
    authUser(state, userData) {
      state.token = userData.token
      state.userId = userData.userId

    },
    clearAuthData(state) {
      state.token = null
      state.userId = null
      state.recommended = {}
    },
    changeDay(state, day) {
      state.day = day.replaceAll('/', '-')
    },
    changeConsume(state, consume) {
      state.consume = consume
    },
    changeBurn(state, burn) {
      state.burn = burn
    },
    changeWeight(state, weight) {
      state.weight = weight
    },
    changeRecommended(state, recommended) {
      recommended.macroRatio = {
        fat: (recommended.fat * 9 / recommended.calorie),
        carb: (recommended.carb * 4 / recommended.calorie),
        protein: (recommended.protein * 4 / recommended.calorie)
      }

      state.recommended = recommended
    },
    changeTheme(state, theme) {

      state.theme = theme;
    }
  },
  actions: {
    setLogoutTimer({ commit }, expirationTime) {

      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    login({ commit, dispatch }, data) {

      commit('authUser', {
        token: data.token,
        userId: data.userId
      })

      dispatch('setLogoutTimer', data.expiresIn)

    },
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      const now = new Date()
      if (now >= expirationDate) {
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('themeName')
        commit('clearAuthData')
        router.go('/')
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
    },
    logout({ commit }) {
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('themeName')
      commit('clearAuthData')
      router.go('/')
    },
    setDay({ commit, dispatch }, day) {
      commit('changeDay',
        day
      )
      dispatch('setConsume')
      dispatch('setBurn')
      dispatch('setWeight')
      dispatch('setRecommended')

    },
    setConsume({ commit, state }) {
      const config = {
        headers: { Authorization: `Bearer ${state.token}` },
      };
      axios
        .get(`/profile/consume/day/${state.day}`, config)
        .then((res) => {
          let x = res.data.result;
          x.map(food => {
            let w = food.food;
            if (w.unit == 'gr') w.unit = '??????'
            if (w.unit == 'ml') w.unit = '???????? ????????'
          })
          commit('changeConsume', x)
        })
        .catch((err) => {
          console.log(err);
        });

    },
    setBurn({ commit, state }) {
      const config = {
        headers: { Authorization: `Bearer ${state.token}` },
      };
      axios
        .get(`/profile/burn/day/${state.day}`, config)
        .then((res) => {
          let x = res.data.result;
          commit('changeBurn', x);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setWeight({ commit, state }) {
      const config = {
        headers: { Authorization: `Bearer ${state.token}` },
      };
      axios
        .get(`/profile/weight/day/${state.day}`, config)
        .then((res) => {
          let x = res.data.result;
          commit('changeWeight', x);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setRecommended({ commit, state }) {
      const config = {
        headers: { Authorization: `Bearer ${state.token}` },
      };
      axios
        .get(`/profile/biometric/`, config)
        .then((res) => {
          let x = res.data.result;
          commit('changeRecommended', x);
        })
        .catch((err) => {
          if (err.response.status == 404) {
            router.replace('/firsttime')
          }
        });
    },
    setTheme({ commit }, themeName) {
      localStorage.setItem('themeName', themeName)
      commit('changeTheme', themeName)
    }
  },

  getters: {
    user(state) {
      return state.user
    },
    token(state) {
      return state.token
    },
    isAuthenticated(state) {
      return state.token.length > 0
    },
    day(state) {
      let x = state.day.replaceAll('-', '/')
      return new Date(x)
    },
    consume(state) {
      return state.consume
    },
    burn(state) {
      return state.burn
    },
    weight(state) {
      return state.weight
    },
  }
})