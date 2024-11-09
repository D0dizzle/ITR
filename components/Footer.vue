<template>
    <footer class="bg-gray-800 text-white pt-12 pb-4">
      <div class="container mx-auto px-6">
        <div class="grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
          <div class="mb-10">
            <h2 class="text-md font-semibold mb-4">Rechtliches</h2>
            <ul class="space-y-3">
              <li>
                <NuxtLink to="/impressum">
                  <a class="text-white hover:text-brand_blue">Impressum</a>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/datenschutz">
                  <a class="text-white hover:text-brand_blue">Datenschutz</a>
                </NuxtLink>
              </li>
              <li>
                <a href="https://fh-kiel-shop.de/agb" class="text-white hover:text-brand_blue">AGBs</a>
              </li>
            </ul>
          </div>
  
          <div class="mb-10">
            <h2 class="text-md font-semibold mb-4">Hilfreiches</h2>
            <ul class="space-y-3">
              <li>
                <NuxtLink to="/karriere">
                  <a class="text-white hover:text-brand_blue">Karriere</a>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/kontakt">
                  <a class="text-white hover:text-brand_blue">Kontakt</a>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/#ueberuns">
                  <a class="text-white hover:text-brand_blue">Über uns</a>
                </NuxtLink>
              </li>
            </ul>
          </div>
  
          <div class="mb-10">
            <h2 class="text-md font-semibold mb-4">Unser Standort</h2>
            <div class="overflow-hidden rounded-md shadow-md h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2325.250813583177!2d10.175569477768937!3d54.35254877259833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b257d4c5ceee4f%3A0xc155a64efb3704d6!2sStrandweg%201%2C%2024248%20M%C3%B6nkeberg!5e0!3m2!1sen!2sde!4v1714462890027!5m2!1sen!2sde"
                width="100%"
                height="100%"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
          
          <!-- Social Media -->
          <div class="mb-10 lg:pl-10">
            <h2 class="text-md font-semibold mb-6">Folge uns</h2>
            <div class="flex flex-wrap gap-4 items-center">
              <a href="https://www.facebook.com/?locale=de_DE" class="text-gray-400 hover:text-blue-600 text-3xl transition duration-300 ease-in-out">
                <i class="fa-brands fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com" class="text-gray-400 hover:text-pink-600 text-3xl transition duration-300 ease-in-out">
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a href="https://de.linkedin.com/" class="text-gray-400 hover:text-blue-700 text-3xl transition duration-300 ease-in-out">
                <i class="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://www.youtube.com/" class="text-gray-400 hover:text-red-600 text-3xl transition duration-300 ease-in-out">
                <i class="fa-brands fa-youtube"></i>
              </a>
              <a href="https://github.com" class="text-gray-400 hover:text-white text-3xl transition duration-300 ease-in-out">
                <i class="fa-brands fa-x"></i>
              </a>
            </div>
          </div>
  
          <div class="mb-10 lg:pl-10">
            <h2 class="text-md font-semibold mb-4">Login</h2>
            <ul>
              <li><a href="/karriereportal" class="text-white hover:text-brand_blue">Karriereportal</a></li>
            </ul>
          </div>
        </div>
        <div class="mt-1">
          <p class="text-white">&copy; 2024 InnoVisionAI. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  </style>
  