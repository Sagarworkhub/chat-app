import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import { apiClient } from './lib/api.client';
import Auth from './pages/auth';
import Chat from './pages/chat';
import Profile from './pages/profile';
import { useAppStore } from './store';
import { type User } from './types/user';
import { GET_USER_INFO_ROUTE } from './utils/constants';

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;

  return isAuthenticated ? children : <Navigate to='/auth' />;
};

const AuthRoute = ({ children }: { children: React.ReactElement }) => {
  const { userInfo } = useAppStore();

  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to='/profile' /> : children;
};

function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get<User & { id: string }>(
          GET_USER_INFO_ROUTE,
          {
            withCredentials: true,
          },
        );
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (!userInfo) {
      getUserData()
        .then(() => null)
        .catch(() => null);
    } else {
      setLoading(false);
    }
  }, [setUserInfo, userInfo]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/auth'
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path='/chat'
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<Navigate to='/auth' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
