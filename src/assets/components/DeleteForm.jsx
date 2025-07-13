import {useState} from 'react';
import {profile as getDog} from '../../auth'
import { destroy as deleteDog } from '../../auth';

const DeleteForm = ()=>{
    const [dogData, setDogData] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [errMssg, setErrMssg] = useState('')

    const handleChange = (e)=>{
        setSearchValue(e.target.value)
        setDogData(false)

    }

     const handleDelete = async(id)=>{
         const confirm = window.confirm("Are you sure you want to delete this dog?");
            if (!confirm) return;

            try {
                setLoading(true)
                const res = await deleteDog(id); 
                alert(res.data.message || "Dog deleted!");

                
                const cacheKey = `similar_dogs_${id}`;
                localStorage.removeItem(cacheKey);

                Object.keys(localStorage).forEach(key => {
                  if (key.includes(id)) {
                    localStorage.removeItem(key);
                  }
                });


                setDogData(false)
                setLoading(false)
                setSearchValue('')
            } catch (err) {
                console.error("Delete failed:", err.response?.data || err.message);
                alert("Failed to delete dog");
                setErrMssg( err.response?.data)
                setLoading(false)
  }
        
    }

     const handleSearch = async(e)=>{
        e.preventDefault()
        

        setLoading(true)
        try{
        
        const response = await getDog(searchValue);        

        setDogData(response.data.dog)
        setErrMssg('')
        setLoading(false)
        
        
        }catch(err){
            setErrMssg(err.response.data.error);
            setLoading(false)
            
        }
    }

    return (
    <section className="px-5 pt-20 lg:px-35">
        <div>
          <label className='font-bold block' htmlFor="dogid">Dog id</label>
          <input
            id="dogid"
            type="text"
            onChange={handleChange}
            className="w-full lg:w-1/2 p-3 rounded-2xl border-black/10 border-1 my-5  "
            placeholder='Enter dog id '
            required
          />
        </div>

        {errMssg && <div>
               <p className='italic text-red-500'>{errMssg}</p>
            </div>}

    {(dogData && !loading) && (
  <div>
    {display({ ...dogData, handleDelete, loading })}
  </div>
)}

  
        

       {(!dogData)&&<button onClick={handleSearch}  className={`cursor-pointer mt-3 px-5 py-4 rounded-2xl ${ loading? "bg-blue-300 text-white cursor-not-allowed": "bg-blue-500 text-white hover:bg-blue-600"}`} disabled={loading}>{loading?'Loading......':'Search'}</button>} 



    </section>
    );
}

const display = ({ images, name, serial_no, handleDelete, loading }) => {
  return (
    <div className="max-w-sm w-full bg-[#1F1F1F] text-white rounded-xl shadow-md overflow-hidden border border-gray-700">
      <img
        src={images?.[0]?.url || "/images/noimgplaceholder.svg"}
        alt={name}
        className="h-64 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold text-primary">{name}</h2>
        <p className="text-sm text-gray-300 mt-1">ID: {serial_no}</p>
      </div>

      <button
        onClick={() => handleDelete(serial_no)}
        className={`cursor-pointer mt-3 m-3  px-5 py-4 rounded-2xl ${
          loading
            ? "bg-red-300 text-white cursor-not-allowed"
            : "bg-red-500 text-white hover:bg-red-600"
        }`}
        disabled={loading}
      >
        {loading ? "Loading..." : "Delete"}
      </button>
    </div>
  );
};


export default DeleteForm