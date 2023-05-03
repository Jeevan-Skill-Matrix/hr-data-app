import React, { useState, useEffect } from 'react';
import Login from './Components/login/Login';
//import Register from './Components/admin/Register';
import UserDashboard from './Components/users/UserDashboard';
import AdminDashboard from './Components/admin/AdminDashboard';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import UserProtectedRoute from './Components/ProtectedRoute';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState('login');
  // useEffect(() => {
  //   const token = localStorage.getItem('access_token');
  //   if (token) {
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  // const renderPage = () => {
  //   switch (page) {
  //     case 'login':
  //       return <Login setPage={setPage} setIsAuthenticated={setIsAuthenticated} />;
  //     case 'register':
  //       return <Register setPage={setPage} />;
  //     case 'dashboard':
  //       return isAuthenticated ? (
  //         <UserDashboard setIsAuthenticated={setIsAuthenticated} />
  //       ) : (
  //         setPage('login')
  //       );
  //     default:
  //       return <Login setPage={setPage} setIsAuthenticated={setIsAuthenticated} />;
  //   }
  // };

  // return <>{renderPage()}</>;


  return(
    
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route exact path="/home" element={
                                          <UserProtectedRoute isAuthenticated={isAuthenticated}>
                                            UserDashboard
                                          </UserProtectedRoute>
                                        } />
      </Routes>


    </BrowserRouter>
    
  )
};

export default App;
