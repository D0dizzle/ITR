<template>
  <header class="bg-red-600 text-white p-6 text-center">
    <p class="font-bold text-2xl">
      Nur heute! Noch <span>{{ minutes }}:{{ seconds }}</span> Minuten für 25% Rabatt!
    </p>
    <button
      @click="copyDiscount"
      :class="buttonClass"
      class="mt-3 font-bold py-2 px-4 rounded transition duration-300"
    >
      {{ buttonText }}
    </button>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const timeLeft = ref(300); // 5 Minuten in Sekunden
const minutes = computed(() => Math.floor(timeLeft.value / 60));
const seconds = computed(() => String(timeLeft.value % 60).padStart(2, "0"));

const buttonText = ref("Code: JETZT25");
const buttonClass = ref("bg-white text-red-600");

function copyDiscount() {
  navigator.clipboard.writeText("JETZT25");
  buttonText.value = "Code kopiert!";
  buttonClass.value = "bg-green-600 text-white";

  setTimeout(() => {
    buttonText.value = "Code: JETZT25";
    buttonClass.value = "bg-white text-red-600";
  }, 3000); // Button nach 3 Sekunden zurücksetzen
}

onMounted(() => {
  setInterval(() => {
    if (timeLeft.value > 0) timeLeft.value--;
  }, 1000);
});
</script>

<style scoped>
.bg-red-600 {
  background-color: #ff5f5f;
}

button {
  transition: all 0.3s ease-in-out;
}

button:hover {
  transform: scale(1.05);
}

button:focus {
  outline: none;
}
</style>
