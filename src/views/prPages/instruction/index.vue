<template>
  <b-row>
    <b-col sm="12" md="12">
      <!-- <b-card>
        <b-row>
          <b-col>
            <b-button variant="danger" @click="GotoDashboard">
              {{ $t("backToOrganization") }}
            </b-button>
          </b-col>
          <b-col class="d-flex align-items-center justify-content-end">
            <b-form-input
              id="basicInput"
              placeholder="Enter Email"
              type="date"
              style="width:180px;margin-right:10px"
              v-model="filter.from_date"
            />
            <b-form-input
              id="basicInput"
              placeholder="Enter Email"
              type="date"
              style="width:180px;margin-right:10px"
              v-model="filter.to_date"
            />
            <b-button variant="primary" @click="SelectDate">
              <feather-icon icon="SearchIcon"></feather-icon>
            </b-button>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col></b-col>
          <b-col class="d-flex align-items-center justify-content-end">
            <b-button-group size="sm">
              <b-button
                :variant="
                  filter.timetype == 'day' ? 'primary' : 'outline-primary'
                "
                @click="SelectDateType('day')"
              >
                {{ $t("day") }}
              </b-button>
              <b-button
                :variant="
                  filter.timetype == 'week' ? 'primary' : 'outline-primary'
                "
                @click="SelectDateType('week')"
              >
                {{ $t("week") }}
              </b-button>
              <b-button
                :variant="
                  filter.timetype == 'month' ? 'primary' : 'outline-primary'
                "
                @click="SelectDateType('month')"
              >
                {{ $t("month") }}
              </b-button>
              <b-button
                :variant="
                  filter.timetype == 'year' ? 'primary' : 'outline-primary'
                "
                @click="SelectDateType('year')"
              >
                {{ $t("year") }}
              </b-button>
            </b-button-group>
          </b-col>
        </b-row>
      </b-card> -->
      <b-overlay :show="loading">
        <b-row>
          <b-col sm="12" md="12" lg="4" v-for="(item, index) in InfoList" :key="index">
            <b-card>
              <p>{{ item.content || "-" }}</p>
              <div class="text-right">
                <b-link v-b-tooltip.hover :title="$t('download')" @click="DownloadFile(item)">
                  <feather-icon
                    icon="DownloadIcon"
                    size="25"
                    class="cursor-pointer"
                  />
                </b-link>
              </div>

              <!-- <b-table-simple class="mb-3" small striped responsive borderless>
            <b-thead class="text-center">
              <b-tr>
                <b-th class="text-center bg-primary text-white">
                  {{ $t("content") }}
                </b-th>
                <b-th class="text-center bg-primary text-white">
                  {{ $t("file") }}
                </b-th>
                <b-th class="text-center bg-primary text-white">
                  {{ $t("actions") }}
                </b-th>
              </b-tr>
            </b-thead>
            <b-tbody class="text-left">
              <b-tr v-for="(item, index) in InfoList" :key="index">
                <b-th>{{ item.content || "-" }}</b-th>
                <b-th>{{ item.file_name || 0 }}</b-th>
                <b-th>
                  <b-link @click="DownloadFile(item)">
                    <feather-icon
                      icon="DownloadIcon"
                      size="20"
                      class="cursor-pointer"
                    />
                  </b-link>
                </b-th>
              </b-tr>
            </b-tbody>
          </b-table-simple>
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
          </b-row> -->
            </b-card>
          </b-col>
        </b-row>
      </b-overlay>
    </b-col>
  </b-row>
</template>

