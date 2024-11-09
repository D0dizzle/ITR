<template>
  <footer class="bg-dark-blue text-white p-8">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 class="text-lg font-bold mb-4">Über uns</h3>
        <p>24/7 Handyshop ist Ihr Partner für die neuesten Smartphones und Zubehör. Jetzt mit exklusiven Angeboten.</p>
      </div>
      <div>
        <h3 class="text-lg font-bold mb-4">Kundenservice</h3>
        <ul>
          <li><NuxtLink to="/faq" class="hover:text-turquoise">Häufige Fragen</NuxtLink></li>
          <li><NuxtLink to="/contact" class="hover:text-turquoise">Kontakt</NuxtLink></li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-bold mb-4">Kontakt</h3>
        <p>Telefon: +49 123 456 789</p>
        <p>Email: info@247handyshop.de</p>
      </div>
    </div>
    <div class="mt-8 text-center text-sm text-gray-500">
      &copy; 2024 24/7 Handyshop. Alle Rechte vorbehalten.
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.bg-dark-blue {
  background-color: #1a202c;
}
</style>
