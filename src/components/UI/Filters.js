import React from 'react';

const Filters = ({ filters, setFilters }) => {
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <h2 className="font-semibold mb-2">Filtres :</h2>
      <div className="grid gap-2">
        {Object.keys(filters).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium">{key}</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded"
              value={filters[key]}
              onChange={(e) => handleFilterChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
