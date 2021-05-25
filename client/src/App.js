import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Teacher from './Screen/Teacher';
import Student from './Screen/Student';
import Admin from './Screen/Admin';
import AboutUs from './pages/AboutUs';


function App() {
  return (
    <Router>
      <Route exact path="/" component={Home}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
      <Route path="/teacher" component={Teacher}/>
      <Route path="/student" component={Student}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/about" component={AboutUs}/>
    </Router>
  );
}

export default App;
