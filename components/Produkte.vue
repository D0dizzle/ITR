<template>
  <div class="bg-gray-100 min-h-screen flex flex-col items-center p-6">
    <h2 class="text-3xl font-bold text-blue-600 mb-6">Verfügbare Produkte</h2>
    <div v-if="produkte.length > 0" class="w-full max-w-lg bg-white rounded-lg shadow-md p-4">
      <ul>
        <li v-for="p in produkte" :key="p.name" class="py-4 border-b last:border-b-0">
          <p class="text-lg font-semibold text-gray-800">{{ p.name }}</p>
        </li>
      </ul>
    </div>
    <div v-else class="text-gray-500">
      <p>Keine Produkte verfügbar.</p>
    </div>
  </div>
</template>

<script setup>


const supabase = useSupabaseClient();
const produkte = ref([]);

const fetchProdukte = async () => {
  const { data } = await supabase
    .from('produkte')
    .select('name'); // Nur die 'name'-Spalte abfragen

  if (data && data.length > 0) {
    produkte.value = data;
    console.log("Produkte gefunden:", produkte.value);
  } else {
    console.log("Keine Produkte verfügbar.");
  }
};

fetchProdukte();
</script>

<style>
/* Keine zusätzlichen Stile erforderlich, alles wird mit Tailwind CSS gestylt */
</style>
