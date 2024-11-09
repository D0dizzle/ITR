<template>
    <div class="bg-white pt-10 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Checkout</h1>
        <div v-for="item in cartItems" :key="item.id" class="flex justify-between items-center">
          <span>{{ item.name }} x{{ item.anzahl }}</span>
          <span>€{{ (item.preis * item.anzahl).toFixed(2) }}</span>
        </div>
        <div class="text-right font-bold text-lg mt-4">Gesamtsumme: €{{ totalPrice.toFixed(2) }}</div>
        <button @click="completeOrder" class="block w-full bg-green-500 text-white text-center py-3 rounded mt-6">
          Bestellung abschließen
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Beispielhafte Daten für Produkte im Warenkorb
  const cartItems = ref([
    { id: 1, name: 'iPhone 14', preis: 799.99, anzahl: 1 },
    { id: 2, name: 'Samsung Galaxy S23', preis: 699.99, anzahl: 1 }
  ])
  
  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.preis * item.anzahl, 0)
  })
  
  const completeOrder = () => {
    alert('Bestellung erfolgreich abgeschlossen!')
    // Hier kannst du den Warenkorb leeren oder andere Aktionen durchführen
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  