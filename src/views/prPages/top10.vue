<template>
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
              <b-card v-if="orgLoading || (!!OrganizationList && OrganizationList.length > 0)" style="min-height:100px;max-height:500px;overflow:auto">
                  <b-list-group v-if="!orgLoading">
                        <b-list-group-item class="cursor-pointer d-flex justify-content-between align-items-center" v-for="(item,index) in OrganizationList" @click="SelectOrg(item)" :active="filter.orgid == item.id" :key="index"> 
                          <span> {{ item.full_name }} </span>
                            <b-badge
                                variant="success"
                                pill
                                class="badge-round"
                                v-if="!!item.url"
                            >
                            <feather-icon   icon="CheckIcon"></feather-icon>
                            </b-badge>
                            <b-badge
                                variant="danger"
                                v-if="!item.url"
                                pill
                                class="badge-round"
                            >
                            <feather-icon   icon="XIcon"></feather-icon>
                            </b-badge>
                           <!-- <feather-icon class="text-success text-right" size="20" icon="CheckCircleIcon"></feather-icon>   -->
                        </b-list-group-item>
                  </b-list-group>
                  <b-row v-if="orgLoading">
                      <b-col class="text-center">
                          <b-spinner></b-spinner>
                      </b-col>
                  </b-row>
              </b-card>
      </b-col>
      <b-col sm="12" md="9">
          <b-card>
              <b-row>
                  <b-col>
                      <b-button variant="danger" @click="GotoDashboard"> {{ $t('back') }} </b-button>
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
          </b-card>
            <b-overlay :show="loading">
                <b-card>
                    <b-table-simple small striped responsive borderless>
                    <b-thead class='text-center'>
                        <b-tr>
                            <b-th style="vertical-align:middle"  rowspan="2" class="bg-primary text-white"> {{ $t('date') }} </b-th>
                            <b-th colspan="2" class="text-center bg-primary text-white"> {{ $t('web_site') }} </b-th>
                            <b-th colspan="2" class="text-center bg-primary text-white">  {{ $t('telegram') }} </b-th>
                            <b-th colspan="2" class="text-center bg-primary text-white">  {{ $t('fb_page') }} </b-th>
                            <b-th colspan="2" class="text-center bg-primary text-white">  {{ $t('instagram_new') }} </b-th>
                            <b-th colspan="2" class="text-center bg-primary text-white">  {{ $t('youtube') }} </b-th>
                            <!-- <b-th colspan="2" class="text-center bg-primary text-white"> Twitter </b-th>
                            <b-th colspan="2" class="text-center bg-primary text-white"> Tiktok </b-th>
                            <b-th colspan="2" class="text-center bg-primary text-white"> Teletype </b-th> -->
                        </b-tr>
                        <b-tr class="bg-primary text-white">
                            <b-th class="bg-primary text-white">  {{ $t('url') }} </b-th>
                            <b-th class="bg-primary text-white">  {{ $t('Views') }} </b-th>
                            <b-th class="bg-primary text-white">  {{ $t('url') }} </b-th>
                            <b-th class="bg-primary text-white">  {{ $t('Views') }} </b-th>
                            <b-th class="bg-primary text-white">  {{ $t('url') }} </b-th>
                            <b-th class="bg-primary text-white">  {{ $t('Likes') }} </b-th>
                            <b-th class="bg-primary text-white">  {{ $t('url') }} </b-th>
                            <b-th class="bg-primary text-white">  {{ $t('Likes') }} </b-th>
                            <b-th class="bg-primary text-white">  {{ $t('url') }} </b-th>
                            <b-th class="bg-primary text-white">  {{ $t('Views') }} </b-th>
                            <!-- <b-th class="bg-primary text-white"> Ссылка </b-th>
                            <b-th class="bg-primary text-white"> Просмотр </b-th>
                            <b-th class="bg-primary text-white"> Ссылка </b-th>
                            <b-th class="bg-primary text-white"> Просмотр </b-th>
                            <b-th class="bg-primary text-white"> Ссылка </b-th>
                            <b-th class="bg-primary text-white"> Просмотр </b-th> -->
                        </b-tr>
                    </b-thead>
                    <b-tbody class='text-center'>
                        <b-tr v-for="(item,index) in top10List" :key="index">
                            <b-th> {{ item.date }} </b-th>
                            <b-th>{{ item.web_site_url || '-' }}</b-th>
                            <b-th>{{ item.web_site_like || 0 }}</b-th>
                            <b-th>{{ item.telegram_url_url || '-' }}</b-th>
                            <b-th>{{ item.telegram_url_views || 0 }}</b-th>
                            <b-th> <b-button v-if="item.fb_page_url" variant="primary" size="sm" @click="GotoSocial(item.fb_page_url)"> {{ $t('go') }} </b-button> </b-th>
                            <b-th>{{ item.fb_page_likes || 0}}</b-th>
                            <b-th> <b-button v-if="item.instagram_new_url" variant="primary" size="sm" @click="GotoSocial(item.instagram_new_url)"> {{ $t('go') }} </b-button>  </b-th>
                            <b-th>{{ item.instagram_new_likes || 0 }}</b-th>
                            <b-th> <b-button v-if="item.youtube_url" variant="primary" size="sm" @click="GotoSocial(item.youtube_url)"> {{ $t('go') }} </b-button>  </b-th>
                            <b-th>{{ item.youtube_views || 0 }}</b-th>
                            <!-- <b-th>{{ item.twitter_url || '-' }}</b-th>
                            <b-th>{{ item.twitter_like || 0 }}</b-th>
                            <b-th>{{ item.tiktok_url || '-' }}</b-th>
                            <b-th>{{ item.tiktok_views || 0 }}</b-th>
                            <b-th>{{ item.teletype_url || '-' }}</b-th>
                            <b-th>{{ item.teletype_views || 0 }}</b-th> -->
                        </b-tr>
                        
                        
                    </b-tbody>
                </b-table-simple>
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
            </b-overlay>
      </b-col>
  </b-row>
