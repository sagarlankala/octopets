import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './data/constants';

// Import pages
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListingDetails from './pages/ListingDetails';
import PetProfiles from './pages/PetProfiles';
import PetProfileForm from './pages/PetProfileForm';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import styles
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.LISTINGS} element={<Listings />} />
            <Route path={ROUTES.LISTING_DETAILS} element={<ListingDetails />} />
            <Route path={ROUTES.PET_PROFILES} element={<PetProfiles />} />
            <Route path={ROUTES.PET_PROFILE_FORM} element={<PetProfileForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
