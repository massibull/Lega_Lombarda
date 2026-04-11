<template>
     <MainView v-if="mainPhase === 'menu'" />
</template>

<script>
import { defineComponent } from 'vue';
import { useAppLogic } from './composables/useAppLogic.js';
import MainView from './views/MainView.vue';
import GameView from './views/GameView.vue';
export default defineComponent({
  name: 'AppRoot',
  components: { 
    MainView,
    GameView,
  },

  setup() {
    const { mainPhase } = useAppLogic(); // deve iniziare da 'menu'
    return { mainPhase };

  },

});

// No script logic needed for a static menu
</script>

<style>
.fallback {
  padding: 16px;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial;
}
</style>
