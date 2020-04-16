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

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script>
export default {
  name: 'FaceAnalyzer',
  data () {
    return {
      information: null,
    }
  },
  methods: {
    processHair() {
        var string = '';
        if( this.information[0].faceAttributes.hair.bald < 0.8){
            if( this.information[0].faceAttributes.hair.hairColor[0].color === 'brown'){
                string =
                'Je hebt bruin haar en hebt daardoor een grotere kans op Diabetes';
            }
            else{
                string =
                'Je hebt geen bruin haar en hebt daardoor een grotere kans op Corona';
            }
        }
        else{
            string = null;
        }
        return string;
    },
    processFace() {
        var string = '';
        var headWidth = this.information[0].faceRectangle.width;
        var eyePosition =
            this.information[0].faceLandmarks.pupilRight.x -
            this.information[0].faceLandmarks.pupilLeft.x;
        var distanceEyes = eyePosition / headWidth;
        if( this.information[0].faceAttributes.glasses !== 'Sunglasses' ){
            if( distanceEyes > 0.45){
                string =
                'Je ogen staan ver uit elkaar,dit geeft je een groter risico op mentale problemen';
            }
            else{
                string =
                'Je ogen staan dicht bij elkaar, Dit geeft je een groter risico op een aanrijding';
            }
        }
        return string;
    },
    processFaceHair() {
        var string = '';

        if(this.information[0].faceAttributes.gender === 'male'){
            if( this.information[0].faceAttributes.facialHair.moustache < 0.3 &&
            this.information[0].faceAttributes.facialHair.beard < 0.3 &&
            this.information[0].faceAttributes.facialHair.sideburns < 0.3){
                string = 'Weinig dominantie, grote kans op werkeloosheid';
            }
            if( this.information[0].faceAttributes.facialHair.moustache >= 0.3){
                string = 'Dominantie, grote kans op fysieke problemen';
            }
        }
        else{
            string = null;
        }
        return string;
    },
    processMakeUp() {
        var string = '';

        if(this.information[0].faceAttributes.gender === 'female'){
            if( this.information[0].faceAttributes.makeup.eyeMakeup !== 0 ||
            this.information[0].faceAttributes.makeup.lipMakeup !== 0){
                string = 'Dragen van make up geeft grotere kans op huidziektes';
            }
            else{
                string = 'Geen make up geeft grotere kans op eenzaamheid'
            }
        }
        else{
            string = null
        }
        return string;
    },
    processFacePosition(){
        var string = '';

        if( this.information[0].faceAttributes.headPose.pitch < -5 ){
            string =
            'Je hoofd buigt naar beneden, onzekerheid geeft grotere kans op hart en vaat ziektes';
        }
        if( this.information[0].faceAttributes.headPose.pitch > 5 ){
            string =
            'Je hoofd buigt omhoog, risicogedrag geeft grotere kans op ongelukken'
        }
        return string;
    },
    processSmile(){
        var string = '';

        if( this.information[0].faceAttributes.smile > 0.5 ){
            string = 'Je lacht, grotere kans op roekeloosheid';
        }
        else{
            string = 'Je lacht niet, grotere kans op depressie';
        }
        return string;
    },
    processGlasses(){
        var string = '';

        if( this.information[0].faceAttributes.glasses === 'NoGlasses' ){
            string = 'Je heb geen bril, geen bescherming, grotere kans op schade in je oog';
        }
        if( this.information[0].faceAttributes.glasses === 'ReadingGlasses' ){
            string = 'Je hebt een bril, dit kan alleen nog maar bergafwaards gaan';
        }
        if( this.information[0].faceAttributes.glasses === 'Sunglasses' ){
            string = 'Je draagt een zonnebril, onzekerheid geeft meer ricico op ziektes';
        }
        return string;
    },
    processImage() {
      // Replace <Subscription Key> with your valid subscription key.
      const subscriptionKey = 'blehh';
      const uriBase = 'https://faceapispiegel.cognitiveservices.azure.com/face/v1.0/detect';

      // Request parameters.
      const params = {
        'returnFaceId': 'true',
        'returnFaceLandmarks': 'true',
        'returnFaceAttributes':
            'age,gender,headPose,smile,facialHair,glasses,emotion,' +
            'hair,makeup,occlusion,accessories,blur,exposure,noise',
      };

      // Display the image.
      let sourceImageUrl = document.getElementById('inputImage').value;
      document.querySelector('#sourceImage').src = sourceImageUrl;

      // Perform the REST API call.
      $.ajax({
          url: uriBase + '?' + $.param(params),

          // Request headers.
          beforeSend: function(xhrObj){
              xhrObj.setRequestHeader('Content-Type','application/json');
              xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', subscriptionKey);
          },

          type: 'POST',

          // Request body.
          data: '{"url": ' + '"' + sourceImageUrl + '"}',
      })
      .done(data => (this.information = data))

      .fail(function(jqXHR, textStatus, errorThrown) {
          // Display error message.
          let errorString = (errorThrown === "") ?
              "Error. " : errorThrown + " (" + jqXHR.status + "): ";
          errorString += (jqXHR.responseText === "") ?
              "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                  jQuery.parseJSON(jqXHR.responseText).message :
                      jQuery.parseJSON(jqXHR.responseText).error.message;
          alert(errorString);
      });
    },
  }
}
</script>

<style>

</style>
