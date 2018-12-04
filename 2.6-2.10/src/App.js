import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
      ],
      newName: '',
      newNumber: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    console.log('nappia painettu')

    const personObject ={
      name: this.state.newName,
      number: this.state.newNumber
    }

    if(!this.state.persons.map(names => names.name).includes(personObject.name)) {
      const persons = this.state.persons.concat(personObject)
      this.setState({
        persons,
        newName: '',
        newNumber: ''
      }) 
    }
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input 
            value={this.state.newName}
            onChange={this.handleNameChange}
            />
          </div>
          <div>
            numero: <input
            value={this.state.newNumber}
            onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <div>
          {this.state.persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
      </div>
    )
  }
}

export default App
