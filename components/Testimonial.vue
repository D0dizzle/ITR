<template>
  <div>
    <!-- Inspiration des Designs von tailwindui -->
    <p class="text-center text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-brand_blue mt-20">
      Kundenfeedback zu unseren Leistungen
    </p>
    <div class="slideshow-container relative overflow-hidden w-full max-w-4xl mx-auto mt-14">
      <div class="slides flex transition-transform duration-1000"
           :style="{ 'transform': `translateX(-${currentIndex * 100}%)` }">
        <figure v-for="(slide, index) in slides" :key="index"
                class="slide flex-0-0-auto w-full flex flex-col items-center justify-center p-8 text-center">
          <div class="flex justify-center items-center">
            <template v-for="n in 5">
              <i v-if="n <= slide.stars" class="fa-solid fa-star" style="color: #FFD700" :key="`${n}_full`"></i>
              <i v-else-if="n - 0.5 === slide.stars" class="fa-solid fa-star-half-stroke" style="color: #FFD700" :key="`${n}_half`"></i>
              <i v-else class="fa-solid fa-star text-gray-300" :key="`${n}_empty`"></i>
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
          position: "Verifizierter Kunde",
          quote: "Schnelle Lieferung und top Beratung – ich bin begeistert von meinem neuen Smartphone!",
          img: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          stars: 5
        },
        {
          name: "Daniel Wagner",
          position: "Verifizierter Kunde",
          quote: "Sehr zufrieden! Gute Preise und freundlicher Kundenservice.",
          img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          stars: 5
        },
        {
          name: "Marisa Hoffmann",
          position: "Datenanalystin Innovate",
          quote: "Tolles Smartphone und schnelle Abwicklung, gerne wieder!",
          img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          stars: 5
        },
        {
          name: "Robert Meyer",
          position: "Produktionsleiter DevStack",
          quote: "Dank der Beratung haben wir unser Produkt auf ein neues Level gehoben.",
          img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          stars: 5
        }
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
