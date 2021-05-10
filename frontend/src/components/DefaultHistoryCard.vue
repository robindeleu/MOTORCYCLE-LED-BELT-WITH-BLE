<template>
  <v-container>
    <v-card class="mx-auto mt-3" >
      <v-parallax
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
        height="350">
        <v-overlay value="true" absolute>
            <h1>No devices in history</h1>
        </v-overlay>
      </v-parallax>
    </v-card>
  </v-container>
</template>

<script>


export default {
  name: "DefaultHistoryCard",
  components: {},

  data: () => ({
  }),
  computed: {
  },
  methods: {

  },
};
</script>

<style scoped>
</style>