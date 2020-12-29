<template>
  <v-container>
    <v-chip-group v-model="selection" active-class="white--text primary" mandatory column>
      <v-chip
        v-for="(category, i) in categories"
        :key="i"
        :value="category"
      >
        {{ category }}
      </v-chip>
    </v-chip-group>
    <v-row v-show="loading" justify="center" align="start">
      <v-col v-for="(c,i) in !$vuetify.breakpoint.mobile ? 4 : 1" :key=i cols="12" md="3" sm="4" xs="6">
      <v-skeleton-loader class="mx-auto" type="image, article, actions"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-show="!loading" justify="center" align="start">
      <v-col 
        v-show="selection == 'Все категории' || selection == product.gsx$category.$t" 
        v-for="(product,i) in products" :key=i cols="12" md="3" sm="4" xs="6"
        >
        <zProductCard :product=product @addToCart=addToCart></zProductCard>
      </v-col>
    </v-row>
    <zShopCart></zShopCart>
    
  </v-container>
</template>
<style>

</style>
<script>
import zShopCart from '~/components/zShopCart.vue'
import zProductCard from '~/components/zProductCard.vue'

export default {
  components: {
    zShopCart,
    zProductCard
  },
  data(){
    return{
      categories: ['Все категории'],
      products: [],
      selection: 'Все категории',
      loading: true,
      moreInfo: []
    }
  },
  computed: {

  },
  watch: {
  
  },
  mounted(){
    this.loadProducts();
  },
  methods: {
    loadProducts(){
      var path = 'https://spreadsheets.google.com/feeds/list/1gFF-Aap46zMoAO0NFZBBd-1-0luOU5SeKn_QKhIU25U/1/public/values?alt=json';
      
      this.$store.dispatch('apiAdapter/get', path)
        .then(res => { 
          // console.log('success')
          // console.log(res);
          // console.log(res.data.feed.entry);
          //this.products = res.data.feed.entry;
          this.parseCategories(res.data.feed.entry);
          this.parseProducts(res.data.feed.entry);
        })
        .catch(e => {
          console.log('error')
          console.log(e)
        });
    },
    parseCategories(feed){
      feed.forEach(element => {
        if(element.gsx$allcategories.$t != ''){
          this.categories.push(element.gsx$allcategories.$t)
        }
      });
    },
    parseProducts(feed){
      feed.forEach(element => {
        if(element.gsx$title.$t != ''){
          this.products.push(element);
          this.loading = false;
          this.moreInfo.push(false);
        }
      });
    },
    addToCart(product){
      var p = {
        'title': product.gsx$title.$t,
        'image': product.gsx$imgurl.$t,
        'price': product.gsx$price.$t,
        'id': product.gsx$id.$t,
        'count': 1
      }
      this.$store.commit('cart/add', p);
    },
  },
  head () {
      return {
        title: 'Онлайн заказ товаров в Джаббор Расулове ',
        meta: [
          { hid: 'description', name: 'description', content: 'Babolo Shop - это онлайн сервис для заказа товаров и продуктов' },
          { hid: 'author', name: 'author', content: 'Babolo Company' },
          { hid: 'keywords', name: 'keywords', content: 'онлайн заказ, онлайн магазин' },
          { hid: 'og:title', property: 'og:title', content: 'Онлайн заказ товаров в Джаббор Расулове ' },
          { hid: 'og:description', property: 'og:description', content: 'Babolo Shop - это онлайн сервис для заказа товаров и продуктов' },
          { hid: 'og:type', property: 'og:type', content: 'website' },
          { hid: 'og:site_name', property: 'og:site_name', content: 'shop.bolo.tj' },
          { hid: 'og:url', property: 'og:url', content: 'www.shop.bolo.tj' },
          { hid: 'og:image', property: 'og:image', content: 'http://shop.bolo.tj/og.png' },
          { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: 'https://shop.bolo.tj/og.png' },
          { hid: 'og:image:type', property: 'og:image:type', content: 'image/png' },
          { hid: 'og:image:width', property: 'og:image:width', content: '400' },
          { hid: 'og:image:height', property: 'og:image:height', content: '300' }
        ]
      }
    },  

}
</script>
