import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import store from "./store/store";
import { Provider } from "react-redux";

import NotFoundPage from "./pages/notfound/NotFoundPage";
import WritePage from "./pages/write/WritePage";
import GroupDetailPage from "./pages/groupdetail/GroupDetailPage";
import GroupPage from "./pages/group/GroupPage";
import SurveyPage from "./pages/survey/SurveyPage";
import HomePage from "./pages/home/HomePage";
import MypagePage from "./pages/mypage/MypagePage";

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
      { path: "/write", element: <WritePage /> },
      { path: "/mypage", element: <MypagePage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

reportWebVitals();
