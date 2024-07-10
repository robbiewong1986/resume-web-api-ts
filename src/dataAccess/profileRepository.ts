const { Profile } = require('../dbModel/profile');
import { GetProfileModel } from '../model/profileModel'

export const getProfile = async (): Promise<GetProfileModel[]> => {
    return await Profile.findAll({
        where: {},
    }).then((profiles: GetProfileModel[]) => {
        return profiles.map(profile => {
            return {
                id: profile.id,
                type: profile.type,
                content: profile.content,
                seqNo: profile.seqNo
            }
        })
    })
}
