<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
  <v-row justify="center" align="start">
    <v-col cols="12" sm="8" md="8">
      <v-card>
        <v-card-title class="headline">
          Данные клиента
           <v-spacer />
          <div class="d-none d-sm-none d-md-flex">
            <v-btn color="secondary" class="mx-2" @click="reset()">Сбросить</v-btn>
            <v-btn color="accent" @click="calc()" :disabled="invalid || loading">Рассчитать</v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <v-row justify="center" align="start">
            <v-col cols="12" md="6">
              <validation-provider v-slot="{ errors }" name="Age" rules="required|between:18,100">
                <v-text-field 
                  v-model="inputData.age" 
                  label="Возраст" 
                  :error-messages="errors"
                  required
                  type="number"></v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="Gender" rules="required">
                <v-select 
                  v-model="inputData.gender" 
                  :items="selectData.gender" 
                  item-text="ru"
                  item-value="value"
                  label="Пол" 
                  :error-messages="errors"
                  required
                ></v-select>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="Amount" rules="required|between:100,100000">
                <v-text-field 
                  v-model="inputData.amount" 
                  label="Сумма" 
                  type="number"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="Duration" rules="required|between:1,120">
                <v-text-field 
                  v-model="inputData.duration" 
                  label="Срок" 
                  type="number"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="Currency" rules="required">
                <v-select 
                  v-model="inputData.currency" 
                  :items="selectData.currency" 
                  item-text="ru"
                  item-value="value"
                  label="Валюта"
                  :error-messages="errors"
                  required
                ></v-select>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="Sector" rules="required">
                <v-select 
                  v-model="inputData.sector" 
                  :items="selectData.sector" 
                  item-text="ru"
                  item-value="value"
                  label="Назначение"
                  :error-messages="errors"
                  required
                ></v-select>
              </validation-provider>
            </v-col>
            <v-col cols="12" md="6">
              <validation-provider v-slot="{ errors }" name="Education" rules="required">
                <v-select 
                  v-model="inputData.education" 
                  :items="selectData.education" 
                  item-text="ru"
                  item-value="value"
                  label="Образование"
                  :error-messages="errors"
                  required
                ></v-select>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="Marital Status" rules="required">
                <v-select 
                  v-model="inputData.maritalStatus" 
                  :items="selectData.maritalStatus" 
                  item-text="ru"
                  item-value="value"
                  label="Семейное положение"
                  :error-messages="errors"
                  required
                ></v-select>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="Region" rules="required">
                <v-select 
                  v-model="inputData.region" 
                  :items="selectData.region" 
                  item-text="ru"
                  item-value="value"
                  label="Область"
                  :error-messages="errors"
                  required
                ></v-select>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="Branch" rules="required">
                <v-select 
                  v-model="inputData.branch" 
                  :items="selectData.branch" 
                  item-text="en"
                  item-value="value"
                  label="Филиал"
                  :error-messages="errors"
                  required
                ></v-select>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="Credit History Count" rules="required|min_value:0">
                <v-text-field 
                  v-model="inputData.creditHistoryCount" 
                  label="Количество кредитных историй" 
                  type="number"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="Dependants" rules="required|min_value:0">
                <v-text-field 
                  v-model="inputData.dependants" 
                  label="Иждивенцы" 
                  type="number"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <div class="d-flex d-sm-flex d-md-none">
            <v-btn color="secondary" class="mx-2" @click="reset()">Сбросить</v-btn>
            <v-btn color="accent" @click="calc()" :disabled="invalid || loading">Рассчитать</v-btn>
            </div>
          </v-row> 
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="8" md="4">
      <v-card>
        <v-card-title class="headline">
          Результать
        </v-card-title>
        <v-card-text class="mt-6 text-center">
          <img class="animate" src="/icons/loading.svg" :style="loading ? 'display:inline-block':'display:none'">
          <div :style="errorAlert ? 'display:inline-block':'display:none'">
            <img class="" src="/icons/error.svg">
            <p class="mb-0">Ошибка сервера</p>
          </div>
          <div :style="resultAlert=='no' ? 'display:inline-block':'display:none'">
            <img class="" src="/icons/no.svg">
            <p class="mb-0">Не одобряется</p>
          </div>
          <div :style="resultAlert=='yes' ? 'display:inline-block':'display:none'">
            <img class="" src="/icons/yes.svg">
            <p class="mb-0">Одобряется</p>
          </div>
        </v-card-text>
        <v-card-text>
          <!-- <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> -->
        </v-card-text>
      </v-card>
      <v-card class="mt-4 elevation-0">
        <v-card-title class="headline">
          Настройки
        </v-card-title>
        <v-card-text>
          <!-- <p>Amet venenatis urna cursus eget nunc viverra.</p> -->
          <validation-provider v-slot="{ errors }" name="Server address" rules="required">
            <v-text-field 
              v-model="settings.serverAddress" 
              label="Адрес сервера" 
              type="url"
              :error-messages="errors"
              required
            ></v-text-field>
          </validation-provider>
          <!-- <validation-provider v-slot="{ errors }" name="Calc method" rules="required">
            <v-select 
              v-model="settings.calcMethod" 
              :items="selectData.calcMethod" 
              item-text="ru"
              item-value="value"
              label="Метод рассчета"
              :error-messages="errors"
              required
            ></v-select>
          </validation-provider>          -->
          
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  </validation-observer>
</template>
<style>
.animate{
  animation-name: loading;
  animation-Duration: 3s;
  animation-iteration-count: infinite;
  animation-delay: 0s;
  animation-timing-function: linear;
}
@keyframes loading{
  0%{transform:rotate(0deg);}
  50%{transform:rotate(180deg);}
  100%{transform:rotate(360deg);}
}
</style>
<script>
import { required, between, min_value } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('lazy')

