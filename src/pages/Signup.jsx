import { useContext, useEffect, useState } from 'react';
import {Link,useNavigate} from "react-router-dom";
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

const Signup = () => {

  const navigate=useNavigate();
  const {firebase1}=useContext(FirebaseContext);

  const [username,setUsername]=useState('');
  const [fullName,setFUllName]=useState('');
  const [emailAddress,setEmailAddress]=useState('');
  const [password,setPassword]=useState('');

  const [error,setError]=useState('');
  const isInvalid = password ==='' || emailAddress ==='';

  const handleLogin = async(event)=>{
    event.preventDefault();

    const usernameIsToken= await doesUsernameExist(username);
    if(!usernameIsToken){
      try {
        const createUserAuth = await firebase1
          .auth()
          .createUserWithEmailAndPassword(emailAddress,password);

        // authentication
        // -> emailAddress & password & username (displayName)
        await createUserAuth.user.updateProfile({
          displayName: username
        });

        // firebase user collection (create a document)
        await firebase1
          .firestore()
          .collection('users')
          .add({
            userId:createUserAuth.user.uid,
            username:username.toLowerCase(),
            fullName,
            emailAddress: emailAddress.toLowerCase(),
            following: ['2'],
            followers: [],
            dateCreated: Date.now()

          })
          return navigate(ROUTES.DASHBOARD);
     
      } catch (error) {
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }

    }else{
      setUsername('');
      setError('That username is already taken, please try another.');
    }
    
  }

  useEffect(()=>{
    document.title='Login - Instagram';
  },[])
  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-2/5">
        <img style={{ width:"300px" }} src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e)=>setUsername(e.target.value)}
              value={username}
            />
            <input
              aria-label="Enter your email fullname"
              type="text"
              placeholder="Fullname"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e)=>setFUllName(e.target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e)=>setEmailAddress(e.target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
            ${isInvalid && 'opacity-50'}`}
            >
              Login
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Don't have an account?{` `}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup;
