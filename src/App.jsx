import { useState, useEffect } from 'react';
import axios from 'axios';

import DogGrid from './components/DogGrid';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import DogFact from './components/DogFact';

import { mapApiToBreed } from './models/BreedModel';

function App() {
  const [breeds, setBreeds] = useState([]);
  const [page, setPage] = useState(1); 
  const [hasNextPage, setHasNextPage] = useState(false);
  const pageSize = 6;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false); 

  useEffect(() => {
    if (isSearching) return;

    const fetchBreeds = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://dogapi.dog/api/v2/breeds?page[number]=${page}&page[size]=${pageSize}`);
        setBreeds(response.data.data.map(mapApiToBreed));
        setHasNextPage(!!response.data.links.next);
      } catch (err) {
        setError('Falha ao carregar os doguinhos. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, [page, isSearching]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setIsSearching(true); 
    setError(null);

    try {
      const response = await axios.get(`https://dogapi.dog/api/v2/breeds`);
      const todosOsCaes = response.data.data.map(mapApiToBreed);
      
      const filtrados = todosOsCaes.filter(breed => 
        breed.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setBreeds(filtrados);
    } catch (err) {
      setError('Erro ao buscar raça.');
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');     
    setIsSearching(false); 
    setPage(1);            
  };

  const handleNextPage = () => setPage(p => p + 1);
  const handlePrevPage = () => setPage(p => Math.max(p - 1, 1));

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
          Dog<span className="text-blue-600">Wiki</span>
        </h1>
        <p className="text-lg text-gray-500">
          Explore informações sobre raças caninas.
        </p>
      </div>

      <DogFact />

      <div className="max-w-7xl mx-auto">
        {/* Erro */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 text-center border border-red-200">
            {error}
          </div>
        )}

        {/* Componente SearchBar */}
        {!error && (
          <SearchBar 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearch={handleSearch}
            onClear={clearSearch}
            isSearching={isSearching}
          />
        )}

        {/* Componente DogGrid */}
        {!error && (
          <DogGrid dogs={breeds} loading={loading} />
        )}

        {/* Componente Pagination */}
        {!isSearching && !error && (
          <Pagination 
            currentPage={page}
            hasNextPage={hasNextPage}
            loading={loading}
            onNext={handleNextPage}
            onPrevious={handlePrevPage}
          />
        )}
      </div>
    </div>
  );
}

export default App;