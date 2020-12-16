<template>
<div id="app">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app clipped>
 
        <v-list dense shaped>
          <template v-for="item in menu">
            <v-list-item :key="item.text" link nuxt :to="item.link">
              <v-list-item-action>
                <img class="" :src=item.icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar app color="primary" dark clipped-left>
        <v-btn icon @click.stop="drawer = !drawer">
          <img class="" src="/icons/nav.svg">
        </v-btn>
        <v-toolbar-title style="width: 400px" class="ml-0 pl-4">
          <span class="hidden-sm-and-down">Скоринговая система (dev mode)</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <img class="" src="/icons/help.svg">
        </v-btn>
      </v-app-bar>

      <v-main>
        <v-container v-if="show">
          <nuxt />
        </v-container>
        <v-container v-else>
            <v-row justify="center" align="start">
                <v-col cols="12" sm="4" md="4">
                    <v-card>
                        <v-card-title class="headline">Авторизация</v-card-title>
                        <v-card-text>
                            <v-text-field 
                                v-model="pin" 
                                label="PIN-code" 
                                type="password">
                            </v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn depressed mb-5 color="secondary" nuxt to="/">Назад</v-btn>
                            <v-spacer />
                            <v-btn outlined mb-5 color="primary" @click="login()">Войти</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
      </v-main>

    </v-app>
</div>
</template>

<script>
export default {
  data() {
    return {
    drawer: false,
    show: false,
    pin: null,
    realPin: "1234",
    menu: [
      { icon: '/icons/app.svg', text: 'Главная', link: '/tt/predict' },
      { icon: '/icons/history.svg', text: 'История', link: '/tt/history' },
      { icon: '/icons/back.svg', text: 'Назад', link: '/' }
    ],
    }
  },
  methods: {
   login(){
       if (this.pin == this.realPin){
           this.show = true;
       }
   }
  }
}
</script>
