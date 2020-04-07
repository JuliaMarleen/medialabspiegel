<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/eyes5.png')"
          class="my-3"
          contain
          height="200"
          style="filter: invert(100%);"
        />
      </v-col>

      <v-col class="my-10">
        <h1 class="display-3 font-weight-bold mb-3 light-green--text">
          <router-link :to="this.route" class="light-green--text">{{ this.text }}</router-link>
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    text: String,
    route: String,
  },
  data: () => ({
  }),
};
</script>
