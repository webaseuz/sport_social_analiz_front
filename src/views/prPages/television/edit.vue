<template>
  <div>
    <b-overlay :show="loading">
      <b-card>
        <b-row>
          <b-col class="my-1" sm="12" md="6" lg="3">
            <h5>{{ $t("content_type") }}</h5>
            <v-select
              :options="ContentType"
              :reduce="(item) => item.name"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="Television.content_type"
            ></v-select>
          </b-col>
          <b-col class="my-1" sm="12" md="6" lg="9">
            <h5>{{ $t("content") }}</h5>
            <b-form-input type="text" v-model="Television.content" />
          </b-col>
        </b-row>
        <b-row>
          <b-col class="my-1" sm="12" md="6" lg="3">
            <h5>{{ $t("post_date") }}</h5>
            <b-form-input
              id="basicInput"
              placeholder="Enter Email"
              type="date"
              style="width:100%;margin-right:10px"
              v-model="Television.post_date"
            />
          </b-col>
          <b-col class="my-1" sm="12" md="6" lg="3">
            <h5>{{ $t("file") }}</h5>
            <b-form-file
              id="file"
              :placeholder="$t('file')"
              v-model="file_name"
              @change="ChangeFile"
            ></b-form-file>
          </b-col>
          <b-row v-if="Television.file_name != ''" class="p-1">
            <b-card class="styleCard">
              <p>{{ Television.file_name }}.{{ Television.file_extension }}</p>
              <b-row>
                <b-col>
                  <b-link @click="DownloadFile">
                    <feather-icon
                      icon="DownloadIcon"
                      size="17"
                      class="cursor-pointer"
                    />
                  </b-link>
                </b-col>
                <b-col>
                  <b-link @click="DeleteFile">
                    <feather-icon
                      icon="TrashIcon"
                      size="17"
                      class="cursor-pointer"
                    />
                  </b-link>
                </b-col>
              </b-row>
            </b-card>
          </b-row>
          <b-row> </b-row>
        </b-row>
        <b-row>
          <b-col class="d-flex justify-content-between">
            <b-button
              variant="danger"
              @click="$router.push({ name: 'Television' })"
            >
              {{ $t("backToOrganization") }}
            </b-button>
            <b-button variant="success" @click="Update">
              <b-spinner v-if="SaveLoading" small></b-spinner> {{ $t("save") }}
            </b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-overlay>
  </div>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import TelevisionService from "@/services/television.service";

export default {
  data() {
    return {
      show: false,
      Television: {},
      ContentType: [
        { id: 0, name: this.$t("television") },
        { id: 1, name: this.$t("radio") },
        { id: 2, name: this.$t("gazeta") },
        { id: 3, name: this.$t("jurnal") },
      ],
      loading: false,
      lang: localStorage.getItem("locale"),
      SaveLoading: false,
      DeleteLoading: false,
      DownloadLoading: false,
      file: [],
      url1: [],
      //   files: [],
    };
  },
  created() {
    this.Refresh();
  },
  methods: {
    ChangeFile(data) {
      //   if (data.target.files.length > 0 && data.target.files[0].size > 5242880) {
      //     this.$makeToast(this.$t("morethen5mb"), "danger");
      //     return false;
      //   }
      var formData = new FormData();
      formData.append("file", data.target.files[0]);
      this.show = true;
      TelevisionService.InsertFile(formData)
        .then((res) => {
          this.show = false;
          //   this.Television.file.push({
          (this.Television.file_id = res.data.file_id),
            (this.Television.file_name = res.data.file_name),
            (this.Television.file_extension = res.data.file_extension);
          //   });
        })
        .catch((error) => {
          this.show = false;
        });
      this.file = [];
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
    Refresh() {
      this.loading = true;
      TelevisionService.GetByMinioTelevision(this.$route.params.id)
        .then((res) => {
          this.loading = false;
          this.Television = res.data;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    DownloadFile() {
      this.DownloadLoading = true;
      TelevisionService.DownloadFile(this.Television.file_id)
        .then((res) => {
          this.DownloadLoading = false;
          this.downloadFile(res, this.Television.file_name);
          this.makeToast(this.$t("SaveSuccess"), "success");
        })
        .catch((error) => {
          this.DownloadLoading = false;
          this.makeToast(error.response.data, "danger");
        });
    },
    downloadFile(response, item) {
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "asdasd"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    DeleteFile() {
      this.DeleteLoading = true;
      TelevisionService.DeleteTelevision(this.Television.file_id)
        .then((res) => {
          this.DeleteLoading = false;
          this.makeToast(this.$t("SaveSuccess"), "success");
          this.Television.file_id = "";
          this.Television.file_name = "";
          this.Television.file_extension = "";
        })
        .catch((error) => {
          this.DeleteLoading = false;
          this.makeToast(error.response.data, "danger");
        });
    },
    Update() {
      this.SaveLoading = true;
      //   this.Television.organization = 2905;
      //    this.Television.post_date=2020-02-22
      TelevisionService.CreateTelevision(this.Television)
        .then((res) => {
          this.SaveLoading = false;
          this.makeToast(this.$t("SaveSuccess"), "success");
          var vm = this;
          setTimeout(() => {
            vm.$router.push({ name: "Television" });
          }, 500);
        })
        .catch((error) => {
          this.SaveLoading = false;
          this.makeToast(error.response.data.detail, "danger");
        });
    },

    validURL(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    },
  },
};
</script>

<style>
.styleCard {
  background-color: rgb(127, 232, 255);
}
</style>
