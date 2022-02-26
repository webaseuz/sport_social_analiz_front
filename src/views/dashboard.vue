<template>
  <b-overlay>
      <b-row>
          <b-col sm="12" md="4" lg="3">
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
                                <b-col sm="12" md="12" lg="12" xl="6" class="mt-1" v-for="(item,index) in SpecializationList" :key="index">
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
          <b-col sm="12" md="8" lg="9">
              <b-overlay :show="selectOrgLoading || MainLoading">
                  <b-card>
                    <b-row>
                        <b-col sm="12" md="12" lg="12">
                            <b-button size="md" class="mr-1 my-1" @click="SelectSocial(null)" :variant="filter.socialid === null ? 'primary' :'outline-primary'"> <feather-icon size="30" style="margin-top:8px;margin-bottom:8px" icon="GridIcon"></feather-icon> </b-button>
                            <b-button size="md" class="mr-1 my-1" @click="SelectSocial('web_site')" :disabled="canView.web_site == null || !canView.web_site.bool" :variant="canView.web_site &&canView.web_site.bool ? filter.socialid === 'web_site' ? 'primary' : 'outline-primary' : 'outline-danger'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="GlobeIcon"></feather-icon> </b-button>
                            <b-button size="md" class="mr-1 my-1" @click="SelectSocial('telegram')" :disabled="canView.telegram == null || !canView.telegram.bool" :variant="canView.telegram && canView.telegram.bool ? filter.socialid === 'telegram' ? 'primary' : 'outline-primary' : 'outline-danger'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="NavigationIcon"></feather-icon> </b-button>
                            <b-button size="md" class="mr-1 my-1" @click="SelectSocial('fb_page')" :disabled="canView.fb_page == null || !canView.fb_page.bool" :variant="canView.fb_page && canView.fb_page.bool ? filter.socialid === 'fb_page' ? 'primary' : 'outline-primary' : 'outline-danger'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="FacebookIcon"></feather-icon> </b-button>
                            <b-button size="md" class="mr-1 my-1" @click="SelectSocial('instagram_new')" :disabled="canView.instagram_new == null || !canView.instagram_new.bool" :variant="canView.instagram_new && canView.instagram_new.bool ? filter.socialid === 'instagram_new' ? 'primary' : 'outline-primary' : 'outline-danger'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="InstagramIcon"></feather-icon> </b-button>
                            <b-button size="md" class="mr-1 my-1" @click="SelectSocial('youtube')" :disabled="canView.youtube == null || !canView.youtube.bool" :variant="canView.youtube && canView.youtube.bool ? filter.socialid === 'youtube' ? 'primary' : 'outline-primary' : 'outline-danger'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="YoutubeIcon"></feather-icon> </b-button>
                           <b-button size="md" class="mr-1 my-1" @click="SelectSocial('television')" :disabled="canView.television == null || !canView.television.bool" :variant="canView.television && canView.television.bool ? filter.socialid === 'television' ? 'primary' : 'outline-primary' : 'outline-danger'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="TvIcon"></feather-icon> </b-button>
                           <b-button size="md" class="mr-1 my-1" @click="SelectSocial('radio')" :disabled="canView.radio == null || !canView.radio.bool" :variant="canView.radio && canView.radio.bool ? filter.socialid === 'radio' ? 'primary' : 'outline-primary' : 'outline-danger'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="RadioIcon"></feather-icon> </b-button>
                           <b-button size="md" class="mr-1 my-1" @click="SelectSocial('gazeta')" :disabled="canView.gazeta == null || !canView.gazeta.bool" :variant="canView.gazeta && canView.gazeta.bool ? filter.socialid === 'gazeta' ? 'primary' : 'outline-primary' : 'outline-danger'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="BookIcon"></feather-icon> </b-button>
                           <b-button size="md" class="mr-1 my-1" @click="SelectSocial('jurnal')" :disabled="canView.jurnal == null || !canView.jurnal.bool" :variant="canView.jurnal && canView.jurnal.bool ? filter.socialid === 'jurnal' ? 'primary' : 'outline-primary' : 'outline-danger'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="BookOpenIcon"></feather-icon> </b-button>
                        <b-button size="md" class="mr-1 my-1" @click="SelectSocial('other')" :disabled="canView.other == null || !canView.other.bool" :variant="canView.other && canView.other.bool ? filter.socialid === 'other' ? 'primary' : 'outline-primary' : 'outline-danger'"> <feather-icon size="28" style="margin-top:8px;margin-bottom:8px" icon="MoreHorizontalIcon"></feather-icon> </b-button>
                       
                       </b-col>
                        <b-col sm="12" md="12" lg="6" class="d-flex align-items-center ">
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
                        <b-col  sm="12" md="12" lg="6" class="d-flex align-items-center justify-content-end">
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
                    <b-row class="mt-1" >
                        <b-col>
                            <b-button v-if="!!filter.socialid && !!filter.orgid" variant="primary" @click="GotoSocialWebSite"> {{ $t('go') }} <feather-icon icon="ChevronsRightIcon"></feather-icon> </b-button>
                        </b-col>
                        
                    </b-row>
                </b-card>
                <b-row class="match-height" >
                    <b-col
                        xl="2"
                        md="4"
                        sm="6"
                        v-if="PostCount.posts != 'null'"
                    >
                        <statistic-card-vertical
                            icon="EditIcon"
                            :statistic="PostCount.posts || 0"
                            :statistic-title="$t('Posts')"
                            @clicked="Gotop10"
                            color="info"
                        />
                    </b-col>
                    <b-col
                        xl="2"
                        md="4"
                        sm="6"
                        v-if="PostCount.views != 'null'"
                    >
                        <statistic-card-vertical
                            @clicked="Gotop10"
                            color="warning"
                            icon="EyeIcon"
                            :statistic="PostCount.views || 0"
                            :statistic-title="$t('Views')"
                        />
                    </b-col>
                    <b-col
                        xl="2"
                        md="4"
                        sm="6"
                        v-if="PostCount.likes != 'null'"
                    >
                        <statistic-card-vertical
                            @clicked="Gotop10"
                            color="danger"
                            icon="HeartIcon"
                            :statistic="PostCount.likes || 0"
                            :statistic-title="$t('Likes')"
                        />
                    </b-col>
                    <b-col
                        xl="2"
                        md="4"
                        sm="6"
                        v-if="PostCount.reposts != 'null'"
                    >
                        <statistic-card-vertical
                            @clicked="Gotop10"
                            color="warning"
                            icon="RepeatIcon"
                            :statistic="PostCount.reposts || 0"
                            :statistic-title="$t('Reposts')"
                        />
                    </b-col>
                    <b-col
                        xl="2"
                        md="4"
                        sm="6"
                        v-if="PostCount.comments != 'null'"
                    >
                        <statistic-card-vertical
                            @clicked="Gotop10"
                            color="success"
                            icon="MessageCircleIcon"
                            :statistic="PostCount.comments || 0"
                            :statistic-title="$t('Comments')"
                        />
                    </b-col>
                    <b-col
                        xl="2"
                        md="4"
                        sm="6"
                        v-if="PostCount.fallowers != 'null'"
                    >
                        <statistic-card-vertical
                            @clicked="GotoSocialWebSite"
                            color="success"
                            icon="SmileIcon"
                            :statistic="PostCount.fallowers || 0"
                            :statistic-title="$t('Fallowers')"
                        />
                    </b-col>
                    
                    </b-row>
                    <b-row v-if="PostedSeries.length > 0 && !filter.orgid">
                        <b-col sm="12" md="12" lg="4">
                            <b-card>
                                <vue-apex-charts
                                    type="donut"
                                    height="350"
                                    style="height:350px"
                                    :options="PostedOptions"
                                    :series="PostedSeries"
                                />
                                <h4 class="m-0 mt-n2 text-center p-0"> {{ $t('isConnectTrue') }} : {{ PostedSeries[0] }} ta </h4>
                                <h4 class="m-0 text-center p-0"> {{ $t('isConnectFalse') }} : {{ PostedSeries[1] }} ta </h4>
                            </b-card>
                        </b-col>
                        <b-col sm="12" md="12" lg="8">
                            <b-card>
                                <vue-apex-charts
                                    type="bar"
                                    height="335"
                                    :options="ConnectDataOptions"
                                    :series="ConnectDataSeries"
                                />
                            </b-card>
                        </b-col>
                    </b-row>
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
              </b-overlay>
          </b-col>
      </b-row>
  </b-overlay>
