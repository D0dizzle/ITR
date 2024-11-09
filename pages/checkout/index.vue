<template>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-6 text-center text-dark-blue">Checkout</h1>
    
    <!-- Warenkorb Übersicht -->
    <section class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-2xl font-bold mb-4 text-dark-blue">Ihr Warenkorb</h2>
      <div v-for="item in cartItems" :key="item.name" class="flex justify-between items-center mb-2">
        <span class="font-semibold text-gray-700">{{ item.name }}</span>
        <span class="text-gray-600">{{ item.price }}</span>
      </div>
      <div class="flex justify-between items-center font-semibold text-lg border-t pt-2 mt-2">
        <span>Gesamtsumme:</span>
        <span>{{ cartTotal }}</span>
      </div>
    </section>
    
    <!-- Zwangsabo -->
    <section class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-xl font-bold mb-4 text-dark-blue">Zusätzliche Optionen</h2>
      <label class="flex items-center justify-between mb-2">
        <span>Exklusives Abo für zukünftige Rabatte (monatlich)</span>
        <input type="checkbox" checked class="mr-2" />
      </label>
      <p class="text-xs text-gray-500">* Automatische Erneuerung, nur monatlich kündbar</p>
    </section>

    <!-- Versteckte Zusatzkosten -->
    <section class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-xl font-bold mb-4 text-dark-blue">Zusätzliche Kosten</h2>
      <div class="flex justify-between items-center mb-2">
        <span>Servicegebühr</span>
        <span>€29,99</span>
      </div>
      <div class="flex justify-between items-center mb-2">
        <span>Versicherung (optional, aber vorausgewählt)</span>
        <input type="checkbox" checked class="mr-2" />
        <span>€19,99</span>
      </div>
      <p class="text-right font-bold text-lg mt-2">Gesamtkosten: {{ totalWithFees }}</p>
    </section>

    <!-- Zahlungsoptionen -->
    <section class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-xl font-bold mb-4 text-dark-blue">Zahlungsmethode</h2>
      <label class="block mb-4">
        <span class="block text-sm font-medium text-gray-700">Kreditkarte</span>
        <input type="text" placeholder="Kartennummer" class="mt-1 p-2 border rounded w-full" />
      </label>
      <label class="block mb-4">
        <span class="block text-sm font-medium text-gray-700">Sofortüberweisung</span>
        <button class="w-full p-2 bg-green-500 text-white rounded">Mit Sofortüberweisung zahlen</button>
      </label>
    </section>

    <!-- Kauf abschließen -->
    <div class="flex justify-between items-center mt-8">
      <NuxtLink to="/" class="text-gray-500 hover:text-gray-700">Zurück zum Shop</NuxtLink>
      <button @click="placeOrder" class="bg-turquoise hover:bg-turquoise-dark text-white font-bold py-2 px-6 rounded-lg">
        Jetzt kaufen
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Beispiel-Warenkorb-Elemente und Preise
const cartItems = ref([
  { name: "iPhone 16", price: "€799,99" },
  { name: "Versicherungspaket", price: "€19,99" }
])

const cartTotal = ref("€819,98")
const serviceFee = ref(29.99)
const insuranceFee = ref(19.99)

// Berechnung der Gesamtkosten inklusive Zusatzkosten
const totalWithFees = computed(() => {
  const total = parseFloat(cartTotal.value.replace("€", "").replace(",", "."))
  return `€${(total + serviceFee.value + insuranceFee.value).toFixed(2).replace(".", ",")}`
})

function placeOrder() {
  alert("Vielen Dank für Ihre Bestellung!")
}
</script>

<style scoped>
.bg-dark-blue {
  background-color: #1a202c;
}
.text-dark-blue {
  color: #1a202c;
}
.bg-turquoise {
  background-color: #0bc3c4;
}
.bg-turquoise-dark {
  background-color: #09a3a3;
}
</style>
