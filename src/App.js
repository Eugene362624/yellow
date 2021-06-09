import Login from './components/pages/LoginPage/Login';
import Header from './components/parts/Header/Header'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import Main from './components/pages/MainPage/Main';
import Info from './components/pages/InfoPage/Info';
import { useState } from 'react';

function App() {
  const [filterBar, setFilterBar] = useState(false)
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  let token = localStorage.getItem('token')
  return (
    <Router>
    <div className="App">
      <Header onBurgerClick={() => setMenuIsOpen(!menuIsOpen)} menuIsOpen={menuIsOpen} filterBar={filterBar} onFilterSet={() => setFilterBar(!filterBar)}/>
      <Switch>
        <Route path={"/login"} component={Login}></Route>
        <Route path="/" exact>{!token ? <Redirect to="/login"></Redirect> : <Main filterBar={filterBar} onBurgerClick={() => setMenuIsOpen(!menuIsOpen)} menuIsOpen={menuIsOpen}></Main>}</Route>
        <Route path="/info"><Info menuIsOpen={menuIsOpen} onBurgerClick={() => setMenuIsOpen(!menuIsOpen)}></Info></Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
