import './App.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout } from './components/layout/Layout';
import { Competitions} from './pages/Competitions/Competitions';
import { competitionLoader } from './pages/Competitions/loader';
import { SearchContextProvider } from './context/context';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        index: true,
        element: <Competitions />,
        loader: competitionLoader(queryClient),
      },
      {
        path: "competitions/:id",
        element: <></>,
        
      },
      {
        path: "groups",
        element: <div>Groups</div>,
      },
      {
        path: 'account',
        element: <div>Account</div>
      }
    ]
  },
  {
    path: '/login',
    element: <div>Login</div>
  },
  {
    path: '/registration',
    element: <div>Registration</div>
  }
]);

function App() {

  return (
    <SearchContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SearchContextProvider>
  )
}

export default App
