<template>
  <div class="credits-container">
    <h2>Credits</h2>
    <p class="credits-text">Grazie a tutti i collaboratori del progetto.</p>
    <button @click="goBack">Torna al Menu</button>
  </div>
</template>

<script>
import { useGameLogic } from '../composables/useGameLogic.js';
export default {
  setup() {
    const { phase } = useGameLogic();
    const goBack = () => { phase.value = 'menu'; };
    return { goBack };
  },
};
</script>

<style scoped>
.credits-container { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#f5faf5; }
.credits-text { margin: 16px 0 24px; color:#444; }
button { padding:10px 20px; border:none; border-radius:8px; background:#228b22; color:#fff; cursor:pointer; }
</style>