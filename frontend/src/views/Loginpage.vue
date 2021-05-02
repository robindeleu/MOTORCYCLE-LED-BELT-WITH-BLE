<template>
  <div class="loginpage">
    <v-container>
      <v-row justify="center">
        <v-col cols="9" md="4">
          <Login />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Login from "@/components/Login";
export default {
  name: "Loginpage",
  components: {
    Login,
  },
};
</script>