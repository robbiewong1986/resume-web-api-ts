import { UserProfile } from './userModel'
import { GetWorkExperiencePostModel } from './workExperiencePostModel'
import { GetProfileModel } from './profileModel'
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
        workExperiencePostList: GetWorkExperiencePostModel[]
    }
}

export interface GetProfileResponse extends BaseResponse {
    data?: {
        profileList: GetProfileModel[]
    }
} 




