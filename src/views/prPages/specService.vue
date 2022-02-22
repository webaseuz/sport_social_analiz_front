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
                        <b-col sm="12" md="6">

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
                <b-row class="mt-2">
                    <b-col>
                        <b-table-simple small responsive="sm" borderless striped>
                            <b-thead>
                                <b-tr>
                                        <b-th style="vertical-align:middle"  rowspan="2" class="bg-primary text-center text-white"> {{ $t('Organization') }} </b-th>
                                        <b-th colspan="2" class="text-center bg-primary text-white"> {{ $t('web_site') }} </b-th>
                                        <b-th colspan="2" class="text-center bg-primary text-white"> {{ $t('telegram') }} </b-th>
                                        <b-th colspan="2" class="text-center bg-primary text-white"> {{ $t('fb_page') }} </b-th>
                                        <b-th colspan="2" class="text-center bg-primary text-white"> {{ $t('instagram_new') }} </b-th>
                                        <b-th colspan="2" class="text-center bg-primary text-white"> {{ $t('youtube') }} </b-th>
                                        <!-- <b-th colspan="2" class="text-center bg-primary text-white"> Twitter </b-th>
                                        <b-th colspan="2" class="text-center bg-primary text-white"> Tiktok </b-th>
                                        <b-th colspan="2" class="text-center bg-primary text-white"> Teletype </b-th> -->
                                        <b-th style="vertical-align:middle" rowspan="2" class="bg-primary text-center text-white"> {{ $t('Rate') }} </b-th>
                                        <b-th style="vertical-align:middle" rowspan="2" class="bg-primary text-center text-white"> {{ $t('actions') }} </b-th>
                                    </b-tr>
                                    <b-tr >
                                        <b-th class="bg-primary text-white text-center"> {{ $t('Posts') }} </b-th>
                                        <b-th class="bg-primary text-white text-center"> {{ $t('Comments') }} </b-th>
                                        <b-th class="bg-primary text-white text-center"> {{ $t('Posts') }} </b-th>
                                        <b-th class="bg-primary text-white text-center"> {{ $t('Views') }} </b-th>
                                        <b-th class="bg-primary text-white text-center"> {{ $t('Posts') }} </b-th>
                                        <b-th class="bg-primary text-white text-center"> {{ $t('Likes') }} </b-th>
                                        <b-th class="bg-primary text-white text-center"> {{ $t('Posts') }} </b-th>
                                        <b-th class="bg-primary text-white text-center"> {{ $t('Likes') }} </b-th>
                                        <b-th class="bg-primary text-white text-center"> {{ $t('Posts') }} </b-th>
                                        <b-th class="bg-primary text-white text-center"> {{ $t('Views') }} </b-th>
                                        <!-- <b-th class="bg-primary text-white"> Пост </b-th>
                                        <b-th class="bg-primary text-white"> Лайк </b-th>
                                        <b-th class="bg-primary text-white"> Пост </b-th>
                                        <b-th class="bg-primary text-white"> Просмотр </b-th>
                                        <b-th class="bg-primary text-white"> Пост </b-th>
                                        <b-th class="bg-primary text-white"> Просмотр </b-th> -->
                                    </b-tr>
                            </b-thead>
                            <b-tbody v-if="!serviceLoading" class="text-center">
                                <b-tr v-for="(item,index) in SpecServiceList" :key="index" v-show="SpecServiceList.length > 0">
                                    <b-th class="text-left">
                                        {{ item.name }}
                                    </b-th>
                                    <b-th>
                                        {{ item.web_site_posts }}
                                    </b-th>
                                    <b-th>
                                        {{ item.web_site_comments }}
                                    </b-th>
                                    <b-th>
                                        {{ item.telegram_url_posts }}
                                    </b-th>
                                    <b-th>
                                        {{ item.telegram_url_views }}
                                    </b-th>
                                    <b-th>
                                        {{ item.fb_page_posts }}
                                    </b-th>
                                    <b-th>
                                        {{ item.fb_page_like }}
                                    </b-th>
                                    <b-th>
                                        {{ item.instagram_new_posts }}
                                    </b-th>
                                    <b-th>
                                        {{ item.instagram_new_like }}
                                    </b-th>
                                    <b-th>
                                        {{ item.youtube_posts }}
                                    </b-th>
                                    <b-th>
                                        {{ item.youtube_views }}
                                    </b-th>
                                    <!-- <b-th>
                                        {{ item.twitter_posts }}
                                    </b-th>
                                    <b-th>
                                        {{ item.twitter_views }}
                                    </b-th>
                                    <b-th>
                                        {{ item.tiktok_posts }}
                                    </b-th>
                                    <b-th>
                                        {{ item.tiktok_views }}
                                    </b-th>
                                    <b-th>
                                        {{ item.teletype_posts }}
                                    </b-th>
                                    <b-th>
                                        {{ item.teletype_views }}
                                    </b-th> -->
                                    <b-th>
                                        <b-badge :variant="item.rate.type == 0 ? 'light-secondary' : item.rate.type == 1 ? 'light-danger' : item.rate.type == 2 ? 'light-warning' : 'light-success'"> {{ item.rate.name }} </b-badge>
                                    </b-th>
                                    <b-th>
                                        <b-button size="sm" variant="primary" @click="OpenRateModal(item)"> {{ $t('Rating') }} </b-button>
                                        <b-modal
                                            :ref="'RateModal' + item.organid"
                                            no-close-on-backdrop
                                            hide-footer
                                            >
                                            <template #modal-title>
                                                {{ $t("Rate") }}
                                            </template>
                                            <b-card-text>
                                                <b-row>
                                                    <b-col class="my-1" sm="12" md="6" lg="4" v-for="(el,index1) in LevelList" :key="index1">
                                                        <b-button @click="SelectRate(el)" :variant="rate === el.id ? `${getItemColor(el)}` : `outline-${getItemColor(el)}`" block> {{ el.name }} </b-button>
                                                    </b-col>
                                                </b-row>
                                                <b-row>
                                                    <b-col class="text-right">
                                                        <b-button class="mr-1" @click="$refs['RateModal' + item.organid][0].hide()" variant="danger"> {{ $t('close') }} </b-button>
                                                        <b-button  @click="Rated(item)" variant="success"> {{ $t('save') }} </b-button>
                                                    </b-col>
                                                </b-row>
                                            </b-card-text>
                                        </b-modal>
                                    </b-th>

                                </b-tr>
                                <b-tr v-if="SpecServiceList.length == 0">
                                    <b-td colspan="19" class="text-center">
                                        {{ $t('NoItems') }}
                                    </b-td>
                                </b-tr>
                            </b-tbody>
                            <b-tbody v-if="serviceLoading" class="my-1">
                                <b-tr class="my-1">
                                    <b-td colspan="19" class="text-center ">
                                        <b-spinner></b-spinner>
                                    </b-td>
                                </b-tr>
                            </b-tbody>
                        </b-table-simple>

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
            </b-card>
          </b-col>
      </b-row>
  </div>
