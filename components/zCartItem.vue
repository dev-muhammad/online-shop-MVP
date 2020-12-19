<template>   
  <v-list class="py-0">
      <v-list-item three-line class="pr-0 my-1">
        <v-list-item-avatar size="100" horizontal class="my-0">
          <v-img style="border-radius:10px" 
          :src="product.image ? product.image : '/no-photo.png'"
          ></v-img></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ product.title }}</v-list-item-title>
              <v-list-item-subtitle>
                 {{ product.price }} {{currency}}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="removeFromCart(index)"><v-icon>close</v-icon></v-btn>
            </v-list-item-action>
          </v-list-item>
      <v-divider style="margin-left:110px"></v-divider>
  </v-list>    
</template>

<script>
export default {
  data(){
    return{
      currency:'SMN',
      counter: 'ед.',
    }
  },
  props: {
     product: Object,
     index: Number
  },
  methods:{
   removeFromCart(index){
     this.$emit('remove',index);
   },
   editParams(index){
     this.$emit('editParams',index);
   }
  }
}
</script>

<style>

</style>
