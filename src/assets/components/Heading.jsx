

const heading = ({image, title})=>{
    return ( <div className="relative h-96 w-full flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <h1 className="text-5xl relative text-[#ECECEC] font-semibold text-center py-12">
          {title}
        </h1>
      </div>)
}

export default heading