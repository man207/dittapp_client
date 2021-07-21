import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../components/auth/axios-auth'

import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
    day: null,
    consume: null,
    burn:null
  },
  mutations: {
    authUser (state, userData) {
      state.token = userData.token
      state.userId = userData.userId
    },
    clearAuthData (state) {
      state.token = null
      state.userId = null
    },
    changeDay (state , day) {
      state.day = day.day.replaceAll('/','-')
    },
    changeConsume (state , consume) {
      state.consume = consume.consume.consume
    },
    changeburn (state , burn) {
      state.burn = burn.burn.burn
    }
  },
  actions: {
    setLogoutTimer ({commit}, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    login ({commit, dispatch}, authData) {
      axios.post('/login', {
        email: authData.email,
        password: authData.password,
      })
        .then(res => {
          console.log(res)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          if (authData.rememberMe) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userId', res.data.userId)
            localStorage.setItem('expirationDate', expirationDate)
          }

          commit('authUser', {
            token: res.data.token,
            userId: res.data.userId
          })
          dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(error => console.log(error))
    },
    tryAutoLogin ({commit}) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
    },
    logout ({commit}) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      router.replace('/signin')
    },
    setDay({commit} , day) {
      commit('changeDay', {
        day
      })
    },
    setConsume({commit} , consume ) {
      commit('changeConsume', {
        consume:consume
      })
    },
    setBurn({commit} , burn ) {
      commit('changeBurn', {
        burn:burn
      })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    token (state) {
      return state.token
    },
    isAuthenticated (state) {
      return state.token !== null
    },
    day (state) {
      return state.day
    },
    consume (state) {
      return state.consume
    },
    burn (state) {
      return state.burn
    },
  }
})