<template>
  <nav class="bg-dark-blue text-turquoise p-4 flex justify-between items-center shadow-lg">
    <div class="flex items-center space-x-2">
      <img src="/assets/images/logo.png" alt="Logo" class="w-10 h-10" />
      <span class="text-3xl font-bold">24/7 Handyshop</span>
    </div>
    <NuxtLink to="/cart" class="relative flex items-center space-x-2">
      <i class="fas fa-shopping-cart text-3xl"></i>
      
      <!-- Anzeigen der Anzahl der Artikel im Warenkorb -->
      <span v-if="cartItemCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-sm">
        {{ cartItemCount }}
      </span>
      
      <!-- Anzeigen des Warenwerts -->
      <div class="ml-2 text-xs text-white">
        <p class="font-semibold">Warenwert: €{{ totalAmount.toFixed(2) }}</p>
      </div>
    </NuxtLink>
  </nav>
</template>

<script setup>
const supabase = useSupabaseClient()


const cartItemCount = ref(0)
const totalAmount = ref(0)


const fetchCart = async () => {
  const { data, error } = await supabase
    .from('warenkorb')
    .select('produkt_id, menge')

  if (error) {
    console.error("Fehler beim Abrufen des Warenkorbs:", error)
    return
  }


  let totalItems = 0
  let total = 0

  for (const item of data) {
    const { data: produktData, error: produktError } = await supabase
      .from('produkte')
      .select('preis')
      .eq('id', item.produkt_id)
      .single()

    if (produktError) {
      console.error("Fehler beim Abrufen des Produkts:", produktError)
      continue
    }

    totalItems += item.menge
    total += produktData.preis * item.menge
  }


  cartItemCount.value = totalItems
  totalAmount.value = total
}


fetchCart()
</script>

<style scoped>
.bg-dark-blue {
  background-color: #1a202c;
}

.text-turquoise {
  color: #0bc3c4;
}


.relative {
  display: flex;
  align-items: center;
  position: relative;
}

.text-xs {
  font-size: 0.75rem;
}


.fas.fa-shopping-cart {
  transition: transform 0.3s ease;
}

.fas.fa-shopping-cart:hover {
  transform: scale(1.1);
}
</style>
