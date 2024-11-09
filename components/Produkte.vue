<template>
  <div class="container mx-auto py-8 max-w-screen-xl">
    <h2 class="text-4xl font-bold text-center mb-8">Verfügbare Produkte</h2>

    <div v-if="produkte.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
      <div v-for="produkt in produkte" :key="produkt.id" class="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-2xl max-w-xs">

        <!-- Produktbild -->
        <img :src="produkt.bild" alt="Produktbild" class="mx-auto h-96 object-cover mb-4" />

        <div class="px-4 pb-4">
          <!-- Produktname -->
          <p class="text-xl font-semibold text-gray-800 mb-2">{{ produkt.name }}</p>

          <!-- Produktbeschreibung -->
          <p class="text-sm text-gray-600 mb-4">{{ produkt.beschreibung }}</p>

          <!-- Preis -->
          <p class="text-lg font-bold text-green-600 mb-4">{{ produkt.preis }} €</p>

          <!-- Verfügbarkeit -->
          <p class="text-sm text-red-600 bg-red-100 inline-block py-1 px-2 rounded-full mb-4">Nur noch 5 Stück verfügbar!</p>
        </div>

        <!-- Warenkorb-Button -->
        <div class="px-4 pb-4 pt-2">
          <button @click="addToCart(produkt)" class="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
            In den Warenkorb
          </button>
        </div>
      </div>
    </div>

    <!-- Benachrichtigung nach Hinzufügen zum Warenkorb -->
    <div v-if="showToast" class="toast fixed bottom-4 right-4 bg-green-600 text-white py-3 px-6 rounded-md shadow-lg">
      <p>Produkt wurde dem Warenkorb hinzugefügt!</p>
      <button @click="closeToast" class="text-white font-bold">Schließen</button>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const produkte = ref([]) 
const showToast = ref(false) 

// Produkte aus der Datenbank laden
const fetchProdukte = async () => {
  const { data, error } = await supabase
    .from('produkte')
    .select('id, name, bild, beschreibung, preis')

  if (data) {
    produkte.value = data
  } else {
    console.error("Fehler beim Abrufen der Produkte:", error)
  }
}

// Produkt zum Warenkorb hinzufügen
const addToCart = async (produkt) => {
  const { data, error } = await supabase
    .from('warenkorb')
    .upsert([
      { produkt_id: produkt.id, menge: 1 }
    ])

  if (data) {
    console.log("Produkt hinzugefügt:", produkt)
    showToast.value = true
    setTimeout(() => { 
      showToast.value = false 
    }, 3000)
  } else {
    console.error("Fehler beim Hinzufügen des Produkts:", error)
  }
}


const closeToast = () => {
  showToast.value = false
}

onMounted(() => {
  fetchProdukte()
})
</script>

<style scoped>
.toast {
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  justify-items: center; /* Zentriert die Produkte in jeder Zelle */
}

img {
  object-fit: cover;
  height: 18rem; /* Bildhöhe angepasst */
}

button {
  transition: all 0.2s ease;
}

button:hover {
  background-color: #1c64f2;
}

button:focus {
  outline: none;
}
</style>
