<!-- src/views/MainView.vue -->
<template>
  <div v-if="showMenu" class="menu-container">
    <ul class="menu-list">
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        :class="{ selected: hoveredIndex === index }"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
        @click="handleMenu(item.action)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
  <div v-else-if="showCredits" class="credits-container">
    <h2>Credits</h2>
    <p class="credits-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <button @click="backToMenu">Torna al Menu</button>
  </div>
  <div v-else>
    <div class="mazzo">
      <Card
        v-for="card in cards"
        :key="card.city"
        :title="card.city"
        :recruitmentOptions="card.recruitmentOptions"
        :event="card.event"
        :image="card.image"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Card from './components/card.vue';
import { useGameLogic } from './composables/useGameLogic.js'; // <-- aggiornato

export default defineComponent({
  components: {
    Card,
  },
  setup() {
    const showMenu = ref(true);
    const showCredits = ref(false);
    const hoveredIndex = ref(null);

    const menuItems = [
      { label: 'Nuova Partita', action: 'newGame' },
      { label: 'Rivedi Partita', action: 'reviewGame' },
      { label: 'Credits', action: 'credits' },
      { label: 'Esci', action: 'exit' },
    ];

    // Usa la logica di gioco
    const { cards, startGame } = useGameLogic();

    function handleMenu(action) {
      switch (action) {
        case 'newGame':
          showMenu.value = false;
          startGame();
          break;
        case 'reviewGame':
          showMenu.value = false;
          // Logica per rivedere la partita
          break;
        case 'credits':
          showMenu.value = false;
          showCredits.value = true;
          break;
        case 'exit':
          window.close();
          break;
      }
    }

    function backToMenu() {
      showCredits.value = false;
      showMenu.value = true;
    }

    return {
      showMenu,
      showCredits,
      hoveredIndex,
      menuItems,
      cards,
      handleMenu,
      backToMenu,
    };
  },
});
</script>

<style scoped>
.menu-container {
  background: #228b22;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.menu-list li {
  font-size: 2rem;
  color: #fff;
  margin: 20px 0;
  cursor: pointer;
  font-weight: normal;
  transition: font-weight 0.2s;
}

.menu-list li.selected {
  font-weight: bold;
}

.credits-container {
  background: #228b22;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.credits-text {
  color: #fff;
  font-size: 1.2rem;
  max-width: 600px;
  text-align: center;
  margin-bottom: 30px;
}

.mazzo {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 10px;
  padding: 10px;
}

.carta {
  width: 100px;
  border: 2px solid transparent;
  transition: border 0.2s, transform 0.2s;
  cursor: pointer;
}

.carta:hover {
  border: 2px solid #007bff;
  transform: scale(1.1);
}
</style>
