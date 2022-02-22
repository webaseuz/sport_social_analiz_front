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
            </b-col>
            <b-col sm="12" md="9">
                <b-overlay :show="loading">
            <b-card>
                <b-table
                    :fields="fields"
                    :items="items"
                    show-empty
                    class="text-center"
                    sticky-header="60vh"
                    no-border-collapse
                    style="cursor: pointer;"
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
    </div>
</template>
<script>
import OrganizationService from '@/services/organization.service'
export default{
    data(){
        return{
            loading : false,
            items : [],
            filter : {
                page : 1,
                limit : 20,
                oblastid : null,
                categoryid : null,
                from_date : '2022-01-01',
                to_date : '2022-01-31',
                orgid : 0,
                socialid : null,
                specialization : null,
                isconnect : null,
            },
            fields : [
                // { key : 'oblast_name',label : this.$t('oblast'),tdClass : 'text-left' },
                // { key : 'region_name',label : this.$t('region'),tdClass : 'text-left' },
                { key : 'specialization_name',label : this.$t('specialization'),tdClass : 'text-left' },
                { key : 'category_name',label : this.$t('Category'),tdClass : 'text-left' },
                { key : 'full_name',label : this.$t('full_name'),tdClass : 'text-left' },
                { key : 'director',label : this.$t('director'),tdClass : 'text-left' },
                { key : 'phone_number',label : this.$t('phone_number'),tdClass : 'text-left' }
            ],
            totalrow : 0,
            OblastList : [],
            CategoryList : [],
            SpecializationList : [],
            lang : localStorage.getItem('locale')
        }
    },
    created(){
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
    },
    methods:{
        TotalOrg(){
            this.filter.oblastid = null
            this.filter.specialization = null
            this.filter.categoryid = null
            this.filter.orgid = 0
            this.filter.isconnect = null
            this.Refresh()
        },
        RefreshOrgSpes(item){
            this.filter.specialization = item.id
            this.Refresh()
        },
        Refresh(){
            this.loading = true
            OrganizationService.GetList(
                this.filter.page,
                this.filter.limit,
                this.filter.oblastid,
                this.filter.categoryid,
                this.filter.specialization,
                this.filter.orgid,
                this.filter.isconnect,
                this.lang
                
            ).then(res => {
                this.items = res.data.result
                this.totalrow = res.data.total_row
                this.loading = false
            })
        }
    }
}
</script>
<style>

</style>