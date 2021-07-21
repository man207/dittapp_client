<template>
  <v-app>
    <app-header />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  import Header from './components/header/header.vue'
  export default {
    name: 'app',
    components: {
      'app-header': Header
    },
    created () {
      this.$store.dispatch('tryAutoLogin')
      let today = new Date();
      this.$store.dispatch('setDay' , `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`)
    }
  }
</script>

<style>

</style>