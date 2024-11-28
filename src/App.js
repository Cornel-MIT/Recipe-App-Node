import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import './App.css';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <AuthContext.Consumer>
              {({ user }) => user ? <Redirect to="/home" /> : <Login />}
            </AuthContext.Consumer>
          </Route>
          <Route path="/login">
            <AuthContext.Consumer>
              {({ user }) => user ? <Redirect to="/home" /> : <Login />}
            </AuthContext.Consumer>
          </Route>
          <Route path="/register">
            <AuthContext.Consumer>
              {({ user }) => user ? <Redirect to="/home" /> : <Register />}
            </AuthContext.Consumer>
          </Route>
          <PrivateRoute path="/home" component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;