import { Dog } from 'lucide-react'; 

const DogCard = ({ breed }) => {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
            <div className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                    <Dog size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{breed.name}</h2>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                {breed.description}
                </p>

                {/* Tags */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-xs font-medium text-gray-600 rounded-full">
                        Exp. Vida: {breed.lifeSpanLabel}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-xs font-medium text-gray-600 rounded-full">
                        Peso: {breed.averageWeight} Kg
                    </span>
                    {breed.isHypoallergenic && (
                        <span className="px-3 py-1 bg-green-100 text-xs font-medium text-green-700 rounded-full">
                        Hipoalergênico
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DogCard;