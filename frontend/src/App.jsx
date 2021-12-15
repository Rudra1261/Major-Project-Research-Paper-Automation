import "./App.css";
import {
  Dashboard,
  Landing,
  Login,
  Navbar,
  Register,
  Alert,
  LineGraph,
} from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./components/routing/PrivateRoute";
if (localStorage.token) setAuthToken(localStorage.token);
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <section className="container">
            <Alert />
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/line" element={<LineGraph />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route
                exact
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </section>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
