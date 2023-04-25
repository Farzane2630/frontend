import "./App.css";
import { AuthContext } from "./Contexts/AuthContext";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { useCallback, useEffect, useState } from "react";

function App() {
  let router = useRoutes(routes);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfos, setUserInfos] = useState({});

  const login = useCallback((userInfos, token) => {
    setToken(token);
    setIsLoggedIn(true);
    setUserInfos(userInfos);
    localStorage.setItem("user", JSON.stringify({ token }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserInfos({});
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));

    if (userLocalStorage) {
      fetch("http://127.0.0.1:8000/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${userLocalStorage.token}`,
        },
      })
        .then((res) => res.json())
        .then((userData) => {
          setIsLoggedIn(true);
          setUserInfos(userData);
        });
    } else setIsLoggedIn(false);
  }, [login, logout]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout,
      }}
    >
      {router}
    </AuthContext.Provider>
  );
}

export default App;
