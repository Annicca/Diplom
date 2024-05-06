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
import { MyStatements } from './pages/MyStatements/MyStatements';
import { myStatementsLoader } from './pages/MyStatements/loader';
import { myGroupsLoader } from './pages/MyGroups/loader';
import { MyGroups } from './pages/MyGroups/MyGroups';
import { MyCompetitions } from './pages/MyCompetitions/MyCompetitions';
import { myCompetitionsLoader } from './pages/MyCompetitions/loader';
import { Statements } from './pages/Statements/Statements';
import { statementsLoader } from './pages/Statements/loader';
import { Users } from './pages/Users/Users';
import { usersLoader } from './pages/Users/loader';


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
      },

      {
        path: 'mystatements/:idUser',
        element: <MyStatements />,
        loader: ({params}) => myStatementsLoader(queryClient, params.idUser)
      },
      {
        path: 'mygroups/:id',
        element: <MyGroups url = 'mygroups' />,
        loader: ({params}) => myGroupsLoader(queryClient, 'mygroups', params.id)
      },
      {
        path: 'mygroups/competitions/:id',
        element: <MyCompetitions url ='mygroups/competitions' />,
        loader: ({params}) => myCompetitionsLoader(queryClient, 'mygroups/competitions', params.id)
      },
      {
        path: 'mycompetitions/:id',
        element: <MyCompetitions url = 'mycompetitions' />,
        loader: ({params}) => myCompetitionsLoader(queryClient,'mycompetitions', params.id)
      },
      {
        path: 'mycompetitions/participants/:id',
        element: <MyGroups url = 'mycompetitions/participants' />,
        loader: ({params}) => myGroupsLoader(queryClient, 'mycompetitions/participants', params.id)
      },
      {
        path: 'admin/statements',
        element: <Statements />,
        loader: statementsLoader(queryClient)
      },
      {
        path: 'admin/competitions',
        element: <MyCompetitions url = 'competitions/all' />,
        loader: myCompetitionsLoader(queryClient,'competitions/all')
      },
      {
        path: 'admin/groups',
        element: <MyGroups url = 'groups' />,
        loader: myGroupsLoader(queryClient, 'groups')
      },
      {
        path: 'admin/users',
        element: <Users />,
        loader: usersLoader(queryClient)
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
