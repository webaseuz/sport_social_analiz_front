<template>
  <div>
    <b-overlay :show="loading">
      <b-card>
        <b-row>
          <b-col class="my-1" sm="12" md="6" lg="9">
            <h5>{{ $t("content") }}</h5>
            <b-form-input type="text" v-model="Instruction.content" />
          </b-col>
        </b-row>
        <b-row>
          <b-col class="my-1" sm="12" md="6" lg="3">
            <h5>{{ $t("file") }}</h5>
            <b-form-file
              id="file"
              :placeholder="$t('file')"
              v-model="Instruction.file_name"
              @change="ChangeFile"
            ></b-form-file>
          </b-col>
          <b-row  v-if="Instruction.file_name.length != 0" class="p-1">
            <b-card class="styleCard">
              <p>{{ Instruction.file_name }}.{{ Instruction.file_extension }}</p>
              <b-row>
                <b-col class="text-center">
                  <b-link @click="DownloadFile">
                    <feather-icon
                      icon="DownloadIcon"
                      size="17"
                      class="cursor-pointer"
                    />
                  </b-link>

                  <b-link class="ml-1" v-if="this.$route.params.id !=0" @click="DeleteFile">
                    <feather-icon
                      icon="TrashIcon"
                      size="17"
                      class="cursor-pointer"
                    />
                  </b-link>
                  <b-link class="ml-1" v-if="this.$route.params.id ==0" @click="DeleteFileNew">
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
              @click="$router.push({ name: 'Instruction' })"
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
import InstructionService from '@/services/instruction.service'
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import TelevisionService from "@/services/television.service";

export default {
  data() {
    return {
      show: false,
      Instruction: {},
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
      var formData = new FormData();
      formData.append("file", data.target.files[0]);
      this.show = true;
      TelevisionService.InsertFile(formData)
        .then((res) => {
          this.show = false;
          //   this.Television.file.push({
          (this.Instruction.file_id = res.data.file_id),
            (this.Instruction.file_name = res.data.file_name),
            (this.Instruction.file_extension = res.data.file_extension);
          //   });
        })
        .catch((error) => {
          this.show = false;
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
    Refresh() {
      this.loading = true;
       InstructionService.GetInstruction(this.$route.params.id)
        .then((res) => {
          this.loading = false;
          this.Instruction = res.data;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    DownloadFile() {
      this.DownloadLoading = true;
      TelevisionService.DownloadFile(this.Instruction.file_id,this.Instruction.file_extension)
        .then((res) => {
          this.DownloadLoading = false;
          this.downloadFile(res, this.Instruction.file_name);
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
      link.setAttribute("download", this.Instruction.file_name+"."+ this.Instruction.file_extension); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    DeleteFile() {
      this.DeleteLoading = true;
      TelevisionService.DeleteFile(this.Instruction.file_id,this.Instruction.file_extension)
        .then((res) => {
          this.DeleteLoading = false;
          this.makeToast(this.$t("DeleteSuccess"), "success");
          this.Instruction.file_id = "" 
          this.Instruction.file_name = "";
          this.Instruction.file_extension = "";
        })
        .catch((error) => {
          this.DeleteLoading = false;
          this.makeToast(error.response.data, "danger");
        });
    },
    DeleteFileNew() {
      this.DeleteLoading = true;
      TelevisionService.DeleteFile(this.Instruction.file_id,this.Instruction.file_extension)
        .then((res) => {
          this.DeleteLoading = false;
          this.makeToast(this.$t("DeleteSuccess"), "success");
          this.Instruction.file_id = "" 
          this.Instruction.file_name = "";
          this.Instruction.file_extension = "";
        })
        .catch((error) => {
          this.DeleteLoading = false;
          this.makeToast(error.response.data, "danger");
        });
    },
    Update() {
      this.SaveLoading = true;
    //   if(this.$route.params.id ===0 ){
        console.log(this.Instruction)
        InstructionService.AddInstruction(this.Instruction)
        .then((res) => {
          this.SaveLoading = false;
          this.makeToast(this.$t("create_success"), "success");
          var vm = this;
          setTimeout(() => {
            vm.$router.push({ name: "Instruction" });
          }, 500);
        })
        .catch((error) => {
          this.SaveLoading = false;
          this.makeToast(error.response.data.detail, "danger");
        });
    //   }else{
    //      TelevisionService.UpdateTelevision(this.Instruction.id,this.Instruction)
    //     .then((res) => {
    //       this.SaveLoading = false;
    //       this.makeToast(this.$t("update_success"), "success");
    //       var vm = this;
    //       setTimeout(() => {
    //         vm.$router.push({ name: "Instruction" });
    //       }, 500);
    //     })
    //     .catch((error) => {
    //       this.SaveLoading = false;
    //       this.makeToast(error.response.data.detail, "danger");
    //     });
    //   }
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
