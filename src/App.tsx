import React from "react";
import StockData from "./components/StockData";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6">
      <ErrorBoundary>
        <StockData />
      </ErrorBoundary>
    </div>
  );
};

export default App;
