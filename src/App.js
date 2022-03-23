
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';


import './App.css';
import Dashboard from './views/Dashboard';
import Create from './views/CreateAuthor';
import EditAuthor from './views/EditAuthor';
function App() {
  return (
    <div>
      <BrowserRouter>
          <h1 className='text-center'>Favorite Authors</h1>
          <div className='d-flex justify-content-center'>
            <Link to="/" className='btn btn-primary'>Home</Link>
            <Link to="/new" className='btn btn-success'>Add an Author</Link>
          </div>
        <Switch>
          <Route exact path ="/">
            <Dashboard />
          </Route>
          <Route exact path ="/new">
            <Create />
          </Route>
          <Route exact path="/edit/:id">
            <EditAuthor />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
