import React, { PureComponent } from 'react';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { FiSearch } from 'react-icons/fi';

import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export class SearchBar extends PureComponent {
  state = {
    query: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      return toast('Please enter a valid search term');
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  handleChangeInput = e => {
    const newQuery = e.target.value;
    this.setState({ query: newQuery });
  };

  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton>
            <FiSearch>Search</FiSearch>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            name="search"
            value={this.state.query}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos..."
            onChange={this.handleChangeInput}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}
