import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./details";
import SearchParams from "./SearchParams";
import { useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
      <AdoptedPetContext.Provider value={adoptedPet}>
          <header>
            <Link to='/'>Adopt Me !</Link>
          </header>
          <Routes>
            <Route path='/details/:id' element={<Details />}></Route>
            <Route path='/' element={<SearchParams />}></Route>
          </Routes>
      </AdoptedPetContext.Provider>
        </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
