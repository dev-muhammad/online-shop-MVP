<template>
  <div>
    <validation-observer ref="observer" v-slot="{ invalid }">
    <v-container style="background-color:#fff">
        <div class="mb-6">
            <p v-show="cartItems.length" class="mb-0 subtitle-1">Шаг 1/3</p>
            <span v-show="cartItems.length" class="caption">Проверка выбранных товаров</span>

            <zCartItem v-for="(item,index) in cartItems" :key=index :product=item :index=index @remove=remove></zCartItem>
                    
            <v-col v-show="cartItems.length" cols="12">
                <v-row align="start" justify="space-between">
                  <span>Итого: {{ totalCount }} товар (ов)</span>
                  <v-divider class="mx-2" style="border:1px dashed #555;margin-top:15px"></v-divider>
                  <span>{{ productSum }} {{currency}}</span>
                </v-row>
            </v-col>
        </div>
        <!-- Submit -->
        <div v-show="cartItems.length" class="my-6">
          <p class="mb-0 subtitle-1">Контактные данные</p>
          <span class="caption">Укажите страну и номер телефона</span>
            <v-chip-group v-model="orderData.from" active-class="primary" column mandatory>
              <v-chip v-for="item in countries" :key="item.id" :value="item" filter filter-icon="done">
                {{ item.title }}
              </v-chip>
            </v-chip-group>

          <span class="caption"></span>
            <validation-provider v-slot="{ errors }" name="Age" :rules="`required|length:${orderData.from.length}`">
              <v-text-field 
                v-model="orderData.phone" 
                label="Номер телефона" 
                :error-messages="errors"
                required
                :prefix="orderData.from.prefix"
                type="number"></v-text-field>
                <v-textarea
                  v-model='orderData.comments'
                  counter
                  :rules="[v => v.length <= 120 || 'До 120 символов']"
                  label="Комментария" 
                  messages="Ваши дополнителные пожелание к заказу (до 120 символов)" rows="1" auto-grow color="primary"
                ></v-textarea>
            </validation-provider>
          <v-btn class="mt-6" block color="primary" :disabled="invalid" :loading="loadingBtn" @click="acceptOrder()">Подтверждаю</v-btn>
          <v-btn class="mt-4" block color="primary" outlined @click="closeDialog()">Каталог товаров</v-btn>
          <p class="#008dd2--text my-2" v-show="errorOnAccept">Ошибка, попробуйте ещё раз!</p>
        </div>
        <div v-show="!cartItems.length">
          <p class="my-8 text-center">У вас нет выбранных товаров!</p>
        </div>
    </v-container>

    <v-dialog v-model="orderAccepted" max-width="350" persistent>
      <v-card class="py-5">
        <v-card-text class="text-center">
          <p class="text-center title">Заказ принят!</p>
          <v-icon style="font-size:100px" color="green">check_circle</v-icon>
          <p>Ваш заказ принят на обработку, скоро наш оператор свяжется с вами для подтверждения заказа.</p>
        </v-card-text>
        <v-card-text class="mb-0 pb-0 text-center">
          <p>Также сами можете связаться с оператором</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <a v-show="$vuetify.breakpoint.mobile" style="text-decoration: none;" href="viber://chat/?number=%2B992926174440&text=Салом, я получил данный номер с сайта shop.bolo.tj" target="_blank">
            <v-btn color="primary" text>
              Viber
            </v-btn>
          </a>
          <a href="https://api.whatsapp.com/send/?phone=992929997453&text=Салом, я оформил заказ с сайта shop.bolo.tj" target="_blank">
            <v-btn color="primary" text>
              WhatsApp
            </v-btn>
          </a>
          <a href="https://t.me/BaBoloMarket&text=Салом, я оформил заказ с сайта shop.bolo.tj" target="_blank">
            <v-btn color="primary" text>
              Telegram
            </v-btn>
          </a>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined large  @click="closeDialog();orderAccepted=false">
            Спасибо
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </validation-observer>
  </div>
</template>


<script>
import { mapMutations, mapGetters } from 'vuex'
import zCartItem from '~/components/zCartItem.vue'
import { required, length, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('aggressive')

extend('required', {
  ...required,
  message: 'Поле не может быть пустым',
})
extend('max', {
  ...max,
  message: 'Допустимая длина {max} символов',
})
extend('length', {
  ...length,
  message: 'Не правильный формат номера',
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    zCartItem
  },
  data() {
      return {
        orderData: {
          phone: '',
          from: { id: 'tj', title: 'Таджикистан', prefix: '+992', length:9 },
          comments: ''
        },
        countries: [
          { id: 'ru', title: 'Россия', prefix: '+7', length:10 },
          { id: 'tj', title: 'Таджикистан', prefix: '+992', length:9 }
        ],
        currency: 'SMN',
        loadingBtn: false,
        totalCount: 0,
        productSum: 0,
        orderAccepted: false,
        orderID: 123,
        errorOnAccept: false,

    }
  },
  computed: {   
    ...mapGetters({
        cartItems: 'cart/cart'
    }) 
  },
  mounted(){
    this.recount();
  },
  
  methods: {
    acceptOrder(){
      var postData = {
        products: this.cartItems,
        phone: this.orderData.from.prefix + this.orderData.phone,
        country: this.orderData.from.title,
        comment: this.orderData.comments,
        summa: this.productSum
      };
      this.postOrder(postData);
      // console.log(postData);
      //this.$store.commit('cart/clear');
      //this.closeDialog();
    },
    closeDialog(){
      this.$emit('closeDialog')
    },
    postOrder(postData){
      this.loadingBtn = true;
      var path = 'https://shop.bolo.tj/simpple-telegram-bot/sendOrder.php';
      var data = {'path':path,'data':postData};
        this.$store.dispatch('apiAdapter/post', data)
          .then(res => {
              this.loadingBtn = false;
              // console.log(res);      
              this.orderAccepted = true;
              this.$store.commit('cart/clear');
              this.orderData.phone = '';
              this.orderData.comments = '';
          })
          .catch(e => {
            console.log(e); 
              this.loadingBtn = false;
              this.errorOnAccept = true;
          });       
    },
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
            this.productSum = s;
        }
    },
  },
  watch: {
      cartItems: function () {
          this.recount();
      }      
  }
}
</script>

<style>
.z--text-color{color:#008dd2 !important}
</style>
