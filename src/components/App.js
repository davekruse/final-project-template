import React, { Component } from 'react';
import '../stylesheets/App.scss';
import {Loading} from './Loading';
import { Container, Row, Col } from 'react-bootstrap';
import Abilities from './Abilities';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pokemonData: [],
      nextUrl: null,
      previousUrl: null,
      selectedPokemon: {},
      dummyButtonClickCount: 0,
    }
  }

  componentDidMount() {
    // setTimeout(callback, milliseconds) - just so you can see the loading animation ;)
    setTimeout(() => {this.getData('https://pokeapi.co/api/v2/pokemon')}, 100);    
  }

  getData(url) {
    fetch(url) 
    .then(response => response.json())
    .then(data => {
      this.setState({
        pokemonData: data.results,
        loading: false,
        nextUrl: data.next,
        previousUrl: data.previous
      })
    })
  }

  getPokemonDetails(url) {
    fetch(url) 
    .then(response => response.json())
    .then(data => {
      this.setState({
        selectedPokemon: data
      })
    })
  }

  handleNextClick = () => {
    this.getData(this.state.nextUrl);
  }

  handlePreviousClick = () => {
    this.getData(this.state.previousUrl);
  }

  handlePokemonClick = (url) => {
    this.getPokemonDetails(url);
  }

  render() {

    // Loop over the list of pokemon 
    // to create an array of components.
    // Below in return(), we render the list by inserting {pokemonComponentList}
    let pokemonComponentList = this.state.pokemonData.map(
      (pokemon, index) => { 
        return(
          <div
            key={index}
            onClick={() => this.handlePokemonClick(pokemon.url) }
            // we're using an anonymous function to pass a parameter to a callback function
          >
            {pokemon.name}
          </div>
        )
      }
    )


    return (
      <div className="app">
        <Container>
          <Row>
            <Col>Column 1</Col>
            <Col>Column 2</Col>
          </Row>
        </Container>
        <button onClick={this.handlePreviousClick}>Previous</button>
        <button onClick={this.handleNextClick}>Next</button>
        <Loading visible={this.state.loading} />

        <div className="pokemon-list">
          {pokemonComponentList}
        </div>

        {/* this would be a good chunk to turn into a component */}
        <div className="selected-pokemon">
          <div className="name">{this.state.selectedPokemon.name}</div>
          {/* add some details */}
          <div>{this.state.selectedPokemon.weight}</div>

          {this.state.selectedPokemon.abilities && 
            <Abilities abilityList={this.state.selectedPokemon.abilities} />
          }
          
        </div>
      </div>
    )
  }
}

export default App;