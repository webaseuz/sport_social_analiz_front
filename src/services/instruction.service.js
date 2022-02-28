import ApiService from "./api.service";
const InstructionService = {
  AddInstruction(data) {
    if (
      data.id === 0 ||
      data.id === undefined ||
      data.id === null ||
      data.id === ""
    ) {
      return ApiService.post(`/AddInstruction/`, data);
    } else {
      return ApiService.put(`/AddInstruction/${data.id}/`, data);
    }
  },
  AddInstructionDelete(id) {
    return ApiService.delete(`/AddInstruction/${id}/`);
  },
  GetInstruction(id) {
    return ApiService.get(`/GetInstruction/${id}/`);
  },
  GetInstructionList() {
    return ApiService.get(`/GetInstruction/`);
  },
};
export default InstructionService;
