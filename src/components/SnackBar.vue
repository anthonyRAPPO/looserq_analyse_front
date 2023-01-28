<template>
  <v-snackbar :color="color" v-model="isOpen">
    {{ text }}
    <template v-slot:actions>
      <v-btn variant="text" @click="isOpen = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import eventBus from "@/plugins/eventBus";
import { MessageType } from "@/enumerations/messageType";

export default defineComponent({
  name: "SnackBar",
  data() {
    return {
      color: "",
      isOpen: false,
      text: "",
    };
  },
  mounted() {
    eventBus.on("ouvrir-popup", (message) => this.openPopUp(message));
  },
  methods: {
    openPopUp(message: any) {
      if (message && message.text && message.type) {
        this.text = message.text;
        switch (message.type) {
          case MessageType.ERROR: {
            this.color = "error";
            break;
          }
          case MessageType.WARNING: {
            this.color = "warn";
            break;
          }
          case MessageType.INFO: {
            this.color = "info";
            break;
          }
          default: {
            break;
          }
        }
        this.isOpen = true;
      }
    },
  },
});
</script>

<style scoped></style>
