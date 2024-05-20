import { ModeToggle } from "./components/mode-toggle";
import MultiSelect from "./components/multi-select";

function App() {
  return (
    <div className="min-h-screen flex  items-center container mx-auto">
      <div className="absolute top-6 left-6">
        <ModeToggle />
      </div>
      <div className=" max-w-lg mx-auto  py-12 w-full h-full">
        <MultiSelect />
      </div>
    </div>
  );
}

export default App;
