<template>
  <v-container>
    <v-card class="mx-auto mt-3" max-width="300">
      <v-parallax
        src="https://images.unsplash.com/photo-1618745955167-98654e197a5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
        height="200">
        <v-overlay value="true" absolute>
            <h3>No devices in history</h3>
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