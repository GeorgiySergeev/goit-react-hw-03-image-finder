import React, { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import { Container } from './App.styled';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { HeadTitle } from 'components/Title/Title';
import { Footer } from 'components/Footer/Footer';

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
        {!this.state.query && <HeadTitle>PIXABY IMAGE SEARCH</HeadTitle>}
        <ImageGallery query={this.state.query}></ImageGallery>
        <Footer></Footer>
        <ToastContainer autoClose={2000} />
      </Container>
    );
  }
}
