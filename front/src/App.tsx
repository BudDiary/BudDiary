import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useMember from "./hooks/memberHook";
import "./App.css";

import NotFound from "./pages/notfound/NotFoundPage";
import WritePage from "./pages/write/WritePage";
import GroupDetailPage from "./pages/groupdetail/GroupDetailPage";
import GroupPage from "./pages/group/GroupPage";
import SurveyPage from "./pages/survey/SurveyPage";
import HomePage from "./pages/home/HomePage";
import MypagePage from "./pages/mypage/MypagePage";
import NavBar from "./components/navbar/NavBar";

const router = createBrowserRouter([
  {
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/survey", element: <SurveyPage /> },
      { path: "/group", element: <GroupPage /> },
      { path: "/group/:id", element: <GroupDetailPage /> },
      { path: "/write", element: <WritePage /> },
      { path: "/mypage", element: <MypagePage /> },
    ],
  },
]);

export default function App() {
  const { isLoggedIn } = useMember();
  return (
    <div className="App">
      <NavBar />
      <div className={isLoggedIn ? "page" : "login"}>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
