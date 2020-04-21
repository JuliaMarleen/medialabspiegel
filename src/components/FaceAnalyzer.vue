<template>
    <div class="light-green--text" style="padding: 50px;">
        <v-row id="wrapper">
            <v-col cols="4" id="imageDiv">
                <img :src="imageUrl" width="100%" />
            </v-col>
            <v-col cols="8">
              <div v-if="this.processHair()">
                <h2>Kenmerk: {{this.hairColor}} haar</h2>
                <p>{{ this.processHair() }}</p></div>
              <div v-if="this.processFace()">
                <h2>Kenmerk: afstand van je ogen</h2><p>{{ this.processFace() }}</p></div>
            </v-col>
            <v-col cols="12" id="jsonOutput">
                <div v-if="this.faceData" style="width:100%;">
                    <!-- <p v-if="this.faceData">
                        <b>Grootte hoofd:</b> {{ this.faceData[0].faceRectangle }}</p>
                    <p v-if="this.faceData">
                        <b>Landmarks (locatie van alle onderdelen van je gezicht):</b>
                        {{ this.faceData[0].faceLandmarks }}</p> -->
                    <p v-if="this.faceData">
                        <b>Geslacht:</b> {{ this.faceData[0].faceAttributes.gender }}</p>
                    <p v-if="this.faceData">
                        <b>Leeftijd:</b> {{ this.faceData[0].faceAttributes.age }},
                        {{this.processAge()}}</p>
                    <p v-if="this.processGlasses()">
                        <b>Bril:</b> {{ this.processGlasses() }}</p>
                    <p v-if="this.faceData">
                        <b>Glimlach:</b> {{ this.processSmile() }}</p>
                    <info-graph
                      :number="this.faceData[0].faceAttributes.smile"/>

                    <p v-if="this.processFacePosition()">
                        <b>Hoofdpositie:</b> {{ this.processFacePosition() }}<br>
                    </p>
                    <info-graph v-if="this.processFacePosition()"
                      :number="this.faceData[0].faceAttributes.headPose.pitch"/>

                    <p v-if="this.processFaceHair()">
                        <b>Gezichtsbeharing:</b> {{ this.processFaceHair() }}</p>
                    <info-graph v-if="this.processFaceHair()"
                      :number="this.faceData[0].faceAttributes.facialHair.beard"/>
                    <!-- <p v-if="this.faceData">
                        <b>Emotion:</b> {{ this.faceData[0].faceAttributes.emotion }}</p> -->
                    <p v-if="this.processMakeUp()">
                        <b>Make-up:</b> {{ this.processMakeUp() }}</p>
                    <info-graph v-if="this.processMakeUp()"
                      :number="this.faceData[0].faceAttributes.hair.hairColor[2].confidence"/>
                      <!-- is de 3e haarkleur confidence -->
                    <!-- <p v-if="this.faceData">
                    <b>Accessories:</b> {{ this.faceData[0].faceAttributes.accessories }}</p> -->
                    <!-- <p v-if="this.faceData">
                        Occlusion (dingen in de weg):
                        {{ this.faceData[0].faceAttributes.occlusion }}</p> -->
                    <!-- <p v-if="this.faceData">
                        <b>Hair:</b> {{ this.faceData[0].faceAttributes.hair }}</p> -->

                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import InfoGraph from '@/components/InfoGraph.vue';
// import keys from '../../public/key';

export default {
  name: 'FaceAnalyzer',
  components: {
    InfoGraph,
  },
  data() {
    return {
      hairColor: '',
    };
  },
  props: {
    faceData: {},
    imageUrl: String,
  },
  methods: {
    processHair() {
      let string = '';
      if (this.faceData[0].faceAttributes.hair.bald < 0.8) {
        if (this.faceData[0].faceAttributes.hair.hairColor[0].color === 'brown') {
          string = 'Je hebt bruin haar, je wordt minder snel aangesproken door aantrekkelijke mensen';
          this.hairColor = 'bruin';
        } else {
          string = 'Je hebt geen bruin haar en komt daardoor minder slim over';
          this.hairColor = 'geen bruin';
        }
      } else {
        string = null;
      }
      return string;
    },
    processAge() {
      let string = '';
      if (this.faceData[0].faceAttributes.age < 45) {
        string = 'Je bent jong en dus heb je nog weinig levensevaring, waardoor je te weinig kennis hebt om te stemmen';
      } else {
        string = 'Je bent oud en leeft niet echt meer in het heden';
      }
      return string;
    },
    processFace() {
      let string = '';
      const headWidth = this.faceData[0].faceRectangle.width;
      const eyePosition = this.faceData[0].faceLandmarks.pupilRight.x
            - this.faceData[0].faceLandmarks.pupilLeft.x;
      const distanceEyes = eyePosition / headWidth;
      if (this.faceData[0].faceAttributes.glasses !== 'Sunglasses') {
        if (distanceEyes > 0.45) {
          string = 'Je ogen staan ver uit elkaar,dit geeft je een groter risico op mentale problemen';
        } else {
          string = 'Je ogen staan dicht bij elkaar, Dit geeft je een groter risico op een aanrijding';
        }
      }
      return string;
    },
    processFaceHair() {
      let string = '';

      if (this.faceData[0].faceAttributes.gender === 'male') {
        if (this.faceData[0].faceAttributes.facialHair.moustache < 0.3
            && this.faceData[0].faceAttributes.facialHair.beard < 0.3
            && this.faceData[0].faceAttributes.facialHair.sideburns < 0.3) {
          string = 'Weinig dominantie, grote kans op werkeloosheid';
        }
        if (this.faceData[0].faceAttributes.facialHair.moustache >= 0.3) {
          string = 'Dominantie, grote kans op fysieke problemen';
        }
      } else {
        string = null;
      }
      return string;
    },
    processMakeUp() {
      let string = '';

      if (this.faceData[0].faceAttributes.gender === 'female') {
        if (this.faceData[0].faceAttributes.makeup.eyeMakeup !== 0
            || this.faceData[0].faceAttributes.makeup.lipMakeup !== 0) {
          string = 'Dragen van make up geeft grotere kans op huidziektes';
        } else {
          string = 'Geen make up geeft grotere kans op eenzaamheid';
        }
      } else {
        string = null;
      }
      return string;
    },
    processFacePosition() {
      let string = '';

      if (this.faceData[0].faceAttributes.headPose.pitch < -5) {
        string = 'Je hoofd buigt naar beneden, onzekerheid geeft grotere kans op hart en vaat ziektes';
      }
      if (this.faceData[0].faceAttributes.headPose.pitch > 5) {
        string = 'Je hoofd buigt omhoog, risicogedrag geeft grotere kans op ongelukken';
      }
      return string;
    },
    processSmile() {
      let string = '';

      if (this.faceData[0].faceAttributes.smile > 0.5) {
        string = 'Je lacht, grotere kans op roekeloosheid';
      } else {
        string = 'Je lacht niet, grotere kans op depressie';
      }
      return string;
    },
    processGlasses() {
      let string = '';

      if (this.faceData[0].faceAttributes.glasses === 'NoGlasses') {
        string = 'Je heb geen bril, geen bescherming, grotere kans op schade in je oog';
      }
      if (this.faceData[0].faceAttributes.glasses === 'ReadingGlasses') {
        string = 'Je hebt een bril, dit kan alleen nog maar bergafwaards gaan';
      }
      if (this.faceData[0].faceAttributes.glasses === 'Sunglasses') {
        string = 'Je draagt een zonnebril, onzekerheid geeft meer ricico op ziektes';
      }
      return string;
    },
  },
};
</script>

<style>
</style>
