<template>
  <nav class="bg-dark-blue text-turquoise p-4 flex justify-between items-center shadow-lg">
    <div class="flex items-center space-x-2">
      <img src="/assets/images/logo.png" alt="Logo" class="w-10 h-10" />
      <span class="text-3xl font-bold">24/7 Handyshop</span>
    </div>
    <NuxtLink to="/checkout" class="relative">
      <i class="fas fa-shopping-cart text-3xl"></i>
      <span class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-sm">3</span>
      <p class="text-xs">Warenwert: €1200,00</p>
    </NuxtLink>
  </nav>
</template>

<script setup>
// Keine Logik erforderlich
</script>

<style scoped>
.bg-dark-blue {
  background-color: #1a202c;
}
.text-turquoise {
  color: #0bc3c4;
}
</style>
