<template>
  <div class="register">
    <v-row justify="center">
      <v-col cols="9" md="4">
        <Registercomp />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Registercomp from "@/components/Registercomp";
export default {
  name: "Register",
  components: {
    Registercomp,
  },
};
</script>