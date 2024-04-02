import './App.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { Layout } from './components/layout/Layout';
import { Competitions, loader as competitionLoader } from './pages/Competitions';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './utils/queryClient';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        index: true,
        element: <Competitions />,
        loader: competitionLoader(queryClient)
      },
      {
        path: "groups",
        element: <div>Groups</div>
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
