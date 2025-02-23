import { useState } from 'react';

const Search = ({ query, setQuery }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Replace with your Google API key
  const apiKey = 'AIzaSyAiy441qDhqcWAa_Epin3WgF4IMHgYBqZc'; 
  // Replace with your Custom Search Engine ID
  const searchEngineId = '759de39c7d4874c1e'; 

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${searchEngineId}`
      );
      const data = await response.json();
      if (data.items) {
        setResults(data.items); // Set the search results
      } else {
        setError('No results found');
      }
    } catch (err) {
      setError('Error fetching search results');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        id="searchInput"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search..."
      />
      <button onClick={handleSearch}style={{
        backgroundColor: '#6C63FF',  // Button background color
        color: 'white',               // Text color
        padding: '10px 20px',         // Padding around the text
        fontSize: '16px',             // Font size
        borderRadius: '8px',          // Rounded corners
        border: 'none',               // No border
        cursor: 'pointer',           // Pointer cursor on hover
        transition: 'background-color 0.3s ease', 
        marginLeft: '20px',
      }}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        {results.length > 0 && (
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <a href={result.link} target="_blank" rel="noopener noreferrer">
                  {result.title}
                </a>
                <p>{result.snippet}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;

