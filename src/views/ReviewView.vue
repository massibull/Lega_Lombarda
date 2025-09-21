<template>
  <div class="review-root">
    <h2>Rivedi Partita</h2>
    <p>Funzionalità in sviluppo.</p>
    <button @click="back">Torna al Menu</button>
  </div>
</template>

<script>
import { useGameLogic } from '../composables/useGameLogic.js';
export default {
  setup() {
    const { phase } = useGameLogic();
    const back = () => { phase.value = 'menu'; };
    return { back };
  },
};
</script>

<style scoped>
.review-root { min-height: 100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#f5faf5; gap:12px; }
button { padding:10px 20px; border:none; border-radius:8px; background:#228b22; color:#fff; cursor:pointer; }
</style>