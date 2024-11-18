<template>
  <div class="container mx-auto py-8 max-w-screen-lg px-4 pb-96">
    <h2 class="text-4xl font-bold text-center mb-8">Checkout</h2>

    <!-- Übersicht der Artikel -->
<div class="bg-white rounded-lg shadow-lg p-6 mb-6">
  <h3 class="text-2xl font-semibold mb-4">Bestellübersicht</h3>
  
  <!-- Artikel im Warenkorb -->
  <div v-for="produkt in warenkorbProdukte" :key="produkt.id" class="flex flex-col sm:flex-row items-center mb-4 border-b border-gray-200 pb-4">
    <img :src="produkt.bild" alt="Produktbild" class="w-20 h-20 object-cover rounded mb-4 sm:mb-0 sm:mr-4" />
    <div class="flex-1 text-center sm:text-left">
      <p class="text-lg font-semibold">{{ produkt.name }}</p>
      <p class="text-gray-600">{{ produkt.preis }} € x {{ produkt.menge }}</p>
    </div>
    <p class="text-lg font-bold text-green-600 mt-4 sm:mt-0 sm:ml-4">{{ (produkt.preis * produkt.menge).toFixed(2) }} €</p>
  </div>

  <!-- Servicepauschale -->
  <div class="flex justify-between items-center text-gray-700 border-t border-gray-200 pt-4">
    <p class="text-lg font-semibold">Servicepauschale:</p>
    <p class="text-lg font-bold">{{ serviceFee.toFixed(2) }} €</p>
  </div>

<!-- Abo-Option -->
<div class="bg-white rounded-lg shadow-lg p-6 mb-6">
  <h3 class="text-2xl font-semibold mb-4">Exklusive Angebote</h3>
  <div class="flex items-start">
    <input
      type="checkbox"
      id="newsletterAbo"
      v-model="isAboSelected"
      class="h-5 w-5 text-blue-600 focus:ring-2 focus:ring-blue-400 cursor-pointer"
    />
    <label for="newsletterAbo" class="ml-3 text-gray-700">
      <span class="font-semibold">Exklusives Abo hinzufügen</span>
      <br />
      <span class="text-sm text-gray-500">Erhalte monatlich exklusive Angebote für nur 5,99 €.</span>
    </label>
  </div>
  <p v-if="isAboSelected" class="text-sm text-green-600 mt-2">
    Dein Abo wurde aktiviert und 5,99 € werden zur Gesamtsumme hinzugefügt.
  </p>
</div>

<!-- Gesamtsumme -->
<div class="flex justify-between items-center text-gray-800 text-xl font-bold mt-4">
  <p>Gesamtsumme:</p>
  <p>{{ (gesamtPreis + serviceFee + (isAboSelected ? 5.99 : 0)).toFixed(2) }} €</p>