</template>

<script>
import OrganizationService from "@/services/organization.service"
import DashboardService from "@/services/dashboard.service"
import StatisticCardVertical from '@core/components/statistics-cards/StatisticCardVertical.vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import moment from 'moment'
export default {
    components : {StatisticCardVertical,VueApexCharts},
    data(){
        return{
            OblastList : [],
            CategoryList : [],
            filter : {
                oblastid : null,
                categoryid : null,
                from_date : '2022-01-01',
                to_date : '2022-01-31',
                orgid : 0,
                socialid : null,
                specialization : null,
                isconnect : null,
                timetype : 'week'
            },
            orgLoading : false,
            OrganizationList : [],
            canView : {},
            
            selectOrgLoading : false,
            MainLoading : false,
            PostCount : {},
            SpecializationList : [],
            PostedSeries : [],
            PostedOptions : {},
            StaticListDataSeries : [],
            StaticListDataOptions : {},
            ConnectDataOptions : {},
            ConnectDataSeries : [],
            lang : localStorage.getItem('locale')
        }
    },
    created(){
        // this.filter.oblastid = this.$store.state.oblastid
        // this.filter.specialization = this.$store.state.specialization
        // this.filter.categoryid = this.$store.state.categoryid
        // this.filter.orgid = this.$store.state.orgid
        this.dateType('week')
        if(!!this.$route.query.socialid){
            this.filter.socialid = this.$route.query.socialid
        }
        if(!!this.$route.query.from_date){
            this.filter.from_date = this.$route.query.from_date
        }
        if(!!this.$route.query.to_date){
            this.filter.to_date = this.$route.query.to_date
        }
        if(!!this.$route.query.oblastid){
            this.filter.oblastid = this.$route.query.oblastid
        }
        if(!!this.$route.query.categoryid){
            this.filter.categoryid = this.$route.query.categoryid
        }
        if(!!this.$route.query.specialization){
            this.filter.specialization = this.$route.query.specialization
        }
        if(!!this.$route.query.timetype){
            this.filter.timetype = this.$route.query.timetype
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
        if(this.$route.query.isconnect == true || this.$route.query.isconnect == 'true'){
            this.filter.isconnect = true
        }
        if(this.$route.query.isconnect == false || this.$route.query.isconnect == 'false'){
            this.filter.isconnect = false
        }
        if(this.$route.query.isconnect == null || this.$route.query.isconnect == 'null'){
            this.filter.isconnect = null
        }
        // this.TotalOrg()
        if(!!this.$route.query.orgid){
            
            // this.filter.isconnect = this.$route.query.isconnect
            this.filter.orgid = this.$route.query.orgid
            
            this.OrgLoad()
            this.GetPostsCount()
            // this.StaticListData()
            
            
            this.Refresh()
        }
        else{
            this.TotalOrg()
        }
        
    },
    methods:{
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
        Test(){
            alert(1)
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
            this.RefreshOrg()
            this.GetPostsCount()
            // this.StaticListData()
            this.StaticOrganPostData()
        },
        IsConnectCountFunc(){
            DashboardService.IsConnectCount(this.filter.oblastid,this.filter.categoryid,this.filter.specialization,this.filter.isconnect).then(res => {
                this.ConnectDataSeries = [
                    {
                        name: this.$t('isConnectTrue'),
                        data: Object.values(res.data).map(item => item.isconnect_true_count),
                    },
                    {
                        name: this.$t('isConnectFalse'),
                        data: Object.values(res.data).map(item => item.isconnect_false_count)
                    },
                ]
                this.ConnectDataOptions = {
                    colors: [
                            $themeColors.success, $themeColors.danger
                    ],
                    chart: {
                        type: 'bar',
                        height: 350,
                        toolbar: {
                            show: false,
                        },
                        events: {
                            dataPointSelection: (event, chartContext, config) => {
                                // console.log(config)
                                this.$router.push({ 
                                    name : 'ConnectionOrg',
                                    query : { 
                                        socialid : Object.keys(res.data)[config.dataPointIndex],
                                        isconnect : config.seriesIndex == 0 ? true : false,
                                        from_date : this.filter.from_date,
                                        to_date : this.filter.to_date,
                                        timetype : this.filter.timetype

                                    } 
                                })
                            }
                        },
                        
                    },
                    
                    dataLabels: {
                        enabled: true,
                        formatter: function (val) {
                            return val;
                        },
                        offsetY: 0,
                        style: {
                            fontSize: '12px',
                            colors: ["#000"]
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '55%',
                            endingShape: 'rounded'
                        },
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent']
                    },
                    xaxis: {
                        categories: Object.keys(res.data).map(item => this.$t(item)),
                    },
                    yaxis: {
                        title: {
                            text: this.$t('Organization')
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                            return val + " ta"
                            }
                        }
                    }
                }
            })
        },
        TotalOrg(){
            this.filter.oblastid = null
            this.filter.specialization = null
            this.filter.categoryid = null
            this.filter.orgid = 0
            this.filter.isconnect = null
            this.RefreshOrg()
        },
        Gotop10(){
            if(!!this.filter.orgid){
                this.$router.push({ name : 'Top10', 
                query : { 
                        orgid : this.filter.orgid,
                        from_date : this.filter.from_date,
                        to_date : this.filter.to_date,
                        specialization : this.filter.specialization,
                        oblastid  :this.filter.oblastid,
                        categoryid : this.filter.categoryid ,
                        timetype : this.filter.timetype,
                        socialid : this.filter.socialid,
                        isconnect : this.filter.isconnect
                    } 
                })
            }
            else{
                this.makeToast(this.$t('notSelectedOrg'),'danger')
            }
        },
        RefreshOrgSpes(item){
            this.filter.specialization = item.id
            this.RefreshOrg()

        },
        RefreshOrg(){
            this.filter.socialid = null
            this.filter.orgid = null
            this.canView = {}
            this.PostCount = {}
            this.StaticListDataSeries = []
            this.StaticListDataOptions = {}
            this.OrgLoad()
            this.GetPostsCount()
            this.Refresh()
            this.StaticOrganPostData()
            this.IsConnectCountFunc()
            // this.StaticListData()
        },
        OrgLoad(){
            this.orgLoading = true
            OrganizationService.OrganizationGetOblastID(this.filter.oblastid,this.filter.categoryid,this.filter.specialization,this.filter.isconnect,this.filter.socialid,this.lang).then(res => {
                this.OrganizationList = res.data.data
                this.orgLoading = false
            }).catch(error => {
                this.orgLoading = false
            })
        },
        Refresh(){
            this.MainLoading = true
            DashboardService.SatsialNetwork(
                this.filter.oblastid,
                this.filter.categoryid,
                this.filter.specialization,
                this.filter.orgid,
                this.filter.isconnect
            ).then(res => {
                this.canView = res.data
                this.MainLoading = false
            })
        },
        
        SelectOrg(item){
            this.filter.orgid = item.id
            this.$store.state.orgid = this.filter.orgid
            this.Refresh()
            this.GetPostsCount()
            // this.StaticListData()
        },
        SelectSocial(socialid){
            this.filter.socialid = socialid || null
            this.OrgLoad()
            this.GetPostsCount()
            // this.StaticListData()
        },
        GetPostsCount(){
            this.selectOrgLoading = true
            DashboardService.Posts(this.filter.oblastid,this.filter.categoryid,this.filter.specialization,this.filter.orgid,this.filter.isconnect,this.filter.socialid,this.filter.from_date,this.filter.to_date).then(res => {
                this.PostCount = res.data
                this.StaticListData()
                this.selectOrgLoading = false
            })
        },
        SelectDate(){
            this.GetPostsCount()
            // this.StaticListData()
        },
        //Posted Noposted
        StaticOrganPostData(){
            DashboardService.StaticOrganPostData(this.filter.oblastid,this.filter.categoryid,this.filter.specialization,this.filter.isconnect).then(res => {
                this.PostedSeries = [res.data.isconnectTrue,res.data.isconnectFalse]
                this.PostedOptions = {
                    legend: {
                            show: true,
                            position: 'bottom',
                            fontSize: '14px',
                            fontFamily: 'Montserrat',
                        },
                        colors: [
                            $themeColors.success, $themeColors.danger
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
                                    return `${parseInt(val)} ta`
                                    },
                                },
                                total: {
                                    show: true,
                                    fontSize: '1.5rem',
                                    label: this.$t('total'),
                                    formatter() {
                                        return res.data.isconnectTrue+res.data.isconnectFalse == 0 ? '0%' :'100%'
                                    },
                                },
                                },
                            },
                            },
                        },
                        labels: [this.$t('isConnectTrue'), this.$t('isConnectFalse')],
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
                var router = this.$router
                var filter = this.filter
                var PostCount = this.PostCount
                var makeToast = (message,variant) => this.makeToast(message,variant) 
                var t = (text) => this.$t(text)
                var arr = []
                console.log(this.PostCount)
                var StaticListDataSeries = [
                    PostCount.posts !== 'null' ?
                    {
                        name : this.$t('Posts'),
                        data: res.data.data.map(item => item.posts),
                    } : null,
                    PostCount.views !== 'null' ?
                    {
                        name : this.$t('Views'),
                        data: res.data.data.map(item => item.views),
                    } : null,
                    PostCount.likes !== 'null' ? 
                    {
                        name : this.$t('Likes'),
                        data: res.data.data.map(item => item.likes),
                    } : null,
                    PostCount.reposts !== 'null' ?
                    {
                        name : this.$t('Reposts'),
                        data: res.data.data.map(item => item.reactions),
                    } : null,
                    PostCount.comments !== 'null' ?
                    {
                        name : this.$t('Comments'),
                        data: res.data.data.map(item => item.comments),
                    } : null,
                    // {
                    //     name : "Подписчиков",
                    //     data: [290, 200, 220, 180, 270, 250, 70, 90, 200, 150, 160, 100, 150, 100, 50],
                    // }
                ]
                console.log(StaticListDataSeries)
                this.StaticListDataSeries = StaticListDataSeries.filter(item => item != null)
                console.log(this.StaticListDataSeries)
                
                this.StaticListDataSeries.forEach(function(item){
                    arr.push(Math.max(...item.data))
                })
                this.StaticListDataOptions = {
                    chart: {
                        zoom: {
                        enabled: false,
                        },
                        toolbar: {
                        show: false,
                        },
                        // markers: {
                        //     onClick: function (e) {
                        //         alert(2)
                        //     }
                        // },
                        events: {
                            markerClick(event, chartContext,config){
                                var date = res.data.data.map(item => item.date)[config.dataPointIndex]
                                console.log(date)
                                var dateArr = date.split('.')
                                var customDate = dateArr[2] +  '-' + dateArr[1] + '-' + dateArr[0]
                                if(!!filter.orgid){
                                    router.push({ name : 'Top10', 
                                        query : { 
                                            date : customDate,
                                            orgid : filter.orgid,
                                            oblastid : filter.oblastid,
                                            categoryid : filter.categoryid,
                                            socialid : filter.socialid,
                                            isconnect : filter.isconnect,
                                            // from_date : filter.from_date,
                                            // to_date : filter.to_date,
                                            timetype : filter.timetype
                                        } 
                                    })
                                }
                                else{
                                    makeToast(t('notSelectedOrg'),'danger')
                                }
                                
                            }
                        }
                    },
                    markers: {
                        strokeWidth: 7,
                        strokeOpacity: 1,
                        strokeColors: [$themeColors.light],
                        colors: [$themeColors.warning],
                    },
                    colors: [$themeColors.info,$themeColors.warning,$themeColors.danger,$themeColors.warning,$themeColors.success,$themeColors.success],
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
                        min: 0,
                        max: Math.max(...arr) * 1.3,
                        // title: {
                        //     text: 'Сум',
                        // },
                    },
                }
            })
        },
        GotoSocialWebSite(){
            if(!!this.filter.socialid && !!this.filter.orgid){
                window.open(this.canView[this.filter.socialid].url , '_blank')
            }
            else{
                this.makeToast(this.$t('notSelectedOrg'),'danger')
            }
            
        }
    }
}
</script>

<style>

</style>