</template>

<script>
import OrganizationService from "@/services/organization.service"
import Top10Service from "@/services/top10.service"
import moment from 'moment'
export default {
    data(){
        return{
            OblastList : [],
            CategoryList : [],
            filter : {
                oblastid : null,
                categoryid : null,
                from_date : '2022-01-01',
                to_date : '2022-01-31',
                orgid : null,
                specialization : null,
                timetype : 'day',
                page : 1,
                limit : 20,
                socialid : null,
                isconnect : null
            },
            orgLoading : false,
            SpecializationList : [],
            loading : false,
            top10List : [],
            OrganizationList : [],
            totalrow : 0,
            lang : localStorage.getItem('locale')
        }
    },
    created(){
        this.dateType('week')
        if(!!this.$route.query.date){
            this.filter.from_date = this.$route.query.date
            this.filter.to_date = this.$route.query.date
        }
        if(!!this.$route.query.timetype){
            this.filter.timetype = this.$route.query.timetype
        }
        if(this.$route.query.isconnect == true || this.$route.query.isconnect == 'true'){
            this.filter.isconnect = true
        }
        if(this.$route.query.isconnect == false || this.$route.query.isconnect == 'false'){
            this.filter.isconnect = false
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
        if(!!this.$route.query.from_date){
            this.filter.from_date = this.$route.query.from_date || null
            this.filter.to_date = this.$route.query.to_date || null
        }
        if(!!this.$route.query.orgid){
            this.filter.orgid = this.$route.query.orgid || null
            this.filter.specialization = this.$route.query.specialization || null
            this.filter.oblastid = this.$route.query.oblastid || null
            this.filter.categoryid = this.$route.query.categoryid || null
            this.RefreshOrg()
            this.Refresh()
        }
        else{
            this.TotalOrg()
            this.Refresh()
        }
        // if(!!this.filter.oblastid || !!this.filter.specialization || !!this.filter.categoryid){
        //     this.RefreshOrg()
        // }
        // if(!!this.filter.orgid){
        //     this.Refresh()
        // }
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
        GotoDashboard(){
            this.$router.push({ 
                name : 'dashboard', 
                query : {
                    orgid : this.$route.query.orgid,
                    oblastid : this.$route.query.oblastid,
                    categoryid : this.$route.query.categoryid,
                    socialid : this.$route.query.socialid,
                    timetype : this.$route.query.timetype,
                    isconnect : this.$route.query.isconnect
                }
            })
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
        TotalOrg(){
            this.filter.oblastid = null
            this.filter.specialization = null
            this.filter.categoryid = null
            this.filter.orgid = null
            this.RefreshOrg()
            
        },
        GotoSocial(item){
            window.open(item, '_blank')
        },
        RefreshOrgSpes(item){
            this.filter.specialization = item.id
            this.RefreshOrg()
        },
        RefreshOrg(){
            this.orgLoading = true
            OrganizationService.OrganizationGetOblastID(this.filter.oblastid,this.filter.categoryid,this.filter.specialization,this.filter.isconnect,this.filter.socialid,this.lang).then(res => {
                this.OrganizationList = res.data.data
                this.orgLoading = false
            }).catch(error => {
                this.orgLoading = false
            })
            this.Refresh()
        },
        SelectOrg(item){
            this.filter.orgid = item.id
            this.Refresh()
        },
        Refresh(){
            this.loading = true
            Top10Service.top10(this.filter.page,this.filter.limit,this.filter.orgid,this.filter.from_date,this.filter.to_date).then(res => {
                this.top10List = res.data.data
                this.loading = false
                this.totalrow = res.data.total_row
            })
        }
    }
}
</script>

<style>

</style>