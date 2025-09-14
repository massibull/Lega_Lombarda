<!-- filepath: src/views/GameView.vue -->
<template>
  <div>
    <button @click="startGame">Avvia Partita</button>
    <div v-if="currentCard">
      <Card
        :title="currentCard.city"
        :recruitmentOptions="currentCard.recruitmentOptions"
        :event="currentCard.event"
        :image="currentCard.image"
      />
      <button @click="drawCard">Pesca Carta</button>
    </div>
  </div>
</template>

<script>
import { useGameLogic } from '../composables/useGameLogic';
import Card from '../components/Card.vue';

export default {
  components: { Card },
  setup() {
    const { cards, currentCard, startGame, drawCard } = useGameLogic();
    return { cards, currentCard, startGame, drawCard };
  },
};
</script>