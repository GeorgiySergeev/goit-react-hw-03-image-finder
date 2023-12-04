import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { SearchBar } from 'components/Searchbar/Searchbar';

export class App extends Component {
  state = {
    query: '',
  };

  handleQueryChange = newQuery => {
    this.setState({ query: newQuery });
  };

  render() {
    return (
      <Container>
        <SearchBar onSubmit={this.handleQueryChange}></SearchBar>
        <ImageGallery query={this.state.query}></ImageGallery>
        <ToastContainer autoClose={2000} />
      </Container>
    );
  }
}
