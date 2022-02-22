import ApiService from "./api.service";

const OrganizationService = {
    GetList(page,limit,oblast,category,specialization,organ,isconnect,lang){
        return ApiService.get(`/organization/page=${page}&limit=${limit}&oblast=${oblast || null}&category=${category || null}&specialization=${specialization || null}&organ=${organ || null}&isconnect=${isconnect || null}&lang=${lang}/`)
    },
    GetOblastList(lang){
        return ApiService.get(`/inforegion/lang=${lang}/`)
    },
    GetCategoryList(lang){
        return ApiService.get(`/category/lang=${lang}/`)
    },
    InfoDistrict(oblast,lang){
        return ApiService.get(`/Infodistrict/oblast=${oblast}&lang=${lang}/`)
    },
    State(){
        return ApiService.get(`/State/`)
    },
    OrganizationGetOblastID(oblast,category,specialization,isconnect,satsial,lang){
        // if(oblast === null){
        //     oblast = 0
        // }
        // if(category === null){
        //     category = 0
        // }
        // if(specialization === null){
        //     specialization = 0
        // }
        if(isconnect === undefined){
            isconnect = null
        }
        if(satsial === undefined){
            satsial = null
        }
        // if(isconnect === true){
        //     isconnect = 'True'
        // }
        // if(isconnect === false){
        //     isconnect = 'False'
        // }
        return ApiService.get(`/OrganizationGetOblastID/oblast=${oblast}&category=${category}&specialization=${specialization}&isconnect=${isconnect}&satsial=${satsial}&lang=${lang}/`)
    },
    Specialization(lang){
        return ApiService.get(`/Specialization/lang=${lang}/`)
    },
    Get(id){
        if(id === 0 || id === null || id === undefined || id === ''){
            return ApiService.get(`/OrganizationGetOblastID/0/`)
        }
        else{
            return ApiService.get(`/organization/${id}/`)
        }
    },
    Update(data){
        if(data.id === 0 || data.id === undefined || data.id === null || data.id === ''){
            return ApiService.post(`/organization/`,data)
        }
        else{
            return ApiService.put(`/organization/${data.id}/`,data)
        }
        
    },
    Delete(id){
        return ApiService.delete(`/organization/${id}/`)
    }
}
export default OrganizationService