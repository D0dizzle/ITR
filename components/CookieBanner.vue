<template>
  <div v-if="isVisible" class="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 text-center z-50">
    <p>Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern.</p>
    <div v-if="!isManagingOptions" class="mt-4">
      <button @click="acceptCookies" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        Akzeptieren
      </button>
      <button @click="toggleOptions" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
        Optionen verwalten
      </button>
    </div>
    <div v-else class="flex flex-col items-center space-y-2 mt-4">
      <label class="flex items-center">
        <input type="checkbox" disabled checked class="mr-2"> Notwendige Cookies
      </label>
      <label class="flex items-center">
        <input type="checkbox" v-model="marketingCookies" class="mr-2"> Marketing-Cookies
      </label>
      <label class="flex items-center">
        <input type="checkbox" v-model="analyticsCookies" class="mr-2"> Analyse-Cookies
      </label>
      <div class="mt-4">
        <button @click="savePreferences" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Speichern
        </button>
        <button @click="toggleOptions" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
          Zurück
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isVisible = ref(true);
const isManagingOptions = ref(false);
const marketingCookies = ref(true);
const analyticsCookies = ref(true);

const acceptCookies = () => {
  isVisible.value = false;
  savePreferences(true, true); // Alles akzeptiert
};

const toggleOptions = () => {
  isManagingOptions.value = !isManagingOptions.value;
};

const savePreferences = (marketing = marketingCookies.value, analytics = analyticsCookies.value) => {
  localStorage.setItem("cookiesAccepted", "true");
  localStorage.setItem("marketingCookies", marketing);
  localStorage.setItem("analyticsCookies", analytics);
  isVisible.value = false;
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

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.space-y-2 > :not(:last-child) {
  margin-bottom: 0.5rem;
}

.mt-4 {
  margin-top: 1rem;
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

.bg-gray-600 {
  background-color: #718096;
}

.hover\:bg-gray-700:hover {
  background-color: #4a5568;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>