</div>
</div>

    <!-- Rechnungsadresse -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 class="text-2xl font-semibold mb-4">Rechnungsadresse</h3>
      <form @submit.prevent="placeOrder">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="vorname" class="block text-gray-700 font-semibold">Vorname</label>
            <input type="text" id="vorname" v-model="billingDetails.vorname" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div>
            <label for="nachname" class="block text-gray-700 font-semibold">Nachname</label>
            <input type="text" id="nachname" v-model="billingDetails.nachname" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
        </div>
        <div class="mb-4">
          <label for="adresse" class="block text-gray-700 font-semibold">Adresse</label>
          <input type="text" id="adresse" v-model="billingDetails.adresse" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label for="plz" class="block text-gray-700 font-semibold">PLZ</label>
            <input type="text" id="plz" v-model="billingDetails.plz" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div>
            <label for="stadt" class="block text-gray-700 font-semibold">Stadt</label>
            <input type="text" id="stadt" v-model="billingDetails.stadt" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div>
            <label for="land" class="block text-gray-700 font-semibold">Land</label>
            <input type="text" id="land" v-model="billingDetails.land" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
        </div>
      </form>
    </div>


    <template>
  <div class="container mx-auto py-8 max-w-screen-lg">
    <h2 class="text-4xl font-bold text-center mb-8">Checkout</h2>

    <!-- Zahlungsmethoden -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 class="text-2xl font-semibold mb-4">Zahlungsmethode</h3>
      <div class="space-y-4">
        <!-- Kreditkarte -->
        <label class="flex items-center p-4 border rounded-lg hover:shadow-md transition cursor-pointer">
          <input type="radio" value="Kreditkarte" v-model="paymentMethod" class="form-radio h-5 w-5 text-blue-600" />
          <i class="fas fa-credit-card text-blue-600 ml-4 text-2xl"></i>
          <div class="ml-4">
            <p class="text-gray-700 font-semibold">Kreditkarte</p>
            <p class="text-sm text-gray-500">Visa, MasterCard, American Express</p>
          </div>
        </label>

        <!-- PayPal -->
        <label class="flex items-center p-4 border rounded-lg hover:shadow-md transition cursor-pointer">
          <input type="radio" value="PayPal" v-model="paymentMethod" class="form-radio h-5 w-5 text-blue-600" />
          <i class="fab fa-paypal text-blue-600 ml-4 text-2xl"></i>
          <div class="ml-4">
            <p class="text-gray-700 font-semibold">PayPal</p>
            <p class="text-sm text-gray-500">Sicher und schnell bezahlen mit PayPal</p>
          </div>
        </label>

        <!-- Banküberweisung -->
        <label class="flex items-center p-4 border rounded-lg hover:shadow-md transition cursor-pointer">
          <input type="radio" value="Banküberweisung" v-model="paymentMethod" class="form-radio h-5 w-5 text-blue-600" />
          <i class="fas fa-university text-blue-600 ml-4 text-2xl"></i>
          <div class="ml-4">
            <p class="text-gray-700 font-semibold">Banküberweisung</p>
            <p class="text-sm text-gray-500">Überweise den Betrag manuell auf unser Konto</p>
          </div>
        </label>
      </div>

      <!-- Dialog für Eingabefelder -->
      <div class="mt-6">
        <template v-if="paymentMethod === 'Kreditkarte'">
          <h4 class="text-lg font-semibold text-gray-800 mb-4">Kreditkarteninformationen</h4>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="cardNumber">Kartennummer</label>
              <input
                type="text"
                id="cardNumber"
                v-model="cardDetails.cardNumber"
                placeholder="1234 5678 9012 3456"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                @input="formatCardNumber"
                maxlength="19"
              />
              <p v-if="errors.cardNumber" class="text-red-600 text-sm mt-1">{{ errors.cardNumber }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="expiryDate">Ablaufdatum (MM/YY)</label>
              <input
                type="text"
                id="expiryDate"
                v-model="cardDetails.expiryDate"
                placeholder="MM/YY"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                maxlength="5"
                @input="formatExpiryDate"
              />
              <p v-if="errors.expiryDate" class="text-red-600 text-sm mt-1">{{ errors.expiryDate }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="cvc">CVC</label>
              <input
                type="text"
                id="cvc"
                v-model="cardDetails.cvc"
                placeholder="123"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                maxlength="3"
              />
              <p v-if="errors.cvc" class="text-red-600 text-sm mt-1">{{ errors.cvc }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="cardName">Name auf der Karte</label>
              <input
                type="text"
                id="cardName"
                v-model="cardDetails.cardName"
                placeholder="Max Mustermann"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p v-if="errors.cardName" class="text-red-600 text-sm mt-1">{{ errors.cardName }}</p>
            </div>
          </div>
        </template>

        <template v-else-if="paymentMethod === 'PayPal'">
          <h4 class="text-lg font-semibold text-gray-800 mb-4">Weiterleitung zu PayPal</h4>
          <p class="text-sm text-gray-500 mb-4">Du wirst zu PayPal weitergeleitet, um die Zahlung abzuschließen.</p>
          <button @click="redirectToPayPal" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Weiter zu PayPal
          </button>
        </template>

        <template v-else-if="paymentMethod === 'Banküberweisung'">
          <h4 class="text-lg font-semibold text-gray-800 mb-4">Banküberweisungsdetails</h4>
          <p class="text-sm text-gray-500">Bitte überweise den Betrag an folgendes Konto:</p>
          <p class="text-sm text-gray-700 font-semibold mt-2">IBAN: DE12345678901234567890</p>
          <p class="text-sm text-gray-700">BIC: GENODEF1XXX</p>
          <p class="text-sm text-gray-700">Empfänger: Muster GmbH</p>
        </template>
      </div>
    </div>


    </div>
</template>


   



    <!-- Bestellbestätigung -->
    <div class="text-right">
  <button @click="placeOrder" class="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
    Bestellung abschicken
  </button>
</div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';


const router = useRouter(); // Initialisiere den Router
const supabase = useSupabaseClient();
const warenkorbProdukte = ref([]);
const serviceFee = 9.99;
const isAboSelected = ref(true); // Standardmäßig ausgewählt

const billingDetails = ref({
  vorname: '',
  nachname: '',
  adresse: '',
  plz: '',
  stadt: '',
  land: '',
});

// Zahlungsdetails
const paymentMethod = ref('');
const cardDetails = reactive({
  cardNumber: '',
  expiryDate: '',
  cvc: '',
  cardName: '',
});
const errors = reactive({
  cardNumber: null,
  expiryDate: null,
  cvc: null,
  cardName: null,
});

// Formatierung der Kartennummer
const formatCardNumber = () => {
  cardDetails.cardNumber = cardDetails.cardNumber
    .replace(/\D/g, '') // Entferne Nicht-Ziffern
    .replace(/(.{4})/g, '$1 ') // Leerzeichen alle 4 Ziffern
    .trim();
};

// Formatierung des Ablaufdatums
const formatExpiryDate = () => {
  cardDetails.expiryDate = cardDetails.expiryDate
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d{0,2})$/, '$1/$2')
    .substr(0, 5);
};

// Validierung der Kreditkartendetails
const validateCardDetails = () => {
  errors.cardNumber = cardDetails.cardNumber.replace(/\s/g, '').length === 16
    ? null
    : 'Ungültige Kartennummer. Bitte geben Sie 16 Ziffern ein.';
  errors.expiryDate = /^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)
    ? null
    : 'Ungültiges Ablaufdatum. Format: MM/YY.';
  errors.cvc = cardDetails.cvc.length === 3
    ? null
    : 'Ungültiger CVC. Bitte geben Sie 3 Ziffern ein.';
  errors.cardName = cardDetails.cardName.length > 0
    ? null
    : 'Bitte geben Sie den Namen auf der Karte ein.';

  return !errors.cardNumber && !errors.expiryDate && !errors.cvc && !errors.cardName;
};

