<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo1.jpg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Bienvenido a SisMarket
        </h1>

        <p class="subheading font-weight-regular">
          Sistema de control del ventas KARDEX
          <br>OPTIMIZA TU NEGOCIO...!!!
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      alert: true,
    }),
  }
</script>
