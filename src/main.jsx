import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FirebaseContext from './context/firebase.js'
import {firebase1, FieldValue} from "./lib/firebase.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{firebase1,FieldValue }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>
)
