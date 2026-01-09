import React from 'react';

const Pagination = ({ 
  currentPage, 
  hasNextPage, 
  loading, 
  onNext, 
  onPrevious 
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-10 mb-6">
      {/* Botão ANTERIOR */}
      <button
        onClick={onPrevious}
        disabled={currentPage === 1 || loading}
        className={`
          px-4 py-2 rounded-lg font-medium transition-colors
          ${currentPage === 1 || loading
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 shadow-sm'}
        `}
      >
        ← Anterior
      </button>

      {/* Indicador de Página */}
      <span className="text-gray-600 font-medium">
        Página {currentPage}
      </span>

      {/* Botão PRÓXIMO */}
      <button
        onClick={onNext}
        disabled={!hasNextPage || loading}
        className={`
          px-4 py-2 rounded-lg font-medium transition-colors
          ${!hasNextPage || loading
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 shadow-sm'}
        `}
      >
        Próxima →
      </button>
    </div>
  );
};

export default Pagination;