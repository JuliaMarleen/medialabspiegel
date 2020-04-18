<template>
    <div class="doos">
      <video id="player" autoplay></video>
      <div class="overlay">
        <div class="center">
          <h1>Wil je meer over jezelf te weten komen?</h1>
          <v-btn class="mt-6" @click="processImage" color="success">Ja! Laat maar zien</v-btn>
          <div class="take-me-down">
            <a href="">Klik Hier voor de algemene voorwaarden</a>
          </div>
        </div>
      </div>
      <canvas id="canvas" width=1280 height=960 hidden></canvas>
    </div>
</template>

<script>
import keys from '../../public/key';

export default {
  name: 'Camera',
  data() {
    return {
      information: null,
      imageUrl: null,
      context: null,
      canvas: null,
      player: null,
    };
  },
  mounted() {
    this.player = document.getElementById('player');
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    const constraints = {
      video: true,
    };

    // Attach the video stream to the video element and autoplay.
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        this.player.srcObject = stream;
      });
  },
  methods: {
    async uploadImage() {
      const dataUrl = this.canvas.toDataURL('image/jpeg');

      const dataArray = dataUrl.split(';');
      const base64Image = dataArray[1].split(',')[1];// In this case "iVBORw0KGg...."

      const formData = new FormData();

      formData.append('key', keys.UPLOADKEY);
      formData.append('file_input', base64Image);

      let jsonResponse;

      try {
        const res = await fetch('https://upload.borowy.nl/api/base64upload', {
          method: 'POST',
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: formData,
        });
        jsonResponse = await res.json();
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
      return jsonResponse.URL;
    },
    async processImage() {
      this.context.drawImage(this.player, 0, 0, this.canvas.width, this.canvas.height);

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
      const imageUrl = await this.uploadImage();

      const url = new URL(uriBase);
      url.search = new URLSearchParams(params).toString();

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Ocp-Apim-Subscription-Key': keys.SUBSCRIPTIONKEY,
        },
        body: JSON.stringify({
          url: imageUrl,
        }),
      });

      this.information = await res.json();
      this.$emit('uploaded', this.information, imageUrl);
    },
  },
};
</script>

<style>
.doos{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.overlay{
  position: relative;
  z-index: 1;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

.center{
  text-align: center;
}
.center a{
  color: #FFF;
}
.take-me-down{
  position: relative;
  top: 150px;
}

video{
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100vh;
  background: #000;
}
</style>
