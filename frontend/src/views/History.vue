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
                <DefaultHistoryCard/>
            </div>
        </v-container>
    </div>
</template>

<script>

import HistoryCard from "../components/HistoryCard.vue"
import DefaultHistoryCard from "../components/DefaultHistoryCard.vue"

export default {
    name: 'History',

    components: {
        HistoryCard,
        DefaultHistoryCard,
    },

    computed: {
        storeDevice() {
            return this.$store.getters.getHistoryBluetoothBelt;
    },
  },
}
</script>


<style scoped>

</style>