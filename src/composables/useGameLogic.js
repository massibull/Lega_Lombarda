import { ref } from 'vue';
import cardsData from '../data/cards.js'; // <-- aggiornato

export function useGameLogic() {
  const cards = ref([...cardsData]);
  const currentCard = ref(null);

  function startGame() {
    // Logica per avviare la partita
    currentCard.value = cards.value[0];
  }

  function drawCard() {
    // Logica per pescare una carta
    currentCard.value = cards.value.shift();
  }

  return {
    cards,
    currentCard,
    startGame,
    drawCard,
  };
}