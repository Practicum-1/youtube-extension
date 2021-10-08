import "./App.scss";
import React, { useState } from "react";
import BasicControls from "./components/BasicControls/BasicControls";
import Unavailable from "./components/Unavailable/Unavailable";
import AdvancedControls from "./components/AdvancedInfo/AdvancedControls";

function App() {
  const [page, setPage] = useState(0);

  return (
    <div className="app">
      {page === -1 && <Unavailable />}
      {page === 0 && (
        <>
          <BasicControls setPage={setPage} />
          <AdvancedControls />
        </>
      )}
    </div>
  );
}

export default App;
