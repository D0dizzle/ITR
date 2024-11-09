<template>
  <div>
    <!-- Inspiration des Designs von tailwindui -->
    <p class="text-center text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-brand_blue mt-20">Das sagen Kunden über uns</p>
    <div class="slideshow-container relative overflow-hidden w-full max-w-4xl mx-auto mt-14">
      <div class="slides flex transition-transform duration-1000"
           :style="{ 'transform': `translateX(-${currentIndex * 100}%)` }">
        <figure v-for="(slide, index) in slides" :key="index"
                class="slide flex-0-0-auto w-full flex flex-col items-center justify-center p-8 text-center">
          <div class="flex justify-center items-center">
            <template v-for="n in 5">
              <i v-if="n <= slide.stars" class="fa-solid fa-star text-brand_blue" :key="`${n}_full`"></i>
              <i v-else-if="n - 0.5 === slide.stars" class="fa-solid fa-star-half-stroke text-brand_blue" :key="`${n}_half`"></i>
              <i v-else class="fa-solid fa-star" :key="`${n}_empty`"></i>
            </template>
          </div>
          <figcaption class="mt-8 flex items-center flex-col">
            <img class="h-24 w-24 rounded-full" :src="slide.img" :alt="slide.name">
            <div class="mt-2">
              <div class="text-lg font-semibold text-gray-900">{{ slide.name }}</div>
              <div class="text-sm text-gray-600">{{ slide.position }}</div>
            </div>
          </figcaption>
          <blockquote class="mt-8 text-lg font-semibold">
            <p>“{{ slide.quote }}”</p>
          </blockquote>
        </figure>
      </div>
      <button id="prev" @click="prevSlide" class="absolute left-0 inset-y-0 z-10 flex items-center justify-center px-4">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button id="next" @click="nextSlide" class="absolute right-0 inset-y-0 z-10 flex items-center justify-center px-4">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentIndex: 0,
        slides: [
          {
            name: "Judith Bergdorf",
            position: "Geschäftsführerin Workstation",
            quote: "Kompetente Beratung aus Kiel. InnoVision AI konnte unsere Idee innerhalb von 24 Stunden umsetzen.",
            img: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            stars: 5
          },
          {
            name: "Daniel Wagner",
            position: "T-Projektmanager Cloudware",
            quote: "Innerhalb weniger Tage konnten wir unsere Infrastruktur modernisieren.",
            img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            stars: 4.5
          },
          {
            name: "Marisa Hoffmann",
            position: "Datenanalstin Innovate",
            quote: "Durch die innovative Herangehensweise wurden unsere technischen Herausforderungen gelöst.",
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            stars: 5
          },
          {
            name: "Robert Meyer",
            position: "Produktionsleiter DevStack",
            quote: "Mit InnoVision AI haben wir unsere Produktivität deutlich gesteigert und die Qualität unserer Produkte verbessert.",
            img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            stars: 5
          },
          {
            name: "David Schulz",
            position: "Finanzanalyst Energie-Haus",
            quote: "InnoVision AI hat uns dabei unterstützt, eine maßgeschneiderte Lösung zu entwickeln, die perfekt auf unsere Bedürfnisse zugeschnitten ist.",
            img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            stars: 5
          },
          {
            name: "Janne Müller",
            position: "Vertriebsleiterin Techmeister",
            quote: "Dank der Beratung konnten wir unseren Kundenstamm in Rekordzeit erweitern.",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            stars: 4.5
          },
          {
            name: "Ralf Schmidt",
            position: "CMO Brandify",
            quote: "InnoVision AI hat uns geholfen, unsere Marketingkampagnen effizienter zu gestalten.",
            img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            stars: 5
          },
          {
            name: "Sophia Koch",
            position: "CEO DataWorks",
            quote: "Die Beratung und Unterstützung von InnoVision AI waren für uns äußerst hilfreich.",
            img: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            stars: 5
          },
          {
            name: "Emma Richter",
            position: "Produktmanager BauSchraube",
            quote: "InnoVision AI hat unsere Produktentwicklung entscheidend beschleunigt.",
            img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            stars: 5
          },
          {
            name: "Michael Wilson",
            position: "Prozessmanager BlitzTech",
            quote: "InnoVision AI hat unsere Betriebsabläufe optimiert und automatisiert. Vom Bürogebäude aus kann man die FH Kiel sehen.",
            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            stars: 5
          },
                ]
              };
            },
            methods: {
              nextSlide() {
                this.currentIndex = (this.currentIndex + 1) % this.slides.length;
              },
              prevSlide() {
                this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
              }
            }
  };
  </script>
  
  <style scoped>
  .slideshow-container {
    position: relative;
  }

  .slides {
    display: flex;
    width: 100%;
  }

  .slide {
  flex: 0 0 auto;
  width: 100%;
}
  </style>
  

  <!--
  
  SUPABASE_URL="https://eupzyyzqzwltqgzvqdxm.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1cHp5eXpxendsdHFnenZxZHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwODUyOTYsImV4cCI6MjA0NjY2MTI5Nn0.jMiGMX8SR2hhXJqIwS5P78oqSADPJjyyxMBJu5G5JIk"

  
  -->