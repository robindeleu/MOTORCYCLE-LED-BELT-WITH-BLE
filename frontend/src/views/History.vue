<template>
    <div>
        <v-container>
            <v-row justify="center">
                <v-col cols="9" md="4" v-for="device in storeDevice" :key="device.id">
                    <HistoryCard
                        :id="device.id"
                        :name="device.name"
                    />
                </v-col>
            </v-row>
            <div v-if="storeDevice.length===0">
                <h1>NO DEVICES FOUND</h1> <!--TO CHANGE!-->
            </div>
        </v-container>
    </div>
</template>

<script>

import HistoryCard from "../components/HistoryCard.vue"

export default {
    name: 'History',

    components: {
        HistoryCard,
    },

    computed: {
        storeDevice() {
            console.log(this.$store.getters.getHistoryBluetoothBelt);
            return this.$store.getters.getHistoryBluetoothBelt;
    },
  },
}
</script>


<style scoped>

</style>