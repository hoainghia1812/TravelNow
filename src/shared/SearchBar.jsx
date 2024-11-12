import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const response = await fetch(
          `https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour/search?query=${encodeURIComponent(query)}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          setResults(data);
          setNoResults(false);
        } else {
          setResults([]);
          setNoResults(true);
        }
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        setNoResults(true);
      }
    }
  };

  return (
    <div>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Nhập tour bạn cần tìm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          <FaSearch />
        </button>
      </div>

      {/* Hiển thị kết quả tìm kiếm */}
      <div style={styles.resultsContainer}>
        {results.length > 0 ? (
          results.map((tour, index) => (
            <div key={index} style={styles.resultItem}>
              <h3>{tour.tenTour}</h3>
              <p>Giá: {tour.gia} VND</p>
              <p>Ngày đi: {tour.ngayDi}</p>
              <p>Ngày về: {tour.ngayVe}</p>
            </div>
          ))
        ) : (
          noResults && <p>Công ty chúng tôi chưa có tour đó.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '30px',
    padding: '8px 15px',
    width: '350px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    padding: '8px 12px',
    fontSize: '16px',
    borderRadius: '30px',
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#faa935',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    color: '#fff',
    borderRadius: '50%',
    padding: '8px',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  resultsContainer: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  resultItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
};

export default SearchBar;
