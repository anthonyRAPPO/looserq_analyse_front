<template>
  <div id="loading">
    <img
      class="loadingGif"
      src="../assets/loading.gif"
      alt="loading..."
      width="200"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loading",
});
</script>

<style scoped>
#loading {
  position: absolute;
  z-index: 1000;
  background-color: white;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  text-align: center;
  line-height: 100vh;
}
.loadingGif {
  position: relative;
  margin: auto;
  margin-top: 20%;
  opacity: 1;
}
</style>
