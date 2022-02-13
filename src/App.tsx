import { ChangeEvent, useState, useEffect } from 'react'
import './App.css'
import { Pokedex } from './pages/Pokedex'
import { PokemonSearch } from './pages/PokemonSearch'
import { BrowserRouter, Router, Route, Link, Switch } from 'react-router-dom'
import Navigation from './components/Navigation'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Navigation/>
        <header className="App-header">
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/pokedex">
              <Pokedex />
            </Route>
            <Route exact path="/search">
              <PokemonSearch />
            </Route>
            <Route path="/:pokemon">{/* <PokemonCard /> */}</Route>
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  )
}

export default App