<script>
import InstructionService from "@/services/instruction.service";
import OrganizationService from "@/services/organization.service";
import moment from "moment";
import TelevisionService from "@/services/television.service";
export default {
  data() {
    return {
      filter: {
        oblastid: null,
        categoryid: null,
        from_date: "2022-01-01",
        to_date: "2022-01-31",
        organ: null,
        satsial: null,
        specialization: null,
        timetype: "day",
        page: 1,
        limit: 20,
        socialid: null,
        isconnect: null,
      },
      orgLoading: false,
      loading: false,
      InfoList: [],
      //   OblastList: [],
      //   CategoryList: [],
      //   OrganizationList: [],
      //   SpecializationList: [],
      totalrow: 0,
      lang: localStorage.getItem("locale"),
    };
  },
  created() {
    // this.dateType("week");
    // if (!!this.$route.query.date) {
    //   this.filter.from_date = this.$route.query.date;
    //   this.filter.to_date = this.$route.query.date;
    // }
    // if (!!this.$route.query.timetype) {
    //   this.filter.timetype = this.$route.query.timetype;
    // }
    // if (
    //   this.$route.query.isconnect == true ||
    //   this.$route.query.isconnect == "true"
    // ) {
    //   this.filter.isconnect = true;
    // }
    // if (
    //   this.$route.query.isconnect == false ||
    //   this.$route.query.isconnect == "false"
    // ) {
    //   this.filter.isconnect = false;
    // }
    // if (!!this.$route.query.from_date) {
    //   this.filter.from_date = this.$route.query.from_date || null;
    //   this.filter.to_date = this.$route.query.to_date || null;
    // }
    //  OrganizationService.GetOblastList(this.lang).then(res => {
    //         this.OblastList = res.data
    //     })
    //     OrganizationService.GetCategoryList(this.lang).then(res => {
    //         this.CategoryList = res.data
    //     })
    //     OrganizationService.Specialization(this.lang).then(res => {
    //         this.SpecializationList = res.data
    //     })
    //  if(!!this.$route.query.id){
    //         this.filter.organ = this.$route.query.id || null
    //         this.filter.specialization = this.$route.query.specialization || null
    //         this.filter.oblastid = this.$route.query.oblastid || null
    //         this.filter.categoryid = this.$route.query.categoryid || null
    //         this.RefreshOrg()
    //         this.Refresh()
    //     }
    //     else{
    //         this.TotalOrg()
    //         this.Refresh()
    //     }
    this.Refresh();
  },
  methods: {
    SelectOrg(item) {
      this.filter.organ = item.id;
      this.Refresh();
    },
    TotalOrg() {
      this.filter.oblastid = null;
      this.filter.specialization = null;
      this.filter.categoryid = null;
      this.filter.organ = null;
      this.RefreshOrg();
    },
    RefreshOrg() {
      this.orgLoading = true;
      OrganizationService.OrganizationGetOblastID(
        this.filter.oblastid,
        this.filter.categoryid,
        this.filter.specialization,
        this.filter.isconnect,
        this.filter.socialid,
        this.lang
      )
        .then((res) => {
          this.OrganizationList = res.data.data;
          this.orgLoading = false;
        })
        .catch((error) => {
          this.orgLoading = false;
        });
      this.Refresh();
    },
    ChangeConnectOrg(bool) {
      if (bool === false) {
        if (this.filter.isconnect === false) {
          this.filter.isconnect = null;
        } else {
          this.filter.isconnect = false;
        }
      }
      if (bool === true) {
        if (this.filter.isconnect === true) {
          this.filter.isconnect = null;
        } else {
          this.filter.isconnect = true;
        }
      }
      this.RefreshOrg();
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
    DownloadFile(item) {
      this.DownloadLoading = true;
      TelevisionService.DownloadFile(item.file_id, item.file_extension)
        .then((res) => {
          this.DownloadLoading = false;
          this.downloadFile(res, item);
          this.makeToast(this.$t("file_attached"), "success");
        })
        .catch((error) => {
          this.DownloadLoading = false;
          this.makeToast(error.response.data, "danger");
        });
    },
    downloadFile(response, item) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", item.file_name + "." + item.file_extension); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    GotoDashboard() {
      this.$router.go(-1);
    },
    SelectDateType(type) {
      this.dateType(type);
      this.SelectDate();
    },
    dateType(type) {
      var date = new Date();
      this.filter.to_date = moment(date).format("YYYY-MM-DD");
      this.filter.timetype = type;
      if (type == "day") {
        this.filter.from_date = this.filter.to_date;
      }
      if (type == "week") {
        date.setDate(date.getDate() - 6);
        this.filter.from_date = moment(date).format("YYYY-MM-DD");
      }
      if (type == "month") {
        date.setMonth(date.getMonth() - 1);
        this.filter.from_date = moment(date).format("YYYY-MM-DD");
      }
      if (type == "year") {
        date.setFullYear(date.getFullYear() - 1);
        this.filter.from_date = moment(date).format("YYYY-MM-DD");
      }
    },
    SelectDate() {
      this.Refresh();
    },

    GotoSocial(item) {
      window.open(item, "_blank");
    },
    Refresh() {
      this.loading = true;
      InstructionService.GetInstructionList().then((res) => {
        this.InfoList = res.data;
        this.totalrow = res.data.total_row;
        this.loading = false;
      });
    },
  },
};
</script>

<style></style>
