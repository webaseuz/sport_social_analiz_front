<template>
    <div>
        <b-card class="text-right" v-if="!iscomponent">
            <b-button variant="primary" @click="Create"> <feather-icon icon="PlusIcon"></feather-icon> {{ $t('Add') }} </b-button>
        </b-card>
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
                    :selectable="iscomponent"
                    selected-variant="primary"
                    @row-selected="onRowSelected"
                >
                    <template v-slot:empty>
                        <h5 class="text-center">{{ $t("NoItems") }}</h5>
                    </template>
                    <template #cell(actions)="{item}">
                        <b-link @click="EditItem(item)" style="margin-right:5px">
                            <feather-icon icon="EditIcon"></feather-icon>
                        </b-link>
                        <b-link @click="OpenDeleteModal(item)">
                            <feather-icon icon="TrashIcon"></feather-icon>
                        </b-link>
                        <b-modal
                            :ref="'DeleteModal' + item.id"
                            no-close-on-backdrop
                            hide-footer
                            >
                            <template #modal-title>
                                {{ $t("Delete") }}
                            </template>
                            <b-card-text>
                                <b-row>
                                    <b-col>
                                        {{ $t('WantDelete') }}
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col class="text-right">
                                        <b-button class="mr-1" @click="$refs['DeleteModal' + item.id].hide()" variant="danger"> {{ $t('no') }} </b-button>
                                        <b-button  @click="Delete(item)" variant="success"> <b-spinner small v-if="DeleteLoading"></b-spinner> {{ $t('yes') }} </b-button>
                                    </b-col>
                                </b-row>
                            </b-card-text>
                        </b-modal>
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
    </div>
</template>
<script>
import OrganizationService from '@/services/organization.service'
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default{
    props : {
        iscomponent : {
            type : Boolean,
            default : false
        }
    },
    data(){
        return{
            loading : false,
            items : [],
            filter : {
                page : 1,
                limit : 20,
                oblast : null,
                category : null,
                specialization : null,
                organ : null,
                isconnect : null
            },
            fields : [
                { key : 'oblast_name',label : this.$t('oblast'),tdClass : 'text-left' },
                { key : 'region_name',label : this.$t('region'),tdClass : 'text-left' },
                { key : 'specialization_name',label : this.$t('specialization'),tdClass : 'text-left' },
                { key : 'category_name',label : this.$t('Category'),tdClass : 'text-left' },
                { key : 'full_name',label : this.$t('full_name'),tdClass : 'text-left' },
                { key : 'inn',label : this.$t('inn'),tdClass : 'text-left' },
                { key : !this.iscomponent ? 'actions' : '',label : this.$t('actions')}
            ],
            totalrow : 0,
            DeleteLoading : false,
            lang : localStorage.getItem('locale')
        }
    },
    created(){
        this.Refresh()
    },
    methods:{
        onRowSelected(items){
            if(this.iscomponent == true){
                this.$emit('onRowSelected',items[0])
            }
        },
        Create(){
            this.$router.push({ name : 'EditOrganization',params : { id : 0 } })
        },
        EditItem(item){
            this.$router.push({ name : 'EditOrganization',params : { id : item.id } })
        },
        OpenDeleteModal(item){
            this.$refs['DeleteModal' + item.id].show()
        },
        Refresh(){
            this.loading = true
            OrganizationService.GetList(
                this.filter.page,
                this.filter.limit,
                this.filter.oblast,
                this.filter.category,
                this.filter.specialization,
                this.filter.organ,
                this.filter.isconnect,
                this.lang
            ).then(res => {
                this.items = res.data.result
                this.totalrow = res.data.total_row
                this.loading = false
            })
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
        Delete(item){
            this.DeleteLoading = true
            OrganizationService.Delete(item.id).then(res  => {
                this.makeToast(this.$t("DeleteSuccess"),'success')
                this.DeleteLoading = false
                this.$refs['DeleteModal' + item.id].hide()
                this.Refresh()
            }).catch(error => {
                this.DeleteLoading = false
            })
        }
    }
}
</script>
<style>

</style>