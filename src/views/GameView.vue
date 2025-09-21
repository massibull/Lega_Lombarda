<template>
  <div class="game-root">
    <aside class="sidebar">
      <h3>Fasi partita</h3>
      <ul>
        <li v-for="p in phases" :key="p.key" :class="{ active: phase === p.key }">
          {{ p.label }}
        </li>
      </ul>
    </aside>

    <main class="main-area">
      <section class="player-bar top-bar">
        <div class="player-name">{{ barbarossa.name }}</div>
        <div class="counters">
          <div class="counter">Cavalleria: <strong>{{ barbarossa.units.cavalleria }}</strong></div>
          <div class="counter">Vescovi: <strong>{{ barbarossa.units.vescovi }}</strong></div>
          <div class="counter">Mercanti: <strong>{{ barbarossa.units.mercanti }}</strong></div>
        </div>
      </section>

      <section class="map-area">
        <div class="map-placeholder">Mappa (placeholder)</div>
      </section>

      <section class="player-bar bottom-bar">
        <div class="player-name">{{ lega.name }}</div>
        <div class="counters">
          <div class="counter">Cavalleria: <strong>{{ lega.units.cavalleria }}</strong></div>
          <div class="counter">Vescovi: <strong>{{ lega.units.vescovi }}</strong></div>
          <div class="counter">Mercanti: <strong>{{ lega.units.mercanti }}</strong></div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useGameLogic } from '../composables/useGameLogic.js';

export default {
  setup() {
    const { phase: phaseRef, barbarossa: bRef, lega: lRef } = useGameLogic();

    const phases = [
      { key: 'draft', label: 'Influenza (Draft)' },
      { key: 'initialPlacement', label: 'Piazzamento iniziale' },
      { key: 'showHands', label: 'Mostra mani' },
      { key: 'azioni', label: 'Azioni' },
      { key: 'risoluzione', label: 'Risoluzione' },
    ];

    const phase = computed(() => phaseRef.value);
    const barbarossa = computed(() => bRef.value);
    const lega = computed(() => lRef.value);

    return { phase, phases, barbarossa, lega };
  },
};
</script>

<style scoped>
.game-root { display: flex; height: 100vh; overflow: hidden; }
.sidebar { width: 240px; background: #fff; border-right: 1px solid #e6e6e6; padding: 16px; text-align: center; }
.sidebar ul { margin: 0; padding: 0; }
.sidebar li { list-style: none; padding: 8px; border-radius: 6px; margin: 6px 0; }
.sidebar li.active { background: #fff59d; font-weight: 700; }

.main-area { flex: 1; display: flex; flex-direction: column; background: #e9f6e9; }
.player-bar { display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; }
.top-bar { border-bottom: 1px solid #ddd; }
.bottom-bar { border-top: 1px solid #ddd; }
.player-name { font-weight: 700; }
.counters { display: flex; gap: 12px; flex-wrap: wrap; }
.counter { background: rgba(255,255,255,0.9); padding: 4px 8px; border-radius: 6px; }

.map-area { flex: 1; display: flex; align-items: center; justify-content: center; padding: 12px; }
.map-placeholder { width: 95%; height: 95%; border-radius: 8px; border: 2px dashed #c9e0c9; display:flex; align-items:center; justify-content:center; color:#3a5; background:#f7fbf7; }
</style>