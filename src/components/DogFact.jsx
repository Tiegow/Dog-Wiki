import { useEffect, useState } from "react";
import axios from 'axios';
import { Sparkles, Heart, RotateCw } from 'lucide-react'; 

function DogFact() {
    const [fact, setFact] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchFact = async () => {
        setIsUpdating(true); 
        setIsVisible(false); 
        
        try {
            const response = await axios.get('https://dogapi.dog/api/v2/facts?limit=1');
            
            setTimeout(() => {
                setFact(response.data.data[0].attributes.body);
                setIsVisible(true);  
                setIsUpdating(false); 
            }, 300);
            
        } catch (err) {
            console.error(err);
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        fetchFact();
    }, []); 

    if (!fact && !isUpdating) return <div className="h-10"></div>;

    return (
        <div className="flex justify-center items-center py-16 px-4">
            <div 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={fetchFact}
                
                className={`
                    flex items-center gap-3 max-w-2xl text-center cursor-pointer select-none
                    transition-all duration-500 ease-out group
                `}
            >
                {/* Ícone */}
                <div className={`
                    transition-all duration-300 transform 
                    ${isUpdating ? 'rotate-180 scale-110' : 'group-hover:scale-110'}
                `}>
                    {isUpdating ? (
                        <RotateCw className="text-blue-500 w-5 h-5 animate-spin" />
                    ) : isHovered ? (
                        <RotateCw className="text-blue-500 w-5 h-5" /> 
                    ) : (
                        <Sparkles className="text-blue-400 w-5 h-5" />
                    )}
                </div>
                
                {/* Texto */}
                <p className={`
                    text-gray-600 font-medium text-lg leading-relaxed transition-opacity duration-300
                    ${isVisible ? 'opacity-100' : 'opacity-0'}
                `}>
                    {fact}
                </p>
            </div>
            
            {isHovered && !isUpdating && (
               <span className="absolute mt-20 text-xs text-gray-400 font-light animate-fade-in">
                   Clique para ver outro fato
               </span>
            )}
        </div>
    );
}

export default DogFact;