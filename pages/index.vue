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
        <v-card>
            <v-img 
              :src="product.gsx$imgurl.$t ? product.gsx$imgurl.$t: '/no-photo.png'"
              height="250px"
            ></v-img>
          <v-card-title class="headline">
            <h2 class="headline">
              {{ product.gsx$title.$t }}
            </h2>
            <v-spacer></v-spacer>
            <span class="title">{{ product.gsx$price.$t }} SMN</span>
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-text>
            {{ product.gsx$description.$t }}
          </v-card-text>
          <v-card-actions>
            <v-btn block class="white--text" color="primary" @click="addToCart(product)">
              Добавить в корзину
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <zShopCart></zShopCart>
    
  </v-container>
</template>
<style>

</style>
<script>
import zShopCart from '~/components/zShopCart.vue'

export default {
  components: {
    zShopCart
  },
  data(){
    return{
      categories: ['Все категории'],
      products: [],
      selection: 'Все категории',
      loading: true
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
  }  

}
</script>
