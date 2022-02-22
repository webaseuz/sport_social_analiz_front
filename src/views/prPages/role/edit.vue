<template>
  <b-overlay :show="loading">
      <b-card>
          <b-row>
              <b-col sm="12" md="4"> 
                  <h5> {{ $t('full_name') }} </h5>
                  <b-form-input type="text" v-model="Role.name"></b-form-input>
              </b-col>
              <b-col sm="12" md="4">

              </b-col>
          </b-row>
          <b-row class="mx-1">
              <b-col v-for="(item) in ModuleList" :key="item.id" sm="12" md="6" lg="3" class="my-1">
                  <input
                    :id="'child' + item.id"
                    class="form-check-input"
                    type="checkbox"
                    :value="item.id"
                    v-model="Role.permissions"
                    @change="onChangeCheckbox(item.id)"
                    />

                    <label :for="'child' + item.id" style="color: #000">{{
                    item.name
                    }}</label>
              </b-col>
          </b-row>
          <b-row>
                <b-col sm="12" md="6">
                    <b-button variant="danger" @click="$router.push({ name : 'Role' })"> {{ $t('backToOrganization') }} </b-button>
                </b-col>
                <b-col sm="12" md="6" class="text-right">
                    <b-button variant="success" @click="SaveData"> <b-spinner v-if="SaveLoading" small></b-spinner> {{ $t('save') }} </b-button>
                </b-col>
            </b-row>
      </b-card>
  </b-overlay>
</template>

<script>
import RoleService from "@/services/role.service"
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
    data(){
        return{
            loading : false,
            Role : {},
            ModuleList : [],
            SaveLoading : false,
            lang : localStorage.getItem('locale')
            
        }
    },
    created(){
        RoleService.Permission(this.lang).then(res => {
            this.ModuleList = res.data
        })
        this.Refresh()
    },
    methods:{
        makeToast(message,variant){
            this.$toast({
                component: ToastificationContent,
                props: {
                  title: message,
                  icon: variant == "success" ? "CheckSquareIcon" : 'AlertCircleIcon',
                  variant: variant,
                },
            });
        },
        onChangeCheckbox(id){},
        Refresh(){
            this.loading = true
            RoleService.Get(this.$route.params.id).then(res => {
                this.loading = false
                this.Role = res.data
            })
        },
        SaveData(){
            this.SaveLoading = true
            RoleService.Update(this.Role).then(res => {
                this.SaveLoading = false
                var vm = this
                setTimeout(() => {
                    vm.$router.push({ name : 'Role' })
                },500)
            }).catch(error => {
                this.SaveLoading = false
                this.makeToast(error.response.data.detail,'danger')
            })
        }
    }
}
</script>

<style>

</style>