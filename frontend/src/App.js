import React, { useState } from "react";
import {Sidebar} from "./components";
import Main from "./pages/Main";

function App() {
  const [selectedForm, setSelectedForm] = useState(null); 

  return (
    <div className={`flex flex-row bg-main-gray w-full min-h-screen`}>
      <Sidebar onSelectForm={setSelectedForm} /> 
      <div className="flex flex-col flex-1 w-1 h-full">
        <Main selectedForm={selectedForm} /> 
      </div>
    </div>
  );
}

export default App;
