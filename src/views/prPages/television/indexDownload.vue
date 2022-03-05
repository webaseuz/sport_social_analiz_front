<template>
  <b-row>
    <b-col sm="12" md="3">
      <b-card>
        <b-row class="mt-1">
          <b-col>
            <h5>{{ $t("specialization") }}</h5>
            <!-- <v-select
                                :options="SpecializationList"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="fullname"
                                v-model="filter.specialization"
                                @input="RefreshOrg"
                            ></v-select> -->
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
                md="6"
                class="mt-1"
                v-for="(item, index) in SpecializationList"
                :key="index"
              >
                <b-button
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
              v-model="filter.oblastid"
              @input="RefreshOrg"
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
              v-model="filter.categoryid"
              @input="RefreshOrg"
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
            <!-- <b-button block variant="info"> Instruktsiya </b-button> -->
          </b-col>
        </b-row>
      </b-card>
      <b-card
        v-if="orgLoading || (!!OrganizationList && OrganizationList.length > 0)"
        style="min-height:100px;max-height:500px;overflow:auto"
      >
        <b-list-group v-if="!orgLoading">
          <b-list-group-item
            class="cursor-pointer d-flex justify-content-between align-items-center"
            v-for="(item, index) in OrganizationList"
            @click="SelectOrg(item)"
            :active="filter.organ == item.id"
            :key="index"
          >
            <span> {{ item.full_name }} </span>
            <b-badge
              variant="success"
              pill
              class="badge-round"
              v-if="!!item.url"
            >
              <feather-icon icon="CheckIcon"></feather-icon>
            </b-badge>
            <b-badge variant="danger" v-if="!item.url" pill class="badge-round">
              <feather-icon icon="XIcon"></feather-icon>
            </b-badge>
            <!-- <feather-icon class="text-success text-right" size="20" icon="CheckCircleIcon"></feather-icon>   -->
          </b-list-group-item>
        </b-list-group>
        <b-row v-if="orgLoading">
          <b-col class="text-center">
            <b-spinner></b-spinner>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
    <b-col sm="12" md="9">
      <b-card>
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
      </b-card>
      <b-overlay :show="loading">
        <b-card>
         <b-table
          :fields="fields"
          :items="InfoList"
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
          <template #cell(file)="{item}">
            <b-link @click="DownloadFile(item)">
                    <feather-icon
                      icon="DownloadIcon"
                      size="20"
                      class="cursor-pointer"
                    />
                  </b-link>
          </template>
        </b-table>
          <!-- <b-table-simple class="mb-3" small striped responsive borderless>
            <b-thead class="text-center">
              <b-tr>
                <b-th class="text-center bg-primary text-white">
                  {{ $t("content") }}
                </b-th>
                <b-th class="text-center bg-primary text-white">
                  {{ $t("content_type") }}
                </b-th>
                <b-th class="text-center bg-primary text-white">
                  {{ $t("post_date") }}
                </b-th>
                <b-th class="text-center bg-primary text-white">
                  {{ $t("file") }}
                </b-th>
              </b-tr>
            </b-thead>
            <b-tbody class="text-left">
              <b-tr v-for="(item, index) in InfoList" :key="index">
                <b-th>{{ item.content || "-" }}</b-th>
                <b-th>{{ item.content_type || 0 }}</b-th>
                <b-th>{{ item.post_date || "-" }}</b-th>
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
            <b-tbody v-if="InfoList == 0">
              <b-tr>
                <b-td colspan="4" class="text-center">
                  {{ $t("NoItems") }}
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple> -->
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
</template>

<script>
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
       fields: [
        { key: "content", label: this.$t("content"), tdClass: "text-left" },
        { key: "content_type", label: this.$t("content_type"), tdClass: "text-left" },
        {
          key: "post_date",
          label: this.$t("post_date"),
          tdClass: "text-left",
        },
        { key: "file", label: this.$t("file"), tdClass: "text-left" },
      ],
      orgLoading: false,
      loading: false,
      InfoList: [],
      OblastList: [],
      CategoryList: [],
      OrganizationList: [],
      SpecializationList: [],
      totalrow: 0,
      lang: localStorage.getItem("locale"),
    };
  },
  created() {
    this.dateType("week");
    if (!!this.$route.query.date) {
      this.filter.from_date = this.$route.query.date;
      this.filter.to_date = this.$route.query.date;
    }
    if (!!this.$route.query.timetype) {
      this.filter.timetype = this.$route.query.timetype;
    }
    if (
      this.$route.query.isconnect == true ||
      this.$route.query.isconnect == "true"
    ) {
      this.filter.isconnect = true;
    }
    if (
      this.$route.query.isconnect == false ||
      this.$route.query.isconnect == "false"
    ) {
      this.filter.isconnect = false;
    }
    if (!!this.$route.query.from_date) {
      this.filter.from_date = this.$route.query.from_date || null;
      this.filter.to_date = this.$route.query.to_date || null;
    }
    OrganizationService.GetOblastList(this.lang).then((res) => {
      this.OblastList = res.data;
    });
    OrganizationService.GetCategoryList(this.lang).then((res) => {
      this.CategoryList = res.data;
    });
    OrganizationService.Specialization(this.lang).then((res) => {
      this.SpecializationList = res.data;
    });
    if (!!this.$route.query.id) {
      this.filter.organ = this.$route.query.id || null;
      this.filter.specialization = this.$route.query.specialization || null;
      this.filter.oblastid = this.$route.query.oblastid || null;
      this.filter.categoryid = this.$route.query.categoryid || null;
      this.RefreshOrg();
      this.Refresh();
    } else {
      this.TotalOrg();
      this.Refresh();
    }
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
      TelevisionService.GetTelevisionByInsertOrgan(
        this.filter.page,
        this.filter.limit,
        this.filter.organ,
        this.filter.satsial,
        this.filter.from_date,
        this.filter.to_date,
        this.lang
      ).then((res) => {
        this.loading = false;
        this.InfoList = res.data.data;
        this.totalrow = res.data.total_row;
      });
    },
  },
};
</script>

<style></style>
