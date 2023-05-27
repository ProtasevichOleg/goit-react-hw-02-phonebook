// App.jsx

import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Layout from './Layout';
import { MainTitle, SubTitle } from './Titles';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSearchInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  valueExists = (key, value) => {
    const { contacts } = this.state;

    if (key === 'name') {
      const normalizedValue = value.toLowerCase();
      return contacts.find(
        contact => contact[key].toLowerCase() === normalizedValue
      );
    }

    return contacts.find(contact => contact[key] === value);
  };

  handleAddContact = (name, number) => {
    const { valueExists } = this;

    if (valueExists('name', name)) {
      alert(`${name} is already in contacts.`);
      return false;
    }

    if (valueExists('number', number)) {
      alert(`Number ${number} is already in use.`);
      return false;
    }

    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));

    return true;
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  handleDelete = contactToRemoveId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(
        currentContact => currentContact.id !== contactToRemoveId
      ),
    }));
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    const { filter } = this.state;

    return (
      <Layout>
        <MainTitle title="Phonebook" />
        <ContactForm onSubmit={this.handleAddContact} />
        <SubTitle title="Contacts" />
        <Filter value={filter} onChange={this.handleSearchInputChange} />
        <ContactList contacts={filteredContacts} onDelete={this.handleDelete} />
      </Layout>
    );
  }
}

export default App;
