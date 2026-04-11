import { ref } from 'vue'
export function useAppLogic() {
  // Stato App
    const mainPhase = ref('menu'); // 'menu', 'credits', 'review','newgame','exit'
    return { mainPhase };
}