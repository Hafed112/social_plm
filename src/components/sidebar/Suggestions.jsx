import { useEffect, useState } from 'react'
import { getSuggestedProfiles } from '../../services/firebase';
import Skeleton from 'react-loading-skeleton'
import SuggestedProfile from './SuggestedProfile';
const Suggestions = ({userId,following,loggedInUserdocId}) => {
  const [profiles,setProfiles] =useState(null);

  useEffect(()=>{
    const getSuggestedProfile = async()=>{
      const response = await getSuggestedProfiles(userId,following);
      setProfiles(response);
    }
    if(userId){
      getSuggestedProfile();
    }

  },[userId,loggedInUserdocId])
  
  return (
    !profiles ? (
      <Skeleton count={1} height={150} className='mt-5'/>
    ) : profiles.length >0 ?(
      <div className='rounded flex flex-col'>
        <div className='text-sm flex items-center align-items justify-between'>
          <p className='font-bold text-gray-base'>Suggestions for you</p>
        </div>
        <div className='mt-4 grid gap-5'>
          {
            profiles.map((profile)=>(
              <SuggestedProfile 
                key={profile.docId}
                sgDocId={profile.docId}
                username={profile.username}
                profileId={profile.userId}
                userId={userId}
                loggedInUserdocId={loggedInUserdocId}
              />
            ))
          }
        </div>
      </div>
    ) : null
  )
}

export default Suggestions
