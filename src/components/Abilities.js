import React, { Component } from 'react';

export default class Abilities extends Component {

  /*
    When calling <Abilities abilityList={this.state.selectedPokemon.abilities} />, 
    make sure you are only calling it if that array exists.
    Example:
    {this.state.selectedPokemon.abilities && 
      <Abilities abilityList={this.state.selectedPokemon.abilities} />
    }
  */

  render() {
    let abilities = this.props.abilityList.map(
      (ability, index) => {
        return(
          <div key={index}>{ability.ability.name}</div>
        )
      }
    )
    
    return(
      <div>{abilities}</div>
    )
  }

}