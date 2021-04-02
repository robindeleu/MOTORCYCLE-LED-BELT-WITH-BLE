import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({theme: {
    themes: {
      light: {
        primary: '#FFC107',
        secondary: '#ffa500',
        accent: '#FFE57F',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
});
