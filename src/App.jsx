import { Suspense, lazy } from 'react';
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import * as ROUTES from "./constants/routes"
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';

const Login = lazy(() => import('./pages/Login'));
const SignUp=lazy(() => import('./pages/Signup'));
const NotFound=lazy(() => import('./pages/NotFound'));
const Dashboard=lazy(() => import('./pages/Dashboard'));


function App() {
  const {user} = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}> 
    <Router>
      <Suspense fallback={<p>Loading ...</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login/>}/>
            <Route path={ROUTES.SIGN_UP} element={<SignUp/>}/>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
      </Suspense>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
