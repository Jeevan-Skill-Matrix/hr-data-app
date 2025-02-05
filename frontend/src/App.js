import React, { useState} from 'react';
import UserDashboard from './Components/users/UserDashboard';
import AdminPage from './Components/admin/AdminPage';
import EnterEmail from './Components/login/EnterEmail';
import EnterNewPassword from './Components/login/EnterNewPassword';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import UserProtectedRoute from './Components/ProtectedRoute';
import LoginPage from './Components/login/loginPage';


import './App.css'

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  //const [page, setPage] = useState('login');

  // 

  return(


    <div className='App'>

      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>} />
         
         <Route path="/admin/*" element={
                                            <UserProtectedRoute isAuthenticated={isAuthenticated}>
                                              <AdminPage setIsAuthenticated={setIsAuthenticated}/>
                                            </UserProtectedRoute>
                                          }     />
        <Route exact path='/forgotpassword' element={<EnterEmail />} />
        <Route path='/newpassword/*' element={<EnterNewPassword />} />
         <Route  path="/*" element={
                                            <UserProtectedRoute isAuthenticated={isAuthenticated}>
                                              <UserDashboard setIsAuthenticated={setIsAuthenticated}/>
                                            </UserProtectedRoute>
                                          } />
        </Routes>
      </BrowserRouter>
    </div>

    
  )
};

export default App;
