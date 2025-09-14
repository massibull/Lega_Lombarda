
<!-- src/views/MainView.vue -->
<template>
  <div>
    <Card 
      v-for="card in cards" 
      :key="card.city" 
      :title="card.city" 
      :recruitmentOptions="card.recruitmentOptions" 
      :event="card.event" 
      :image="card.image" 
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
//import Card from './card.vue';



export default defineComponent({
  components: {
    Card,
  },
  data() {
    return {
      cards,
    };
  },
  methods: {
    prendiCarta(index) {
      this.cartaSelezionata = this.carte[index]
    }
  }

});
</script>


<style scoped>
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
