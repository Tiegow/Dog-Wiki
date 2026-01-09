import { Search } from 'lucide-react';

const SearchBar = ({ 
  value,       
  onChange,    
  onSearch,    
  onClear,     
  isSearching  
}) => {
  return (
    <div className="max-w-2xl mx-auto mb-8 flex gap-2">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          placeholder="Digite uma raça (ex: Akita)"
          value={value}
          onChange={onChange}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
      </div>

      {/* Botão de Ação */}
      {!isSearching ? (
        <button 
          onClick={onSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors shadow-md"
        >
          Buscar
        </button>
      ) : (
        <button 
          onClick={onClear}
          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-6 py-2 rounded-xl font-medium transition-colors"
        >
          Limpar
        </button>
      )}
    </div>
  );
};

export default SearchBar;