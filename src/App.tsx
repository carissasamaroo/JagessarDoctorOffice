import './App.css'
import Login from './components/login/login';
import { useEffect, useState } from 'react';
import Home from './components/home/home';
import { DataFromLogin } from './interfaces';

// https://medium.com/@ozhanli/passing-data-from-child-to-parent-components-in-react-e347ea60b1bb
// https://dvmhn07.medium.com/passing-data-between-parent-and-child-components-in-react-part-b405116c470e

function App() {

  const [dataFromLogin, setDataFromLogin] = useState<DataFromLogin>();

  function handleDataFromLogin(data: DataFromLogin) {
    setDataFromLogin(data);
  }

  return (
    <>
    {dataFromLogin == undefined || dataFromLogin.token == "" ? 
      <Login sendDataToApp={handleDataFromLogin} /> : 
      <Home dataFromLogin={dataFromLogin}/>
    }
    </>
  )
}

export default App

