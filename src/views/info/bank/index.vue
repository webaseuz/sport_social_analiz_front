<template>

  <!-- Table Container Card -->
  <b-card
    no-body
  >

    <div class="m-2">

      <!-- Table Top -->
      <b-row>

        <!-- Per Page -->
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>Entries</label>
          <v-select
            v-model="perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="perPageOptions"
            :clearable="false"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <b-button
            variant="primary"
            :to="{ name: 'EditBank',params : {id : 0}}"
          >
            <feather-icon icon="PlusIcon"></feather-icon> Add Record
          </b-button>
        </b-col>
        <b-col
          cols="12"
          md="6"
        >
          <!-- <div class="d-flex align-items-center justify-content-end" > -->
            <!-- <b-form-input
              v-model="searchQuery"
              class="d-inline-block mr-1"
              placeholder="Search..."
            /> -->
            <b-input-group>
              <b-form-input v-model="filter.Search" placeholder="Search" />
              <b-input-group-append>
                <b-button @click="Refresh" variant="primary">
                  <feather-icon icon="SearchIcon" />
                </b-button>
              </b-input-group-append>
            </b-input-group>
            <!-- <v-select
              v-model="statusFilter"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="statusOptions"
              class="invoice-filter-select"
              placeholder="Select Status"
            >
              <template #selected-option="{ label }">
                <span class="text-truncate overflow-hidden">
                  {{ label }}
                </span>
              </template>
            </v-select> -->
          <!-- </div> -->
        </b-col>
      </b-row>

    </div>

    <b-table
      ref="refInvoiceListTable"
      :items="items"
      responsive
      :fields="fields"
      primary-key="id"
      sticky-header="65vh"
      no-border-collapse
      :sort-by.sync="sortBy"
      :busy="isBusy"
      show-empty
      empty-text="Hech narsa topilmadi"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative"
      @sort-changed="SortChange"
      @row-dblclicked="Edit"
    >
      <template #cell(name)="{item}">
        <span class="text-left">
          {{ item.name }}
        </span>
      </template>
      <!-- Column: Balance -->
      <template #cell(status)="{item}">
          <b-badge
            :variant="item.status == 'Пассив' ? 'light-danger' : 'light-success'"
          >
            {{ item.status }}
          </b-badge>
      </template>

      <!-- Column: Actions -->
      <template #cell(actions)="data">

        <div class="text-nowrap">
          <feather-icon
            :id="`invoice-row-${data.item.id}-send-icon`"
            icon="EditIcon"
            class="cursor-pointer"
            size="16"
            @click="Edit(data.item)"
          />
          <b-tooltip
            title="Edit"
            class="cursor-pointer"
            :target="`invoice-row-${data.item.id}-send-icon`"
          />

          <feather-icon
            :id="`invoice-row-${data.item.id}-preview-icon`"
            icon="TrashIcon"
            size="16"
            class="mx-1"
            @click="$router.push({ name: 'apps-invoice-preview', params: { id: data.item.id }})"
          />
          <b-tooltip
            title="Delete"
            :target="`invoice-row-${data.item.id}-preview-icon`"
          />
        </div>
      </template>
      <template v-slot:table-busy>
        <div
          class="text-center text-primary my-2"
          style="vertical-align:middle"
        >
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong>Loading</strong>
        </div>
      </template>
    </b-table>
    <div class="mx-2 mb-2">
      <b-row>

        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >

          <b-pagination
            v-model="currentPage"
            :total-rows="totalInvoices"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
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
    </div>
  </b-card>

</template>

<script>
import { avatarText } from '@core/utils/filter'
import { onUnmounted } from '@vue/composition-api'
import store from '@/store'
import useInvoicesList from '../../apps/invoice/invoice-list/useInvoiceList'

import invoiceStoreModule from '../../apps/invoice/invoiceStoreModule'
import BankService from '@/services/info/bank.service'

export default {
  data(){
      return{
          items : [],
          filter : {
            Search : '',
            Sort : '',
            Order : 'asc'
          },
          isBusy : false
      }
  },
  created(){
      this.Refresh()
  },
  methods:{
    SortChange(data){
      this.filter.Sort = data.sortBy
      this.filter.Order = data.sortDesc ? 'desc' : 'asc'
      this.Refresh()
    },
    Edit(item){
      this.$router.push({name : 'EditBank',params : { id : item.id }})
    },
    Refresh(){
      this.isBusy = true
      BankService.GetList(this.filter.Search,this.filter.Sort,this.filter.Order,0,20).then(res => {
          this.items = res.data.rows
          this.isBusy = false
      })
    }
  },
  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = 'app-invoice'

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    })

    const statusOptions = [
      'Downloaded',
      'Draft',
      'Paid',
      'Partial Payment',
      'Past Due',
    ]

    const {
      fetchInvoices,
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,

      statusFilter,

      refetchData,

      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    } = useInvoicesList()

    return {
      fetchInvoices,
      fields : [
          { key : 'code',label : 'code',thClass : 'text-center',tdClass : 'text-center',sortable : true },
          { key : 'name',label : 'name',thClass : 'text-center',sortable : true },
          { key : 'status',label : 'status' ,thClass : 'text-center',tdClass : 'text-center',sortable : true},
          { key : 'actions', label : 'actions',thClass : 'text-center', tdClass : 'text-center' }
      ],
      
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,

      statusFilter,

      refetchData,

      statusOptions,

      avatarText,
      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
