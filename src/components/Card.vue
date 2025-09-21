<template>
  <div class="card carta">
    <img v-if="image" :src="imageSrc" alt="Card image" class="card-image" />
    <h3>{{ title }}</h3>
    <p v-if="recruitmentOptions">Reclutamento: {{ recruitmentOptions.join(', ') }}</p>
    <p v-if="event">Evento: {{ event }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    recruitmentOptions: {
      type: Array,
      required: false,
    },
    event: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  computed: {
    imageSrc() {
      return this.image
        ? new URL(`../assets/images/carte/${this.image}`, import.meta.url).href
        : '';
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 4px;
  margin: 10px;
  background-color: #f9f9f9;
}
.card-image {
  width: 100%;
  max-width: 200px;
  margin-bottom: 10px;
  border-radius: 4px;
}
.carta {
  width: 120px;
  border: 2px solid transparent;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  cursor: pointer;
}

.carta:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>