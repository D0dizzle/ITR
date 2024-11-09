<template>
    <div>
      <h2>Verfügbare Produkte</h2>
      <div v-if="produkte.length > 0">
        <p v-for="p in produkte" :key="p.name">
          {{ p.name }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  
  
  const supabase = useSupabaseClient();
  const produkte = ref([]); // Stelle sicher, dass produkte als leeres Array initialisiert ist
  
  const fetchProdukte = async () => {
    const { data } = await supabase
      .from('produkte')
      .select('name'); // Nur die 'name'-Spalte abfragen
  
    if (data && data.length > 0) {
      produkte.value = data; // Aktualisiert produkte reaktiv
      console.log("Produkte gefunden:", produkte.value); // Debugging im Terminal
    } else {
      console.log("Keine Produkte verfügbar."); // Debugging im Terminal
    }
  };
  
  fetchProdukte();
  
  </script>