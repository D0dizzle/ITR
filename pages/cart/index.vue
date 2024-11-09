<template>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-6 text-center text-dark-blue">Ihr Warenkorb</h1>

    <!-- Warenkorb-Artikel -->
    <section class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-2xl font-bold mb-4 text-dark-blue">Artikel</h2>
      <div v-for="item in cartItems" :key="item.name" class="flex justify-between items-center mb-4 border-b pb-2">
        <span class="font-semibold text-gray-700">{{ item.name }}</span>
        <span class="text-gray-600">{{ item.price }}</span>
      </div>
    </section>

    <!-- Versteckte Gebühren -->
    <section class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-xl font-bold mb-4 text-dark-blue">Zusätzliche Gebühren</h2>
      <div class="flex justify-between items-center mb-2">
        <span>Servicegebühr</span>
        <span>€29,99</span>
      </div>
      <div class="flex justify-between items-center mb-2">
        <span>Umweltschutzbeitrag (vorausgewählt)</span>
        <input type="checkbox" checked class="mr-2" />
        <span>€5,99</span>
      </div>
    </section>

    <!-- Empfohlene Zusatzprodukte -->
    <section class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-xl font-bold mb-4 text-dark-blue">Empfohlene Produkte</h2>
      <label class="flex items-center justify-between mb-2">
        <span>Schutzfolie für Bildschirm (empfohlen)</span>
        <input type="checkbox" checked class="mr-2" @change="toggleAddon('Schutzfolie')" />
        <span>€14,99</span>
      </label>
      <label class="flex items-center justify-between mb-2">
        <span>Schutzhülle für das Gerät (empfohlen)</span>
        <input type="checkbox" checked class="mr-2" @change="toggleAddon('Schutzhülle')" />
        <span>€19,99</span>
      </label>
    </section>

    <!-- Gesamtsumme -->
    <section class="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
      <div class="flex justify-between items-center font-semibold text-lg">
        <span>Gesamtsumme:</span>
        <span>{{ totalWithFees }}</span>
      </div>
    </section>

    <!-- Button Weiter zur Kasse -->
    <div class="flex justify-end mt-8">
      <NuxtLink to="/checkout" class="bg-turquoise hover:bg-turquoise-dark text-white font-bold py-3 px-6 rounded-lg">
        Weiter zur Kasse
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Beispiel-Warenkorb-Elemente
const cartItems = ref([
  { name: "iPhone 16", price: "€799,99" },
  { name: "AirPods Pro", price: "€199,99" }
])

// Standardmäßig vorausgewählte Zusatzprodukte
const addonItems = ref([
  { name: "Schutzfolie", price: 14.99, selected: true },
  { name: "Schutzhülle", price: 19.99, selected: true },
])

const serviceFee = ref(29.99)
const environmentFee = ref(5.99)

// Berechnung der Gesamtsumme mit versteckten Gebühren und Zusatzprodukten
const totalWithFees = computed(() => {
  const cartTotal = cartItems.value.reduce((sum, item) => {
    return sum + parseFloat(item.price.replace("€", "").replace(",", "."))
  }, 0)

  const addonTotal = addonItems.value.reduce((sum, addon) => {
    return sum + (addon.selected ? addon.price : 0)
  }, 0)

  const total = cartTotal + addonTotal + serviceFee.value + environmentFee.value
  return `€${total.toFixed(2).replace(".", ",")}`
})

function toggleAddon(addonName) {
  const addon = addonItems.value.find(a => a.name === addonName)
  if (addon) {
    addon.selected = !addon.selected
  }
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
