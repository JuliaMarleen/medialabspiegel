<template>
  <div class="home">
    <camera v-if="!information" @uploaded="setInfo"/>
    <face-analyzer v-if="information" v-bind:faceData="information"/>
  </div>
</template>

<script>
// @ is an alias to /src
import FaceAnalyzer from '@/components/FaceAnalyzer.vue';
import Camera from '@/components/Camera.vue';

export default {
  name: 'TakePic',
  data() {
    return {
      information: null,
    };
  },
  methods: {
    setInfo(data) {
      this.information = data;
    },
  },
  components: {
    FaceAnalyzer,
    Camera,
  },
};
</script>
