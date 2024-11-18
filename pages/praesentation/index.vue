<template>
    <div class="container flex items-center justify-center">
      <!-- Äußere Box -->
      <div class="content-box bg-white text-gray-800 text-center flex flex-col items-center justify-center p-6">
        <!-- Text mit blinkender Zahl -->
        <div class="text-5xl sm:text-8xl font-extrabold">
          Nur noch
          <span class="text-red-600 animate-blink">3</span>
          Fragen übrig
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "BlinkingNumber",
  };
  </script>
  
  <style scoped>
  /* Container-Einstellungen */
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #ffffff; /* Hellgrauer Hintergrund */
  }
  
  /* Blink-Animation */
  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
  
  .animate-blink {
    animation: blink 1s infinite; /* Blinkt alle 1 Sekunde */
  }
  </style>
  