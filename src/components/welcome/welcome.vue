<template>
  <v-container fill-height="fill-height"  >
    <v-layout align-center justify-center>
      <v-flex class="biometric-form text-center">
  <v-card elevation="8" outlined shaped>
    <v-card-title class="justify-center">به دیت اپ، اولین اپ رژیم ساده خوش آمدید</v-card-title>
    <v-card-text class="justify-center d-flex align-center" style="height:300px">شما هنوز وارد اکانت خود نشده‌اید. اگر قبلا ثبت نام کرده‌اید وارد اکانت خود شوید و اگر تابحال از دیت اپ استفاده نکرده‌اید، ثبت نام کنید</v-card-text>
    <v-card-actions class="cta justify-center" >
      <router-link to="/signup">ثبت نام</router-link>
      <router-link to="/signin">ورود</router-link>
    </v-card-actions>
  </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<style scoped>


.biometric-form {
  max-width: 500px;
}
.cta {
  margin: auto;
  text-align: center;
}

.cta a {
  margin: 10px;
  text-decoration: none;
  border: 1px solid #521751;
  border-radius: 3px;
  width: 100px;
  padding: 10px;
  box-sizing: border-box;
  color: #521751;
}

.cta a:hover,
.cta a:active {
  background-color: #521751;
  color: white;
}
</style>