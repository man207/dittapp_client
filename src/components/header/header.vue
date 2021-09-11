<template>
  <div>
    <v-app-bar app :dark="theme" :color="theme ? `` : `white`" elevation="6" hide-on-scroll >
      <v-container class="py-0 fill-height">
        <v-app-bar-nav-icon @click="drawer = true" ></v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        <v-btn v-if="!auth" text :ripple="false" plain to="/signup">
          ثبت نام
        </v-btn>
        <v-btn v-if="!auth" text :ripple="false" plain to="/signin">
          ورود
        </v-btn>

        <button @click="onLogout" :ripple="false" plain v-if="auth">
          خروج
        </button>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" right app temporary :dark="theme"  >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="blue--text text--accent-2"
        >
          <v-list-item :to="auth ? `/dashboard` : `/`" >
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>صفحه اصلی</v-list-item-title>
          </v-list-item>



          <v-list-item v-if="auth" to="/settings">
            <v-list-item-icon >
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>تنظیمات</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="auth" to="/foods">
            <v-list-item-icon >
               <v-icon> mdi-food-fork-drink </v-icon>
            </v-list-item-icon>
            <v-list-item-title>غذاهای من</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="auth" to="/activity">
            <v-list-item-icon >
              <v-icon> mdi-bike </v-icon>
            </v-list-item-icon>
            <v-list-item-title>فعالیت‌های من</v-list-item-title>
          </v-list-item>
          
 

          <v-list-item to="/signin"  v-if="!auth">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>ورود</v-list-item-title>
          </v-list-item>

          <v-list-item to="signup"  v-if="!auth">
            <v-list-item-icon >
              <v-icon>mdi-pen</v-icon>
            </v-list-item-icon>
            <v-list-item-title>ثبت نام</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: null
    };
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
    theme() {
      if (['royal','normalgrey'].includes(this.$store.state.theme)) {
        return true
      }
      return false
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
</style>