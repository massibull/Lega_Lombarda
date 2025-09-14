import { ref, computed } from 'vue';
import cardsData from '../data/cards.js';

export function useGameLogic() {
  // Stato partita
  const round = ref(1);
  const maxRounds = 5;
  const controlloItalia = ref(1); // 1 = lato Barbarossa, 5 = lato Lega
  const barbarossa = ref({
    name: 'Federico Barbarossa',
    color: 'yellow',
    hand: [],
    units: { cavalleria: 0, vescovi: 0, mercanti: 0 },
    cities: [],
    markets: 0,
  });
  const lega = ref({
    name: 'Lega Lombarda',
    color: 'green',
    hand: [],
    units: { cavalleria: 0, vescovi: 0, mercanti: 0 },
    cities: [],
    markets: 0,
  });

  // Mazzo e scarti
  const deck = ref([...cardsData]);
  const discardPile = ref([]);

  // Stato draft
  const draftPhase = ref(1); // 1: 2 carte, 2: 3 carte
  const draftCards = ref({ barbarossa: [], lega: [] });

  // Conflitti aperti
  const conflicts = ref([]); // { city, type, units: { barbarossa: [], lega: [] } }

  // Fase partita
  const phase = ref('draft'); // 'draft', 'azioni', 'risoluzione'

  // Funzioni di utilità
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Draft
  function startDraft() {
    phase.value = 'draft';
    draftPhase.value = 1;
    deck.value = shuffle([...deck.value, ...discardPile.value]);
    discardPile.value = [];
    draftCards.value.barbarossa = deck.value.splice(0, 2);
    draftCards.value.lega = deck.value.splice(0, 2);
  }

  function draftPick(player, pickedCard) {
    // Draft fase 1: scegli 1, l'altra va all'avversario
    const otherPlayer = player === 'barbarossa' ? 'lega' : 'barbarossa';
    const cards = draftCards.value[player];
    const otherCard = cards.find(c => c !== pickedCard);
    if (player === 'barbarossa') {
      barbarossa.value.hand.push(pickedCard);
      lega.value.hand.push(otherCard);
      // Passa turno
      draftCards.value.lega = deck.value.splice(0, 2);
      draftPhase.value = 1.5;
    } else {
      lega.value.hand.push(pickedCard);
      barbarossa.value.hand.push(otherCard);
      // Passa a fase 2
      draftPhase.value = 2;
      draftCards.value.barbarossa = deck.value.splice(0, 3);
      draftCards.value.lega = deck.value.splice(0, 3);
    }
  }

  function draftPickPhase2(player, pickedCard) {
    // Draft fase 2: scegli 1, le altre 2 vanno all'avversario
    const otherPlayer = player === 'barbarossa' ? 'lega' : 'barbarossa';
    const cards = draftCards.value[player];
    const others = cards.filter(c => c !== pickedCard);
    if (player === 'barbarossa') {
      barbarossa.value.hand.push(pickedCard);
      lega.value.hand.push(...others);
      draftPhase.value = 2.5;
    } else {
      lega.value.hand.push(pickedCard);
      barbarossa.value.hand.push(...others);
      // Draft finito, passa alla fase azioni
      phase.value = 'azioni';
    }
  }

  // Setup iniziale dopo il draft (solo primo round)
  function initialSetup() {
    if (round.value === 1) {
      // Piazzamento unità iniziali
      lega.value.units.cavalleria += 1; // esempio: 1 unità a Milano
      barbarossa.value.units.cavalleria += 1; // esempio: 1 unità a Trento/Bergamo
      barbarossa.value.units.cavalleria += 2; // Barbarossa prende 2 unità extra
      lega.value.units.cavalleria += 1; // Lega prende 1 unità extra
    }
  }

  // Fase Azioni
  const currentPlayer = ref('barbarossa'); // chi ha il vantaggio su controlloItalia
  function startActions() {
    phase.value = 'azioni';
    // Determina chi inizia
    currentPlayer.value = controlloItalia.value <= 3 ? 'barbarossa' : 'lega';
  }

  function playCard(player, card, actionType) {
    // actionType: 'conflitto', 'reclutamento', 'potere'
    // Rimuovi la carta dalla mano
    const hand = player === 'barbarossa' ? barbarossa.value.hand : lega.value.hand;
    hand.splice(hand.indexOf(card), 1);

    if (actionType === 'conflitto') {
      conflicts.value.push({
        city: card.city,
        type: null, // da determinare quando si piazza la prima unità
        units: { barbarossa: [], lega: [] },
      });
      discardPile.value.push(card);
    } else if (actionType === 'reclutamento') {
      // Recluta unità dalla riserva
      const units = player === 'barbarossa' ? barbarossa.value.units : lega.value.units;
      const controlled = (player === 'barbarossa' ? barbarossa.value.cities : lega.value.cities).includes(card.city);
      const num = controlled ? card.recruitmentControlled : card.recruitmentFree;
      // Esempio: recluta cavalleria
      units.cavalleria += num;
      discardPile.value.push(card);
    } else if (actionType === 'potere') {
      // Applica potere della carta (da implementare per ogni carta)
      discardPile.value.push(card);
    }
  }

  function deployUnits(player, conflictIndex, unitType, num) {
    // Schiera unità su un conflitto
    const units = player === 'barbarossa' ? barbarossa.value.units : lega.value.units;
    if (units[unitType] >= num) {
      units[unitType] -= num;
      conflicts.value[conflictIndex].units[player].push({ type: unitType, num });
      // Se il conflitto è vuoto, imposta il tipo
      if (!conflicts.value[conflictIndex].type) {
        conflicts.value[conflictIndex].type = unitType;
      }
    }
  }

  // Fase Risoluzione
  function resolveConflicts() {
    phase.value = 'risoluzione';
    conflicts.value.forEach((conflict, idx) => {
      // Calcola forza totale
      const barbTotal = conflict.units.barbarossa.reduce((sum, u) => sum + u.num, 0);
      const legaTotal = conflict.units.lega.reduce((sum, u) => sum + u.num, 0);
      let winner = null;
      if (barbTotal > legaTotal) winner = 'barbarossa';
      else if (legaTotal > barbTotal) winner = 'lega';
      else winner = currentPlayer.value; // pareggio: chi era primo nel round

      // Piazza unità vincente sulla mappa
      if (winner === 'barbarossa') barbarossa.value.cities.push(conflict.city);
      else lega.value.cities.push(conflict.city);

      // Scarta tutte le altre unità (tornano in riserva)
      // ...gestione cavalleria, vescovi, mercanti secondo regole...

      // Passa al prossimo conflitto
    });

    // Controlla condizioni di vittoria
    checkVictory();
    // Aggiorna controllo Italia
    updateControlloItalia();
    // Inizia nuovo round se necessario
    if (!checkVictory() && round.value < maxRounds) {
      startNewRound();
    }
  }

  function checkVictory() {
    // 6 città connesse (da implementare logica di connessione)
    if (barbarossa.value.cities.length >= 6) return 'barbarossa';
    if (lega.value.cities.length >= 6) return 'lega';
    // Tracciato controllo Italia
    if (controlloItalia.value === 5) return 'lega';
    if (controlloItalia.value === 1) return 'barbarossa';
    // Dopo 5 round
    if (round.value === maxRounds) {
      return controlloItalia.value <= 3 ? 'barbarossa' : 'lega';
    }
    return null;
  }

  function updateControlloItalia() {
    // Muovi l’indicatore in base alle città controllate
    const diff = barbarossa.value.cities.length - lega.value.cities.length;
    controlloItalia.value += diff;
    if (controlloItalia.value < 1) controlloItalia.value = 1;
    if (controlloItalia.value > 5) controlloItalia.value = 5;
  }

  function startNewRound() {
    round.value += 1;
    // Rendita mercanti
    barbarossa.value.units.mercanti += barbarossa.value.markets;
    lega.value.units.mercanti += lega.value.markets;
    // Riparti col draft con carte non distribuite
    startDraft();
  }

  return {
    round,
    phase,
    barbarossa,
    lega,
    deck,
    discardPile,
    draftPhase,
    draftCards,
    conflicts,
    controlloItalia,
    currentPlayer,
    startDraft,
    draftPick,
    draftPickPhase2,
    initialSetup,
    startActions,
    playCard,
    deployUnits,
    resolveConflicts,
    checkVictory,
    updateControlloItalia,
    startNewRound,
  };
}