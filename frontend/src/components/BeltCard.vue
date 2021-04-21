<template>
  <v-container>
    <v-card class="mx-auto" max-width="300">
      <!-- <v-img
        src="https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80"
        height="200px"
      ></v-img> -->
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
              @click="disconnect()"
            >
              Disconnect
            </v-btn>
          </template>
          <span>Disconnect this belt</span>
        </v-tooltip>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-container class="text-center">
            <p>props id: {{id}}</p>
            <p>props name: {{name}}</p>
            <h3>Battery level</h3>
            <v-sparkline
              :value="value"
              :gradient="gradient"
              :smooth="radius || false"
              :padding="padding"
              :line-width="width"
              :stroke-linecap="lineCap"
              :gradient-direction="gradientDirection"
              :fill="fill"
              :type="type"
              :auto-line-width="autoLineWidth"
              auto-draw
            ></v-sparkline>
          </v-container>

          <v-container class="text-center">
            <h3>Change color</h3>
          </v-container>
          <v-card class="e4" elevation="0" tile>
            <v-responsive
              :style="{ background: `rgb(${red}, ${green}, ${blue})` }"
              height="300px"
            ></v-responsive>

            <v-card-text>
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <v-slider
                      v-model="red"
                      :max="255"
                      label="R"
                      class="align-center"
                    >
                      <template v-slot:append>
                        <v-text-field
                          v-model="red"
                          class="mt-0 pt-0"
                          type="number"
                          style="width: 60px"
                        ></v-text-field>
                      </template>
                    </v-slider>
                  </v-col>

                  <v-col cols="12">
                    <v-slider
                      v-model="green"
                      :max="255"
                      label="G"
                      class="align-center"
                    >
                      <template v-slot:append>
                        <v-text-field
                          v-model="green"
                          class="mt-0 pt-0"
                          type="number"
                          style="width: 60px"
                        ></v-text-field>
                      </template>
                    </v-slider>
                  </v-col>

                  <v-col cols="12">
                    <v-slider
                      v-model="blue"
                      :max="255"
                      label="B"
                      class="align-center"
                    >
                      <template v-slot:append>
                        <v-text-field
                          v-model="blue"
                          class="mt-0 pt-0"
                          type="number"
                          style="width: 60px"
                        ></v-text-field>
                      </template>
                    </v-slider>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
          <v-container class="text-center">
            <h3>Brightness</h3>
            <v-slider
              v-model="ex3.val"
              :label="ex3.label"
              :thumb-color="ex3.color"
              max="255"
              min="0"
              thumb-label="always"
            ></v-slider>
          </v-container>
        </div>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>

<script>
const gradients = [["#1feaea", "#ffd200", "#f72047"]];
import bluetoothAPI from "../services/bluetoothAPI.js";

export default {
  name: "BeltCard",
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
      1,
      4,
      2,
      9,
      5,
      6,
      5,
      6,
      9,
      7,
      1,
      3,
      6,
      6,
      10,
      0,
      3,
      1,
      10,
      4,
      10,
      7,
      7,
      1,
      10,
      8,
      7,
      0,
      9,
      4,
      1,
      1,
      10,
      6,
      10,
      10,
      8,
      1,
      2,
      1,
      0,
      6,
      3,
      2,
      0,
      7,
      8,
      9,
      3,
      3,
      9,
      5,
      4,
      5,
      8,
      7,
      9,
      5,
      3,
      2,
      0,
      5,
      6,
      3,
      2,
      1,
      10,
      6,
      3,
      7,
      10,
      4,
      9,
      7,
      6,
      3,
      2,
      5,
      3,
      5,
      8,
      1,
      0,
      4,
      5,
      2,
      3,
      1,
      4,
      2,
      5,
      4,
      9,
      0,
      6,
      9,
      4,
      0,
      9,
      3,
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
    disconnect() {
      console.log("disconnect");
      bluetoothAPI.disconnect(this.$store.getters.BluetoothBelt);
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