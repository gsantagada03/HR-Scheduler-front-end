import LoginForm from './LoginForm';
import ChangePassword from "./ChangePassword";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeAdmin from './HomeAdmin';
import CreateHR from './CreateHR';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/home-admin' element={<HomeAdmin/>} />
          <Route path='/create-HR' element={<CreateHR/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
