import ApiService from './api.service'

const UserService = {
    GetList(page,limit){
        return ApiService.get(`/user/page=${page}&limit=${limit}/`)
    },
    Get(id){
        if(id === 0 || id === undefined || id === null || id === ''){
            return ApiService.get(`/user/0/`)
        }
        else{
            return ApiService.get(`/user/${id}/`)
        }
    },
    Update(data){
        if(data.id === 0 || data.id === '' || data.id === null || data.id === undefined){
            return ApiService.post(`/sign_up/`,data)
        }
        else{
            return ApiService.put(`/user/${data.id}/`,data)
        }
    },
    login(data){
        return ApiService.post(`/login/`,data)
    },
    UserData(lang){
        return ApiService.get(`/UserData/${lang}/`)
    }
}
export default UserService