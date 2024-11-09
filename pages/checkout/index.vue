<template>
  <div class="container mx-auto py-8 max-w-screen-lg px-4">
    <h2 class="text-4xl font-bold text-center mb-8">Checkout</h2>

    <!-- Countdown-Timer für Dringlichkeit -->
    <div v-if="timeLeft > 0" class="bg-red-100 text-red-700 p-4 rounded-lg mb-6 text-center font-bold animate-blink">
      Beeilen Sie sich! Ihr Warenkorb wird in {{ formatTimeLeft }} Minuten freigegeben!
    </div>

    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <!-- Produkte und Kostenübersicht -->
      <div v-for="produkt in warenkorbProdukte" :key="produkt.id" class="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
        <div class="flex items-center">
          <img :src="produkt.bild" alt="Produktbild" class="w-16 h-16 object-cover rounded mr-4" />
          <div>
            <p class="text-lg font-semibold">{{ produkt.name }}</p>
            <p class="text-gray-600">{{ produkt.preis }} €</p>
          </div>
        </div>
        <p class="text-lg font-bold text-green-600">{{ (produkt.preis * produkt.menge).toFixed(2) }} €</p>
      </div>

      <!-- Versteckte Zusatzkosten -->
      <div class="flex justify-between text-lg font-semibold text-gray-500 mb-2">
        <span>Servicepauschale</span>
        <span>9.99 €</span>
      </div>
      <div class="flex justify-between text-lg font-semibold text-gray-500 mb-2">
        <span>Versicherung (obligatorisch)</span>
        <span>4.99 €</span>
      </div>

      <!-- Gesamtsumme inklusive Gebühren -->
      <div class="flex justify-between text-2xl font-bold mb-6">
        <span>Gesamtsumme</span>
        <span>{{ (gesamtPreis + serviceFee + insuranceFee).toFixed(2) }} €</span>
      </div>

      <!-- Zwangs-Opt-in für Newsletter -->
      <div class="flex items-center mb-6">
        <input type="checkbox" id="newsletter" checked disabled class="mr-2 cursor-not-allowed">
        <label for="newsletter" class="text-sm text-gray-600">
          Ich möchte den Newsletter abonnieren und willige ein, regelmäßige Angebote zu erhalten.
        </label>
      </div>

      <!-- Terms and conditions mit kleiner Schriftgröße -->
      <div class="text-sm text-gray-500 mb-6">
        Durch das Abschließen des Kaufvorgangs stimmen Sie unseren <a href="#" class="text-blue-500 underline">Allgemeinen Geschäftsbedingungen</a> und unserer <a href="#" class="text-blue-500 underline">Datenschutzerklärung</a> zu.
      </div>

      <!-- Checkout-Button -->
      <button @click="completePurchase" class="w-full px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
        Jetzt kaufen
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const warenkorbProdukte = ref([
  // Beispielprodukte, ersetzen Sie diese durch tatsächliche Daten aus Ihrem Backend oder Warenkorb
  { id: 1, name: 'Samsung Galaxy S24', bild: '/images/galaxy-s24.jpg', preis: 699.99, menge: 1 },
  { id: 2, name: 'Smartwatch', bild: '/images/smartwatch.jpg', preis: 199.99, menge: 2 }
])
const serviceFee = 9.99
const insuranceFee = 4.99
const timeLeft = ref(300) // 5 Minuten in Sekunden

// Countdown-Timer starten
const startCountdown = () => {
  const timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timer)
    }
  }, 1000)
}

// Funktion zur Formatierung der Zeit in Minuten und Sekunden
const formatTimeLeft = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
})

// Berechnung der Gesamtsumme
const gesamtPreis = computed(() => {
  return warenkorbProdukte.value.reduce((sum, produkt) => sum + produkt.preis * produkt.menge, 0)
})

// Kauf abschließen
const completePurchase = () => {
  alert("Vielen Dank für Ihren Kauf!")
}

// Countdown starten, wenn die Seite geladen wird
onMounted(() => {
  startCountdown()
})
</script>

<style scoped>
.container {
  max-width: 800px;
}

button:focus {
  outline: none;
}

.animate-blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  90% {
    opacity: 0.8;
  }
}
</style>
