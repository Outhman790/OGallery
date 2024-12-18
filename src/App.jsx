import Gallery from "./Components/Gallery"
import Navbar from "./Components/Navbar"

function App() {

  return (
    <>
     <Navbar />
     {/* you have to remove the div wraping the gallery component */}
     <div className="mx-10">
     <Gallery />
     </div>
    </>
  )
}

export default App