</template>

<script>
import SpecService from "@/services/spesservice.service"
import OrganizationService from "@/services/organization.service"
import moment from 'moment'
export default {
    data(){
        return{
            OblastList : [],
            CategoryList : [],
            filter : {
                from_date : "2022-01-01",
                to_date : "2022-01-31",
                page : 1,
                limit : 20,
                oblastid : null,
                categoryid : null,
                specialization : null,
                timetype : 'day',
                orgid : 0,
                isconnect : null
            },
            SpecServiceList  : [],
            serviceLoading : false,
            LevelList : [],
            rate : null,
            totalrow : 0,
            orgLoading: false,
            SpecializationList : [],
            lang : localStorage.getItem('locale')
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
        this.Refresh()
        SpecService.levelName(this.lang).then(res => {
            this.LevelList = res.data
        })
    },
    methods:{
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
        Rated(item){
            // alert(item.organid)
            SpecService.LevelOrganizationViews({ level : this.rate,organization : item.organid }).then(res => {
                this.$refs['RateModal' + item.organid][0].hide()
                this.Refresh()
            })
        },
        OpenRateModal(item){
            this.rate = ""
            this.$refs['RateModal' + item.organid][0].show()
        },
        SelectRate(item){
            this.rate = item.id
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
        Refresh(){
            this.serviceLoading = true
            SpecService.AllOrganizationStatsData(
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
                this.SpecServiceList = res.data.data
                this.totalrow = res.data.total_row
                this.serviceLoading = false
            })
        }
    }
}
</script>

<style>

</style>