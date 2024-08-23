import LoginForm from './LoginForm';
import ChangePassword from "./ChangePassword";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeAdmin from './HomeAdmin';
import CreateHR from './CreateHR';
import { useEffect } from 'react';
import VisualizeAllHR from './VisualizeAllHR';



function App() {

  useEffect(() => {
    document.title = "HR-Scheduler";
  }, [])


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/cambia-password' element={<ChangePassword />} />
          <Route path='/home-admin' element={<HomeAdmin />} />
          <Route path='/crea-HR' element={<CreateHR />} />
          <Route path='/visualizza-HR-managers' element={<VisualizeAllHR />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
