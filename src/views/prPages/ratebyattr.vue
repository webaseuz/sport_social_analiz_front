<template>
  <div>
      <b-row>
          <b-col sm="12" md="3">
              <b-card>
                  <b-row class="mt-1">
                      <b-col>
                          
                          <h5> {{ $t('specialization') }} </h5>
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
                                @input="Refresh"
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
                                @input="Refresh"
                            ></v-select>
                      </b-col>
                  </b-row>
                  
              </b-card>
              <b-card>
                  <b-row>
                      <b-col>
                          <b-button block :variant="filter.isconnect === false ? 'danger' : 'outline-danger'" @click="ChangeConnectOrg(false)"> {{ $t('isConnectFalse') }} </b-button>
                          <b-button block :variant="filter.isconnect === true ? 'success' :  'outline-success'" @click="ChangeConnectOrg(true)"> {{ $t('isConnectTrue') }} </b-button>
                          <!-- <b-button block variant="info"> Instruktsiya </b-button> -->
                      </b-col>
                  </b-row>
              </b-card>
          </b-col>
          <b-col sm="12" md="9">
              <b-card>
          <b-row>
                <b-col sm="12" md="6">
                    <b-button size="md" class="mr-1" @click="SelectSocial('')" :variant="filter.socialid === '' ? 'primary' :'outline-primary'"> <feather-icon size="30" style="margin-top:8px;margin-bottom:8px" icon="GridIcon"></feather-icon> </b-button>
                    <b-button size="md" class="mr-1" @click="SelectSocial('web_site')"  :variant="filter.socialid === 'web_site' ? 'primary' : 'outline-primary'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="GlobeIcon"></feather-icon> </b-button>
                    <b-button size="md" class="mr-1" @click="SelectSocial('telegram')"  :variant="filter.socialid === 'telegram' ? 'primary' : 'outline-primary'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="NavigationIcon"></feather-icon> </b-button>
                    <b-button size="md" class="mr-1" @click="SelectSocial('fb_page')"  :variant="filter.socialid === 'fb_page' ? 'primary' : 'outline-primary'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="FacebookIcon"></feather-icon> </b-button>
                    <b-button size="md" class="mr-1" @click="SelectSocial('instagram_new')"  :variant="filter.socialid === 'instagram_new' ? 'primary' : 'outline-primary'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="InstagramIcon"></feather-icon> </b-button>
                    <b-button size="md" class="mr-1" @click="SelectSocial('youtobe')"  :variant="filter.socialid === 'youtobe' ? 'primary' : 'outline-primary'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="YoutubeIcon"></feather-icon> </b-button>
                </b-col>
                <b-col class="d-flex align-items-center justify-content-end">
                    <b-form-input
                        id="basicInput"
                        placeholder="Enter Email"
                        type="date"
                        style="width:180px;margin-right:10px"
                        v-model="filter.from_date"
                    />
                    <b-form-input
                        id="basicInput"
                        placeholder="Enter Email"
                        type="date"
                        style="width:180px;margin-right:10px"
                        v-model="filter.to_date"
                    />
                    <b-button variant="primary" @click="SelectDate"> <feather-icon icon="SearchIcon"></feather-icon> </b-button>
                </b-col>
              </b-row>
              <b-row class="mt-1" >
                        <b-col></b-col>
                        <b-col class="d-flex align-items-center justify-content-end">
                            <b-button-group
                                    size="sm"
                                >
                                    <b-button
                                        :variant="filter.timetype == 'day' ? 'primary' : 'outline-primary'"
                                        @click="SelectDateType('day')"
                                    >
                                        {{ $t('day') }}
                                    </b-button>
                                    <b-button
                                        :variant="filter.timetype == 'week' ? 'primary' : 'outline-primary'"
                                        @click="SelectDateType('week')"
                                    >
                                        {{ $t('week') }}
                                    </b-button>
                                    <b-button
                                        :variant="filter.timetype == 'month' ? 'primary' : 'outline-primary'"
                                        @click="SelectDateType('month')"
                                    >
                                        {{ $t('month') }}
                                    </b-button>
                                    <b-button
                                        :variant="filter.timetype == 'year' ? 'primary' : 'outline-primary'"
                                        @click="SelectDateType('year')"
                                    >
                                        {{ $t('year') }}
                                    </b-button>
                                </b-button-group>
                        </b-col>
                    </b-row>
              <b-overlay :show="serviceLoading">
                  <b-row class="mt-2">
                    <b-col>
                        <b-table
                                :fields="fields"
                                :items="SpecServiceList"
                                show-empty
                                class="text-center"
                                @sort-changed="sortChange"
                                sticky-header="60vh"
                                no-border-collapse
                                :tbody-tr-class="rowClass"
                                style="cursor: pointer;"
                                selectable
                                @row-selected="SelectOrg"
                                selected-variant="dark"
                                :select-mode="'single'"
                            >
                                <template v-slot:empty>
                                    <h5 class="text-center">{{ $t("NoItems") }}</h5>
                                </template>
                            </b-table>
                        
                    </b-col>
                </b-row>
                <b-row>
                        <b-col>

                        </b-col>
                        <b-col class="d-flex align-items-center justify-content-end">
                            <b-pagination
                                v-model="filter.page"
                                :total-rows="totalrow"
                                first-number
                                last-number
                                prev-class="prev-item"
                                next-class="next-item"
                                @input="Refresh"
                                >
                                <template #prev-text>
                                    <feather-icon
                                    icon="ChevronLeftIcon"
                                    size="18"
                                    />
                                </template>
                                <template #next-text>
                                    <feather-icon
                                    icon="ChevronRightIcon"
                                    size="18"
                                    />
                                </template>
                            </b-pagination>
                        </b-col>
                </b-row>
              </b-overlay>
            </b-card>
            <b-row>
                        <b-col>
                            <b-card>
                                <vue-apex-charts
                                    type="line"
                                    height="350"
                                    style="height:350px"
                                    :options="StaticListDataOptions"
                                    :series="StaticListDataSeries"
                                />
                            </b-card>
                        </b-col>
                    </b-row>
          </b-col>
      </b-row>
      
  </div>
