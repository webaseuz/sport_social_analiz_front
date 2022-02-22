import ApiService from "./api.service";

const RoleService = {
    GetAll(){
        return ApiService.get(`/Role/`)
    },
    GetList(page,limit){
        return ApiService.get(`/Role/page=${page}&limit=${limit}/`)
    },
    Get(id){
        if(id === 0 || id === undefined || id === null || id === ''){
            return ApiService.get(`/Role/0/`)
        }
        else{
            return ApiService.get(`/Role/${id}/`)
        }
    },
    Permission(lang){
        return ApiService.get(`/Permission/lang=${lang}/`)
    },
    Update(data){
        if(data.id === 0 || data.id === '' || data.id === null || data.id === undefined){
            return ApiService.post(`/Role/`,data)
        }
        else{
            return ApiService.put(`/Role/${data.id}/`,data)
        }
    }
}
export default RoleService