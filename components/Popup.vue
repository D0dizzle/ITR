<template>
    <div v-if="showPopup" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <h2 class="text-2xl font-bold text-red-600">Nicht verpassen!</h2>
        <p class="mt-4">Erhalten Sie exklusiven Zugang zu unseren Angeboten!</p>
        <button @click="closePopup" class="mt-4 bg-turquoise text-white font-bold py-2 px-4 rounded">Mehr erfahren</button>
        <button @click="closePopup" class="text-gray-400 text-sm mt-4">Schließen</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const showPopup = ref(false)
  
  function closePopup() {
    showPopup.value = false
  }
  
  onMounted(() => {
    setTimeout(() => {
      showPopup.value = true
    }, 15000) // 15 Sekunden Verzögerung
  })
  </script>
  
  <style scoped>
  .bg-turquoise {
    background-color: #0bc3c4;
  }
  </style>
  