import { useState, useEffect } from 'react';
import Dogcard from './landing/Dogcard';
import { getDogs as dogData } from '../../auth';
import Dogsskeleton from './Dogsskeleton';

const Lobby = () => {
  // Filter categories
  const filters = ['ALL', 'STUDS', 'BITCHES', 'PUPPIES', 'UPCOMING'];

  // State for selected filter
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Dogs data, loading & error state
  const [dogs, setDogs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch initial list of dogs (defaults to ALL)
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await dogData('ALL');
        setDogs(response.data.dog);
      } catch (err) {
        console.error('Failed to fetch dogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  // Handle filter click
  const handleClick = async (filter) => {
    setActiveFilter(filter);
    setLoading(true);
    try {
      const response = await dogData(filter);
      setDogs(response.data.dog);
      setError('');
    } catch (err) {
      const errMsg = err?.response?.data?.error || 'Failed to fetch dogs';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      {/* Header background section */}
      <div className="relative h-96 w-full flex items-center justify-center overflow-hidden">
        <img
          src="/images/lobbypic.png"
          alt="Lobby background"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <h1 className="text-5xl relative text-[#ECECEC] font-semibold text-center py-12">
          MEET THE BULLIES
        </h1>
      </div>

      {/* Filter buttons */}
      <div className="px-5 lg:px-20 bg-[#252525] py-12">
        <div className="filters flex overflow-x-auto gap-6">
          {filters.map((filter, index) => (
            <FilterButton
              key={index}
              text={filter}
              onClick={() => handleClick(filter)}
              isSelected={filter === activeFilter}
            />
          ))}
        </div>
      </div>

      {/* Dogs grid */}
      <section className="bg-black justify-center flex flex-col items-center">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 px-5 lg:px-20 py-8">
          {loading ? (
            <Dogsskeleton />
          ) : dogs.length > 0 ? (
            dogs.map((dog, index) => (
              <Dogcard
                key={index}
                name={dog.name}
                age={dog.age}
                status={dog.status}
                images={dog.images}
                serial_no={dog.serial_no}
              />
            ))
          ) : error ? (
            <h1 className="text-red-500 text-lg">{error}</h1>
          ) : (
            <h1 className="text-white font-bold text-3xl">
              No dogs available for this filter
            </h1>
          )}
        </div>

    
      </section>
    </section>
  );
};

// Filter button component
const FilterButton = ({ text, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`py-5 px-9 cursor-pointer text-[#FFAC38] rounded-[40px] ${
        isSelected
          ? 'bg-[#FFAC38] text-white'
          : 'border-2 border-[#FFAC38]'
      }`}
    >
      {text}
    </button>
  );
};

export default Lobby;
