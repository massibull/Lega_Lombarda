<!-- src/views/MainView.vue -->
<template>
  <MainView v-if="phase === 'menu'" />
  <CreditsView v-else-if="phase === 'credits'" />
  <DraftPhaseView v-else-if="phase === 'draft'" />
  <ReviewView v-else-if="phase === 'review'" />
  <!-- Mostra la vista di gioco anche per 'game' -->
  <GameView
    v-else-if="['game','initialPlacement','showHands','azioni','risoluzione'].includes(phase)"
  />
  <div v-else class="fallback">Fase sconosciuta: {{ phase }}</div>
</template>

<script>
import { defineComponent } from 'vue';
import { useGameLogic } from './composables/useGameLogic.js';
import MainView from './views/MainView.vue';
import CreditsView from './views/CreditsView.vue';
import DraftPhaseView from './views/DraftPhaseView.vue';
import GameView from './views/GameView.vue';
import ReviewView from './views/ReviewView.vue';

export default defineComponent({
  name: 'AppRoot',
  components: { MainView, CreditsView, DraftPhaseView, GameView, ReviewView },
  setup() {
    const { phase } = useGameLogic();
    return { phase };
  },
});
</script>

<style>
.fallback {
  padding: 16px;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial;
}
</style>
