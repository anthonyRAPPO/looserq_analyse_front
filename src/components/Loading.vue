<template>
  <div id="loading">
    <img
      class="loadingGif"
      src="../assets/loading.gif"
      alt="loading..."
      width="200"
    />
  </div>
  <div class="progress">
    <v-progress-linear
      stream
      v-if="value >= 0"
      :model-value="value"
      :buffer-value="value + 10"
      color="secondary"
      height="12"
      rounded
    ></v-progress-linear>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loading",
  props: {
    value: {
      required: true,
      type: Number,
    },
  },
  mounted() {
    console.log("this.value");
    console.log(this.value);
  },
});
</script>

<style scoped>
#loading {
  position: fixed;
  z-index: 100;
  background-color: rgba(255, 255, 255);
  opacity: 0.35;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: 100vh;
}
.loadingGif {
  position: relative;
  margin: auto;
  margin-top: 20%;
  opacity: 1;
}

.progress {
  position: fixed;
  width: 70%;
  left: 15%;
  bottom: 12%;
  opacity: 1;
  z-index: 101;
}
</style>
