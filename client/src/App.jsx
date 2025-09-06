import Website from './pages/Website';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css"
import { Suspense, useState } from "react";
import Layout from "./components/Layout/Layout";
import Properties from './pages/Properties/Properties';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import PropertyDetail from './pages/PropertyDetail/PropertyDetail';
import UserDetailContext from './context/UserDetailContext';
import Bookings from './pages/Bookings/Bookings';
import Favourites from './pages/Favourites/Favourites';
function App() {

  const queryClient = new QueryClient();


  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null

  })

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<PropertyDetail />} />
                </Route>
                <Route path='/bookings' element={<Bookings />}></Route>
                <Route path='/favourites' element={<Favourites />}></Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </UserDetailContext.Provider>

  );
}

export default App;
