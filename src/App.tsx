import ExplorePage from "@/pages/ExplorePage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import HomePage from "@/pages/HomePage";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import ShoppingCartPage from "@/pages/ShoppingCartPage";
import SignUpPage from "@/pages/SignUpPage";
import {
  default as CourseDetailsPage,
  default as CourseTaskPage,
} from "@/pages/courseDetails/CourseDetailsPage";
import MyCoursesPage from "@/pages/myCourses/MyCoursesPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import Layout from "@/routing/Layout";
import RedirectIfLoggedIn from "@/routing/RedirectIfLoggedIn";
import RequireAuth from "@/routing/RequireAuth";
import { ThemeProvider } from "@/shadcn/ui/theme-provider";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

const App: FC = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route element={<RedirectIfLoggedIn />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ResetPasswordPage />} />
            <Route path="/reset-password" element={<ForgotPasswordPage />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/my-courses" element={<MyCoursesPage />} />
            <Route path="/shopping-cart" element={<ShoppingCartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/course/:courseId" element={<CourseDetailsPage />} />
            <Route
              path="/course/:courseId/task/:taskId"
              element={<CourseTaskPage />}
            />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
