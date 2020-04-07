<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld text="Back" route="/"/>

    <v-row class="text-center">
      <v-col
        class="my-10 light-green--text"
        cols="12"
      >
        <h2 class="display-3 font-weight-bold mb-3">
          Kenmerken
        </h2>

        <v-row justify="center display-1">
          <p> Je hebt blauwe ogen dus je hebt 20% meer kans op aardappel</p>
        </v-row>
        <v-row justify="center display-1">
          <p> Je hebt groen haar dus je hebt 15% minder kans op diabetes</p>
        </v-row>
        <v-row justify="center display-1">
          <p> Je kijkt naar links dus je hebt 60% kans op de Macarena</p>
        </v-row>
        <v-row justify="center display-1">
          <p> Je hebt groen haar dus je hebt 42x zoveel kans op werkeloosheid</p>
        </v-row>
        <v-row justify="center display-1">
          <p> Je hebt groen haar dus je bent een aardappel</p>
        </v-row>
        <v-row justify="center display-1">
          <p> Je hebt groen haar dus je bent een aardappel</p>
        </v-row>
      </v-col>

            <v-col
        class="my-10 light-green--text"
        cols="12"
      >
        <h2 class="display-3 font-weight-bold mb-3">
          Risico's
        </h2>

        <v-row justify="center display-1">
          <p> Je hebt blauwe ogen dus je bent een aardappel</p>
        </v-row>
        <v-row justify="center display-1">
          <p> Je hebt groen haar dus je bent een aardappel</p>
        </v-row>
        <v-row justify="center display-1">
          <p> Je kijkt naar links dus je bent een aardappel</p>
        </v-row>
        <v-row justify="center display-1">
          <p> Je hebt groen haar dus je bent een aardappel</p>
        </v-row>
        <v-row justify="center display-1">
          <p> Je hebt groen haar dus je bent een aardappel</p>
        </v-row>
        <v-row justify="center display-1">
          <p> Je hebt groen haar dus je bent een aardappel</p>
        </v-row>
        <v-row justify="center display-1">
          <p> Je hebt groen haar dus je bent een aardappel</p>
        </v-row>
      </v-col>

    </v-row>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
