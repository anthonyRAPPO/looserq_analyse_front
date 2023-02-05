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
</style>
