import { useState, useEffect } from "react";
import Dogcard from "./landing/Dogcard";
import { getDogs as dogData } from "../../auth";
import Dogsskeleton from "./Dogsskeleton";
import Heading from './Heading';
import { version as dataVersion } from "../../auth";

const Lobby = () => {
  const filters = ["ALL", "STUDS", "BITCHES", "PUPPIES", "UPCOMING"];

  const [activeFilter, setActiveFilter] = useState("ALL");
  const [dogs, setDogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const CACHE_TIME_MS = 1000 * 60 * 60 * 24; // 24 hours
  const VERSION_KEY = "dataVersion";

  // Initial load for ALL filter
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const cacheKey = "dogs_ALL";
        const cached = localStorage.getItem(cacheKey);
        const versionCached = localStorage.getItem(VERSION_KEY);
        const currentVersion = await dataVersion();

        if (cached) {
          const parsed = JSON.parse(cached);
          const now = Date.now();

          if (
            now - parsed.timestamp < CACHE_TIME_MS &&
            versionCached === currentVersion.toString()
          ) {
            setDogs(parsed.data);
            setLoading(false);
            return;
          }
        }

        const response = await dogData("ALL");
        const fetchedDogs = response.data.dog;
        setDogs(fetchedDogs);

        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            timestamp: Date.now(),
            data: fetchedDogs,
          })
        );
        localStorage.setItem(VERSION_KEY, currentVersion.toString());
      } catch (err) {
        console.error("Failed to fetch dogs:", err);
        setError("Failed to fetch dogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  const handleClick = async (filter) => {
    setActiveFilter(filter);
    setLoading(true);
    setError("");

    const cacheKey = `dogs_${filter}`;

    try {
      const cached = localStorage.getItem(cacheKey);
      const versionCached = localStorage.getItem(VERSION_KEY);
      const currentVersion = await dataVersion();

      if (cached) {
        const parsed = JSON.parse(cached);

        if (
          Date.now() - parsed.timestamp < CACHE_TIME_MS &&
          versionCached === currentVersion.toString()
        ) {
          setDogs(parsed.data);
          setLoading(false);
          return;
        }
      }

      const response = await dogData(filter);
      const fetchedDogs = response.data.dog;
      setDogs(fetchedDogs);

      if (fetchedDogs.length > 0) {
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            timestamp: Date.now(),
            data: fetchedDogs,
          })
        );
        localStorage.setItem(VERSION_KEY, currentVersion.toString());
      }
    } catch (err) {
      const errMsg = err?.response?.data?.error || "Failed to fetch dogs";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const NoResults = () => (
    <div className="text-white font-bold text-3xl">
      No dogs available for this filter
    </div>
  );

  return (
    <section>
      <Heading image='/images/lobbypic.png' title='MEET THE BULLIES' />

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
