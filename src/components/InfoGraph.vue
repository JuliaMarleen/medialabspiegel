<template>
  <div class="ma-5">
      <p>{{this.text}}</p>
      <p>{{this.number}}</p>
      <!-- <div class="pie"></div><br> -->

      <ul class="graph">
        <li class="percent20" v-bind:style="{ color: activeColor, width: percentage() + '%' }">
            {{ this.percentage() + '%'}}</li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'InforGraph',
  props: {
    text: String,
    number: Number,
  },
  data() {
    return {
      activeColor: 'white',
    //   fontSize: this.number,
    };
  },
  methods: {
    percentage() {
      let newNum = this.number;
      console.log(newNum);
      if (this.number < 0.5) {
        newNum = 1 - this.number;
        console.log(newNum);
      }
      const perc = newNum * 100;
      console.log(perc);
      return perc;
    },
  },
};
</script>

<style>
.pie {
  width: 100px; height: 100px;
  border-radius: 50%;
  background: yellowgreen;
  background-image:
  linear-gradient(to right, transparent 50%, #655 0);
}
ul.graph {
  margin: 0;
  padding: 0;
  background: rgb(182, 182, 182);
  color: #fff;
  list-style-type: none;
  margin-bottom: .5em;
}
ul.graph li {
  padding: .2em .5em;
}
ul.graph li.percent20 {
  background: green;
}
</style>
