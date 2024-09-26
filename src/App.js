import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/AdminLogin/Login';
import DashBoard from './components/DashBoard/Dashboard';
import AddDataForm from './components/DashBoard/AddDataForm';
import DashboardAnalytics from './components/DashBoard/DashboardAnalytics';
import DashboardTeam from './components/DashBoard/DashboardTeam';

export const token = localStorage.getItem('token');
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Login}></Route>
        <Route path='/dashboard' Component={token ? DashBoard : Login}></Route>
        <Route path='/dashboard/add' Component={token ? AddDataForm: Login}></Route>
        <Route path='/dashboard/analytics' Component={token ? DashboardAnalytics : Login}></Route>
        <Route path='/dashboard/team' Component={token ? DashboardTeam : Login}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
