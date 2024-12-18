const Image = () => {
    return (
        <div className="flex flex-col justify-center border-2 border-gray-200 rounded-lg">
        <img src="https://placehold.co/300" alt="image" />
        <div className="flex flex-col justify-between items-center mt-4 px-1">
            <p className="font-medium">Image Name</p>
            <p className="text-sm">by Author</p>
        </div>
        <p className="text-center text-gray-500 p-3">Image Description lorem ipsum doremi fasu lasi ok bye</p>
        <button className="bg-indigo-600 text-white mx-auto p-2 rounded w-[40%] mb-4">Show</button>
    </div>
    )
}
export default Image