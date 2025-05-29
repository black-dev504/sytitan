import { useState, useEffect } from 'react';
import Dogcard from './Dogcard';
import { dogs as getDogs } from '../../../auth';
import { useNavigate } from 'react-router-dom';
import Dogsskeleton from '../Dogsskeleton';

const Dogs = () => {
  const navigate = useNavigate();

  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // State to store the fetched dogs
  const [dogs, setDogs] = useState([]);

  // Fetch a limited number of dogs when the component mounts
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await getDogs(null, 6); // Fetch 6 dogs
        setDogs(response.data.dogs);             // Save them to state
      } catch (err) {
        console.error('Failed to fetch dogs:', err);
      } finally {
        setLoading(false);                        // Hide loading skeleton
      }
    };

    fetchDogs();
  }, []);

  return (
    <section className="bg-black flex flex-col items-center justify-center">
      {/* Section Heading */}
      <h1 className="text-5xl text-[#ECECEC] font-semibold text-center py-12">
        MEET THE BULLIES
      </h1>

      {/* Dog Cards Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 px-5 lg:px-10 pt-8">
        {loading ? (
          // Show skeleton loader while fetching data
          <Dogsskeleton />
        ) : (
          // Render Dogcard components once data is loaded
          dogs.map((dog, index) => (
            <Dogcard
              key={index}
              name={dog.name}
              age={dog.age}
              color={dog.color}
              images={dog.images}
              serial_no={dog.serial_no}
            />
          ))
        )}
      </div>

      {/* Navigation Button to View All Dogs */}
      <button
        onClick={() => navigate('/lobby')}
        className="px-9 py-6 mb-8 mt-8 max-w-[200px] cursor-pointer rounded-[40px] bg-primary text-white hover:border-1"
      >
        View more
      </button>
    </section>
  );
};

export default Dogs;
