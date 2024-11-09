<template>
  <div class="container mx-auto py-8 max-w-screen-lg px-4">
    <h2 class="text-4xl font-bold text-center mb-8">Checkout</h2>

    <!-- Übersicht der Artikel -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 class="text-2xl font-semibold mb-4">Bestellübersicht</h3>
      <div v-for="produkt in warenkorbProdukte" :key="produkt.id" class="flex flex-col sm:flex-row items-center mb-4 border-b border-gray-200 pb-4">
        <img :src="produkt.bild" alt="Produktbild" class="w-20 h-20 object-cover rounded mb-4 sm:mb-0 sm:mr-4" />
        <div class="flex-1 text-center sm:text-left">
          <p class="text-lg font-semibold">{{ produkt.name }}</p>
          <p class="text-gray-600">{{ produkt.preis }} € x {{ produkt.menge }}</p>
        </div>
        <p class="text-lg font-bold text-green-600 mt-4 sm:mt-0 sm:ml-4">{{ (produkt.preis * produkt.menge).toFixed(2) }} €</p>
      </div>

      <!-- Gesamtsumme -->
      <div class="text-right text-xl font-bold text-gray-700 mt-6">
        Gesamtsumme: {{ (gesamtPreis + serviceFee).toFixed(2) }} €
      </div>
    </div>

    <!-- Rechnungsadresse -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 class="text-2xl font-semibold mb-4">Rechnungsadresse</h3>
      <form @submit.prevent="placeOrder">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="vorname" class="block text-gray-700 font-semibold">Vorname</label>
            <input type="text" id="vorname" v-model="billingDetails.vorname" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div>
            <label for="nachname" class="block text-gray-700 font-semibold">Nachname</label>
            <input type="text" id="nachname" v-model="billingDetails.nachname" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
        </div>
        <div class="mb-4">
          <label for="adresse" class="block text-gray-700 font-semibold">Adresse</label>
          <input type="text" id="adresse" v-model="billingDetails.adresse" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label for="plz" class="block text-gray-700 font-semibold">PLZ</label>
            <input type="text" id="plz" v-model="billingDetails.plz" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div>
            <label for="stadt" class="block text-gray-700 font-semibold">Stadt</label>
            <input type="text" id="stadt" v-model="billingDetails.stadt" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div>
            <label for="land" class="block text-gray-700 font-semibold">Land</label>
            <input type="text" id="land" v-model="billingDetails.land" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
        </div>
      </form>
    </div>

    <!-- Zahlungsmethode -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 class="text-2xl font-semibold mb-4">Zahlungsmethode</h3>
      <div>
        <label class="flex items-center mb-4">
          <input type="radio" value="Kreditkarte" v-model="paymentMethod" class="form-radio h-5 w-5 text-blue-600" />
          <span class="ml-2 text-gray-700">Kreditkarte</span>
        </label>
        <label class="flex items-center mb-4">
          <input type="radio" value="PayPal" v-model="paymentMethod" class="form-radio h-5 w-5 text-blue-600" />
          <span class="ml-2 text-gray-700">PayPal</span>
        </label>
        <label class="flex items-center">
          <input type="radio" value="Banküberweisung" v-model="paymentMethod" class="form-radio h-5 w-5 text-blue-600" />
          <span class="ml-2 text-gray-700">Banküberweisung</span>
        </label>
      </div>
    </div>

    <!-- Bestellbestätigung -->
    <div class="text-right">
      <button @click="placeOrder" class="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
        Bestellung abschicken
      </button>
    </div>
  </div>
</template>

<script setup>


const supabase = useSupabaseClient()
const warenkorbProdukte = ref([])
const serviceFee = 9.99

const billingDetails = ref({
  vorname: '',
  nachname: '',
  adresse: '',
  plz: '',
  stadt: '',
  land: '',
})

const paymentMethod = ref('Kreditkarte')

// Funktion zum Laden der Warenkorbprodukte aus Supabase
const fetchWarenkorbProdukte = async () => {
  const { data: warenkorbData, error: warenkorbError } = await supabase
    .from('warenkorb')
    .select('produkt_id, menge')

  if (warenkorbError) {
    console.error("Fehler beim Abrufen des Warenkorbs:", warenkorbError)
    return
  }

  const produktIds = warenkorbData.map(item => item.produkt_id)
  const { data: produkteData, error: produkteError } = await supabase
    .from('produkte')
    .select('id, name, bild, preis')
    .in('id', produktIds)

  if (produkteError) {
    console.error("Fehler beim Abrufen der Produkte:", produkteError)
    return
  }

  warenkorbProdukte.value = warenkorbData.map(item => {
    const produkt = produkteData.find(p => p.id === item.produkt_id)
    return {
      ...produkt,
      menge: item.menge
    }
  })
}

const gesamtPreis = computed(() => {
  return warenkorbProdukte.value.reduce((sum, produkt) => sum + produkt.preis * produkt.menge, 0)
})

const placeOrder = () => {
  alert('Bestellung wurde erfolgreich abgeschickt!')
  // Weitere Logik für die Bestellabwicklung hinzufügen
}

onMounted(() => {
  fetchWarenkorbProdukte()
})
</script>

<style scoped>
.container {
  max-width: 800px;
}
button:focus {
  outline: none;
}
</style>
