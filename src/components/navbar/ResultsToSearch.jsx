import React from 'react';

const ResultsToSearch = (props) => {
  const results = props.location.state?.results || [];

  return (
    <div>
      <h2>Resultados de la búsqueda:</h2>
      <ul>
        {results.map((service) => (
          <li key={service.id}>
            {service.description} - {service.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsToSearch;
