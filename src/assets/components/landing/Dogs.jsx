import { useState, useEffect } from "react";
import Dogcard from "./Dogcard";
import { dogs as getDogs } from "../../../auth";
import { useNavigate } from "react-router-dom";
import Dogsskeleton from "../Dogsskeleton";

const CACHE_KEY = "cachedDogs";
const CACHE_TIME_MS = 1000 * 60 * 60 * 24;

const Dogs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
          const parsed = JSON.parse(cached);
          const now = Date.now();

          if (now - parsed.timestamp < CACHE_TIME_MS) {
            setDogs(parsed.data);
            setLoading(false);
            return;
          } else {
            localStorage.removeItem(CACHE_KEY);
          }
        }
        // Otherwise fetch from API
        const response = await getDogs(null, 6);
        const fetchedDogs = response.data.dogs;
        setDogs(fetchedDogs);

        // Save to localStorage
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            timestamp: Date.now(),
            data: fetchedDogs,
          })
        );
      } catch (err) {
        console.error("Failed to fetch dogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  return (
    <section className="bg-black flex flex-col items-center justify-center">
      <h1 className="text-5xl text-[#ECECEC] font-semibold text-center py-12">
        MEET THE BULLIES
      </h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 px-5 lg:px-10 pt-8">
        {loading ? (
          <Dogsskeleton />
        ) : (
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

      <button
        onClick={() => navigate("/lobby")}
        className="px-9 py-6 mb-8 mt-8 max-w-[200px] cursor-pointer rounded-[40px] bg-primary text-white hover:border-1"
      >
        View more
      </button>
    </section>
  );
};

export default Dogs;
