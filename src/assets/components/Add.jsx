import {useState, useEffect} from 'react'
import { useAuth } from '../Authprovider';
import { addData as addDog } from '../../auth';
import { useNavigate } from 'react-router-dom';
import Pills from './Pills';
import { cloudinary as saveToCloud } from '../../auth';


const Add = () => {
  const {user} = useAuth()
  const navigate = useNavigate();
  const [mssg, setMssg] = useState(`Welcome ${user.username}`)
  const [tags, setTags] = useState([])
  const [registries, setRegistries] = useState([])
  const [images, setImages] = useState([])
   const [previewImages, setPreviewImages] = useState([])
    const [imgError, setImgError] = useState('')


  const [form, setForm] = useState({
    serial_no:"",
    name: "",
    age: "",
    color: "",
    tags: [],
    pedigree: "",
    height: "",
    headSize: "",
    dogClass: "",
    registries: [],
    images: [],
  });

   const addPill = (event, arr, setArr) => {
    if ((event.key === ' ' || event.key === 'Enter') && event.target.value.trim()) {
      const entry = event.target.value.trim();
      event.target.value = '';
      if (!arr.includes(entry)) {
        setArr((prev) => [entry, ...prev]);
      }
    }
  };

    const removePill = (pillToRemove, setArr) => {
    setArr((prev) => prev.filter((pill) => pill !== pillToRemove));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
 
    const file = e.target.files
    if (!file) return
    const image = file[0]
    
    const imageUrl = URL.createObjectURL(file[0]);
    if (previewImages.length<3){
      setPreviewImages((prev)=>[...prev,imageUrl]) 
      setImages((prev)=>[...prev,image])
  }
  else setImgError('maximum of three pictures ');
}

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      tags,
      registries,
    }));
}, [tags, registries]);


  const handleRemove = (image) =>{
    setPreviewImages(
      previewImages.filter((img)=>image !== img)
    )
    setImages(
      images.filter((img)=>image !== img)
    )
    setImgError('')
  }
    const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData();
    images.forEach((image)=>{
      data.append('image', image)
      data.append('upload_preset', 'sytitan-preset')
      data.append('cloud_name', 'dtlwdfpjb')
    })

    const response = await saveToCloud(data)
    console.log(response.data);
    
  
  
      try {
              const response = await addDog(form);
              setMssg(`Succesfully added ${form.name}`)
              setForm({
                    serial_no:"",
                    name: "",
                    age: "",
                    color: "",
                    tags: [],
                    pedigree: "",
                    height: "",
                    headSize: "",
                    dogClass: "",
                    registries: [],
                    images: [],
                  });
              setTags([])
              setRegistries([])
              setPreviewImages([])
              navigate('/admin/dashboard');


          } catch (err) {
              const message = err?.response?.data?.error ;
              setMssg(message);
              console.error(message);
          }
  };

  return (
    <section className='lg:px-35 px-5 pt-20 '>

      <h1 className='text-5xl font-black'>{mssg}</h1>
        <div className="grid grid-cols-2 border border-[#355DD880] border-opacity-50 rounded-lg p-1 my-5 mx-auto">
        <button className="cursor-pointer border-1 bg-white py-2 w-full rounded-lg">Add New Dog Info</button>
        <button className="cursor-pointer bg-white py-2 w-full rounded-lg">Edit existing Info</button>

        
    </div>
    <form onSubmit={handleSubmit} className="max-w-7/10 mx-auto mt-10 p-4 bg-white shadow rounded space-y-4">
      <h2 className="text-2xl font-bold mb-4">Add Dog Info</h2>

      <input name="serial_no" type="text" value={form.serial_no} placeholder="serial no" onChange={handleChange} className="w-full p-2 border rounded" required/>
      <input name="name" type="text" value={form.name} placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded" required/>
      <input name="pedigree" type="text " value={form.pedigree} placeholder="Pedigree" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="age" type="text" placeholder="Age" value={form.age} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="color" type="text" placeholder="Color" value={form.color} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="height" type="text" placeholder="Height" value={form.height} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="headSize" type="text" placeholder="Head Size" value={form.headSize} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="dogClass" type="text" placeholder="Class" value={form.dogClass} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="tags" type="text" placeholder="Tags"  onKeyDown={(e) => addPill(e, tags, setTags)} className="w-full p-2 border rounded" required/>
          <div className="tags inline-block mt-3">
                  {tags.length > 0 && tags.map((tag, index) => (
                    <Pills value={tag} key={index} onRemove={() => removePill(tag, setTags)} />
                  ))}
          </div>
      <input name="registries" type="text" placeholder="Registries (comma-separated)"  onKeyDown={(e) => addPill(e, registries, setRegistries)}  className="w-full block p-2 border rounded" />

                  <div className="registries inline-block mt-3">
                    {registries.length > 0 && registries.map((registry, index) => (
                    <Pills value={registry} key={index} onRemove={() => removePill(registry, setRegistries)} />
                  ))}
                </div>
      <label className="block mt-2 font-medium">Upload up to 3 Images:</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="w-full"
      />

     <div className='block'>
  {previewImages.map((image, index) => (
    <div
      key={index}
      className="max-w-[200px] max-h-[200px] relative inline-block mr-2 mt-2"
    >
      <img
        src={image}
        alt={`preview-${index}`}
        className='max-w-[200px] object-cover max-h-[200px]'
      />
      <div className='bg-white hover:bg-red-500 absolute left-[80%] mt-1 mr-2 top-0  rounded-full'>
        <button   type="button" className='text-black px-2' onClick={() => handleRemove(image)}>
          X
        </button>
      </div>
    </div>
  ))}
  <h1 className='text-red-500 text-xl'>{imgError}</h1>
</div>


      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>

    </section>
  )
  
}

export default Add
