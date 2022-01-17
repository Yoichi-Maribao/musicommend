import React, { useState, useEffect, createContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import CommonLayout from 'components/layouts/CommonLayout';
import Top from 'components/pages/homes/Top';
import SignUp from 'components/pages/auth/SignUp';
import SignIn from 'components/pages/auth/SignIn';
import Musics from 'components/pages/musics/Musics';
import MusicPage from 'components/pages/musics/MusicPage';
import EditMusic from 'components/pages/musics/EditMusic';
import UsersList from 'components/pages/users/UsersList';
import UserPage from 'components/pages/users/UserPage';
import EditUser from 'components/pages/users/EditUser';

import { getCurrentUser } from 'lib/api/auth';
import { User } from 'interfaces/index';

export const AuthContext = createContext(
  {} as {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  }
);

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  //認証済みのユーザーがいるかどうかチェック
  //確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);

        console.log(res?.data.data);
      } else {
        console.log('No current user');
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        return <Navigate to="/signin" />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <Router>
      <AuthContext.Provider
        value={{
          loading,
          setLoading,
          isSignedIn,
          setIsSignedIn,
          currentUser,
          setCurrentUser,
        }}
      >
        <CommonLayout>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            {/* <Route path="/" element={<Private children={<Home />} />} /> */}
            <Route path="/" element={<Top />} />
            <Route path="/musics" element={<Private children={<Musics />} />} />
            <Route
              path="/musics/:id"
              element={<Private children={<MusicPage />} />}
            />
            <Route
              path="/musics/:id/edit"
              element={<Private children={<EditMusic />} />}
            />
            <Route
              path="/users"
              element={<Private children={<UsersList />} />}
            />
            <Route
              path="/users/:id"
              element={<Private children={<UserPage />} />}
            />
            <Route
              path="/users/:id/edit"
              element={<Private children={<EditUser />} />}
            />
          </Routes>
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