extend('required', {
  ...required,
  message: 'Поле не может быть пустым',
})

extend('min_value', {
  ...min_value,
  message: 'Значение должно быть равен {min} или больше',
})
extend('between', {
  ...between,
  message: 'Значение должно быть между {min} и {max}',
})

export default {
  layout: 'tdefault',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data(){
    return{
      loading: false,
      errorAlert: false,
      settings:{
        serverAddress: 'http://localhost:5000',
        calcMethod: 'logreg'
      },
      resultAlert:null,
      inputData:{
        amount: '',
        duration: '',
        creditHistoryCount: '',
        dependants: '',
        gender: '',
        currency: '',
        sector: '',
        education: '',
        maritalStatus: '',
        region: '',
        branch: '',
        age: '',
      },
      selectData:{
        gender: [	
          { en: 'Male', ru: 'Мужчина', value:	'M'},
          { en: 'Female', ru: 'Женщина', value:	'F'}
        ],
        currency:[	
          { en: 'SMN', ru: 'Сомони', value:	'SMN'},
          { en: 'USD', ru: 'Рубль', value:	'USD'},
          { en: 'RUB', ru: 'Доллар', value:	'RUB'}
        ],
        sector: [
          { en: 'Consumer Loan', ru: 'Потребительский кредит', value: 'Consumer Loan'},
          { en: 'Agriculture', ru: 'Сельское хозяйство', value:	'Agriculture'},
          { en: 'Mortgage', ru: 'Ипотека', value:	'Mortgage'},
          { en: 'Trade', ru: 'Торговля', value:	'Trade'},
          { en: 'Services', ru: 'Сервисы', value:	'Services'},
          { en: 'Production', ru: 'Производство', value:	'Production'}
        ],
        education: [	
          { en: 'Higher Education', ru: 'Высшее образование', value: 'Higher Education'},
          { en: 'Secondary Education with Specialisation', ru: 'Среднее специальное образование', value: 'Secondary Education with Specialisation'},
          { en: 'Secondary Education', ru: 'Среднее образование', value: 'Secondary Education'},
          { en: 'Incomplete Secondary Education', ru: 'Неполное среднее образование', value:	'Incomplete Secondary Education'},
          { en: 'Other Education', ru: 'Другое образование', value: 'Other Education'}
        ],
        maritalStatus:[
          { en: 'Married', ru: 'Женат/замужем', value:	'Married'},	
          { en: 'Single', ru: 'Холостяк/незамужняя', value:	'Single'},
          { en: 'Divorced', ru: 'Разведен', value:	'Divorced'},
          { en: 'Widow/Widower', ru: 'Вдова/Вдовец', value:'Widow/Widower'}
        ],
        region:[
          { en: 'Dushanbe', ru: 'Душанбе', value: 'Dushanbe'},
          { en: 'Republican Subordination', ru: 'РРП', value:	'Republican Subordination'},
          { en: 'Sogd', ru: 'Согд', value: 'Sogd'},
          { en: 'Khatlon', ru: 'Хатлон', value: 'Khatlon'},
          { en: 'GBAR', ru: 'ГБАО', value: 'GBAR'},
        ],
        branch:[
          { en: 'Dushanbe (Shohmansur)', value:	'Dushanbe (Shohmansur)'},
          { en: 'Fayzobod', value: 'Fayzobod'},
          { en: 'Vahdat', value: 'Vahdat'},
          { en: 'Rogun', value: 'Rogun'},
          { en: 'Tursunzoda', value: 'Tursunzoda'},
          { en: 'Dushanbe (Ismoili Somoni)', value:	'Dushanbe (Ismoili Somoni)'},
          { en: 'Varzob', value: 'Varzob'},
          { en: 'Dushanbe (Sino)', value:	'Dushanbe (Sino)'},
          { en: 'Dushanbe (Firdavsi)', value:	'Dushanbe (Firdavsi)'},
          { en: 'Hissor', value: 'Hissor'},
          { en: 'Rudaki', value: 'Rudaki'},
          { en: 'Devashtich', value: 'Devashtich'},
          { en: 'Spitamen', value: 'Spitamen'},
          { en: 'J.Rasulov', value: 'J.Rasulov'},	
          { en: 'Khujand', value: 'Khujand'},
          { en: 'Zafarobod', value: 'Zafarobod'},
          { en: 'B.Gafurov', value: 'B.Gafurov'},
          { en: 'Istiqlol', value:	'Istiqlol'},
          { en: 'Asht', value:	'Asht'},
          { en: 'Mastchoh', value:	'Mastchoh'},
          { en: 'Isfara', value:	'Isfara'},
          { en: 'Konibodom', value:	'Konibodom'},
          { en: 'Istaravshan', value:	'Istaravshan'},
          { en: 'Shahriston', value:	'Shahriston'},
          { en: 'Shahrinav', value:	'Shahrinav'},
          { en: 'Temumalik', value:	'Temumalik'},
          { en: 'Vose', value:	'Vose'},
          { en: 'Panjakent', value:	'Panjakent'},
          { en: 'Buston', value:	'Buston'},
          { en: 'Khovaling', value:	'Khovaling'},
          { en: 'Kuhistoni Mastchoh', value:	'Kuhistoni Mastchoh'},
          { en: 'Guliston', value:	'Guliston'},
          { en: 'Kulob', value:	'Kulob'},
          { en: 'Mir Said Ali Hamadoni', value:	'Mir Said Ali Hamadoni'},
          { en: 'Shamsiddin Shohin', value:	'Shamsiddin Shohin'},
          { en: 'Farkhor', value:	'Farkhor'},
          { en: 'Nurobod', value:	'Nurobod'},
          { en: 'Shahrituz', value:	'Shahrituz'},
          { en: 'Dangara', value:	'Dangara'},
          { en: 'Ayni', value:	'Ayni'},
          { en: 'Muminobod', value:	'Muminobod'},
          { en: 'Yovon', value:	'Yovon'},
          { en: 'Khorug', value:	'Khorug'},
          { en: 'J.Balkhi', value:	'J.Balkhi'},
          { en: 'Bokhtar', value:	'Bokhtar'},
          { en: 'Nosiri Khusrav', value:	'Nosiri Khusrav'},
          { en: 'Kurgonteppa', value:	'Kurgonteppa'},
          { en: 'Dusti', value:	'Dusti'},
          { en: 'Baljuvon', value:	'Baljuvon'},
          { en: 'Dushanbe', value:	'Dushanbe'},
          { en: 'Rasht', value:	'Rasht'},
          { en: 'Roshtkala', value:	'Roshtkala'},
          { en: 'Kubodiyon', value:	'Kubodiyon'},
          { en: 'Vakhsh', value:	'Vakhsh'},
          { en: 'Murgob', value:	'Murgob'},
          { en: 'Norak', value:	'Norak'},
          { en: 'Rushon', value:	'Rushon'},
          { en: 'Jayhun', value:	'Jayhun'},
          { en: 'Sangvor', value:	'Sangvor'},
          { en: 'Panj', value:	'Panj'},
          { en: 'Abdurahmoni Jomi', value:	'Abdurahmoni Jomi'},
          { en: 'Vanj', value:	'Vanj'},
          { en: 'Shugnon', value:	'Shugnon'},
          { en: 'Darvoz', value:	'Darvoz'},
          { en: 'Sarband', value:	'Sarband'},
          { en: 'Tojikobod', value:	'Tojikobod'},
          { en: 'Khuroson', value:	'Khuroson'},
          { en: 'Ishkoshim', value:	'Ishkoshim'},
          { en: 'Headquarters', value:	'Headquarters'}
        ],
        calcMethod: [
          { en:'Logistic regression', ru: 'Логистическая регрессия', value:'logreg'},
          { en:'Random Forest', ru: 'Случайный лес', value:'rndforest'},
          ],
      }  
    }
  },
  methods: {
    calc(){
      console.log(this.inputData)
      this.resultAlert = null
      this.sendQuery();
    },
    reset() {
      this.inputData.age = null
      this.inputData.gender = null
      this.inputData.amount = null
      this.inputData.duration = null
      this.inputData.currency = null
      this.inputData.sector = null
      this.inputData.education = null
      this.inputData.maritalStatus = null
      this.inputData.region = null
      this.inputData.branch = null
      this.inputData.creditHistoryCount = null
      this.inputData.dependants = null
      this.$refs.observer.reset()

      this.loading = false
      this.errorAlert = false
      this.resultAlert = null
    },

    sendQuery(){
      this.errorAlert = false
      this.loading = true
      var path = this.settings.serverAddress + '/api/v1.0/predict';
      var data = {'path':path,'data':{'method':this.settings.calcMethod, 'inputData':this.inputData}};
      console.log(data);
      this.$store.dispatch('apiAdapter/post', data)
        .then(res => { 
          console.log('success')
          console.log(res)
          if(res.data['success']==1){
            this.resultAlert = 'no'
          }else{
            this.resultAlert = 'yes'
          }
          
          this.loading = false
        })
        .catch(e => {
          console.log('error')
          console.log(e)
          this.loading = false
          this.errorAlert = true
        });
    }
  }  

}
</script>
