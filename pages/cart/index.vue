<template>
  <div class="w-full h-full mx-auto py-20 max-w-screen-lg px-4 mb-96">
    <h2 class="text-4xl font-bold text-center mb-8">Warenkorb</h2>

    <!-- Countdown-Timer für Dringlichkeit -->
    <div v-if="timeLeft > 0" class="bg-red-100 text-red-700 p-4 rounded-lg mb-6 text-center font-bold animate-blink">
      Beeilen Sie sich! Ihr Warenkorb ist nur noch {{ formatTimeLeft }} Minuten reserviert!
    </div>

    <div v-if="warenkorbProdukte.length > 0">
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div v-for="produkt in warenkorbProdukte" :key="produkt.id" class="flex flex-col sm:flex-row items-center mb-4 border-b border-gray-200 pb-4">
          <img :src="produkt.bild" alt="Produktbild" class="w-20 h-20 object-cover rounded mb-4 sm:mb-0 sm:mr-4" />
          <div class="flex-1 text-center sm:text-left">
            <p class="text-lg font-semibold">{{ produkt.name }}</p>
            <p class="text-gray-600">{{ produkt.preis }} €</p>
            <p v-if="produkt.beliebt" class="text-sm text-green-500">Beliebt! {{ produkt.popularCount }} Nutzer haben dies heute gekauft.</p>
          </div>
          <div class="flex items-center space-x-2 justify-center mt-4 sm:mt-0 mr-auto sm:ml-4">
            <button @click="decreaseQuantity(produkt)" class="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">-</button>
            <span class="px-4">{{ produkt.menge }}</span>
            <button @click="increaseQuantity(produkt)" class="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">+</button>
          </div>
          <p class="text-lg font-bold text-green-600 mt-4 sm:mt-0 sm:ml-4">{{ (produkt.preis * produkt.menge).toFixed(2) }} €</p>
          <button @click="removeFromCart(produkt)" class="mt-4 sm:mt-0 sm:ml-4 text-red-600 hover:text-red-800">Löschen</button>
        </div>
      </div>

      <!-- Zusätzliche Servicepauschale -->
      <div class="text-right text-xl font-bold text-gray-500 mb-6">
        Servicepauschale: 9.99 €
      </div>

      <!-- Gesamtsumme inklusive Servicepauschale -->
      <div class="text-right text-2xl font-bold mb-6">
        Gesamtsumme: {{ (gesamtPreis + serviceFee).toFixed(2) }} €
      </div>

      <!-- Checkout-Button ohne Bewegung -->
      <div class="flex justify-end">
        <button @click="goToCheckout" class="px-6 py-3 mb-96 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Zur Kasse
        </button>

      </div>
    </div>

    <div v-else class="text-center text-lg font-semibold text-gray-600">
      Dein Warenkorb ist leer.
    </div>
  </div>

  <!-- Popup für Dringlichkeit nach 30 Sekunden -->
  <div v-if="showPopup" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg shadow-lg text-center">
      <p class="text-2xl font-bold mb-4">Nicht verpassen!</p>
      <p class="mb-6">Sichern Sie sich Ihre Produkte, bevor sie vergriffen sind!</p>
      <button @click="closePopup" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Schnell zur Kasse!
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const supabase = useSupabaseClient()
const warenkorbProdukte = ref([])
const serviceFee = 9.99
const timeLeft = ref(300) // 5 Minuten in Sekunden
const showPopup = ref(false)

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

// Produkte aus der Supabase-Datenbank laden
const fetchWarenkorbProdukte = async () => {
  const { data: warenkorbData, error: warenkorbError } = await supabase
    .from('warenkorb')
    .select('produkt_id, menge')

  if (warenkorbError) {
    console.error("Fehler beim Abrufen des Warenkorbs:", warenkorbError)
    return
  }

  // Gruppiere die Produkte nach produkt_id und summiere die Mengen
  const groupedData = warenkorbData.reduce((acc, item) => {
    if (acc[item.produkt_id]) {
      acc[item.produkt_id].menge += item.menge
    } else {
      acc[item.produkt_id] = { ...item }
    }
    return acc
  }, {})

  const produktIds = Object.keys(groupedData)
  const { data: produkteData, error: produkteError } = await supabase
    .from('produkte')
    .select('id, name, bild, preis')
    .in('id', produktIds)

  if (produkteError) {
    console.error("Fehler beim Abrufen der Produkte:", produkteError)
    return
  }

  // Erstelle die endgültige Liste von Warenkorbprodukten mit Menge und Produktdetails
  warenkorbProdukte.value = produktIds.map(id => {
    const produkt = produkteData.find(p => p.id === parseInt(id))
    return {
      ...produkt,
      menge: groupedData[id].menge,
      beliebt: true, // Alle Produkte als beliebt markieren
      popularCount: Math.floor(Math.random() * 50) + 1 // Zufällige Anzahl als Social Proof
    }
  })
}

// Menge erhöhen
const increaseQuantity = async (produkt) => {
  const updatedMenge = produkt.menge + 1
  const { error } = await supabase
    .from('warenkorb')
    .update({ menge: updatedMenge })
    .eq('produkt_id', produkt.id)

  if (!error) {
    produkt.menge = updatedMenge
  } else {
    console.error("Fehler beim Aktualisieren der Menge:", error)
  }
}

// Menge verringern
const decreaseQuantity = async (produkt) => {
  if (produkt.menge > 1) {
    const updatedMenge = produkt.menge - 1
    const { error } = await supabase
      .from('warenkorb')
      .update({ menge: updatedMenge })
      .eq('produkt_id', produkt.id)

    if (!error) {
      produkt.menge = updatedMenge
    } else {
      console.error("Fehler beim Aktualisieren der Menge:", error)
    }
  }
}

// Produkt aus dem Warenkorb entfernen
const removeFromCart = async (produkt) => {
  const { error } = await supabase
    .from('warenkorb')
    .delete()
    .eq('produkt_id', produkt.id)

  if (!error) {
    warenkorbProdukte.value = warenkorbProdukte.value.filter(p => p.id !== produkt.id)
  } else {
    console.error("Fehler beim Entfernen des Produkts:", error)
  }
}

// Berechnung der Gesamtsumme
const gesamtPreis = computed(() => {
  return warenkorbProdukte.value.reduce((sum, produkt) => sum + produkt.preis * produkt.menge, 0)
})

// Popup nach 30 Sekunden anzeigen
setTimeout(() => {
  showPopup.value = true
}, 15000)

const closePopup = () => {
  showPopup.value = false
}

// Checkout-Funktion (Beispiel)
const goToCheckout = () => {
  router.push('/checkout')
}

onMounted(() => {
  fetchWarenkorbProdukte()
  startCountdown()
})
</script>

<style scoped>

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
