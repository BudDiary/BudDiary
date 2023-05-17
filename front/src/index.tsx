import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import logger from "redux-logger";

import reportWebVitals from "./reportWebVitals";
import store from "./store/store";
import { Provider } from "react-redux";
import NotFoundPage from "./pages/notfound/NotFoundPage";
import WritePage from "./pages/write/WritePage";
import GroupDetailPage from "./pages/groupdetail/GroupDetailPage";
import DiaryPage from "./pages/diary/DiaryPage";
import GroupPage from "./pages/group/GroupPage";
import SurveyPage from "./pages/survey/SurveyPage";
import HomePage from "./pages/home/HomePage";
import MypagePage from "./pages/mypage/MypagePage";
import SignUpPage from "./pages/signup/SignUpPage";
import ViewDiariesPage from "./pages/view/ViewDiariesPage";
import SignUpInfoPage from "./pages/signup/SignUpInfoPage";
import StickerStorePage from "./pages/stickers/StickerStorePage";
import DecoratePage from "./pages/decorate/DecoratePage";
import ApproveInvitation from "./components/kakaoinvitation/applyInvitation";
// const {isLoggedIn} = useMember();
const router = createBrowserRouter([
  {
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/survey", element: <SurveyPage /> },
      { path: "/group", element: <GroupPage /> },
      { path: "/group/:id", element: <GroupDetailPage /> },
      { path: "/diary/:id", element: <DiaryPage /> },
      { path: "/write", element: <WritePage /> },
      { path: "/mypage", element: <MypagePage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/view/diary/:id", element: <ViewDiariesPage /> },
      { path: "/login/oauth2/code/kakao", element: <SignUpPage /> },
      { path: "/signup-info", element: <SignUpInfoPage /> },
      { path: "/stickers", element: <StickerStorePage /> },
      { path: "/decorate/:id", element: <DecoratePage /> },
      { path: "/group/approve/:id", element: <ApproveInvitation /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

reportWebVitals();
