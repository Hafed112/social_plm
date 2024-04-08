import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import {
        updateLoggedInUserFollowing
        ,updateFollowedUserFollowes
    } from '../../services/firebase'

const SuggestedProfile = ({sgDocId,username,profileId,userId,loggedInUserdocId}) => {
  const [followed,setFollwed]= useState(false);
  
  const handleFollowUser = async() =>{
    setFollwed(true);
    await updateLoggedInUserFollowing(loggedInUserdocId,profileId,false);
    await updateFollowedUserFollowes(sgDocId,userId,false);
  }
  return (
    !followed ?(
    <div className="flex flex-row items-center justify-between">
        <div className="flex items-center justify-between">
            <img 
              className="rounded-full w-8 mr-3"
              src={`/images/avatars/${username}.jpg`}
              alt={username}
            />
            <Link to={`/p/${username}`}>
                <p className="font-bold text-sm">{username}</p>
            </Link>
        </div>
        <button 
            className="text-xs font-bold text-blue-medium"
            type="button"
            onClick={handleFollowUser}
        >
            Follow
        </button>
    </div>
    ):null
  )
}

export default SuggestedProfile
