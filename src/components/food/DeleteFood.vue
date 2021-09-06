<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon>
        <v-icon color="red lighten-1">mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title> حذف غذا </v-card-title>
      <v-card-text v-if="!message">
        آیا می‌خواهید {{ item.name }} را حذف کنید؟
      </v-card-text>
      <v-card-text v-if="message">
        {{message}}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false"> لغو </v-btn>
        <v-btn color="green darken-1" text @click="deleteItem()"> تائید </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  props: {
    item: Object,
  },
  data() {
    return {
      dialog: false,
      message: ''
    };
  },
  methods: {
    deleteItem() {

      const config = {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      };
      axios
        .delete(`/food/${this.item._id}`, config)
        .then((res) => {
            this.$router.go('/food/myfoods')
          console.log(res);
          this.dialog = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
      const config = {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      };
      axios
        .get(`/food/deletefoodwarning/${this.item._id}`, config)
        .then((res) => {
          console.log(res);
          this.message = res.data.message
        })
        .catch((err) => {
          console.log(err);
        });
  }
};
</script>

<style>
</style>