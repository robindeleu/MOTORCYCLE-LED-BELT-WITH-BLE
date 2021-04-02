<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      src="https://cdn.antratek.nl/media/product/159/led-rgb-strip-addressable-5m-apa102-com-14016-e9c.jpg"
      height="200px"
    ></v-img>

    <v-card-title> Belt from ........ </v-card-title>

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
            Disconect
          </v-btn>
        </template>
        <span>Disconect this belt</span>
      </v-tooltip>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-container class="text-center">
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
          <h3>Change collor</h3>
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
            thumb-label="always"
          ></v-slider>
        </v-container>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
const gradients = [["#1feaea", "#ffd200", "#f72047"]];
export default {
  name: "BeltCard",

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
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false,
    red: 255,
    green: 0,
    blue: 0,
    ex3: { label: '', val: 50, color: 'red' },
  }),
  watch: {
    group() {
      this.drawer = false;
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