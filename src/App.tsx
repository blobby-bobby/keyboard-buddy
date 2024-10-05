import Credits from "./components/Credits/Credits";
import Gameboy from "./components/Gameboy/Gameboy";
import Instructions from "./components/Instructions/Instructions";

function App() {
  return (
    <>
      <div className="crt"></div>
      <Instructions />
      <Gameboy />
      <Credits />
    </>
  );
}

export default App;
