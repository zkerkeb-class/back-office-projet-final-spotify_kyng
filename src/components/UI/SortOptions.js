import React from 'react';

const SortOptions = ({ sortOptions, setSortOptions }) => {
  const handleSortChange = (field, order) => {
    setSortOptions({ field, order });
  };

  return (
    <div>
      <h2 className="font-semibold mb-2">Options :</h2>
      <div className="grid gap-2">
        <select
          className="w-full border border-gray-300 rounded"
          value={sortOptions.field}
          onChange={(e) => handleSortChange(e.target.value, sortOptions.order)}
        >
          <option value="">-- Choisir une option --</option>
          <option value="title">Titre</option>
          <option value="artist">Artiste</option>
          <option value="year">Année</option>
          <option value="duration">Durée</option>
          <option value="popularity">Populaire</option>
        </select>
        <select
          className="w-full border border-gray-300 rounded"
          value={sortOptions.order}
          onChange={(e) => handleSortChange(sortOptions.field, e.target.value)}
        >
          <option value="">-- Choisir une option --</option>
          <option value="asc">Ordre croissant</option>
          <option value="desc">Ordre décroissant</option>
        </select>
      </div>
    </div>
  );
};

export default SortOptions;
