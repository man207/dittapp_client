<template>
  <v-app-bar app color="white" flat>
    <v-container class="py-0 fill-height">
      <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>
      <v-btn v-if="auth" text plain :ripple="false" to="/dashboard">
        صفحه شخصی
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn v-if="!auth" text :ripple="false" plain to="/signup">
        ثبت نام
      </v-btn>
      <v-btn v-if="!auth" text :ripple="false" plain to="/signin">
        ورود
      </v-btn>

      <button @click="onLogout" :ripple="false" plain v-if="auth">خروج</button>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
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