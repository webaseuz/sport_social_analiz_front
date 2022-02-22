<template>
  <b-overlay>
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
              <b-overlay :show="selectOrgLoading">
                  <b-card>
                    <b-row>
                        <b-col></b-col>
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
                        <b-col>
                            
                        </b-col>
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
                    <!-- <b-row class="mt-1" v-if="!!filter.socialid">
                        <b-col>
                            <b-button variant="primary" @click="GotoSocialWebSite"> Перейти <feather-icon icon="ChevronsRightIcon"></feather-icon> </b-button>
                        </b-col>
                    </b-row> -->
                </b-card>
                <b-card>
                    <b-table
                        :fields="fields"
                        :items="items"
                        show-empty
                        class="text-center"
                        @sort-changed="sortChange"
                        sticky-header="60vh"
                        no-border-collapse
                        :tbody-tr-class="rowClass"
                        style="cursor: pointer;"
                        selectable
                        sort-desc
                        @row-selected="SelectOrg"
                        selected-variant="dark"
                        :select-mode="'single'"
                    >
                        <template v-slot:empty>
                            <h5 class="text-center">{{ $t("NoItems") }}</h5>
                        </template>
                    </b-table>
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
                                @input="RefreshOrg"
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
                </b-card>
                <b-card>
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
                                <h4 class="text-center"> {{ $t('Posts') }} </h4>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-card>
              </b-overlay>
          </b-col>
      </b-row>
  </b-overlay>
</template>

<script>
import OrganizationService from "@/services/organization.service"
import DashboardService from "@/services/dashboard.service"
import TwoPageService from "@/services/twopage.service"
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import moment from 'moment'
export default {
    components : {VueApexCharts},
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
                isconnect : true,
                orderby : 'desc',
                page : 1,
                limit : 20,
                timetype : 'day'
            },
            SpecializationList : [],
            CategoryList : [],
            OblastList : [],
            orgLoading : false,
            OrganizationList : [],
            selectOrgLoading : false,
            fields : [
                { key : 'name',label : this.$t('Organization'),tdClass : 'text-left' }, 
                { key : 'web_site_count',label : this.$t('web_site_count'),sortable : true,variant : ''  },
                { key : 'telegram_count',label : this.$t('telegram_count'),sortable : true  },
                { key : 'fb_page_count',label : this.$t('fb_page_count'),sortable : true  },
                { key : 'instagram_new_count',label : this.$t('instagram_new_count'),sortable : true  },
                { key : 'youtube_count',label : this.$t('youtube_count'),sortable : true  },
                { key : 'evolation_result',label : this.$t('evolation_result'),sortable : true  },
                // { key : 'name',label : 'Name'  },
            ],
            items : [],
            StaticListDataSeries : [],
            StaticListDataOptions : {},
            totalrow : 0,
            lang : localStorage.getItem('locale')
        }
    },
    created(){
        this.dateType('week')
        OrganizationService.Specialization(this.lang).then(res => {
            this.SpecializationList = res.data
        })
        OrganizationService.GetCategoryList(this.lang).then(res => {
            this.CategoryList = res.data
        })
        OrganizationService.GetOblastList(this.lang).then(res => {
            this.OblastList = res.data
        })
        this.RefreshOrg()
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
            this.RefreshOrg()
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
        SelectOrg(item){
            this.filter.orgid = item[0].id
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
                this.StaticListDataSeries = [
                    {
                        name : "Публикаций",
                        data: res.data.data.map(item => item.posts),
                    },
                    // {
                    //     name : "Просмотров",
                    //     data: res.data.data.map(item => item.views),
                    // },
                    // {
                    //     name : "Лайков",
                    //     data: res.data.data.map(item => item.likes),
                    // },
                    // {
                    //     name : "Репостов",
                    //     data: res.data.data.map(item => item.reactions),
                    // },
                    // {
                    //     name : "Комментариев",
                    //     data: res.data.data.map(item => item.comments),
                    // },
                    // {
                    //     name : "Подписчиков",
                    //     data: [290, 200, 220, 180, 270, 250, 70, 90, 200, 150, 160, 100, 150, 100, 50],
                    // }
                ],
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
                    colors: [
                        $themeColors.info,
                        // $themeColors.warning,$themeColors.danger,$themeColors.warning,$themeColors.success,$themeColors.success
                    ],
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
        rowClass(item, type) {
            if (!!item && item.evolation_result < 5) {
                return "bg-danger text-white";
            }
            if (!!item && item.evolation_result > 5 && item.evolation_result < 10) {
                return "bg-warning text-white";
            }
            if (!!item && item.evolation_result > 10) {
                return "bg-success text-white";
            }
        },
        SelectSocial(social){
            this.filter.socialid = social
        },
        sortChange(data){
            this.filter.socialid = data.sortBy
            this.filter.orderby = data.sortDesc === true ? 'desc' : 'asc'
            this.RefreshOrg()
        },
        SelectDate(){
            this.RefreshOrg()
        },
        RefreshOrg(){
            this.StaticListDataSeries = []
            this.StaticListDataOptions = {}
            this.selectOrgLoading = true
            TwoPageService.OrganizationEvolation(
                this.filter.orderby,
                this.filter.page,
                this.filter.limit,
                this.filter.oblastid,
                this.filter.categoryid,
                this.filter.specialization,
                this.filter.isconnect,
                this.filter.socialid,
                this.filter.from_date,
                this.filter.to_date
            ).then(res => {
                this.selectOrgLoading = false
                this.items = res.data.data
                this.totalrow = res.data.total_row
            })
            this.StaticListData()
        },
        TotalOrg(){
            this.filter.oblastid = null
            this.filter.specialization = null
            this.filter.categoryid = null
            this.filter.isconnect = null
            this.RefreshOrg()
        },
        RefreshOrgSpes(item){
            this.filter.specialization = item.id
            this.RefreshOrg()

        },
    }
}
</script>

<style>

</style>