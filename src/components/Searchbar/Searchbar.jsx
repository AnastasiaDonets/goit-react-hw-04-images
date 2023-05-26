import { FaSearch } from 'react-icons/fa';
import { Component } from 'react';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormbutton,
  SearchForminput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.props.onSubmit}>
          <SearchFormbutton type="submit">
            <FaSearch style={{ width: 16, height: 16 }} />
          </SearchFormbutton>

          <SearchForminput
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}
