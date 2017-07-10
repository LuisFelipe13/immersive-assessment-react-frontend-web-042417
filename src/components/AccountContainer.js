import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'

const URL = 'https://boiling-brook-94902.herokuapp.com/transactions'
class AccountContainer extends Component {

  constructor() {
    super()

    this.state = {
      searchTerm: '',
      transactions: [],
      filteredTrans: []
    }
  }

  componentWillMount() {
    fetch(URL)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          searchTerm: '',
          transactions: data,
          filteredTrans: data
        })
      })
  }

  handleChange = event => this.setState({
    searchTerm: event.target.value,
    filteredTrans: this.state.transactions.filter(transaction => transaction.description.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  })

  render() {
    return (
      <div>
        <Search searchTerm={this.state.searchTerm} handleChange={this.handleChange} />
        <TransactionsList transactions={this.state.filteredTrans} searchTerm={this.state.searchTerm} />
      </div>
    )
  }
}

export default AccountContainer
