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
          <b-card v-if="orgLoading || (!!OrganizationList && OrganizationList.length > 0)" style="min-height:100px;max-height:500px;overflow:auto">
                <b-list-group v-if="!orgLoading">
                    <b-list-group-item class="cursor-pointer d-flex justify-content-between align-items-center" v-for="(item,index) in OrganizationList" @click="SelectOrg(item)" :active="filter.orgid == item.id" :key="index"> 
                        <span> {{ item.full_name }}  </span>
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
        <b-overlay :show="loading">
            <b-card>
            <b-table-simple striped responsive borderless >
                <b-thead class="bg-primary text-white">
                    <b-tr class='text-center'>
                        <b-th class="bg-primary text-white"> {{ $t('Organization') }} </b-th>
                        <b-th class="bg-primary text-white">  {{ $t('web_site') }} </b-th>
                        <b-th class="bg-primary text-white">  {{ $t('telegram') }} </b-th>
                        <b-th class="bg-primary text-white">  {{ $t('fb_page') }} </b-th>
                        <b-th class="bg-primary text-white">  {{ $t('instagram_new') }} </b-th>
                        <b-th class="bg-primary text-white">  {{ $t('youtube') }} </b-th>
                        <!-- <b-th class="bg-primary text-white"> Twitter </b-th>
                        <b-th class="bg-primary text-white"> Tiktok </b-th>
                        <b-th class="bg-primary text-white"> Teletype </b-th> -->
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="(item,index) in organizationPostCount" :key="index" class='text-center'>
                        <b-th> {{ item.name }} </b-th>
                        <b-th> <span v-if="canView.web_site.bool"> {{ item.web_site }} </span> <span v-if="!canView.web_site.bool" class='text-danger' > - </span>  </b-th>
                        <b-th> <span v-if="canView.telegram.bool">{{ item.telegram }}</span> <span v-if="!canView.telegram.bool" class='text-danger' > - </span>   </b-th>
                        <b-th> 
                            <span v-if="canView.fb_page.bool"> {{ item.fb_page }} </span> <span v-if="!canView.fb_page.bool" class='text-danger' > - </span>   
                        </b-th>
                        <b-th> <span v-if="canView.instagram_new.bool">{{ item.instagram_new }}</span> <span v-if="!canView.instagram_new.bool" class='text-danger' > - </span> </b-th>
                        <b-th> <span v-if="canView.youtobe.bool">{{ item.youtobe }}</span> <span v-if="!canView.youtobe.bool" class='text-danger' > - </span>   </b-th>
                        <!-- <b-th> <span v-if="canView.twitter">{{ item.twitter }}</span> <span v-if="!canView.twitter" class='text-danger' > - </span>   </b-th>
                        <b-th> <span v-if="canView.tiktok">{{ item.tiktok }}</span> <span v-if="!canView.tiktok" class='text-danger' > - </span>  </b-th>
                        <b-th> <span v-if="canView.teletype">{{ item.teletype }}</span> <span v-if="!canView.teletype" class='text-danger' > - </span>  </b-th> -->
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </b-card>
        </b-overlay>
      </b-col>
  </b-row>
</template>

<script>
import OrganizationService from "@/services/organization.service"
import DashboardService from "@/services/dashboard.service"
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
                orgid : 0,
                specialization : null,
                sort : null,
                page : 1,
                limit : 20,
                orderby : 'asc',
                socialid : "",
                isconnect : null
            },
            orgLoading : false,
            SpecializationList : [],
            canView : {},
            organizationPostCount : [],
            lang : localStorage.getItem('locale')
        }
    },
    created(){
        // this.filter.oblastid = this.$store.state.oblastid
        // this.filter.specialization = this.$store.state.specialization
        // this.filter.categoryid = this.$store.state.categoryid
        // this.filter.orgid = this.$store.state.orgid
        OrganizationService.GetOblastList(this.lang).then(res => {
            this.OblastList = res.data
        })
        OrganizationService.GetCategoryList(this.lang).then(res => {
            this.CategoryList = res.data
        })
        OrganizationService.Specialization(this.lang).then(res => {
            this.SpecializationList = res.data
        })
        if(!!this.filter.oblastid || !!this.filter.specialization || !!this.filter.categoryid){
            this.RefreshOrg()
            // this.Refresh()
        }
        this.Refresh()
    },
    methods:{
        TotalOrg(){
            this.filter.oblastid = null
            this.filter.specialization = null
            this.filter.categoryid = null
            this.filter.orgid = 0
            this.RefreshOrg()
        },
        RefreshOrgSpes(item){
            this.filter.specialization = item.id
            this.RefreshOrg()
        },
        RefreshOrg(){
            this.orgLoading = true
            // this.$store.state.oblastid = this.filter.oblastid
            // this.$store.state.specialization = this.filter.specialization
            // this.$store.state.categoryid = this.filter.categoryid
            OrganizationService.OrganizationGetOblastID(this.filter.oblastid,this.filter.categoryid,this.filter.specialization,this.filter.socialid,this.lang).then(res => {
                this.OrganizationList = res.data.data
                this.orgLoading = false
            }).catch(error => {
                this.orgLoading = false
            })
        },
        SelectOrg(item){
            this.filter.orgid = item.id
            this.$store.state.orgid = this.filter.orgid
            this.Refresh()
        },
        Refresh(){
            this.loading = true
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
                this.organizationPostCount = res.data.data
                this.loading = false
            }).catch(error => {
                this.loading = false
            })
            DashboardService.SatsialNetwork(
                this.filter.oblastid,
                this.filter.categoryid,
                this.filter.specialization,
                this.filter.orgid,
                this.filter.isconnect
            ).then(res => {
                this.canView = res.data
            })
        }
    }
}
</script>

<style>

</style>