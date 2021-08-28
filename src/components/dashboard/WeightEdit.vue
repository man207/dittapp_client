<template>
  <v-dialog v-model="dialog" max-width="300px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon small>
        <v-icon color="blue ">mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>ثبت وزن</v-card-title>

      <v-card-text>
        <v-container>
          <v-row align="center">
            <v-col class="d-flex justify-center" cols="12" md="6">
              <v-text-field
                label="وزن"
                v-model="weight"
                type="number"
                min="0"
              ></v-text-field>
            </v-col>
            
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red lighten-1" text @click="dialog = false"> لغو </v-btn>
        <v-btn color="blue" text @click="updateItem">
          ثبت
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {

  data() {
    return {
      dialog: false,
      weight: 0,
    };
  },
  watch: {
    dialog() {
      console.log(this.$store.getters.weight.weight)
      this.weight = this.$store.getters.weight.weight
    }
  },
  methods: {
    updateItem() {
      console.log(this.item);
      let weight = {
        weight: this.weight,
        date: this.$store.getters.day,
      };
      console.log(weight)
      const config = {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      };
      axios
        .post(`/profile/weight/add`, weight, config)
        .then((res) => {
          console.log(res);
          this.$store.dispatch("setWeight");
          this.dialog = false;
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