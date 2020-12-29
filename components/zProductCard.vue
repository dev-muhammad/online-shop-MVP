<template>   
  <v-card>
      <v-img 
        :src="product.gsx$imgurl.$t ? product.gsx$imgurl.$t: '/no-photo.png'"
        height="250px"
      ></v-img>
    <v-card-title class="headline">
      <h2 class="subtitle-2">
        {{ product.gsx$title.$t }}
      </h2>
      <v-spacer></v-spacer>
      <span class="title">{{ product.gsx$price.$t }} SMN</span>
    </v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-text v-if="product.gsx$description.$t.length<70">
      {{ product.gsx$description.$t }}
    </v-card-text>
    <div v-else>
        <v-card-text v-show="!moreInfo" @click="moreInfo=!moreInfo">
        {{ product.gsx$description.$t | substr(70,'...') }}
        <span style="color:#f00;cursor:pointer">больше</span>
        </v-card-text>
        <v-card-text v-show="moreInfo" @click="moreInfo=!moreInfo">
        {{ product.gsx$description.$t }}
        <span style="color:#f00;cursor:pointer">меньше</span>
        </v-card-text>
    </div>
    
    <v-card-actions>
      <v-btn block class="white--text" color="primary" @click="addToCart(product)">
        Добавить в корзину
      </v-btn>
    </v-card-actions>
  </v-card>   
</template>

<script>
export default {
  data(){
    return{
      currency:'SMN',
      counter: 'ед.',
      moreInfo: false
    }
  },
  props: {
     product: Object,
  },
  filters: {
    substr: function (text,len,clamp) {
      return text.slice(0, len) + (len < text.length ? clamp || '...' : '')
    }
  },
  methods:{
   addToCart(product){
     this.$emit('addToCart',product);
   }
  }
}
</script>

<style>

</style>
