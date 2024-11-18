<template>
  <div class="container mx-auto py-8 max-w-screen-lg text-center">
    <h2 class="text-4xl font-bold text-green-600 mb-4">Vielen Dank für Ihre Bestellung!</h2>
    <p class="text-lg text-gray-700 mb-6">Ihre Bestellung wurde erfolgreich aufgegeben.</p>

    <template v-if="isAboSelected">
      <p class="text-lg text-green-500 font-semibold mb-6">
        Ihr monatliches Abo wurde erfolgreich eingerichtet.
      </p>
      <p class="text-sm text-gray-600 mb-8">Sie können das Abo jederzeit in Ihrem Kundenkonto kündigen.</p>
    </template>

    <NuxtLink to="/" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
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
