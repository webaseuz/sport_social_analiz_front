<template>
    <div>
        <b-card class="text-right">
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
                >
                    <template v-slot:empty>
                        <h5 class="text-center">{{ $t("NoItems") }}</h5>
                    </template>
                    <template #cell(actions)="{item}">
                        <b-link @click="EditItem(item)">
                            <feather-icon icon="EditIcon"></feather-icon>
                        </b-link>
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
import UserService  from '@/services/user.service'
export default{
    data(){
        return{
            loading : false,
            items : [],
            filter : {
                page : 1,
                limit : 20
            },
            fields : [
                { key : 'username',label : this.$t('username') },
                { key : 'organization',label : this.$t('organization') },
                { key : 'inn',label : this.$t('inn') },
                { key : 'email',label : this.$t('email') },
                { key : 'date_joined',label : this.$t('date_joined') },
                // { key : 'inn',label : this.$t('inn') },
                { key : 'actions',label : this.$t('actions')}
            ],
            totalrow : 0
        }
    },
    created(){
        this.Refresh()
    },
    methods:{
        Create(){
            this.$router.push({ name : 'EditUser',params : { id : 0 } }).catch(() => {})
        },
        EditItem(item){
            this.$router.push({ name : 'EditUser',params : { id : item.id } }).catch(() => {})
        },
        Refresh(){
            this.loading = true
            UserService.GetList(
                this.filter.page,
                this.filter.limit
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