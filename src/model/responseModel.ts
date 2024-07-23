import { UserProfile } from './userModel'
import { WorkExperiencePostData } from './workExperiencePostModel'
import { ProfileData } from './profileModel'
import { ProjectData , ProgrammingRelatedData , CompanyData } from './projectModel'
import { BaseResponse } from './commonModel'


export interface UserLoginResponse extends BaseResponse {
    data?: {
        userProfile: UserProfile
    }
}

export interface RefreshTokenResponse extends BaseResponse { }

export interface UserLogoutResponse extends BaseResponse { }

export interface GetRSAPublicKeyResponse extends BaseResponse {
    data?: {
        publickey?: string
    }
}

export interface GetWorkExperiencePostListResponse extends BaseResponse {
    data?: {
        workExperiencePostList: WorkExperiencePostData[]
    }
}

export interface GetProfileResponse extends BaseResponse {
    data?: {
        profileList: ProfileData[]
    }
} 

export interface GetProjectResponse extends BaseResponse{
    data? :{
        projectList:ProjectData[]
    }
}

export interface GetProgramRelatedResponse extends BaseResponse{
    data? :{
        programRelatedList:ProgrammingRelatedData[]
    }
}

export interface GetCompanyListResponse extends BaseResponse{
    data? :{
        companyList:CompanyData[]
    }
}



