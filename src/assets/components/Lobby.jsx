import { useState, useEffect } from "react";
import Dogcard from "./landing/Dogcard";
import { getDogs as dogData } from "../../auth";
import Dogsskeleton from "./Dogsskeleton";

const Lobby = () => {
  // Filter categories
  const filters = ["ALL", "STUDS", "BITCHES", "PUPPIES", "UPCOMING"];

  // State for selected filter
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Dogs data, loading & error state
  const [dogs, setDogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const CACHE_KEY = "dogs_ALL";
  const CACHE_TIME_MS = 1000 * 60 * 60 * 1;

  // Fetch initial list of dogs (defaults to ALL)
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        console.log("Cached dogs:", cached);
        
        if (cached) {
          const parsed = JSON.parse(cached);
          const now = Date.now();

          // If cache is fresh, use it
          if (now - parsed.timestamp < CACHE_TIME_MS) {
            setDogs(parsed.data);
            setLoading(false);
            return;
          }
        }

        // Fetch fresh data if cache is invalid or missing
        const response = await dogData("ALL");
        const fetchedDogs = response.data.dog;

        setDogs(fetchedDogs);
        console.log("Fetched dogs:", fetchedDogs);

        // Cache the fetched data
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            timestamp: Date.now(),
            data: fetchedDogs,
          })
        );
      } catch (err) {
        console.error("Failed to fetch dogs:", err);
        setError("Failed to fetch dogs.");
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

    const cacheKey = `dogs_${filter}`;

    try {
      const cached = localStorage.getItem(cacheKey);
      const now = Date.now();

      if (cached) {
        // Use cached data
        const parsed = JSON.parse(cached);
        if (now - parsed.timestamp < CACHE_TIME_MS) {
          setDogs(parsed.data);
          setLoading(false);
          setError("");
          return;
        }
      }

      // Fetch new data if no valid cache or cache expired
      const response = await dogData(filter);
      const fetchedDogs = response.data.dog;
      setDogs(fetchedDogs);
      setError("");

      // Save to cache
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          timestamp: Date.now(),
          data: fetchedDogs,
        })
      );
    } catch (err) {
      const errMsg = err?.response?.data?.error || "Failed to fetch dogs";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // No results component
  const NoResults = () => (
    <div className="text-white font-bold text-3xl">
      No dogs available for this filter
    </div>
  );

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
            <NoResults />
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
        isSelected ? "bg-[#FFAC38] text-white" : "border-2 border-[#FFAC38]"
      }`}
    >
      {text}
    </button>
  );
};

export default Lobby;
