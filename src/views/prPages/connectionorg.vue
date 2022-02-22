<template>
  <div>
      <b-row>
          <b-col sm="12" md="3">
              <b-card>
                  <b-row class="mt-1">
                      <b-col>
                          
                          <h5> {{ $t('specialization') }} </h5>
                          <!-- <v-select
                                :options="SpecializationList"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="fullname"
                                v-model="filter.specialization"
                                @input="RefreshOrg"
                            ></v-select> -->
                            <b-row>
                                <b-col>
                                    <b-button @click="TotalOrg" block :variant="filter.specialization == null && filter.oblastid == null && filter.categoryid == null ? 'primary' : 'outline-primary'"> {{ $t('total') }} </b-button>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col sm="12" md="6" class="mt-1" v-for="(item,index) in SpecializationList" :key="index">
                                    <b-button @click="RefreshOrgSpes(item)" block :variant="filter.specialization == item.id ? 'primary' : 'outline-primary'"> {{ item.fullname }} </b-button>
                                </b-col>
                            </b-row>
                      </b-col>
                  </b-row>
                  <b-row class="mt-1">
                      <b-col>
                          <h5> {{ $t('oblast') }} </h5>
                          <v-select
                                :options="OblastList"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="fullname"
                                v-model="filter.oblastid"
                                @input="RefreshOrg"
                            ></v-select>
                      </b-col>
                  </b-row>
                  <b-row class="mt-1">
                      <b-col>
                          <h5> {{ $t('Category') }} </h5>
                          <v-select
                                :options="CategoryList"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="fullname"
                                v-model="filter.categoryid"
                                @input="RefreshOrg"
                            ></v-select>
                      </b-col>
                  </b-row>
              </b-card>
          </b-col>
          <b-col sm="12" md="9">
              <b-card>
                <b-row>
                    <b-col>
                            <!-- <b-button size="md" class="mr-1" @click="SelectSocial('')" :variant="filter.socialid === '' ? 'primary' :'outline-primary'"> <feather-icon size="30" style="margin-top:8px;margin-bottom:8px" icon="GridIcon"></feather-icon> </b-button> -->
                            <b-button size="md" class="mr-1" @click="SelectSocial('web_site')"  :variant="filter.socialid === 'web_site' ? 'primary' : 'outline-primary' "> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="GlobeIcon"></feather-icon> </b-button>
                            <b-button size="md" class="mr-1" @click="SelectSocial('telegram')"  :variant="filter.socialid === 'telegram' ? 'primary' : 'outline-primary'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="NavigationIcon"></feather-icon> </b-button>
                            <b-button size="md" class="mr-1" @click="SelectSocial('fb_page')"  :variant="filter.socialid === 'fb_page' ? 'primary' : 'outline-primary'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="FacebookIcon"></feather-icon> </b-button>
                            <b-button size="md" class="mr-1" @click="SelectSocial('instagram_new')"  :variant="filter.socialid === 'instagram_new' ? 'primary' : 'outline-primary'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="InstagramIcon"></feather-icon> </b-button>
                            <b-button size="md" class="mr-1" @click="SelectSocial('youtube')"  :variant="filter.socialid === 'youtube' ? 'primary' : 'outline-primary'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="YoutubeIcon"></feather-icon> </b-button>
                            <!-- <b-button size="md" class="mr-1" @click="SelectSocial('twitter')" :disabled="!canView.twitter" :variant="canView.twitter ? filter.socialid === 'twitter' ? 'primary' : 'outline-primary' : 'outline-danger'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="TwitterIcon"></feather-icon> </b-button> -->
                        </b-col>
                        <b-col class="d-flex align-items-center justify-content-end">
                            <b-button @click="$router.push({ name : 'dashboard' })" variant="danger"> {{ $t('back') }} </b-button>
                        </b-col>
                </b-row>
                <app-collapse
                    accordion
                    type="border"
                    :active="true"
                    class="mt-2"
                    >

                    <app-collapse-item title="" :isVisible="isVisibleTrue">
                        <template #header>
                            <h6 class="m-0 text-success"> <feather-icon size="24" icon="CheckCircleIcon">   </feather-icon> <span class="ml-1"> {{ $t('isConnectTrue') }} </span> <b-badge variant="success"> {{ ConnectedOrgList.length }}/{{ ConnectedOrgList.length + NotConnectedOrgList.length }} </b-badge> </h6>
                        </template>
                        <div>
                            <b-list-group>
                                <b-list-group-item v-for="(item,index) in ConnectedOrgList" :key="index" style="cursor:pointer" @click="GotoDashboard(item,true)">
                                    {{ index + 1 }}.  {{ item.name }} 
                                </b-list-group-item>
                            </b-list-group>
                        </div>
                    </app-collapse-item>

                    <app-collapse-item title="" :isVisible="isVisibleFalse">
                        <template #header>
                            <h6 class="m-0 text-danger"> <feather-icon  size="24" icon="XCircleIcon">   </feather-icon> <span class="ml-1"> {{ $t('isConnectFalse') }} </span>  <b-badge variant="danger"> {{ NotConnectedOrgList.length }}/{{ ConnectedOrgList.length + NotConnectedOrgList.length }} </b-badge></h6>
                        </template>
                        <div style="overflow:auto;height:500px">
                            <b-list-group>
                                <b-list-group-item v-for="(item,index) in NotConnectedOrgList" :key="index" style="cursor:pointer" @click="GotoDashboard(item,false)">
                                    {{ index + 1 }}.  {{ item.name }} 
                                </b-list-group-item>
                            </b-list-group>
                        </div>
                    </app-collapse-item>
                    </app-collapse>
            </b-card>
          </b-col>
      </b-row>
  </div>
