import './App.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout } from './components/layout/Layout';
import { Competitions} from './pages/Competitions/Competitions';
import { competitionsLoader } from './pages/Competitions/loader';
import { CompetitionDetail } from './pages/CompetitionDetail/CompetitionDetail';
import { competitionDetailLoader } from './pages/CompetitionDetail/loader';
import { SearchContextProvider } from './context/search-context/SearchContextProvider';
import { Groups } from './pages/Groups/Groups';
import { groupsLoader } from './pages/Groups/loader';
import { groupLoader } from './pages/GroupDetail/loader';
import { GroupDetail } from './pages/GroupDetail/GroupDetail';
import { Account } from './pages/Account/Account';
import { Login } from './components/auth/Login';
import { UserProvider } from './context/user-context/UserProvider';
import { Register } from './components/auth/Register';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        index: true,
        element: <Competitions />,
        loader: competitionsLoader(queryClient),
      },
      {
        path: "competitions/:id",
        element: <CompetitionDetail />,
        loader: ({params}) => competitionDetailLoader(queryClient, params.id),
      },
      {
        path: "groups",
        element: <Groups />,
        loader: groupsLoader(queryClient),
      },
      {
        path: "groups/:id",
        element: <GroupDetail />,
        loader: ({params}) => groupLoader(queryClient, params.id),
      },
      {
        path: 'account',
        element: <Account />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signin',
    element: <Register />
  }
]);

function App() {

  return (
    <UserProvider>
      <SearchContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SearchContextProvider>
    </UserProvider>
  )
}

export default App
