const Profile = require('../dbModel/profile').Profile;
import { ProfileData } from '../model/profileModel'

export const getProfile = async (): Promise<ProfileData[]> => {
    return await Profile.findAll({
        where: {},
    }).then((profiles: ProfileData[]) => {
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
