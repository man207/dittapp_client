<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon>
        <v-icon color="red lighten-1">mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title> حذف غذا </v-card-title>
      <v-card-text>
        آیا می‌خواهید {{ item.activity.name }} را حذف کنید؟
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
    };
  },
  methods: {
    deleteItem() {
      console.log(this.item);

      const config = {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      };
      axios
        .delete(`/profile/burn/${this.item._id}`, config)
        .then((res) => {
          console.log(res);
          this.dialog = false;
          axios
            .get(`/profile/burn/day/${this.$store.state.day}`, config)
            .then((res) => {
              let x = res.data.result;
              this.$store.dispatch("setBurn",  x );
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>