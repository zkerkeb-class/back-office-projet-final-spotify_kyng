'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import Autosuggest from 'react-autosuggest';
import SearchHistory from '../../components/UI/SearchHistory';
import Filters from '../../components/UI/Filters';
import SortOptions from '../../components/UI/SortOptions';
import SearchResults from '../../components/UI/SearchResults';

// Données simulées (fake data)
export const fakeData = [
  { id: 1, title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', genre: 'Pop', year: 2017, duration: 233, popularity: 100, playlist: 'Top Hits' },
  { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', genre: 'Pop', year: 2019, duration: 200, popularity: 100, playlist: 'Top Hits' },
  { id: 3, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', genre: 'Pop', year: 2020, duration: 203, popularity: 95, playlist: 'Pop Essentials' },
  { id: 4, title: 'Rolling in the Deep', artist: 'Adele', album: '21', genre: 'Pop', year: 2011, duration: 228, popularity: 95, playlist: 'Pop Classics' },
  { id: 5, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', album: 'Uptown Special', genre: 'Funk', year: 2014, duration: 269, popularity: 98, playlist: 'Funk Classics' },
  { id: 6, title: 'Bad Guy', artist: 'Billie Eilish', album: 'When We All Fall Asleep, Where Do We Go?', genre: 'Pop', year: 2019, duration: 194, popularity: 100, playlist: 'Top Hits' },
  { id: 7, title: 'Someone Like You', artist: 'Adele', album: '21', genre: 'Pop', year: 2011, duration: 285, popularity: 96, playlist: 'Sad Songs' },
  { id: 8, title: 'Happier', artist: 'Marshmello ft. Bastille', album: 'Joytime III', genre: 'EDM', year: 2018, duration: 216, popularity: 90, playlist: 'EDM Essentials' },
  { id: 9, title: 'Faded', artist: 'Alan Walker', album: 'Faded', genre: 'Electronic', year: 2015, duration: 201, popularity: 97, playlist: 'Electronic Beats' },
  { id: 10, title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', genre: 'Pop', year: 2019, duration: 174, popularity: 92, playlist: 'Summer Vibes' },
  { id: 11, title: 'Sunflower', artist: 'Post Malone ft. Swae Lee', album: 'Spider-Man: Into the Spider-Verse Soundtrack', genre: 'Hip-Hop', year: 2018, duration: 158, popularity: 94, playlist: 'Hip-Hop Hits' },
  { id: 12, title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', genre: 'Pop Punk', year: 2021, duration: 202, popularity: 99, playlist: 'Pop Punk Essentials' },
];

const SearchAndFilterPage = () => {
  const [query, setQuery] = useState(''); // État pour la valeur de la recherche
  const [suggestions, setSuggestions] = useState([]); // État pour les suggestions d'autocomplétion
  const [searchHistory, setSearchHistory] = useState([]); // Historique des recherches
  const [filters, setFilters] = useState({ artist: '', album: '', genre: '', year: '', duration: '', popularity: '', playlist: '' }); // Filtres de recherche
  const [sortOptions, setSortOptions] = useState({ field: '', order: '' }); // Options de tri
  const [searchResults, setSearchResults] = useState(fakeData); // Résultats de recherche filtrés
  const [isLoading, setIsLoading] = useState(false); // État pour savoir si la recherche est en cours

  // Fonction pour gérer l'ajout des recherches dans l'historique
  const handleSearchHistory = (query) => {
    if (query && !searchHistory.includes(query)) {
      setSearchHistory((prevHistory) => [query, ...prevHistory].slice(0, 10)); // Limite l'historique à 10 éléments
    }
  };

  // Fonction de recherche qui s'exécute avec un délai pour limiter les appels fréquents
  const handleSearch = useCallback(
    debounce((query) => {
      setIsLoading(true); // Indique que la recherche est en cours

      // Filtrage initial des données en fonction du texte de recherche
      let results = fakeData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.artist.toLowerCase().includes(query.toLowerCase()) ||
          item.album.toLowerCase().includes(query.toLowerCase())
      );

      // Applique les filtres supplémentaires sur les résultats
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          results = results.filter((item) => item[key]?.toString().toLowerCase().includes(value.toLowerCase()));
        }
      });

      // Applique le tri sur les résultats (si spécifié)
      if (sortOptions.field) {
        results.sort((a, b) => {
          if (sortOptions.order === 'asc') {
            return a[sortOptions.field] > b[sortOptions.field] ? 1 : -1;
          }
          return a[sortOptions.field] < b[sortOptions.field] ? 1 : -1;
        });
      }

      // Met à jour les résultats et termine le chargement
      setSearchResults(results);
      setIsLoading(false);
      handleSearchHistory(query); // Ajoute la recherche à l'historique
    }, 300), // 300ms de délai pour limiter la fréquence des recherches
    [filters, sortOptions] // Recalcule la recherche quand les filtres ou les options de tri changent
  );

  useEffect(() => {
    handleSearch(query); // Lance la recherche dès que la requête ou les filtres changent
  }, [query, filters, sortOptions]);

  // Met à jour les suggestions à chaque modification du texte de recherche
  useEffect(() => {
    const filteredSuggestions = fakeData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.artist.toLowerCase().includes(query.toLowerCase()) ||
        item.album.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  }, [query]);

  // Fonction pour obtenir la valeur d'une suggestion (le titre de la chanson)
  const getSuggestionValue = (suggestion) => suggestion.title;

  // Fonction pour rendre l'affichage d'une suggestion (titre + artiste)
  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.title} - {suggestion.artist}
    </div>
  );

  // Propriétés pour le champ de saisie de l'autocomplétion
  const inputProps = {
    placeholder: 'Rechercher...',
    value: query,
    onChange: (_, { newValue }) => setQuery(newValue), // Mise à jour de la requête quand l'utilisateur tape
    className: 'p-2 border rounded w-full mb-4',
  };

  // Thème personnalisé pour l'autocomplétion
  const theme = {
    container: 'relative', // Conteneur principal de l'autocomplétion
    input: 'p-2 border rounded w-full', // Champ de saisie
    suggestionsContainer: 'absolute z-10 w-full bg-white shadow-md border border-gray-300', // Conteneur des suggestions
    suggestionsList: 'list-none p-0 m-0', // Liste des suggestions
    suggestion: 'px-4 py-2 cursor-pointer hover:bg-gray-100', // Élément individuel de suggestion
    suggestionHighlighted: 'bg-gray-200', // Élément survolé ou sélectionné
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Rechercher et Filtrer</h1>

      {/* Composant d'autocomplétion */}
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={({ value }) => setQuery(value)} // Mise à jour de la recherche lorsqu'une suggestion est demandée
        onSuggestionsClearRequested={() => setSuggestions([])} // Efface les suggestions lorsque la recherche est réinitialisée
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={theme} // Application du thème personnalisé
      />

      {/* Affichage de l'historique des recherches */}
      <SearchHistory history={searchHistory} setQuery={setQuery} />

      {/* Composants pour les filtres et les options de tri */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Filters filters={filters} setFilters={setFilters} />
        <SortOptions sortOptions={sortOptions} setSortOptions={setSortOptions} />
      </div>

      {/* Affichage des résultats ou du message de chargement */}
      {isLoading ? (
        <div className="text-center">Loading...</div> // Affichage du message "Loading" pendant que la recherche est en cours
      ) : (
        <SearchResults results={searchResults} /> // Affichage des résultats une fois la recherche terminée
      )}
    </div>
  );
};

export default SearchAndFilterPage;