<template>
  <div class="home">
    <camera/>
    <face-analyzer hidden/>
  </div>
</template>

<script>
// @ is an alias to /src
import FaceAnalyzer from '@/components/FaceAnalyzer.vue';
import Camera from '@/components/Camera.vue';

export default {
  name: 'Home',
  components: {
    FaceAnalyzer,
    Camera,
  },
};
</script>