</template>

<script>
import SpecService from "@/services/spesservice.service"
import OrganizationService from "@/services/organization.service"
import DashboardService from '@/services/dashboard.service'
import { $themeColors } from '@themeConfig'
import VueApexCharts from 'vue-apexcharts'
import moment from 'moment'
export default {
    components : { VueApexCharts },
    data(){
        return{
            filter : {
                oblastid : null,
                categoryid : null,
                from_date : '2022-01-01',
                to_date : '2022-01-31',
                orgid : 0,
                socialid : "",
                specialization : null,
                isconnect : null,
                page : 1,
                limit : 20,
                orderby : 'desc',
                sort : null,
                timetype : 'day'
            },
            SpecServiceList  : [],
            serviceLoading : false,
            LevelList : [],
            rate : null,
            SpecializationList : [],
            CategoryList : [],
            OblastList : [],
            totalrow  :0,
            fields : [
                { key :  'name', label : this.$t('Organization'),tdClass : 'text-left' },
                { key : 'views', label : this.$t('Views'),sortable : true },
                { key : 'likes', label : this.$t('Likes'),sortable : true },
                { key : 'reposts', label : this.$t('Reposts'),sortable : true },
                { key : 'comments', label : this.$t('Comments'),sortable : true },
                { key : 'fallowers', label : this.$t('Fallowers'),sortable : true },
                
                
                
            ],
            StaticListDataOptions : {},
            StaticListDataSeries : [],
            lang : localStorage.getItem('locale'),
            PostCount : {}
        }
    },
    created(){
        this.dateType('week')
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
        SpecService.levelName(this.lang).then(res => {
            this.LevelList = res.data
        })
    },
    methods:{
        ChangeConnectOrg(bool){
            if(bool === false){
                if(this.filter.isconnect === false){
                    this.filter.isconnect = null
                }
                else{
                    this.filter.isconnect = false
                }
            }
            if(bool === true){
                if(this.filter.isconnect === true){
                    this.filter.isconnect = null
                }
                else{
                    this.filter.isconnect = true
                }
            }
            this.Refresh()
        },
        SelectDateType(type){
            this.dateType(type)
            this.SelectDate()
        },
        dateType(type){
            var date = new Date();
            this.filter.to_date = moment(date).format('YYYY-MM-DD')
            this.filter.timetype = type
            if(type == 'day'){
                this.filter.from_date = this.filter.to_date
            }
            if(type == 'week'){
                date.setDate(date.getDate() - 6);
                this.filter.from_date = moment(date).format('YYYY-MM-DD')
            }
            if(type == 'month'){
                date.setMonth(date.getMonth() - 1);
                this.filter.from_date = moment(date).format('YYYY-MM-DD')
            }
            if(type == 'year'){
                date.setFullYear(date.getFullYear() - 1);
                this.filter.from_date = moment(date).format('YYYY-MM-DD')
            }
        },
        RefreshOrgSpes(item){
            this.filter.specialization = item.id
            this.Refresh()
        },
        rowClass(){

        },
        SelectSocial(item){
            this.filter.socialid = item
            DashboardService.Posts(this.filter.oblastid,this.filter.categoryid,this.filter.specialization,this.filter.orgid,this.filter.isconnect,this.filter.socialid,this.filter.from_date,this.filter.to_date).then(res => {
                this.PostCount = res.data
                this.fields = [
                    { key :   'name', label : this.$t('Organization') },
                    { key : res.data.views != 'null' ? 'views' : null, label : this.$t('Views'),sortable : true },
                    { key : res.data.likes != 'null' ? 'likes' : null, label : this.$t('Likes'),sortable : true },
                    { key : res.data.reposts != 'null' ? 'reposts' : null, label : this.$t('Reposts'),sortable : true },
                    { key : res.data.comments != 'null' ? 'comments' : null, label : this.$t('Comments'),sortable : true },
                    { key : res.data.fallowers != 'null' ? 'fallowers' : null, label : this.$t('Fallowers'),sortable : true }
                ]
            })
            this.Refresh()
        },
        TotalOrg(){
            this.filter.oblastid = null
            this.filter.specialization = null
            this.filter.categoryid = null
            this.filter.orgid = 0
            this.filter.isconnect = null
            this.filter.sort = null
            this.Refresh()
        },
        Rated(item){
            SpecService.LevelOrganizationViews({ level : this.rate,organization : item.organid }).then(res => {
                this.$refs['RateModal' + item.id][0].hide()
                this.Refresh()
            })
        },
        sortChange(data){
            this.filter.sort = data.sortBy
            this.filter.orderby = data.sortDesc === true ? 'asc' : 'desc'
            this.Refresh()
        },
        SelectOrg(){
            
        },
        OpenRateModal(item){
            this.rate = ""
            this.$refs['RateModal' + item.id][0].show()
        },
        SelectRate(item){
            this.rate = item.type
        },
        getItemColor(item){
            if(item.type == 0){
                return 'secondary'
            }
            if(item.type == 1){
                return 'danger'
            }
            if(item.type == 2){
                return 'warning'
            }
            if(item.type == 3){
                return 'success'
            }
        },
        SelectDate(){
            this.Refresh()
            
        },
        Refresh(){
            this.serviceLoading = true
            DashboardService.OrganizationPostCount(
                this.filter.sort,
                this.filter.page,
                this.filter.limit,
                this.filter.orderby,
                this.filter.oblastid,
                this.filter.categoryid,
                this.filter.specialization,
                this.filter.orgid,
                this.filter.socialid,
                this.filter.isconnect,
                this.filter.from_date,
                this.filter.to_date
            ).then(res => {
                this.SpecServiceList = res.data.data
                this.serviceLoading = false
                this.totalrow = res.data.total_row
            })
            this.StaticListData()
        },
        StaticListData(){
            DashboardService.StaticListData(
                this.filter.oblastid,
                this.filter.categoryid,
                this.filter.specialization,
                this.filter.orgid,
                this.filter.socialid,
                this.filter.isconnect,
                this.filter.from_date,
                this.filter.to_date
            ).then(res => {
                if(this.filter.sort == 'views'){
                    this.StaticListDataSeries = [
                        {
                            name : this.$t('Views'),
                            data: res.data.data.map(item => item.views),
                        }
                    ]
                }
                if(this.filter.sort == 'comments'){
                    this.StaticListDataSeries = [
                        {
                            name : this.$t('Comments'),
                            data: res.data.data.map(item => item.comments),
                        },
                    ]
                }
                if(this.filter.sort == 'fallowers'){
                    this.StaticListDataSeries = [
                        {
                            name : this.$t('Fallowers'),
                            data: res.data.data.map(item => item.views),
                        }
                    ]
                }
                if(this.filter.sort == 'likes'){
                    this.StaticListDataSeries = [
                        {
                            name : this.$t('Likes'),
                            data: res.data.data.map(item => item.likes),
                        },
                    ]
                }
                if(this.filter.sort == 'reposts'){
                    this.StaticListDataSeries = [
                        {
                            name : this.$t('Reposts'),
                            data: res.data.data.map(item => item.reactions),
                        },
                    ]
                }
                if(this.filter.sort == '' || this.filter.sort == null || this.filter.sort == 'null'){
                    this.StaticListDataSeries = [
                        // {
                        //     name : "Публикаций",
                        //     data: res.data.data.map(item => item.posts),
                        // },
                        {
                            name : this.$t('Views'),
                            data: res.data.data.map(item => item.views),
                        },
                        {
                            name : this.$t('Likes'),
                            data: res.data.data.map(item => item.likes),
                        },
                        {
                            name : this.$t('Reposts'),
                            data: res.data.data.map(item => item.reactions),
                        },
                        {
                            name : this.$t('Comments'),
                            data: res.data.data.map(item => item.comments),
                        },
                        {
                            name : this.$t('Fallowers'),
                            data: res.data.data.map(item => item.views),
                        }
                    ]
                }
                
                this.StaticListDataOptions = {
                    chart: {
                        zoom: {
                        enabled: false,
                        },
                        toolbar: {
                        show: false,
                        },
                    },
                    markers: {
                        strokeWidth: 7,
                        strokeOpacity: 1,
                        strokeColors: [$themeColors.light],
                        colors: [$themeColors.warning],
                    },
                    colors: [$themeColors.warning,$themeColors.danger,$themeColors.warning,$themeColors.success,$themeColors.success],
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: 'straight',
                    },
                    grid: {
                        xaxis: {
                        lines: {
                            show: true,
                        },
                        },
                    },
                    tooltip: {
                        custom(data) {
                        return `${'<div class="px-1 py-50"><span>'}${
                            data.series[data.seriesIndex][data.dataPointIndex]
                        } ta</span></div>`
                        },
                    },
                    xaxis: {
                        categories: res.data.data.map(item => item.date),
                    },
                    yaxis: {
                        // opposite: isRtl,
                    },
                }
            })
        },
    }
}
</script>

<style>

</style>