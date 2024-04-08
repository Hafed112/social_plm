import {firebase1,FieldValue} from '../lib/firebase';

export const doesUsernameExist = async(username)=>{
    const result = await firebase1
        .firestore()
        .collection('users')
        .where('username','==',username.toLowerCase())
        .get();

    return result.docs.length > 0;
}

export const getUserByUserId = async(userId)=>{
    const result = await firebase1.firestore().collection('users').where('userId','==',userId).get();
        const user = result.docs.map((item) =>({
            ...item.data(),
            docId:item.id
        }));
    
    return user;
}

export const getSuggestedProfiles = async(userId,following) =>{
    const result = await firebase1.firestore().collection('users').limit(10).get();

     return result.docs
        .map((user) => ({...user.data(), docId:user.id}))
        .filter((profile) =>profile.userId !== userId && !following.includes(profile.userId));
} 


export const updateLoggedInUserFollowing = async(
    loggedInUserdocId, //currently logged in user document id(sam's profile)
    profileId, //the user that sam requests to follow
    isFollowingProfile //true/flase (am i currently following this person)
    )=>{
        return firebase1
            .firestore()
            .collection('users')
            .doc(loggedInUserdocId)
            .update({
                following:isFollowingProfile
                    ? FieldValue.arrayRemove(profileId)
                    :FieldValue.arrayUnion(profileId)
            });

};

export const updateFollowedUserFollowes = async(
    profileDocId, //currently logged in user document id(sam's profile)
    loggedInUserdocId, //the user that sam requests to follow
    isFollowingProfile //true/flase (am i currently following this person)
    )=>{
        return firebase1
            .firestore()
            .collection('users')
            .doc(profileDocId)
            .update({
                followers:isFollowingProfile
                    ? FieldValue.arrayRemove(loggedInUserdocId)
                    :FieldValue.arrayUnion(loggedInUserdocId)
            });

};