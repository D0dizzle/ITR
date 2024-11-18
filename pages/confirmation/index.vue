<template>
  <div class="container mx-auto py-16 max-w-screen-lg text-center pt-44 pb-96">
    <h2 class="text-5xl font-extrabold text-green-600 mb-8">Vielen Dank für Ihre Bestellung!</h2>
    <p class="text-2xl text-gray-700 mb-12">Ihre Bestellung wurde erfolgreich aufgegeben.</p>

    <template v-if="isAboSelected">
      <p class="text-xl text-green-500 font-semibold mb-4">
        Ihr monatliches Abo wurde erfolgreich eingerichtet.
      </p>
      <p class="text-base text-gray-600 mb-12">
        Sie können das Abo jederzeit in Ihrem Kundenkonto kündigen.
      </p>
    </template>

    <NuxtLink 
      to="/" 
      class="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-shadow shadow-lg hover:shadow-xl"
    >
      Zurück zur Startseite
    </NuxtLink>
  </div>
</template>


<script setup>
import { useRoute } from 'vue-router';

// Lies den Abo-Status aus der URL
const route = useRoute();
const isAboSelected = route.query.abo === 'true';
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
