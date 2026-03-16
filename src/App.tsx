import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

// Pages
import Home from './pages/Home';
import AboutInstitute from './pages/AboutInstitute';
import Infrastructure from './pages/Infrastructure';
import InternationalCertification from './pages/InternationalCertification';
import WorldScenario from './pages/WorldScenario';
import Courses from './pages/Courses';
import FireAlarmTraining from './pages/FireAlarmTraining';
import AccessBiometricTraining from './pages/AccessBiometricTraining';
import FeesEligibility from './pages/FeesEligibility';
import Authenticity from './pages/Authenticity';
import ECampus from './pages/ECampus';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Employment from './pages/Employment';
import FAQ from './pages/FAQ';
import Centers from './pages/Centers';
import Contact from './pages/Contact';
import FranchisePartner from './pages/FranchisePartner';
import BankDetails from './pages/BankDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-navy-900 font-inter">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-institute" element={<AboutInstitute />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/international-certification" element={<InternationalCertification />} />
            <Route path="/world-scenario" element={<WorldScenario />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/fire-alarm-training" element={<FireAlarmTraining />} />
            <Route path="/access-biometric-training" element={<AccessBiometricTraining />} />
            <Route path="/fees-eligibility" element={<FeesEligibility />} />
            <Route path="/authenticity" element={<Authenticity />} />
            <Route path="/e-campus" element={<ECampus />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/employment" element={<Employment />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/centers" element={<Centers />} />
            <Route path="/bank-details" element={<BankDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/become-franchise" element={<FranchisePartner />} />
          </Routes>
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </BrowserRouter>
  );
}

export default App;
