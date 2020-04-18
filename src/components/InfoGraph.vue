<template>
  <div class="ma-5">
      <!-- <p>{{this.text}}</p> -->
      <!-- <p>{{this.number}}</p> -->
      <!-- <div class="pie"></div><br> -->

      <ul class="graph">
        <li class="percent20" v-bind:style="{ background: activeColor, width: percentage() + '%' }">
            {{ this.percentage() + '%'}}</li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'InforGraph',
  props: {
    number: Number,
  },
  data() {
    return {
      activeColor: 'green',
    };
  },
  methods: {
    percentage() {
      let num = this.number;
      if (num > 1 || num < 0) {
        let newNum = this.number;
        if (this.number < 0) {
          newNum = this.number * -1;
        }
        num = newNum * 4;
      }
      if (num <= 1 && num >= 0) {
        let newNum = this.number;
        if (this.number < 0.5) {
          newNum = 1 - this.number;
        }
        num = (newNum - 0.5) * 200;
      }
      if (num > 40 && num < 70) {
        this.activeColor = 'orange';
      }
      if (num > 70) {
        this.activeColor = 'red';
      }
      return num.toFixed(1);
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
