import Image from "./Image"
const Gallery = () => { 
    return (
        <div  className="w-screen grid place-items-center grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 mt-20 space-y-10">
            {Array.from({ length: 10 }).map(() => (
                <Image />
            ))}
        </div>
    )

}
export default Gallery