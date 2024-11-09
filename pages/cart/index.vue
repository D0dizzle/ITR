<template>
    <div class="bg-white pt-10 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Ihr Warenkorb</h1>
  
        <div v-if="cartItems.length > 0" class="space-y-4">
          <div v-for="item in cartItems" :key="item.id" class="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <div class="flex items-center">
              <h2 class="text-lg font-semibold">{{ item.name }}</h2>
              <span class="text-gray-500 ml-4">€{{ item.preis.toFixed(2) }}</span>
            </div>
            <div class="flex items-center">
              <button @click="updateQuantity(item, item.anzahl - 1)" class="bg-gray-200 px-2 py-1 rounded" :disabled="item.anzahl <= 1">-</button>
              <span class="mx-2">{{ item.anzahl }}</span>
              <button @click="updateQuantity(item, item.anzahl + 1)" class="bg-gray-200 px-2 py-1 rounded">+</button>
              <button @click="removeFromCart(item.id)" class="text-red-600 ml-4">Entfernen</button>
            </div>
          </div>
  
          <div class="text-right font-bold text-lg mt-4">Gesamtsumme: €{{ totalPrice.toFixed(2) }}</div>
          <NuxtLink to="/checkout" class="block mt-6 bg-green-500 text-white text-center py-3 rounded hover:bg-green-600 transition-colors">
            Weiter zur Kasse
          </NuxtLink>
        </div>
        <p v-else class="text-gray-600 text-center">Ihr Warenkorb ist leer.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  
  // Beispielhafte Daten für den Warenkorb
  const cartItems = ref([
    { id: 1, name: 'iPhone 14', preis: 799.99, anzahl: 1 },
    { id: 2, name: 'Samsung Galaxy S23', preis: 699.99, anzahl: 1 }
  ])
  
  const updateQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id)
    } else {
      item.anzahl = newQuantity
    }
  }
  
  const removeFromCart = (id) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id)
  }
  
  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.preis * item.anzahl, 0)
  })
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  