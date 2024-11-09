<template>
  <div v-if="isVisible" class="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 text-center z-50">
    <p>Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern. Ihre Einstellungen:</p>
    <div class="flex justify-center space-x-4 mt-2">
      <label class="flex items-center">
        <input type="checkbox" disabled checked class="mr-2"> Notwendige Cookies
      </label>
      <label class="flex items-center">
        <input type="checkbox" disabled checked class="mr-2"> Marketing-Cookies
      </label>
      <label class="flex items-center">
        <input type="checkbox" disabled checked class="mr-2"> Analyse-Cookies
      </label>
    </div>
    <button @click="acceptCookies" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2">Akzeptieren</button>
  </div>
</template>

<script setup>

const isVisible = ref(true);



const acceptCookies = () => {
  isVisible.value = false;

  localStorage.setItem('cookiesAccepted', 'true');
};
</script>

<style scoped>

.fixed {
  position: fixed;
}

.bg-gray-800 {
  background-color: #2d3748;
}

.text-white {
  color: #ffffff;
}

.p-4 {
  padding: 1rem;
}

.text-center {
  text-align: center;
}

.z-50 {
  z-index: 50;
}

.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.space-x-4 {
  margin-right: 1rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.bg-red-500 {
  background-color: #f56565;
}

.hover\:bg-red-600:hover {
  background-color: #e53e3e;
}

.font-bold {
  font-weight: bold;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.rounded {
  border-radius: 0.25rem;
}

.mt-2 {
  margin-top: 0.5rem;
}
</style>
