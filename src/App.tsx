import './App.css'
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import Login from './components/login/login';
import Home from './components/home/home';
import { useEffect, useState } from 'react';
// https://medium.com/@ozhanli/passing-data-from-child-to-parent-components-in-react-e347ea60b1bb
// https://dvmhn07.medium.com/passing-data-between-parent-and-child-components-in-react-part-b405116c470e

function App() {

  const [dataFromLogin, setDataFromLogin] = useState({token: "", personID: "", office: [] });

  useEffect(() => {
    //console.log("Data in App", dataFromLogin);
  }, [dataFromLogin]);

  function handleDataFromLogin(data: { token: string; personID: string; office: never[]; }) {
    setDataFromLogin(data);
  }

  const router = createBrowserRouter([
    {
      path: "/*",
      element: <Login sendDataToApp={handleDataFromLogin}/>,
    },
    {
      path: "/Home",
      element: <Home dataFromLogin={dataFromLogin} />,
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />     
    </>
  )
}

export default App

