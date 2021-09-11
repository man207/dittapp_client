<template>
  <v-app>
    <app-header />
    <v-main :class="isWelcomePage ? `mello` : themeName">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/header/header.vue";
export default {
  name: "app",
  components: {
    "app-header": Header,
  },
  created() {
    this.$store.dispatch("tryAutoLogin");
    if (this.$store.state.token) {
      let today = new Date();
        this.$store.dispatch(
          "setDay",
          `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        );
      }
    this.$store.dispatch('setTheme' , localStorage.getItem('themeName'))
  },
  computed: {
    isWelcomePage() {
      let paths = ["/", "/signup", "/signin"];
      let x = paths.includes(this.$route.path);
      return x;
    },
    themeName() {
      return this.$store.state.theme
    }
  },
};
</script>

<style>
.mello {
  background: #c0392b; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #8e44ad,
    #c0392b
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #8e44ad,
    #c0392b
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.normalgrey {
  background: #414141;
}

.cinnamint {
  background: #4ac29a; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #bdfff3,
    #4ac29a
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #bdfff3,
    #4ac29a
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.shalala {
  background: #d66d75; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #e29587,
    #d66d75
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #e29587,
    #d66d75
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.celestial {
  background: #c33764; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #1d2671,
    #c33764
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #1d2671,
    #c33764
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.nepal {
  background: #de6161; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2657eb,
    #de6161
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2657eb,
    #de6161
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.royal {
  background: #141e30; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #243b55,
    #141e30
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #243b55,
    #141e30
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.v-btn {
  letter-spacing: 0px;
}
</style>