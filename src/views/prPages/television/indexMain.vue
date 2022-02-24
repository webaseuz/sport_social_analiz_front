<template>
  <div>
    <b-row>
      <b-col sm="12" md="6" lg="3">
        <b-card>
          <b-row class="mt-1">
            <b-col>
              <h5>{{ $t("specialization") }}</h5>

              <b-row>
                <b-col>
                  <b-button
                    @click="TotalOrg"
                    block
                    :variant="
                      filter.specialization == null &&
                      filter.oblastid == null &&
                      filter.categoryid == null
                        ? 'primary'
                        : 'outline-primary'
                    "
                  >
                    {{ $t("total") }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col
                  sm="12"
                  md="12"
                  lg="12"
                  xl="6"
                  class="mt-1"
                  v-for="(item, index) in SpecializationList"
                  :key="index"
                >
                  <b-button
                    :disabled="orgLoading"
                    @click="RefreshOrgSpes(item)"
                    block
                    :variant="
                      filter.specialization == item.id
                        ? 'primary'
                        : 'outline-primary'
                    "
                  >
                    {{ item.fullname }}
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col>
              <h5>{{ $t("oblast") }}</h5>
              <v-select
                :options="OblastList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="fullname"
                v-model="filter.oblast"
                @input="Refresh"
              ></v-select>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col>
              <h5>{{ $t("Category") }}</h5>
              <v-select
                :options="CategoryList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="fullname"
                v-model="filter.category"
                @input="OblastChange"
              ></v-select>
            </b-col>
          </b-row>
           <b-row class="mt-1">
            <b-col>
              <h5>{{ $t("Organization") }}</h5>
              <v-select
                :options="OrganizationList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="full_name"
                v-model="filter.organ"
                @input="Refresh"
              ></v-select>
            </b-col>
          </b-row>
        </b-card>
        <b-card>
          <b-row>
            <b-col>
              <b-button
                block
                :variant="
                  filter.isconnect === false ? 'danger' : 'outline-danger'
                "
                @click="ChangeConnectOrg(false)"
              >
                {{ $t("isConnectFalse") }}
              </b-button>
              <b-button
                block
                :variant="
                  filter.isconnect === true ? 'success' : 'outline-success'
                "
                @click="ChangeConnectOrg(true)"
              >
                {{ $t("isConnectTrue") }}
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col>
 <b-card class="text-right" v-if="!iscomponent">
      <b-row>
          <b-col sm="12" md="6" lg="6"></b-col>
        <b-col sm="12" md="6" lg="6" class="d-flex align-items-center justify-content-end">
          <b-form-input
            id="basicInput"
            :placeholder="$t('date_from')"
            type="date"
            style="width:80%;margin-right:10px"
            v-model="filter.date_from"
          />
          <b-form-input
            id="basicInput"
            :placeholder="$t('date_to')"
            type="date"
            style="width:80%;margin-right:10px"
            v-model="filter.date_to"
          />
           <b-button variant="primary" @click="Refresh"> <feather-icon icon="SearchIcon"></feather-icon> </b-button>
        </b-col>
      </b-row>
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
                    {{ $t("WantDelete") }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="text-right">
                    <b-button
                      class="mr-1"
                      @click="$refs['DeleteModal' + item.id].hide()"
                      variant="danger"
                    >
                      {{ $t("no") }}
                    </b-button>
                    <b-button @click="Delete(item)" variant="success">
                      <b-spinner small v-if="DeleteLoading"></b-spinner>
                      {{ $t("yes") }}
                    </b-button>
                  </b-col>
                </b-row>
              </b-card-text>
            </b-modal>
          </template>
        </b-table>
        <b-row>
          <b-col> </b-col>
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
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
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
import TelevisionService from "@/services/television.service";
import moment from "moment";
import OrganizationService from "@/services/organization.service";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
  props: {
    iscomponent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      orgLoading: false,
      items: [],
      OblastList: [],
      SpecializationList: [],
      OrganizationList:[],
      CategoryList: [],
      selectOrgLoading: false,
      filter: {
        page: 1,
        limit: 20,
        oblast: null,
        category: null,
        specialization: null,
        organ: null,
        isconnect: null,
        date_from: "",
        date_to: "",
      },
      fields: [
        { key: "full_name", label: this.$t("full_name"), tdClass: "text-left" },
        { key: "jurnal", label: this.$t("jurnal"), tdClass: "text-left" },
        { key: "gazeta", label: this.$t("gazeta"), tdClass: "text-left" },
        { key: "radio", label: this.$t("radio"), tdClass: "text-left" },
        {
          key: "television",
          label: this.$t("television"),
          tdClass: "text-left",
        },
        { key: !this.iscomponent ? "actions" : "", label: this.$t("actions") },
      ],
      totalrow: 0,
      DeleteLoading: false,
      lang: localStorage.getItem("locale"),
    };
  },
  created() {
    this.dateType("week");
    this.Refresh();
    OrganizationService.GetOblastList(this.lang).then((res) => {
      this.OblastList = res.data;
    });
    OrganizationService.Specialization(this.lang).then((res) => {
      this.SpecializationList = res.data;
    });
    OrganizationService.GetCategoryList(this.lang).then((res) => {
      this.CategoryList = res.data;
    });
   
  },
  methods: {
      OblastChange(){
        OrganizationService.OrganizationGetOblastID(this.filter.oblast,this.filter.category,this.filter.specialization,this.filter.isconnect,null,this.lang).then(res =>{
        this.OrganizationList = res.data
    })
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
  
    SelectOrg(item) {
      this.filter.organ = item.id;
      this.$store.state.organ = this.filter.organ;
      this.Refresh();
      this.GetPostsCount();
      // this.StaticListData()
    },
    TotalOrg() {
      this.Refresh();
    },
    RefreshOrgSpes(item) {
      this.filter.specialization = item.id;
      this.Refresh();
    },
    dateType(type) {
      var date = new Date();
      this.filter.date_to = moment(date).format("YYYY-MM-DD");
      // this.filter.timetype = type
      if (type == "day") {
        this.filter.date_from = this.filter.date_to;
      }
      if (type == "week") {
        date.setDate(date.getDate() - 6);
        this.filter.date_from = moment(date).format("YYYY-MM-DD");
      }
      if (type == "month") {
        date.setMonth(date.getMonth() - 1);
        this.filter.date_from = moment(date).format("YYYY-MM-DD");
      }
      if (type == "year") {
        date.setFullYear(date.getFullYear() - 1);
        this.filter.date_from = moment(date).format("YYYY-MM-DD");
      }
    },
    onRowSelected(items) {
      if (this.iscomponent == true) {
        this.$emit("onRowSelected", items[0]);
      }
    },
    EditItem(item) {
      this.$router.push({ name: "EditTelevision", params: { id: item.id } });
    },
    OpenDeleteModal(item) {
      this.$refs["DeleteModal" + item.id].show();
    },
    Refresh() {
      this.loading = true;
      TelevisionService.GetTelevisionCountRange(
        this.filter.page,
        this.filter.limit,
        this.filter.oblast,
        this.filter.category,
        this.filter.specialization,
        this.filter.organ,
        this.filter.isconnect,
        this.lang,
        this.filter.date_from,
        this.filter.date_to
      ).then((res) => {
        this.items = res.data.data;
        this.totalrow = res.data.total_row;
        this.loading = false;
      });
    },
    makeToast(message, variant) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: message,
          icon: variant == "success" ? "CheckSquareIcon" : "AlertCircleIcon",
          variant: variant,
        },
      });
    },
    Delete(item) {
      this.DeleteLoading = true;
      TelevisionService.Delete(item.id)
        .then((res) => {
          this.makeToast(this.$t("DeleteSuccess"), "success");
          this.DeleteLoading = false;
          this.$refs["DeleteModal" + item.id].hide();
          this.Refresh();
        })
        .catch((error) => {
          this.DeleteLoading = false;
        });
    },
  },
};
</script>
<style></style>
