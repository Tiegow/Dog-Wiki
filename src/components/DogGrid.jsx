import DogCard from './DogCard';

const DogGrid = ({ dogs, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-white h-64 rounded-xl shadow-sm animate-pulse p-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!loading && dogs.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        Nenhum doguinho encontrado.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dogs.map((breed) => (
        <DogCard key={breed.id} breed={breed} />
      ))}
    </div>
  );
};

export default DogGrid;