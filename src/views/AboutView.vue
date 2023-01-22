<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { Platform } from "@/enumerations/platform";
import { Queue } from "@/enumerations/queue";
import { Game } from "@/interfaces/game";
import { Participant } from "@/interfaces/participant";
import * as gameService from "@/services/gameService";
import * as participantService from "@/services/participantService";
import * as utilService from "@/services/utilService";
import { defineComponent } from "vue";

export default defineComponent({
  mounted() {
    const dateFin: Date = new Date();
    let dateDebut: Date = new Date();
    dateDebut.setDate(dateFin.getDate() - 200);

    gameService
      .getHistoryByLoginQueueDateCountRegion(
        "Apony",
        Queue.RANKED_SOLO,
        utilService.convertDateToEpochSecond(dateDebut),
        utilService.convertDateToEpochSecond(dateFin),
        10,
        Platform.EUW
      )
      .then((res) => {
        let lstGame: Game[] = res.data;
        console.log("lstGame");
        console.log(lstGame);
        participantService
          .getParticipantByGames(
            lstGame.filter((g) => g.id === "EUW1_6150189228"),
            Queue.RANKED_SOLO,
            Platform.EUW,
            10
          )
          .then((res) => {
            let lstParticipant: Participant[] = res.data;
            console.log("lstParticipant");
            console.log(lstParticipant);
          });
        /*let lstParticipant: Participant[] =
          participantService.getParticipantByPass();
        console.log("lstParticipant");
        console.log(lstParticipant);*/
      });
  },
});
</script>
