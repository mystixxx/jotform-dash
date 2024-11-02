import { Sidebar } from "./components";
import Main from "./pages/Main";

function App() {
  return (
    <div className="flex flex-row bg-main-gray">
      <Sidebar />
      <div className="flex flex-col flex-1 w-1 h-full">
        <Main />
      </div>
    </div>
  );
}

export default App;
