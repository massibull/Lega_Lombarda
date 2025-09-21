<template>
  <div class="draft-phase-container">
    <h2>Fase Draft</h2>
    <div class="draft-section">
      <div>
        <h3>Federico Barbarossa</h3>
        <div class="cards-row">
          <div
            class="card placeholder selectable"
            v-for="card in draftCards.barbarossa"
            :key="card.id || card.city"
            @click="onPick('barbarossa', card)"
            title="Seleziona carta"
          >
            <span>🏰 {{ card.city || 'Carta' }}</span>
          </div>
        </div>
      </div>
      <div>
        <h3>Lega Lombarda</h3>
        <div class="cards-row">
          <div
            class="card placeholder selectable"
            v-for="card in draftCards.lega"
            :key="card.id || card.city"
            @click="onPick('lega', card)"
            title="Seleziona carta"
          >
            <span>🛡️ {{ card.city || 'Carta' }}</span>
          </div>
        </div>
      </div>
    </div>
    <p class="hint" v-if="draftPhase === 1">Scegli 1 su 2 e passa l'altra.</p>
    <p class="hint" v-else-if="draftPhase === 2">Scegli 1 su 3 e passa le altre 2.</p>
  </div>
</template>

<script>
import { useGameLogic } from '../composables/useGameLogic.js';

export default {
  setup() {
    const { phase, draftPhase, draftCards, draftPick, draftPickPhase2 } = useGameLogic();

    function onPick(player, card) {
      if (phase.value !== 'draft') return;
      if (draftPhase.value === 1) draftPick(player, card);
      else if (draftPhase.value === 2) draftPickPhase2(player, card);
    }

    return { phase, draftPhase, draftCards, onPick };
  },
};
</script>

<style scoped>
.draft-phase-container { padding: 24px; }
.draft-section { display:flex; gap:48px; justify-content:space-between; }
.cards-row { display:flex; gap:12px; margin-top:8px; flex-wrap:wrap; }
.card.placeholder {
  width:120px; height:160px; display:flex; align-items:center; justify-content:center;
  background:#eee; border-radius:8px; border:2px dashed #bbb;
}
.selectable { cursor:pointer; transition: transform .15s, box-shadow .15s; }
.selectable:hover { transform: translateY(-3px); box-shadow: 0 6px 16px rgba(0,0,0,.15); }
.hint { margin-top: 16px; color:#555; }
</style>