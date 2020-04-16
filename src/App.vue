<template>
  <v-app>
    <v-content  class="black">
      <!-- <p class="my-10 light-green--text">helloo {{ this.results }}</p> -->
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import axios from 'axios';


export default {
  name: 'App',

  components: {
  },

  // mounted() {
  //   axios.get('https://faceapispiegel.cognitiveservices.azure.com/')
  //     .then((response) => { this.results = response.data.results; });
  // },

  data: () => ({
    //
  }),
};
</script>
