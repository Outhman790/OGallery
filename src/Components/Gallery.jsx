import Image from "./Image"
const Gallery = () => { 
    return (
        <div  className="w-full container max-w-[1200px] grid place-items-center grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10 mt-20 pt-10 mx-auto">   
                {Array.from({ length: 10 }).map(() => (
                <Image />
            ))}
        </div>
    )

}
export default Gallery
