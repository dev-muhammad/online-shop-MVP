<template>
<div id="app">
    <v-app id="inspire">  
      <v-main>
          <nuxt />
      </v-main>
    </v-app>
    <v-footer dark padless>
      <v-card style="background-color:#3F51B5;" class="flex white--text text-center" flat tile>
        <v-card-title class="pb-0">
          <strong class="subheading">Доставим быстро и качественно!</strong>
        </v-card-title>
        <v-card-title class="pt-0">
          <strong class="subheading">Связь с нами:</strong>
          <v-spacer></v-spacer>
          <a style="text-decoration: none;" href="https://api.whatsapp.com/send/?phone=992929997453&text=Салом, я оформил заказ с сайта shop.bolo.tj" target="_blank">
            <v-btn color="primary" text>
              WhatsApp
            </v-btn>
          </a>
          <a style="text-decoration: none;" href="https://t.me/muhammad_babolo&text=Салом, я оформил заказ с сайта shop.bolo.tj" target="_blank">
            <v-btn color="primary" text>
              Telegram
            </v-btn>
          </a>
          <a style="text-decoration: none;" href="tel:+992929997453" target="_blank">
            <v-btn color="primary" text>
              +992 (92) 999 7453
            </v-btn>
          </a>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>shop.bolo.tj</strong>
        </v-card-text>
      </v-card>
    </v-footer>
</div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
   
  }
}
</script>
