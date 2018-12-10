import React from 'react';
import personService from './services/persons'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return(
    <div className="error">
      {message}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      error: ''
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({persons})
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    console.log('nappia painettu')

    const personObject ={
      name: this.state.newName,
      number: this.state.newNumber
    }

    if(!this.state.persons.map(names => names.name).includes(personObject.name)) {
      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: '',
            error: `Lisättiin ${personObject.name}`
          })
          setTimeout(() => {
            this.setState({error: null})
          }, 5000)
        })
      }
    }

    removePerson = (event) => {
      const personId = event.target.getAttribute("id")
      const personName = event.target.getAttribute("name")
      console.log(personId)
      if(window.confirm(`Poistetaanko ${personName}`)) {
        personService
          .remove(personId)
          .then(removedPerson => {
            this.setState({
              persons: this.state.persons.filter(p => p.id.toString() !== personId),
              error: `Poistettiin ${personName}`
            })
            setTimeout(() => {
              this.setState({error: null})
            }, 5000)
          })
      }
    }
  

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.error}/>
        <form onSubmit={this.addPerson}>
          <div>
            Nimi: <input 
            value={this.state.newName}
            onChange={this.handleNameChange}
            />
          </div>
          <div>
            Numero: <input
            value={this.state.newNumber}
            onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">Lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
          <div>
            {this.state.persons.map(person => <p key={person.name}>{person.name} {person.number} <button name={person.name} id={person.id} onClick={this.removePerson}>Poista</button></p>)}
          </div>
      </div>
    )
  }
}


export default App

