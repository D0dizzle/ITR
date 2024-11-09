<template>
    <header class="bg-red-600 text-white p-6 text-center">
      <p class="font-bold text-2xl">Nur heute! <span>{{ minutes }}:{{ seconds }}</span> Minuten für 25% Rabatt!</p>
      <button @click="copyDiscount" class="mt-3 bg-white text-red-600 font-bold py-2 px-4 rounded">Code: JETZT25</button>
    </header>
  </template>
  
  <script setup>
  
  const timeLeft = ref(300) // 5 Minuten in Sekunden
  const minutes = computed(() => Math.floor(timeLeft.value / 60))
  const seconds = computed(() => String(timeLeft.value % 60).padStart(2, '0'))
  
  function copyDiscount() {
    navigator.clipboard.writeText("JETZT25")
    alert("Rabattcode kopiert!")
  }
  
  onMounted(() => {
    setInterval(() => {
      if (timeLeft.value > 0) timeLeft.value--
    }, 1000)
  })
  </script>
  
  <style scoped>
  .bg-red-600 {
    background-color: #ff5f5f;
  }
  </style>
  