<template>
  <div class="container mx-auto py-8 max-w-screen-lg">
    <h2 class="text-4xl font-bold text-center mb-8">Warenkorb</h2>

    <div v-if="warenkorbProdukte.length > 0">
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div v-for="produkt in warenkorbProdukte" :key="produkt.id" class="flex items-center mb-4 border-b border-gray-200 pb-4">
          <img :src="produkt.bild" alt="Produktbild" class="w-20 h-20 object-cover rounded mr-4" />
          <div class="flex-1">
            <p class="text-lg font-semibold">{{ produkt.name }}</p>
            <p class="text-gray-600">{{ produkt.preis }} €</p>
          </div>
          <div class="flex items-center">
            <button @click="decreaseQuantity(produkt)" class="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">-</button>
            <span class="px-4">{{ produkt.menge }}</span>
            <button @click="increaseQuantity(produkt)" class="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">+</button>
          </div>
          <p class="text-lg font-bold text-green-600 ml-4">{{ (produkt.preis * produkt.menge).toFixed(2) }} €</p>
          <button @click="removeFromCart(produkt)" class="ml-4 text-red-600 hover:text-red-800">Löschen</button>
        </div>
      </div>

      <!-- Gesamtsumme -->
      <div class="text-right text-2xl font-bold mb-6">
        Gesamtsumme: {{ gesamtPreis.toFixed(2) }} €
      </div>

      <!-- Checkout-Button -->
      <div class="flex justify-end">
        <button @click="checkout" class="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Zur Kasse
        </button>
      </div>
    </div>

    <div v-else class="text-center text-lg font-semibold text-gray-600">
      Dein Warenkorb ist leer.
    </div>
  </div>
</template>

<script setup>


const supabase = useSupabaseClient()
const warenkorbProdukte = ref([])

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
      menge: groupedData[id].menge
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

// Checkout-Funktion (Beispiel)
const checkout = () => {
  alert("Checkout wird initiiert...")
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
