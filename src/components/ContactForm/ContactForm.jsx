// ContactForm.jsx

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Input, Span, SubmitButton } from './ContactForm.styled';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  resetState = () => this.setState({ name: '', number: '' });

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    if (this.props.onSubmit(name, number)) {
      this.resetState();
    }
  };

  render() {
    const { name, number } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Label>
          <Span>Name</Span>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
          />
        </Label>
        <Label>
          <Span>Number</Span>
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChange}
            required
          />
        </Label>
        <SubmitButton type="submit">Add contact</SubmitButton>
      </Form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
