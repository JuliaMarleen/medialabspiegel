<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld text="Send Picture" route="/about"/> -->
    <face-analyzer/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import FaceAnalyzer from '@/components/FaceAnalyzer.vue';

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    FaceAnalyzer,
  },
};
</script>
