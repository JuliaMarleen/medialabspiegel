<template>
    <div class="light-green--text" style="padding: 50px;">
        <h1>TAKE A PICTURE</h1>
        <p>And find out what we know about you....</p>
        Link van de foto: <input type="text" name="inputImage" id="inputImage"
          style="width:50%; background-color: white;"
        value="https://m.media-amazon.com/images/M/MV5BMTM0ODU5Nzk2OV5BMl5BanBnXkFtZTcwMzI2ODgyNQ@@._V1_.jpg" />
        <v-btn class="ml-5" v-on:click="processImage()">Analyze face</v-btn><br>
        <v-row id="wrapper">
            <v-col cols="8" id="jsonOutput">
                <h2>Informatie:</h2>
                <div v-if="this.information" style="width:100%; background-color: black;">
                    <!-- <p v-if="this.information">
                        <b>Grootte hoofd:</b> {{ this.information[0].faceRectangle }}</p>
                    <p v-if="this.information">
                        <b>Landmarks (locatie van alle onderdelen van je gezicht):</b>
                        {{ this.information[0].faceLandmarks }}</p> -->
                    <p v-if="this.information">
                        <b>Geslacht:</b> {{ this.information[0].faceAttributes.gender }}</p>
                    <p v-if="this.information">
                        <b>Leeftijd:</b> {{ this.information[0].faceAttributes.age }}</p>
                    <p v-if="this.information">
                        <b>Glimlach:</b> {{ this.processSmile() }}</p>
                    <p v-if="this.processFacePosition()">
                        <b>Hoofdpositie:</b> {{ this.processFacePosition() }}<br>
                    </p>
                    <p v-if="this.processFace()">
                        <b>Ogen:</b> {{ this.processFace() }}<br>
                    <p v-if="this.processFaceHair()">
                        <b>Gezichtsbeharing:</b> {{ this.processFaceHair() }}</p>
                    <p v-if="this.processGlasses()">
                        <b>Bril:</b> {{ this.processGlasses() }}</p>
                    <!-- <p v-if="this.information">
                        <b>Emotion:</b> {{ this.information[0].faceAttributes.emotion }}</p> -->
                    <p v-if="this.processMakeUp()">
                        <b>Make-up:</b> {{ this.processMakeUp() }}</p>
                    <!-- <p v-if="this.information">
                    <b>Accessories:</b> {{ this.information[0].faceAttributes.accessories }}</p> -->
                    <!-- <p v-if="this.information">
                        Occlusion (dingen in de weg):
                        {{ this.information[0].faceAttributes.occlusion }}</p> -->
                    <!-- <p v-if="this.information">
                        <b>Hair:</b> {{ this.information[0].faceAttributes.hair }}</p> -->
                    <p v-if="this.processHair()">
                        <b>Haar:</b> {{ this.processHair() }}</p>
                </div>
            </v-col>
            <v-col cols="4" id="imageDiv">
                <h2>Foto:</h2>
                <img id="sourceImage" width="300" />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import keys from '../../public/key';

export default {
  name: 'FaceAnalyzer',
  data() {
    return {
      information: null,
      imageUrl: null,
    };
  },
  methods: {
    processHair() {
      let string = '';
      if (this.information[0].faceAttributes.hair.bald < 0.8) {
        if (this.information[0].faceAttributes.hair.hairColor[0].color === 'brown') {
          string = 'Je hebt bruin haar en hebt daardoor een grotere kans op Diabetes';
        } else {
          string = 'Je hebt geen bruin haar en hebt daardoor een grotere kans op Corona';
        }
      } else {
        string = null;
      }
      return string;
    },
    processFace() {
      let string = '';
      const headWidth = this.information[0].faceRectangle.width;
      const eyePosition = this.information[0].faceLandmarks.pupilRight.x
            - this.information[0].faceLandmarks.pupilLeft.x;
      const distanceEyes = eyePosition / headWidth;
      if (this.information[0].faceAttributes.glasses !== 'Sunglasses') {
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

      if (this.information[0].faceAttributes.gender === 'male') {
        if (this.information[0].faceAttributes.facialHair.moustache < 0.3
            && this.information[0].faceAttributes.facialHair.beard < 0.3
            && this.information[0].faceAttributes.facialHair.sideburns < 0.3) {
          string = 'Weinig dominantie, grote kans op werkeloosheid';
        }
        if (this.information[0].faceAttributes.facialHair.moustache >= 0.3) {
          string = 'Dominantie, grote kans op fysieke problemen';
        }
      } else {
        string = null;
      }
      return string;
    },
    processMakeUp() {
      let string = '';

      if (this.information[0].faceAttributes.gender === 'female') {
        if (this.information[0].faceAttributes.makeup.eyeMakeup !== 0
            || this.information[0].faceAttributes.makeup.lipMakeup !== 0) {
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

      if (this.information[0].faceAttributes.headPose.pitch < -5) {
        string = 'Je hoofd buigt naar beneden, onzekerheid geeft grotere kans op hart en vaat ziektes';
      }
      if (this.information[0].faceAttributes.headPose.pitch > 5) {
        string = 'Je hoofd buigt omhoog, risicogedrag geeft grotere kans op ongelukken';
      }
      return string;
    },
    processSmile() {
      let string = '';

      if (this.information[0].faceAttributes.smile > 0.5) {
        string = 'Je lacht, grotere kans op roekeloosheid';
      } else {
        string = 'Je lacht niet, grotere kans op depressie';
      }
      return string;
    },
    processGlasses() {
      let string = '';

      if (this.information[0].faceAttributes.glasses === 'NoGlasses') {
        string = 'Je heb geen bril, geen bescherming, grotere kans op schade in je oog';
      }
      if (this.information[0].faceAttributes.glasses === 'ReadingGlasses') {
        string = 'Je hebt een bril, dit kan alleen nog maar bergafwaards gaan';
      }
      if (this.information[0].faceAttributes.glasses === 'Sunglasses') {
        string = 'Je draagt een zonnebril, onzekerheid geeft meer ricico op ziektes';
      }
      return string;
    },
    async processImage() {
      // Replace <Subscription Key> with your valid subscription key.
      const uriBase = 'https://faceapispiegel.cognitiveservices.azure.com/face/v1.0/detect';

      // Request parameters.
      const params = {
        returnFaceId: 'true',
        returnFaceLandmarks: 'true',
        returnFaceAttributes:
            'age,gender,headPose,smile,facialHair,glasses,emotion,'
            + 'hair,makeup,occlusion,accessories,blur,exposure,noise',
      };

      // Display the image.
      const sourceImageUrl = document.getElementById('inputImage').value;
      document.querySelector('#sourceImage').src = sourceImageUrl;

      const url = new URL(uriBase);
      url.search = new URLSearchParams(params).toString();

      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'Ocp-Apim-Subscription-Key': keys.SUBSCRIPTIONKEY,
          },
          body: JSON.stringify({
            url: sourceImageUrl,
          }),
        });

        const json = await res.json();
        this.information = json;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>

</style>
