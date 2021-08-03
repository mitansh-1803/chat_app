import './App.css';
import LoginPage from './components/login';
import Home from './components/home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


function App() {


  return (<>
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={LoginPage} />
      <Route path='/home' exact component={Home} />
    </Switch>   
  </BrowserRouter>
  </>);
}

export default App;
