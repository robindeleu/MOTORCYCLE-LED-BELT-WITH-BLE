<template>
  <v-container>
    <v-card class="mx-auto" max-width="300" >
      <!-- <v-img
        src="https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80"
        height="200px"
      ></v-img> -->
      <v-parallax
        src="https://media.istockphoto.com/photos/watercolor-textured-background-picture-id887755698?k=6&m=887755698&s=612x612&w=0&h=_yEUF8gLpWjZv5IgwuWkecNVt4X4P7vpuFBKCWIuR44="
        height="200"
      ></v-parallax>

      <v-card-title> {{ name }} </v-card-title>
      <v-card-subtitle> Belt id {{ id }} </v-card-subtitle>

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
              @click="disconnect(id) "
            >
              Disconnect
            </v-btn>
          </template>
          <span>Disconnect this belt</span>
        </v-tooltip>
        
        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show" v-if="this.getIndex()>=0">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition v-if="this.getIndex()>=0">
        <div v-show="show">
          <v-container class="text-center">
            <!-- <p>props id: {{ id }}</p>
            <p>props name: {{ name }}</p> -->

            <h3>Temperature</h3>
            <v-progress-circular
              :rotate="-90"
              :size="120"
              :width="20"
              :value="storeTemp * 3"
              color="primary"
            >
              {{ storeTemp }} °C
            </v-progress-circular>

            <h3>Humidity</h3>
            <v-progress-circular
              :rotate="-90"
              :size="120"
              :width="20"
              :value="storeHum"
              color="light-blue darken-2"
            >
              {{ storeHum }} %
            </v-progress-circular>

            <h3>Battery level</h3>
            <v-progress-linear v-model="storeBatt" height="25">
              <strong>{{ Math.ceil(storeBatt) }}%</strong>
            </v-progress-linear>
            <!-- <v-sparkline
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
            ></v-sparkline> -->
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
      type: String,
    },
    name: {
      type: String,
    },
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
    storeTemp() {
      return this.$store.getters.getMeasuredValues[this.getIndex()].temp;
    },
    storeHum() {
      return this.$store.getters.getMeasuredValues[this.getIndex()].hum;
    },
    storeBatt() {
      return this.$store.getters.getMeasuredValues[this.getIndex()].batt;
    },
  },
  methods: {
    disconnect(id) {
      console.log("disconnect ", id);
      bluetoothAPI.disconnect(id, this.$store);
    },
    getIndex(){
      let i = 0;
      while (i < this.$store.getters.getMeasuredValues.length) {
        if (this.$store.getters.getMeasuredValues[i].id == this.id) {
          return i;
        }
        i++;
      }
      return -1;
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