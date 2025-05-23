import {useState} from 'react'
import { useAuth } from '../Authprovider';
import { addData as addDog } from '../../auth';
import { response } from 'express';
import { useNavigate } from 'react-router-dom';


const Add = () => {
  const {user} = useAuth()
  const navigate = useNavigate();
  const [mssg, setMssg] = useState(`Welcome ${user.username}`)
  const [form, setForm] = useState({
    serial_no:"",
    name: "",
    age: "",
    color: "",
    pedigree: "",
    height: "",
    headSize: "",
    dogClass: "",
    registries: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // Limit to 3
    setForm((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((img, idx) => data.append("images", img));
      } else {
        data.append(key, value);
      }
    });
  
      try {
              const response = await addDog(form);
              setMssg(response.message)
              navigate('/admin/dashboard');
          } catch (err) {
              const message = err?.response?.data?.error ;
              setMssg(message);
              console.error(response.message);
          }
  };

  return (
    <section className='px-35 pt-20 '>

      <h1 className='text-5xl font-black'>{mssg}</h1>
        <div className="grid grid-cols-2 border border-[#355DD880] border-opacity-50 rounded-lg p-1 my-5 mx-auto">
        <button className="cursor-pointer border-1 bg-white py-2 w-full rounded-lg">Add New Dog Info</button>
        <button className="cursor-pointer bg-white py-2 w-full rounded-lg">Edit existing Info</button>

        
    </div>
    <form onSubmit={handleSubmit} className="max-w-7/10 mx-auto mt-10 p-4 bg-white shadow rounded space-y-4">
      <h2 className="text-2xl font-bold mb-4">Add Dog Info</h2>

      <input name="serial_no" type="text" placeholder="serial no" onChange={handleChange} className="w-full p-2 border rounded" required/>
      <input name="name" type="text" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded" required/>
      <input name="pedigree" type="text" placeholder="Pedigree" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="age" type="text" placeholder="Age" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="color" type="text" placeholder="Color" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="height" type="text" placeholder="Height" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="headSize" type="text" placeholder="Head Size" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="dogClass" type="text" placeholder="Class" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="registries" type="text" placeholder="Registries (comma-separated)" onChange={handleChange} className="w-full p-2 border rounded" />

      <label className="block mt-2 font-medium">Upload up to 3 Images:</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="w-full"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>

    </section>
  )
  
}

export default Add
