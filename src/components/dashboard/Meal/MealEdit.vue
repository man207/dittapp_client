<template>
  <v-dialog v-model="dialog" max-width="900px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon>
        <v-icon color="blue ">mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>{{ item.food.name }}</v-card-title>

      <v-card-text>
        <v-container>
          <v-row align="center">
            <v-col class="d-flex" cols="6" sm="2">
              <v-text-field
                label="مقدار"
                v-model="amount"
                type="number"
                min="0"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="6" md="2">
              <v-select
                :items="servingItems"
                v-model="serving"
                return-object
                label="پیمانه"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="6" md="2">
              <v-text-field
                :value="cosumeAmounts.calorie"
                label="کالری"
                outlined
                disabled
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="6" md="2">
              <v-text-field
                :value="cosumeAmounts.protein"
                label="پروتیین"
                outlined
                disabled
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="6" md="2">
              <v-text-field
                :value="cosumeAmounts.carb"
                label="کربو"
                outlined
                disabled
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="6" md="2">
              <v-text-field
                :value="cosumeAmounts.fat"
                label="چربی"
                outlined
                disabled
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
  props: {
    item: Object,
  },
  data() {
    return {
      dialog: false,
      amount: 0,
      serving: { value: 1 },
    };
  },
  computed: {
    cosumeAmounts() {
      //this is too long?
      let w = this.item.food;

      let x = {
        calorie: w.calorie * this.amount * this.serving.value,
        protein: w.protein * this.amount * this.serving.value,
        carb: w.carb * this.amount * this.serving.value,
        fat: w.fat * this.amount * this.serving.value,
      };
      return x;
    },
    selectedItem() {
      let x = { ...this.item.food };
      if (x.unit == "gr") x.unit = "گرم";
      if (x.unit == "ml") x.unit = "میلی لیتر";
      return x;
    },
    servingItems() {
      const w = this.selectedItem;
      let x = [
        { text: w.unit, value: 1 },
        {
          text: `${w.serving.name}: ${w.serving.units} ${w.unit}`,
          value: w.serving.units,
        },
      ];
      return x;
    },
  },
  mounted() {
    this.serving = this.servingItems[this.item.serving ? 1 : 0];
    this.amount = this.item.amount;
  },
  methods: {
    updateItem() {
      let food = {
        amount: this.amount,
        serving: this.serving.value == 1 ? false : true,
      };

      const config = {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      };
      axios
        .put(`/profile/consume/${this.item._id}`, food, config)
        .then((res) => {
          console.log(res);
          this.$store.dispatch('setConsume')
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