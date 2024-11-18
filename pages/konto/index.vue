<template>
    <div class="container mx-auto py-8 max-w-screen-lg px-4">
      <h2 class="text-4xl font-bold text-center mb-8">Mein Konto</h2>
  
      <!-- Rückmeldung -->
      <div v-if="feedbackMessage" :class="feedbackClass" class="p-4 rounded-lg mb-6 text-center">
        {{ feedbackMessage }}
      </div>
  
      <!-- Abonnement-Details -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 class="text-2xl font-semibold mb-4">Ihr Abonnement</h3>
        <p class="text-gray-700 mb-4">
          Sie haben das <strong>Premium-Abo</strong>, das Ihnen folgende Vorteile bietet:
        </p>
        <ul class="list-disc list-inside mb-4 text-gray-700">
          <li>Exklusive Rabatte</li>
          <li>Früher Zugang zu Angeboten</li>
          <li>Persönlicher Kundenservice</li>
        </ul>
        <p class="text-gray-600">
          Nächste Abbuchung: <strong>{{ nextPaymentDate }}</strong>
        </p>
  
        <!-- Kündigungsprozess -->
        <div class="mt-6">
          <button @click="startCancellation" class="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
            Mein Abo ändern
          </button>
        </div>
      </div>
  
      <!-- Kündigungsprozess -->
      <div v-if="isCancelling" class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 class="text-2xl font-semibold mb-4">Sind Sie sicher?</h3>
        <p class="text-gray-700 mb-4">
          Wir bedauern, dass Sie Ihr Abo kündigen möchten. Haben Sie unser <strong>exklusives Angebot</strong> gesehen? 
          Sie könnten <strong>3 Monate kostenlos</strong> erhalten, wenn Sie bleiben!
        </p>
        <div class="flex space-x-4">
          <button @click="acceptOffer" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Angebot annehmen
          </button>
          <button @click="proceedToCancellation" class="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
            Weiter zur Kündigung
          </button>
        </div>
      </div>
  
      <div v-if="isFinalStep" class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 class="text-2xl font-semibold mb-4">Abonnement kündigen</h3>
        <p class="text-gray-700 mb-4">
          Bitte teilen Sie uns mit, warum Sie kündigen möchten. Ihre Meinung hilft uns, uns zu verbessern.
        </p>
        <textarea v-model="cancellationReason" rows="4" class="w-full border rounded-lg p-4 mb-4" placeholder="Geben Sie hier Ihre Gründe ein..."></textarea>
        <div class="flex space-x-4">
          <button @click="cancelSubscription" class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">
            Kündigung bestätigen
          </button>
          <button @click="backToAccount" class="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
            Abbrechen und zurück
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  const nextPaymentDate = "15. Dezember 2024";
  const isCancelling = ref(false);
  const isFinalStep = ref(false);
  const feedbackMessage = ref("");
  const feedbackType = ref(""); // "success" oder "error"
  const cancellationReason = ref("");
  
  const feedbackClass = computed(() => {
    return feedbackType.value === "success"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  });
  
  const startCancellation = () => {
    isCancelling.value = true;
  };
  
  const acceptOffer = () => {
    feedbackMessage.value = "Sie haben das exklusive Angebot angenommen! Ihr Abo läuft weiter.";
    feedbackType.value = "success"; // Grün
    resetFeedbackAfterDelay();
    isCancelling.value = false;
  };
  
  const proceedToCancellation = () => {
    isCancelling.value = false;
    isFinalStep.value = true;
  };
  
  const cancelSubscription = () => {
    if (!cancellationReason.value) {
      feedbackMessage.value = "Bitte geben Sie einen Kündigungsgrund an.";
      feedbackType.value = "error"; // Rot
      resetFeedbackAfterDelay();
      return;
    }
    feedbackMessage.value = "Ihr Abonnement wurde erfolgreich gekündigt. Wir bedauern Ihren Verlust.";
    feedbackType.value = "error"; // Rot
    resetFeedbackAfterDelay();
    isFinalStep.value = false;
  };
  
  const backToAccount = () => {
    isCancelling.value = false;
    isFinalStep.value = false;
  };
  
  const resetFeedbackAfterDelay = () => {
    setTimeout(() => {
      feedbackMessage.value = "";
    }, 5000); // Nachricht nach 5 Sekunden entfernen
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  button:focus {
    outline: none;
  }
  </style>
  