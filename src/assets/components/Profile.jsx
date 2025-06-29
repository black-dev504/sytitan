import { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import { useAuth } from "../Authprovider";
import { dogs as getSimilarDogs } from "../../auth";
import Dogsskeleton from "./Dogsskeleton";

const Profile = () => {
  const Dogcard = lazy(() => import("./landing/Dogcard"));
  const { dog } = useAuth();
  const images = dog?.images || [];
  const [displayImage, setDisplayImage] = useState(
    images[0] || "/images/noimgplaceholder.svg"
  );
  const [clicked, setClicked] = useState(images[0] || "");
  const [similarDogs, setSimilarDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update displayed image when image array changes
  useEffect(() => {
    if (images.length > 0) {
      setDisplayImage(images[0]);
      setClicked(images[0]);
    }
  }, [images]);

  // Fetch similar dogs based on current dog's serial number
  useEffect(() => {
    const fetchSimilar = async () => {
      const CACHE_KEY = `similar_dogs_${dog.serial_no}`;
      const CACHE_TIME_MS = 1000 * 60 * 60 * 1; 
      const now = Date.now();

      try {
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
          const parsed = JSON.parse(cached);

          // If cache is still valid, use it
          if (now - parsed.timestamp < CACHE_TIME_MS) {
            setSimilarDogs(parsed.data);
            setLoading(false);
            return;
          }
        }

        // Fetch from server if no cache or cache expired
        const response = await getSimilarDogs(dog.serial_no, 3);
        const fetchedDogs = response.data.dogs;
        setSimilarDogs(fetchedDogs);

        // Save to cache
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            timestamp: now,
            data: fetchedDogs,
          })
        );
      } catch (err) {
        console.error("Failed to fetch similar dogs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (dog?.serial_no) {
      setLoading(true); // Only show loading if actually fetching
      fetchSimilar();
    }
  }, [dog?.serial_no]);

  // Handle image thumbnail click
  const handleImageClick = (image) => {
    setDisplayImage(image);
    setClicked(image);
  };

  if (!dog) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <section>
      {/* Dog Profile Section */}
      <div className="container max-w-[1400px] mx-auto flex flex-col md:flex-row items-left lg:px-20 px-5 py-5 bg-[#252525] gap-10">
        {/* Image Display */}
        <div className="images flex lg:flex-row flex-col gap-5">
          <div className="main-img w-full lg:w-[400px] h-[400px] rounded-[20px] overflow-hidden">
            <img
              src={displayImage}
              alt="Dog display"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="sub-imgs flex flex-row lg:flex-col gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(image)}
                className={`sub-img border-2 ${
                  clicked === image ? "border-amber-500" : ""
                } rounded-[20px]`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className="object-cover w-full h-full rounded-[20px]"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Dog Info */}
        <div className="details flex flex-col justify-start text-white text-xl">
          <h1 className="text-primary font-bold text-[40px]">{dog.name}</h1>

          <ProfileDetail label="Pedigree">
            {dog.pedigree ? (
              <a
                className="text-blue-500 hover:underline italic"
                href={dog.pedigree.toLowerCase()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Click here
              </a>
            ) : (
              <NotAvailable />
            )}
          </ProfileDetail>

          <ProfileDetail label="Gender">
            {dog.gender || <NotAvailable />}
          </ProfileDetail>
          <ProfileDetail label="Age">
            {dog.age || <NotAvailable />}
          </ProfileDetail>
          <ProfileDetail label="Color">
            {dog.color || <NotAvailable />}
          </ProfileDetail>
          <ProfileDetail label="Height">
            {dog.height || <NotAvailable />}
          </ProfileDetail>
          <ProfileDetail label="Head size">
            {dog.headSize || <NotAvailable />}
          </ProfileDetail>
          <ProfileDetail label="Class">
            {dog.class || <NotAvailable />}
          </ProfileDetail>
          <ProfileDetail label="Status">
            {dog.status || <NotAvailable />}
          </ProfileDetail>
          <ProfileDetail label="Registries">
            {dog.registries && dog.registries.length > 0 ? (
              dog.registries.join(", ")
            ) : (
              <NotAvailable />
            )}
          </ProfileDetail>
        </div>
      </div>

      {/* Similar Dogs Section */}
      <div className="flex flex-col bg-[#131313] px-5 lg:px-20 py-10">
        <h1 className="text-5xl text-[#ECECEC] font-semibold text-center py-12">
          SIMILAR BULLIES
        </h1>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 pt-8">
          {loading ? (
            <Dogsskeleton />
          ) : similarDogs.length > 0 ? (
            similarDogs.map((data, index) => (
              <Suspense key={index} fallback={<Dogsskeleton />}>
                <Dogcard
                  key={index}
                  name={data.name}
                  age={data.age}
                  status={data.status}
                  images={data.images}
                  serial_no={data.serial_no}
                />
              </Suspense>
            ))
          ) : (
            <p className="text-white text-center col-span-full">
              No similar dogs found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

// Reusable detail line with label and value
const ProfileDetail = ({ label, children }) => (
  <div className="flex py-1 gap-6">
    <span className="font-bold">{label}</span>
    <span>{children}</span>
  </div>
);

// Display when data is not available
const NotAvailable = () => <span className="text-red-500">Not Available</span>;

export default Profile;
