import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar({ setLocationHandler }) {
    const [query, setQuery] = useState('');
    
    function onFormSubmit(e) {
        e.preventDefault();
        setLocationHandler(query);
    }

  return (
    <form className="searchbar">
      <input
        type="text"
        name="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Zoek een stad in Nederland"
      />

      <button
          type="submit"
          onClick={onFormSubmit}
      >
        Zoek
      </button>
    </form>
  );
}

export default SearchBar;
