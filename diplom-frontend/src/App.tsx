import './App.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { Layout } from './components/layout/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        index: true,
        element: <div>Competitions</div>
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
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
