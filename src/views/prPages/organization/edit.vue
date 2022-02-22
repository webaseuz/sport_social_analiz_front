<template>
  <div>
      <b-overlay :show="loading">
            <b-card>
                <b-row>
                    <b-col class="my-1" sm="12" md="6" lg="3">
                        <h5> {{ $t('oblast') }} </h5>
                        <v-select
                            :options="OblastList"
                            :reduce="(item) => item.id"
                            :placeholder="$t('ChooseBelow')"
                            label="fullname"
                            v-model="Organization.oblast"
                            @input="ChangeOblast"
                        ></v-select>
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="3">
                        <h5> {{ $t('region') }} </h5>
                        <v-select
                            :options="RegionList"
                            :reduce="(item) => item.id"
                            :placeholder="$t('ChooseBelow')"
                            label="fullname"
                            v-model="Organization.region"
                        ></v-select>
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="3">
                        <h5> {{ $t('specialization') }} </h5>
                        <v-select
                            :options="SpecializationList"
                            :reduce="(item) => item.id"
                            :placeholder="$t('ChooseBelow')"
                            label="fullname"
                            v-model="Organization.specialization"
                        ></v-select>
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="3">
                        <h5> {{ $t('category') }} </h5>
                        <v-select
                            :options="CategoryList"
                            :reduce="(item) => item.id"
                            :placeholder="$t('ChooseBelow')"
                            label="fullname"
                            v-model="Organization.category"
                        ></v-select>
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="3">
                        <h5> {{ $t('short_name') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.short_name"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="3">
                        <h5> {{ $t('full_name') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.full_name"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="3">
                        <h5> {{ $t('addres') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.addres"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="3">
                        <h5> {{ $t('inn') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.inn"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="3">
                        <h5> {{ $t('phone_number') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.phone_number"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="3">
                        <h5> {{ $t('accounter') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.accounter"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="3">
                        <h5> {{ $t('director') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.director"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="3">
                        <h5> {{ $t('vat_code') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.vat_code"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="3">
                        <h5> {{ $t('zip_code') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.zip_code"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="3">
                        <h5> {{ $t('state') }} </h5>
                        <v-select
                            :options="StateList"
                            :reduce="(item) => item.id"
                            :placeholder="$t('ChooseBelow')"
                            label="displayname"
                            v-model="Organization.state"
                        ></v-select>
                    </b-col>

                </b-row>
                <b-row>
                    <b-col class="my-1" sm="12" md="6" lg="6">
                        <h5> {{ $t('url') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.url"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="6">
                        <h5> {{ $t('web_site_url') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.web_site_url"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="6">
                        <h5> {{ $t('facebook_url') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.facebook_url"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="6">
                        <h5> {{ $t('instagram_url') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.instagram_url"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="6">
                        <h5> {{ $t('telegram_url') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.telegram_url"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="6">
                        <h5> {{ $t('teletype_url') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.teletype_url"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="6">
                        <h5> {{ $t('tiktok_url') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.tiktok_url"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="6">
                        <h5> {{ $t('twitter_url') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.twitter_url"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="6">
                        <h5> {{ $t('whatsapp_url') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.whatsapp_url"
                        />
                    </b-col>
                    <b-col class="my-1" sm="12" md="6" lg="6">
                        <h5> {{ $t('youtobe_url') }} </h5>
                        <b-form-input
                            type="text"
                            v-model="Organization.youtobe_url"
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="d-flex justify-content-between">
                        <b-button variant="danger" @click="$router.push({ name : 'Organization' })"> {{ $t('backToOrganization') }} </b-button>
                        <b-button variant="success" @click="Update"> <b-spinner v-if="SaveLoading" small></b-spinner> {{ $t('save') }} </b-button>
                    </b-col>
                </b-row>
            </b-card>
      </b-overlay>
      
  </div>
</template>

<script>
import OrganizationService from "@/services/organization.service"
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
    data(){
        return{
            Organization : {},
            loading : false,
            OblastList : [],
            SpecializationList : [],
            CategoryList : [],
            lang : localStorage.getItem('locale'),
            SaveLoading : false,
            RegionList : [],
            StateList : []
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
        OrganizationService.State().then(res => {
            this.StateList = res.data
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
        Refresh(){
            this.loading = true
            OrganizationService.Get(this.$route.params.id).then(res => {
                this.loading = false
                this.Organization = res.data
                this.ChangeOblast()
            }).catch(error => {
                this.loading = false
            })
        },
        Update(){
            this.SaveLoading = true
            OrganizationService.Update(this.Organization).then(res => {
                this.SaveLoading = false
                this.makeToast(this.$t('SaveSuccess'),'success')
                var vm = this
                setTimeout(() => {
                    vm.$router.push({ name : 'Organization' })
                },500)
                
            }).catch(error => {
                this.SaveLoading = false
                this.makeToast(error.response.data.detail,'danger')
            })
        },
        ChangeOblast(){
            if(!!this.Organization.oblast){
                OrganizationService.InfoDistrict(this.Organization.oblast,this.lang).then(res => {
                    this.RegionList = res.data
                })
            }
        },
        validURL(str) {
            var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            return !!pattern.test(str);
        }
    }
}
</script>

<style>
</style>