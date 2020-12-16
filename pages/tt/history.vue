<template>
  <v-row justify="center" align="start">
    <v-col cols="12" sm="12" md="12">
          <v-data-table
                dense
                :headers="headers"
                :items="rows"
                item-key="name"
                class="elevation-1"
                :loading=loading
                loading-text="Загружается..."
                :footer-props="{ 
                    itemsPerPageText: 'Строк на странице:', 
                    itemsPerPageOptions: [10,20,50,100,-1]
                }"
            >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Последные рассчеты</v-toolbar-title>
                </v-toolbar>
            </template>
            </v-data-table>
    </v-col>
  </v-row>
</template>
<style>

</style>
<script>
export default {
  layout: 'tdefault',
  components: {
    
  },
  data(){
    return{
      loading: true,
      rows: [],

     headers: [
        { text: 'Дата и время', align: 'start', value: 'createTime', width: 150},
        { text: 'Метод', value: 'method' },
        { text: 'Результать', value: 'predictionResult' },
        { text: 'Возраст', value: 'age' },
        { text: 'Пол', value: 'gender' },
        { text: 'Сумма', value: 'amount' },
        { text: 'Срок', value: 'duration' },
        { text: 'Валюта', value: 'currency' },
        { text: 'Назначение', value: 'sector' },
        { text: 'Обрназование', value: 'education' },
        { text: 'Семейное положение', value: 'maritalStatus' },
        { text: 'Область', value: 'region' },
        { text: 'Филиал', value: 'branch' },
        { text: 'Количество кредитных историй', value: 'creditHistoryCount' },
        { text: 'Иждивенцы', value: 'dependants' },
      ],
    }
  },
  mounted() {
     this.loadHistory()
  },
  methods: {
    calc(){
      console.log(this.inputData)
    },
    loadHistory(){
      this.loading = true
      var path = 'http://localhost:5000/api/v1.0/history';
      this.$store.dispatch('apiAdapter/get', path)
        .then(res => { 
          console.log('success')
          console.log(res)
          this.rows = res.data
          this.loading = false
        })
        .catch(e => {
          console.log('error')
          console.log(e)
          this.loading = false
        });
    }
  }  

}
</script>
