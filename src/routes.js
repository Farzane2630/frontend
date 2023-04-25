import Index from "./Pages/Index/Index";
import CoursesInfo from "./Pages/CoursesInfo/CoursesInfo";
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo";
import Category from "./Pages/Category/Category";
import Courses from "./Pages/Courses/Courses";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import RecentArticles from "./RecentArticles/RecentArticles";
import Articles from "./Pages/Articles/Articles";
import Contact from "./Pages/Contact/Contact";
import SearchRsult from "./Pages/SearchResult/SearchRsult";

import AdminPanel from "./Pages/AdminPanel/Index/AdminPanel";
import Users from "./Pages/AdminPanel/Users/Users";
import AdminArticles from "./Pages/AdminPanel/AdminArticles/AdminArticles";
import AdminCourses from "./Pages/AdminPanel/AdminCourses/AdminCourses";
import AdminMenu from "./Pages/AdminPanel/AdminMenu/AdminMenu";
import AdminCategory from "./Pages/AdminPanel/AdminCategory/AdminCategory";
import AdminContact from "./Pages/AdminPanel/AdminContact/AdminContact";
import Sessions from "./Pages/AdminPanel/Sessions/Sessions";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/courses/:page", element: <Courses /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/course-info/:courseName", element: <CoursesInfo /> },
  { path: "/category-info/:categoryName/:page", element: <Category /> },
  { path: "/article-info/:shortName", element: <ArticleInfo /> },
  { path: "/article-info", element: <RecentArticles /> },
  { path: "/articles/:page", element: <Articles /> },
  { path: "/contact", element: <Contact /> },
  { path: "/search/:value", element: <SearchRsult /> },

  {
    path: "/panel-admin/*",
    element: <AdminPanel />,
    children: [
      { path: "courses", element: <AdminCourses /> },
      { path: "sessions", element: <Sessions /> },
      { path: "articles", element: <AdminArticles /> },
      { path: "users", element: <Users /> },
      { path: "category", element: <AdminCategory /> },
      { path: "contacts", element: <AdminContact /> },
    ],
  },
];

export default routes;
