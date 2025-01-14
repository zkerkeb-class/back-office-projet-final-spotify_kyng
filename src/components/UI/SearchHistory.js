import React from 'react';

const SearchHistory = ({ history, setQuery }) => {
  return (
    <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded shadow-sm mt-5">
      <h2 className="font-semibold mb-3 text-lg text-gray-800">Historique des recherches :</h2>
      {history.length > 0 ? (
        <ul className="list-none space-y-2">
          {history.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer text-blue-600 hover:underline hover:text-blue-800 transition duration-200"
              onClick={() => setQuery(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Aucun historique disponible.</p>
      )}
    </div>
  );
};

export default SearchHistory;
