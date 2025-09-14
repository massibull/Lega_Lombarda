<template>
  <div class="container">
    <h1>Seleziona una carta</h1>
    <div class="mazzo">
      <img
        v-for="(carta, index) in carte"
        :key="index"
        :src="carta.src"
        :alt="carta.nome"
        class="carta"
        @click="prendiCarta(index)"
      />
    </div>

    <div v-if="cartaSelezionata" class="selezionata">
      <h2>Hai preso:</h2>
      <img :src="cartaSelezionata.src" :alt="cartaSelezionata.nome" class="carta-grande" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carte: [
        { nome: 'Asso', src: new URL('./assets/carte/asso.png', import.meta.url).href },
        { nome: 'Due', src: new URL('./assets/carte/due.png', import.meta.url).href },
        { nome: 'Tre', src: new URL('./assets/carte/tre.png', import.meta.url).href },
        // Aggiungi altre carte qui
      ],
      cartaSelezionata: null
    }
  },
  methods: {
    prendiCarta(index) {
      this.cartaSelezionata = this.carte[index]
    }
  }
}
</script>

<style scoped>
.container {
  background-color: white;
  text-align: center;
  padding: 20px;
}

.mazzo {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.carta {
  width: 100px;
  cursor: pointer;
  transition: transform 0.2s;
}

.carta:hover {
  transform: scale(1.1);
}

.selezionata {
  margin-top: 20px;
}

.carta-grande {
  width: 200px;
}
</style>
