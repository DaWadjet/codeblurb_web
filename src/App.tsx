import LandingPage from "@/components/landing/LandingPage";
import SignUpPage from "@/components/signUp/SignUpPage";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import Layout from "./routing/Layout";
import RedirectIfLoggedIn from "./routing/RedirectIfLoggedIn";
import RequireAuth from "./routing/RequireAuth";

const App: FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route element={<RedirectIfLoggedIn />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/home" element={<div>Home page</div>} />
          <Route path="/explore" element={<div>explore page</div>} />
          <Route path="/my-courses" element={<div>my-courses page</div>} />
          <Route
            path="/shopping-cart"
            element={<div>shopping-cart page</div>}
          />
          <Route path="/profile" element={<div>Profile page</div>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
