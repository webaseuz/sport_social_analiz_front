import ApiService from "./api.service";

const TelevisionService = {
  CreateTelevision(data) {
    return ApiService.post(`/CreateTelevision/`, data);
  },
  GetByMinioTelevision(id) {
    return ApiService.get(`/GetByMinioTelevision/${id}/`);
  },
  GetTelevisionCountRange(
    page,
    limit,
    oblast,
    category,
    specialization,
    organ,
    isconnect,
    lang,
    date_from,
    date_to
  ) {
    return ApiService.get(
      `/GetTelevisionCountRange/page=${page}&limit=${limit}&oblast=${oblast}&category=${category}&specialization=${specialization}&organ=${organ}&isconnect=${isconnect}&lang=${lang}&date_from=${date_from}&date_to=${date_to}/`
    );
  },
  GetTelevisionByOrgan(page, limit, satsial, date_from, date_to, lang) {
    return ApiService.get(
      `/GetTelevisionByOrgan/page=${page}&limit=${limit}&satsial=${satsial}&date_from=${date_from}&date_to=${date_to}&lang=${lang}/`
    );
  },
  DeleteTelevision(id) {
    return ApiService.delete(`/DeleteTelevision/${id}/`);
  },
  DownloadFile(id) {
    return ApiService.get(`/DownloadFile/${id}/`);
  },
  UpdateTelevision(data) {
    return ApiService.put(`/UpdateTelevision/`, data);
  },
  Update(data) {
    if (
      data.id === 0 ||
      data.id === undefined ||
      data.id === null ||
      data.id === ""
    ) {
      return ApiService.post(`/UpdateTelevision/`, data);
    } else {
      return ApiService.put(`/UpdateTelevision/${data.id}/`, data);
    }
  },
  InsertFile(data) {
    return ApiService.post(`/InsertFile/`, data);
  },
};
export default TelevisionService;
