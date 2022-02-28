<template>
  <div>
    <!-- <b-card  v-if="!iscomponent">
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
    </b-card> -->
    <b-overlay :show="loading">
      <b-card>
        <b-col class="text-right m-1">
          <b-button variant="primary" @click="Create">
            <feather-icon icon="PlusIcon"></feather-icon> {{ $t("Add") }}
          </b-button>
        </b-col>
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
  </div>
</template>
<script>
import InstructionService from '@/services/instruction.service'
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
        // organ : null,
        satsial: null,
        date_from: "",
        date_to: "",
      },
      fields: [
         { key: "content", label: this.$t("content"), tdClass: "text-left" },
        { key: "file_name", label: this.$t("file_name"), tdClass: "text-left" },
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
      this.$router.push({ name: "InstructionEdit", params: { id: 0 } });
    },
    EditItem(item) {
      this.$router.push({ name: "InstructionEdit", params: { id: item.id } });
    },
    OpenDeleteModal(item) {
      this.$refs["DeleteModal" + item.id].show();
    },
    Refresh() {
      const current = new Date();
      this.loading = true;
      InstructionService.GetInstructionList(
        
      ).then((res) => {
        this.items = res.data;
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
      InstructionService.AddInstructionDelete(item.id)
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
