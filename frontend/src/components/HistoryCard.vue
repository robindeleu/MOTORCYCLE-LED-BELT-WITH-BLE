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
              @click="deleteHistoryDevice(id)"
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
//import bluetoothAPI from "../services/bluetoothAPI.js";

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
  }),

  computed: {
    storeDevice() {
      return this.$store.getters.getBluetoothBelt;
    },
  },
  methods: {
    deleteHistoryDevice(id){
      let i = 0;
      while (i < this.$store.getters.getHistoryBluetoothBelt.length){
        if(this.$store.getters.getHistoryBluetoothBelt[i].id == id){
          break;
        }
        i++;
      }
      this.$store.dispatch("deleteHistoryDevice",i);
    }
  },
};
</script>

<style scoped>
.e4 {
  width: 400px;
  margin: auto;
}
</style>