// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Register from './components/Register/Register'
// import Login from './components/Login/Login'
// import Buyer from './components/Pages/Buyer/Buyer'
// import Agent from './components/Pages/Agent/Agent'
// import IntialAgent from './components/Pages/Agent/IntialAgent';
// import Layout from './components/Layout/Layout';
// import Home from './components/Home/Home';
// import AgentUpdateProperty from './components/Pages/Agent/AgentUpdateProperty'
// import ProtectedRoute from './components/ProtectedRoute';
// import Unauthorized from './components/Unauthorized';
// function App() {
  
//   return (
    
//      <Router>
//       <Routes>
//         <Route path='/' element={<Layout />}>
//           <Route index element={<Home />} />
         
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />}/>
         
//           <Route path="/buyer/:roleid/:username" element={<Buyer />}/>
//           {/* <Route element={<ProtectedRoute role={1} />}> */}
//           <Route path="/agent/:roleid/:username" element={<Agent />}/>
//           <Route path="/updateproperty/:pid" element={<AgentUpdateProperty />}/>
//           <Route path="/intialagent/:roleid/:username" element={<IntialAgent />}/>
//           {/* </Route> */}
         
//         </Route>
//         <Route path="/unauthorized" element={<Unauthorized />} />

//       </Routes>
//      </Router>
    
//   )
// }

// export default App

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Buyer from './components/Pages/Buyer/Buyer';
import Agent from './components/Pages/Agent/Agent';
import IntialAgent from './components/Pages/Agent/IntialAgent';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import AgentUpdateProperty from './components/Pages/Agent/AgentUpdateProperty';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './components/Unauthorized';
import Favorite from './components/Pages/Favorite';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes for Authenticated Users */}
          <Route element={<ProtectedRoute />}>
            <Route path="/buyer/:roleid/:username" element={<Buyer />} />
            <Route path="/agent/:roleid/:username" element={<Agent />} />
            <Route path="/updateproperty/:pid" element={<AgentUpdateProperty />} />
            <Route path="/intialagent/:roleid/:username" element={<IntialAgent />} />
            <Route path="/favourites" element={<Favorite />} />
          </Route>

        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;
