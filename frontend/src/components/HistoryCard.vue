<template>
  <v-container>
    <v-card class="mx-auto" max-width="300">

      <v-parallax
        src="https://media.istockphoto.com/photos/watercolor-textured-background-picture-id887755698?k=6&m=887755698&s=612x612&w=0&h=_yEUF8gLpWjZv5IgwuWkecNVt4X4P7vpuFBKCWIuR44="
        height="200"
      ></v-parallax>

      <v-card-title> {{name}} </v-card-title>
      <v-card-subtitle> Belt id {{id}} </v-card-subtitle>

      <v-card-actions>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-2"
              outlined
              rounded
              color="orange lighten-2"
              v-bind="attrs"
              v-on="on"
            >
              Delete
            </v-btn>
          </template>
          <span>Delete this belt</span>
        </v-tooltip>

        <v-spacer></v-spacer>

      </v-card-actions>

    </v-card>
  </v-container>
</template>

<script>
const gradients = [["#1feaea", "#ffd200", "#f72047"]];
import bluetoothAPI from "../services/bluetoothAPI.js";

export default {
  name: "HistoryCard",
  props: {
      id: {
        type: String
      },
      name:{
        type: String
      }
    },
  components: {},

  data: () => ({
    drawer: false,
    group: null,
    show: false,
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[0],
    value: [
        1, 4, 2, 9, 5, 6, 5, 6, 9, 7, 1, 3, 6, 6, 10, 0, 3, 1, 10, 4, 10, 7, 7, 1, 10, 8, 7, 0, 9, 4, 1, 1, 10, 6,
        10, 10, 8, 1, 2, 1, 0, 6, 3, 2, 0, 7, 8, 9, 3, 3, 9, 5, 4, 5, 8, 7, 9, 5, 3, 2, 0, 5, 6, 3, 2, 1, 10, 6, 3, 
        7, 10, 4, 9, 7, 6, 3, 2, 5, 3, 5, 8, 1, 0, 4, 5, 2, 3, 1, 4, 2, 5, 4, 9, 0, 6, 9, 4, 0, 9, 3,
    ],
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false,
    red: 255,
    green: 0,
    blue: 0,
    ex3: { label: "", val: 10, color: "primary" },
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  computed: {
    storeDevice() {
      return this.$store.getters.getBluetoothBelt;
    },
  },
  methods: {
    disconnect(id) {
      console.log("disconnect ", id);
      bluetoothAPI.disconnect(id, this.$store);
    },
  },
};
</script>

<style scoped>
.e4 {
  width: 400px;
  margin: auto;
}
</style>