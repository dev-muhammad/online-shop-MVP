<template>
<div class="z-shop-cart">
  <div style="position:relative;width:360px;">
    <v-btn v-show="!checkoutDialog && !cartSheet && cartItems.length" color="primary" fab dark class="cart-btn" @click="cartSheet=true;recount()">
        <v-badge light :content=cartItems.length bordered color="primary">
            <v-icon>local_mall</v-icon>   
        </v-badge>
    </v-btn>
  </div>

  <template>
    <div class="text-center">
        <v-bottom-sheet v-model="cartSheet" inset style="overflow-y:auto">
        <v-list style="position:relative;border-radius:10px 10px 0px 0px">
            <v-subheader>Корзина</v-subheader>
            <div  v-show="cartItems.length" style="position:absolute;top:15px;right:15px;">
                <v-btn class="ma-0" dark depressed small color="primary"
                  @click="cartSheet=false;checkoutDialog=true"
                  >Оформить заказ</v-btn>
            </div>
            <div class="z-bottom-cart-sheet px-2">
                <p v-show="!cartItems.length" class="my-8 text-center">Ваша корзина пуста</p>
                <p v-show="cartItems.length" class="mb-1 ml-1">Всего: {{ totalCount }} товаров на {{ totalSum }} {{currency}}</p>
                <zCartItem v-for="(item,index) in cartItems" :key=index :product=item :index=index @remove=remove></zCartItem>
            </div>
        </v-list>
        </v-bottom-sheet>
        </div>
    </template>
    <v-dialog v-model="checkoutDialog" max-width="500px" persistent :fullscreen="$vuetify.breakpoint.mobile">
        <v-card>
            <v-card-title>
                Оформление заказа
                <v-spacer></v-spacer>
                <v-btn icon @click="checkoutDialog=false"><v-icon>close</v-icon></v-btn>
            </v-card-title>
            <v-card-text>
                <zCheckout @closeDialog="checkoutDialog=false"></zCheckout>
            </v-card-text>
        </v-card>      
    </v-dialog>
</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import zCartItem from '~/components/zCartItem.vue'
import zCheckout from '~/components/zCheckout.vue'
export default {
    components: {
        zCartItem,
        zCheckout
    },
    data(){
        return {
            fab: true,
            checkoutDialog: false,
            cartSheet: false,
            currency:'SMN',
            totalCount: 0,
            totalSum: 0
        }
    },
    props: {
     
    },
    computed: mapGetters({
      cartItems: 'cart/cart'
    }),
    methods: {
        remove(index){
            this.$store.commit('cart/remove',index)
        },
        recount(){
            var c = 0;
            var s = 0;
            if (this.cartItems.length){
                this.cartItems.forEach(product => {
                    c = c + product.count;
                    s = s + product.price*1;
                    });
                this.totalCount = c;
                this.totalSum = s;
            }
        }
    },
    watch: {
        cartItems: function () {
            this.recount();
        }        
    }
}
</script>

<style>
.z-shop-cart .cart-btn{
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 999;
}
.z-bottom-cart-sheet{
    overflow-y: auto;
    height: 60vh;
}
</style>