// Weiterleitung zu PayPal
const redirectToPayPal = () => {
  window.location.href = 'https://www.paypal.com/checkoutnow';
};

// Funktion zum Laden der Warenkorbprodukte aus Supabase
const fetchWarenkorbProdukte = async () => {
  const { data: warenkorbData, error: warenkorbError } = await supabase
    .from('warenkorb')
    .select('produkt_id, menge');

  if (warenkorbError) {
    console.error('Fehler beim Abrufen des Warenkorbs:', warenkorbError);
    return;
  }

  const produktIds = warenkorbData.map((item) => item.produkt_id);
  const { data: produkteData, error: produkteError } = await supabase
    .from('produkte')
    .select('id, name, bild, preis')
    .in('id', produktIds);

  if (produkteError) {
    console.error('Fehler beim Abrufen der Produkte:', produkteError);
    return;
  }

  warenkorbProdukte.value = warenkorbData.map((item) => {
    const produkt = produkteData.find((p) => p.id === item.produkt_id);
    return {
      ...produkt,
      menge: item.menge,
    };
  });
};

// Gesamtsumme berechnen
const gesamtPreis = computed(() => {
  return warenkorbProdukte.value.reduce(
    (sum, produkt) => sum + produkt.preis * produkt.menge,
    0
  );
});


// Bestellung abschicken und zur Bestätigungsseite navigieren
const placeOrder = () => {
  console.log('Bestellung wurde abgeschickt!');

  // Navigation zur Bestätigungsseite mit Abo-Status
  router.push({
    path: '/confirmation',
    query: { abo: isAboSelected.value ? 'true' : 'false' },
  });
};

onMounted(() => {
  fetchWarenkorbProdukte();
});
</script>


<style scoped>
.container {
  max-width: 800px;
}
button:focus {
  outline: none;
}
</style>
