<template>
    <b-overlay :show="loading">
        <b-card>
            <b-row>
                <b-col class="my-1" sm="12" md="6" lg="4">
                    <h5> {{ $t('username') }} </h5>
                    <b-form-input
                        type="text"
                        v-model="User.username"
                    />
                </b-col>
                <b-col class="my-1" sm="12" md="6" lg="4">
                    <h5> {{ $t('first_name') }} </h5>
                    <b-form-input
                        type="text"
                        v-model="User.first_name"
                    />
                </b-col>
                <b-col class="my-1" sm="12" md="6" lg="4">
                    <h5> {{ $t('organization') }} </h5>
                    <b-input-group>
                        <b-form-input disabled type="text" v-model="User.organization_name"></b-form-input>
                        <b-input-group-append>
                            <b-button variant="primary" @click="OrganizationModal = true">
                                <feather-icon icon="MoreHorizontalIcon"></feather-icon>
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col class="my-1" sm="12" md="6" lg="4">
                    <h5> {{ $t('password') }} </h5>
                    <b-form-input
                        type="password"
                        v-model="User.password"
                    />
                </b-col>
                <b-col class="my-1" sm="12" md="6" lg="4">
                    <h5> {{ $t('confirm_password') }} </h5>
                    <b-form-input
                        type="password"
                        v-model="User.confirm_password"
                    />
                </b-col>
                <b-col class="my-1" sm="12" md="6" lg="4">
                    <h5> {{ $t('email') }} </h5>
                    <b-form-input
                        type="text"
                        v-model="User.email"
                    />
                </b-col>
                <b-col class="my-1" sm="12" md="6" lg="4">
                    <h5> {{ $t('role') }} </h5>
                    <v-select
                        :options="RoleList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        v-model="User.role"
                        multiple
                    ></v-select>
                </b-col>
                <b-col class="my-1" sm="12" md="6" lg="4">
                    <h5> {{ $t('phone_number') }} </h5>
                    <b-form-input
                        type="text"
                        v-model="User.phone_number"
                    />
                </b-col>
                <b-col class="my-1" sm="12" md="6" lg="4">
                    <h5> {{ $t('state') }} </h5>
                    <v-select
                        :options="StateList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="displayname"
                        v-model="User.state"
                    ></v-select>
                </b-col>
            </b-row>
            <b-modal
                v-model="OrganizationModal"
                no-close-on-backdrop
                hide-footer
                size="xl"
                >
                <template #modal-title>
                    {{ $t("Organization") }}
                </template>
                <b-card-text>
                    <b-row>
                        <b-col>
                            <organization-component 
                                :iscomponent="true"
                                @onRowSelected="onRowSelected"
                            >
                            </organization-component>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="text-right">
                            <b-button class="mr-1" @click="OrganizationModal = false" variant="danger"> {{ $t('close') }} </b-button>
                            <b-button  @click="SelectOrg(organizationvalue)" variant="success">  {{ $t('save') }} </b-button>
                        </b-col>
                    </b-row>
                </b-card-text>
            </b-modal>
            <b-row>
                <b-col sm="12" md="6">
                    <b-button variant="danger" @click="$router.push({ name : 'User' })"> {{ $t('backToOrganization') }} </b-button>
                </b-col>
                <b-col sm="12" md="6" class="text-right">
                    <b-button variant="success" @click="SaveData"> <b-spinner v-if="SaveLoading" small></b-spinner> {{ $t('save') }} </b-button>
                </b-col>
            </b-row>
        </b-card>
    </b-overlay>
</template>
<script>
import UserService from '@/services/user.service'
import OrganizationService from "@/services/organization.service"
import OrganizationComponent from '../organization/index.vue'
import RoleService from '@/services/role.service'
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default{
    components : { OrganizationComponent },
    data(){
        return{
            User : {},
            loading : false,
            StateList : [],
            RoleList : [],
            OrganizationModal : false,
            organizationvalue : {},
            SaveLoading : false
        }
    },
    created(){
        OrganizationService.State().then(res => {
            this.StateList = res.data
        })
        RoleService.GetAll().then(res => {
            this.RoleList = res.data
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
        SelectOrg(item){
            this.User.organization = item.id
            this.User.organization_name = item.full_name
            console.log(this.User,this.User.organization_name,item)
            this.OrganizationModal = false
        },
        onRowSelected(item){
            this.organizationvalue = item
            console.log(item)
        },
        Refresh(){
            console.log(UserService)
            this.loading = true
            UserService.Get(this.$route.params.id).then(res => {
                this.loading = false
                this.User = res.data
            }).catch(error => {
                this.loading = false
            })
        },
        SaveData(){
            this.SaveLoading = true
            UserService.Update(this.User).then(res => {
                this.SaveLoading = false
                this.makeToast(this.$t('SaveSuccess'),'success')
                var vm = this
                setTimeout(() => {
                    vm.$router.push({ name : 'User' }).catch(()=>{})
                },500)
            }).catch(error => {
                this.SaveLoading = false
                this.makeToast(error.response.data.detail,'danger')
            })
        }
    }
}
</script>
<style scoped>

</style>