</template>

<script>
import DashboardService from "@/services/dashboard.service"
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import OrganizationService from "@/services/organization.service"
export default {
    components: {
    AppCollapse,
    AppCollapseItem
  },
    data(){
        return{
            filter : {
                oblastid : null,
                categoryid : null,
                specialization : null,
                isconnect : null,
                socialid : ''
            },
            ConnectionOrgList : {},
            ConnectedOrgList : [],
            NotConnectedOrgList : [],
            OblastList : [],
            CategoryList : [],
            SpecializationList : [],
            isVisibleTrue : false,
            isVisibleFalse : false,
            lang : localStorage.getItem('locale')
        }
    },
    created(){
        this.filter.socialid = this.$route.query.socialid || 'web_site'
        if(this.$route.query.isconnect == true || this.$route.query.isconnect == 'true'){
            this.isVisibleTrue = true
        }
        if(this.$route.query.isconnect == false || this.$route.query.isconnect == 'false'){
            this.isVisibleFalse = true
        }
        
        OrganizationService.GetOblastList(this.lang).then(res => {
            this.OblastList = res.data
        })
        OrganizationService.GetCategoryList(this.lang).then(res => {
            this.CategoryList = res.data
        })
        OrganizationService.Specialization(this.lang).then(res => {
            this.SpecializationList = res.data
        })
        this.TotalOrg()
        this.ConnectionOrg()
    },
    methods:{
        GotoDashboard(item,isconnect){
            this.$router.push({ 
                name : 'dashboard',
                query : { 
                    orgid : item.id,
                    isconnect : isconnect,
                    socialid : this.filter.socialid,
                    timetype : this.$route.query.timetype || 'week'
                } 
            })
        },
        TotalOrg(){
            this.filter.oblastid = null
            this.filter.specialization = null
            this.filter.categoryid = null
            this.filter.isconnect = null
            this.RefreshOrg()
        },
        ConnectionOrg(){
            DashboardService.IsConnectCount(this.filter.oblastid,this.filter.categoryid,this.filter.specialization,this.filter.isconnect).then(res => {
                this.ConnectionOrgList = res.data
                this.ConnectedOrgList = res.data[this.$route.query.socialid || this.filter.socialid].isconnect_true || []
                this.NotConnectedOrgList = res.data[this.$route.query.socialid || this.filter.socialid].isconnect_false || []
            })
        },
        SelectSocial(item){
            this.filter.socialid = item
            this.ConnectedOrgList = this.ConnectionOrgList[item].isconnect_true || []
            this.NotConnectedOrgList = this.ConnectionOrgList[item].isconnect_false || []
        },
        RefreshOrgSpes(item){
            this.filter.specialization = item.id
            this.RefreshOrg()

        },
        RefreshOrg(){
            this.ConnectionOrg()
        },
    }
}
</script>

<style>

</style>