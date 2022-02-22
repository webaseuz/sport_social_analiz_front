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
                                    <b-button :disabled="orgLoading" @click="RefreshOrgSpes(item)" block :variant="filter.specialization == item.id ? 'primary' : 'outline-primary'"> {{ item.fullname }} </b-button>
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
                        <b-col>
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
                <b-row class="mt-2">
                    <b-col>
                        <b-overlay :show="loading">
                            <b-table-simple>
                                <b-thead>
                                    <b-tr>
                                        <b-th style="vertical-align:middle"  rowspan="2" class="bg-primary text-white"> {{ $t('SpecService') }} </b-th>
                                        <b-th style="vertical-align:middle" v-for="(item,index) in RateCols" :key="index + 'col1'" class="text-center bg-primary text-white"> {{ item.name }} </b-th>
                                        
                                        <b-th style="vertical-align:middle" rowspan="2" class="bg-primary text-white"> {{ $t('avarage') }} </b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody>
                                    <b-tr v-for="(item,index) in RateRows" :key="index + 'rows'">
                                        <b-th> {{ item.name }} </b-th>
                                        <b-th v-for="(el,i) in RateCols" :key="i + 'col2'" class="text-center"> 
                                            <b-badge :variant="Object.keys(RateCells[item.id]).length > 0 && !!RateCells[item.id][el.id] && RateCells[item.id][el.id].type == 3 ? 'light-success' : Object.keys(RateCells[item.id]).length > 0 && !!RateCells[item.id][el.id] && RateCells[item.id][el.id].type == 2 ? 'light-warning' : !!RateCells[item.id][el.id] && RateCells[item.id][el.id].type == 1 ? 'light-danger'  : 'light-secondary'"> {{ !!RateCells[item.id][el.id] ? RateCells[item.id][el.id].name : '-' }} </b-badge>  
                                        </b-th>
                                        <b-th> 
                                            <b-badge :variant="RateMiddle[item.id].type == 3 ? 'light-success' : RateMiddle[item.id].type == 2 ? 'light-warning' : RateMiddle[item.id].type == 1 ? 'light-danger' : 'light-secondary'"> {{ RateMiddle[item.id].name || '-' }} </b-badge>  
                                        </b-th>
                                    </b-tr>
                                </b-tbody>
                            </b-table-simple>
                        </b-overlay>
                    </b-col>
                </b-row>
                <b-row class="mt-1">
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
                <b-row>
                    <b-col sm="12" md="4" v-if="PostedSeries.length > 0">
                        <vue-apex-charts
                                type="donut"
                                height="350"
                                style="height:350px"
                                :options="PostedOptions"
                                :series="PostedSeries"
                            />
                    </b-col>
                    <b-col sm="12" md="8">
                        <b-row>
                            <b-col v-for="(item,index) in LevelList" :key="'col' + index" sm="12" md="6" lg="3" class='mt-2 text-center' >
                                    <b-badge size="lg" :variant="item.type == 3 ? 'light-success' : item.type == 2 ? 'light-warning' : item.type == 0 ? 'light-secondary' : 'light-danger'" > {{ item.name }}   </b-badge> 
                                    <b> {{ (((PostedSeries[item.type])/RateRows.length)*100 || 0).toFixed(1) + '%' }} </b>
                                    <b-list-group class='mt-2' style="max-height:500px;overflow:auto">
                                        <b-list-group-item v-for="(element,ele) in RateMiddleCount.filter(i => i.name.type == item.type).length > 0 ? RateMiddleCount.filter(i => i.name.type == item.type)[0].rows : []" :key="'ListGroupItem' + ele"> {{ element }} </b-list-group-item>
                                        
                                    </b-list-group>
                                </b-col>
                                
                            </b-row>
                    </b-col>
                </b-row>
            </b-card>
          </b-col>
      </b-row>
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import RateService from '@/services/rate.service'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import SpesService from '@/services/spesservice.service'
import moment from 'moment'
import OrganizationService from "@/services/organization.service"
export default {
    components : {VueApexCharts},
    data(){
        return{
            filter : {
                from_date : "",
                to_date : '',
                timetype : 'day',
                oblastid : null,
                categoryid : null,
                specialization : null,
                orgid : 0,
                isconnect : null,
                page : 1,
                limit : 20
            },
            loading : false,
            RateCells : {},
            RateCols : [],
            RateMiddle : {},
            RateMiddleCount : [],
            RateRows : [],
            PostedSeries : [],
            PostedOptions : {},
            LevelList : [],
            OblastList : [],
            CategoryList : [],
            SpecializationList : [],
            orgLoading : false,
            totalrow : 0,
            lang : localStorage.getItem('locale')
        }
    },
    directives: {
        Ripple,
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
        this.Refresh()
        SpesService.levelName(this.lang).then(res => {
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
        RefreshOrgSpes(item){
            this.filter.specialization = item.id
            this.Refresh()
        },
        TotalOrg(){
            this.filter.oblastid = null
            this.filter.specialization = null
            this.filter.categoryid = null
            this.filter.orgid = 0
            this.filter.isconnect = null
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
        SelectDate(){
            this.Refresh()
        },
        Refresh(){
            this.loading = true
            RateService.levelOrg(
                this.filter.page,
                this.filter.limit,
                this.filter.oblastid,
                this.filter.categoryid,
                this.filter.specialization,
                this.filter.isconnect,
                this.filter.from_date,
                this.filter.to_date,
                this.lang
            ).then(res => {
                this.RateCells = res.data.cells
                this.RateCols = res.data.cols
                this.RateMiddle = res.data.middle
                this.RateMiddleCount = res.data.middle_count
                this.RateRows = res.data.rows
                this.totalrow = res.data.total_row
                this.loading = false
                this.PostedSeries = [
                    res.data.middle_count.filter(el => el.name.type == 0)[0]?.rows.length || 0,
                    res.data.middle_count.filter(el => el.name.type == 1)[0]?.rows.length || 0,
                    res.data.middle_count.filter(el => el.name.type == 2)[0]?.rows.length || 0,
                    res.data.middle_count.filter(el => el.name.type == 3)[0]?.rows.length || 0,
                ]
                console.log(this.PostedSeries)
                this.PostedOptions = {
                    legend: {
                            show: true,
                            position: 'bottom',
                            fontSize: '14px',
                            fontFamily: 'Montserrat',
                        },
                        colors: [
                            $themeColors.secondary, $themeColors.danger,$themeColors.warning, $themeColors.success
                        ],
                        dataLabels: {
                            enabled: true,
                            formatter(val) {
                            // eslint-disable-next-line radix
                            return `${parseInt(val)}%`
                            },
                        },
                        plotOptions: {
                            pie: {
                            donut: {
                                labels: {
                                show: true,
                                name: {
                                    fontSize: '2rem',
                                    fontFamily: 'Montserrat',
                                },
                                value: {
                                    fontSize: '1rem',
                                    fontFamily: 'Montserrat',
                                    formatter(val) {
                                    // eslint-disable-next-line radix
                                    return `${parseInt(val)/this.PostedSeries.reduce((partialSum, a) => partialSum + a, 0)}%`
                                    },
                                },
                                total: {
                                    show: true,
                                    fontSize: '1.5rem',
                                    label: 'Umumiy',
                                    formatter(val) {
                                        return `100%`
                                    },
                                },
                                },
                            },
                            },
                        },
                        labels: [
                            this.LevelList.filter(el => el.type == 0)[0].name,
                            this.LevelList.filter(el => el.type == 1)[0].name,
                            this.LevelList.filter(el => el.type == 2)[0].name,
                            this.LevelList.filter(el => el.type == 3)[0].name
                        ],
                        responsive: [
                            {
                            breakpoint: 992,
                            options: {
                                chart: {
                                height: 380,
                                },
                                legend: {
                                position: 'bottom',
                                },
                            },
                            },
                            {
                            breakpoint: 576,
                            options: {
                                chart: {
                                height: 320,
                                },
                                plotOptions: {
                                pie: {
                                    donut: {
                                    labels: {
                                        show: true,
                                        name: {
                                        fontSize: '1.5rem',
                                        },
                                        value: {
                                        fontSize: '1rem',
                                        },
                                        total: {
                                        fontSize: '1.5rem',
                                        },
                                    },
                                    },
                                },
                                },
                                legend: {
                                show: true,
                                },
                            },
                            },
                        ],
                }
            })
        }
    }
}
</script>

<style>

</style>