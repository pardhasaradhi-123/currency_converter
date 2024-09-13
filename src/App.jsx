import Converter from "./Converter";
import bgIMG from "./assets/bgIMG.jpg";

function App() {
  return (
    <>
      <div className="absolute -z-10 h-screen w-screen blur-sm">
        <img src={bgIMG} alt="" className="h-full w-full" />
      </div>
      <div className="flex justify-center items-center w-screen h-screen">
        <Converter />
      </div>
    </>
  );
}

export default App;
