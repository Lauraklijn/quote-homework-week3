import React from "react";
import "./App.css";

import QuoteSearcher from "./components/QuoteSearcher";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <main>
          <h1>Quotes</h1>
          <QuoteSearcher />
        </main>
      </header>
    </div>
  );
}

export default App;
