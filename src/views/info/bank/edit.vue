<template>
    <b-overlay :show="show">
      <b-row >
      <b-col cols="9">
        <b-card no-body>
        <b-form @submit.prevent>
          <b-row class="m-2">
            <b-col cols="12">
              <b-form-group
                label="Code"
                label-for="h-first-name"
                label-cols-md="4"
              >
                <b-form-input
                  id="h-first-name"
                  placeholder="Code"
                  v-model="Bank.Code"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="BankName"
                label-for="h-email"
                label-cols-md="4"
              >
                <b-form-input
                  id="h-email"
                  type="email"
                  placeholder="Bankname"
                  v-model="Bank.Bankname"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Status"
                label-for="h-number"
                label-cols-md="4"
              >
                <v-select
                    v-model="Bank.Stateid"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="StateList"
                    :reduce="item => item.id"
                    :clearable="false"
                    label="name"
                  />
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
        </b-card>
      </b-col>
      <b-col cols="3">
        <b-card no-body>
          <b-row class="m-2">
            <b-col>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="success"
                block
                class="mr-1"
                @click="SaveData"
              >
              <feather-icon icon="CheckIcon" />
              <b-spinner v-if="SaveLoading" small></b-spinner>
                Save
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                block
                type="reset"
                variant="danger"
                :to="{ name : 'bank' }"
              >
                <feather-icon icon="ArrowLeftIcon" />
                Back
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    </b-overlay>
  
</template>

<script>
import Ripple from 'vue-ripple-directive'
import BankService from '@/services/info/bank.service'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import HelperService from '@/services/others/helper.service'
export default {
  data(){
    return{
      Bank : {},
      show : false,
      StateList : [],
      SaveLoading : false
    }
  },
  created(){
    this.show = true
    BankService.Get(this.$route.params.id).then(res => {
      this.Bank = res.data
      this.show = false
    }).catch(error => {
      this.makeToast(error.response.data.error,"AlertTriangleIcon",'danger')
    })
    HelperService.GetStateList().then(res => {
      this.StateList = res.data
    })
  },
  methods : {
    makeToast(title,icon,variant){
      this.$toast({
        component: ToastificationContent,
        props: {
          title: title,
          icon: icon,
          variant: variant,
        },
      })
    },
    SaveData(){
      BankService.Update(this.Bank).then(res => {
        this.makeToast("SuccessSave","CheckIcon","success")
        this.$router.push({name : 'bank'})
      }).catch(error => {
        this.makeToast(error.response.data.error,"AlertTriangleIcon",'danger')
      })
    }
  },
  directives: {
    Ripple,
  },
}
</script>
 