<template>
  <div>
    <b-card  v-if="!iscomponent">
      <b-row>
        <b-col sm="12" md="12" lg="6"></b-col>
        <b-col sm="12" md="12" lg="6" class="d-flex align-items-center justify-content-end " >
          <b-form-input
            id="basicInput"
            :placeholder="$t('date_from')"
            type="date"
            style="width:180px;margin-right:10px"
            v-model="filter.date_from"
          />
          <b-form-input
            id="basicInput"
            :placeholder="$t('date_to')"
            type="date"
            style="width:180px;margin-right:10px"
            v-model="filter.date_to"
          />
          <b-button  variant="primary" @click="Refresh">
            <feather-icon icon="SearchIcon"></feather-icon>
          </b-button>
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
          <template #cell(status)="{item}">
              <b-badge :variant="item.status == 'Received' || item.status == 'Accepted' ? 'success' : item.status == 'NotAccept' ||  item.status == 'NotReceived' ? 'danger' : 'primary'"> {{ $t(item.status) }} </b-badge>
          </template>
          <template #cell(actions)="{item}">
            <!-- <b-link @click="EditItem(item)" style="margin-right:5px">
              <feather-icon icon="EditIcon"></feather-icon>
            </b-link> -->
            <b-link @click="OpenAcceptModal(item)" style="margin-right:5px">
              <feather-icon icon="CheckSquareIcon"></feather-icon>
            </b-link>
            <b-link @click="OpenNotAcceptModal(item)">
              <feather-icon icon="XSquareIcon"></feather-icon>
            </b-link>
            <b-modal
              :ref="'AcceptModal' + item.id"
              no-close-on-backdrop
              hide-footer
            >
              <template #modal-title>
                {{ $t("Accept") }}
              </template>
              <b-card-text>
                <b-row>
                  <b-col>
                    {{ $t("WantAccept") }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="text-right">
                    <b-button
                      class="mr-1"
                      @click="$refs['AcceptModal' + item.id].hide()"
                      variant="danger"
                    >
                      {{ $t("no") }}
                    </b-button>
                    <b-button @click="Accept(item)" variant="success">
                      <b-spinner small v-if="AcceptLoading"></b-spinner>
                      {{ $t("yes") }}
                    </b-button>
                  </b-col>
                </b-row>
              </b-card-text>
            </b-modal>
            <b-modal
              :ref="'NotAcceptModal' + item.id"
              no-close-on-backdrop
              hide-footer
            >
              <template #modal-title>
                {{ $t("NotAccept") }}
              </template>
              <b-card-text>
                <b-row>
                  <b-col>
                    {{ $t("WantNotAccept") }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="text-right">
                    <b-button
                      class="mr-1"
                      @click="$refs['NotAcceptModal' + item.id].hide()"
                      variant="danger"
                    >
                      {{ $t("no") }}
                    </b-button>
                    <b-button @click="NotAccept(item)" variant="success">
                      <b-spinner small v-if="NotAcceptLoading"></b-spinner>
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
  </div>
</template>
<script>
import TelevisionService from "@/services/television.service";
import moment from "moment";
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
      items: [],
      filter: {
        page: 1,
        limit: 20,
        organ : null,
        satsial: null,
        date_from: "",
        date_to: "",
      },
      fields: [
        { key: "post_date", label: this.$t("post_date"), tdClass: "text-left" },
        { key: "full_name", label: this.$t("full_name"), tdClass: "text-left" },
        {
          key: "content_type",
          label: this.$t("content_type"),
          tdClass: "text-left",
        },
        { key: "content", label: this.$t("content"), tdClass: "text-left" },
        { key: "status", label: this.$t("status"), tdClass: "text-center" },
        { key: !this.iscomponent ? "actions" : "", label: this.$t("actions") },
      ],
      totalrow: 0,
      AcceptLoading: false,
      lang: localStorage.getItem("locale"),
      NotAcceptLoading : false
    };
  },
  created() {
    this.dateType("week");
    this.Refresh();
  },
  methods: {
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
    Create() {
      this.$router.push({ name: "EditTelevision", params: { id: 0 } });
    },
    EditItem(item) {
      this.$router.push({ name: "EditTelevision", params: { id: item.id } });
    },
    OpenAcceptModal(item) {
      this.$refs["AcceptModal" + item.id].show();
    },
    OpenNotAcceptModal(item){
      this.$refs["NotAcceptModal" + item.id].show();
    },
    Refresh() {
      const current = new Date();
      this.loading = true;
      TelevisionService.GetAllSentTelevision(
        this.filter.page,
        this.filter.limit,
        this.filter.organ,
        this.filter.satsial,
        this.filter.date_from,
        this.filter.date_to,
        this.lang
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
    Accept(item) {
      this.AcceptLoading = true;
      TelevisionService.Accept(item.id)
        .then((res) => {
          this.makeToast(this.$t("AcceptSuccess"), "success");
          this.AcceptLoading = false;
          this.$refs["AcceptModal" + item.id].hide();
          this.Refresh();
        })
        .catch((error) => {
          this.AcceptLoading = false;
        });
    },
    NotAccept(item){
      this.NotAcceptLoading = true
      TelevisionService.NotAccept(item.id).then(res => {
        this.makeToast(this.$t("NotAcceptSuccess"), "success");
        this.NotAcceptLoading = false
        this.$refs["NotAcceptModal" + item.id].hide();
        this.Refresh();
      }).catch((error) => {
        this.NotAcceptLoading
         = false;
      });
    }
  },
};
</script>
<style></style>
