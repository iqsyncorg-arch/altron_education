import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer.tsx';
import ChatBot from './components/Chat/ChatBot';
import FloatingButtons from './components/FloatingButtons';
import ScrollToTop from './components/ScrollToTop';



// Pages
import Home from './pages/Home';
import AboutInstitute from './pages/AboutInstitute';
import Infrastructure from './pages/Infrastructure';
import ProfessionalCertification from './pages/ProfessionalCertification';
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
import DemandBenefits from './pages/DemandBenefits';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-navy-900 font-inter">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about-institute" element={<AboutInstitute />} />
                  <Route path="/infrastructure" element={<Infrastructure />} />
                  <Route path="/professional-certification" element={<ProfessionalCertification />} />
                  <Route path="/world-scenario" element={<WorldScenario />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/fire-alarm-training" element={<FireAlarmTraining />} />
                  <Route path="/access-biometric-training" element={<AccessBiometricTraining />} />
                  <Route path="/duration-eligibility-fees" element={<FeesEligibility />} />
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
                  <Route path="/demand-benefits" element={<DemandBenefits />} />
                </Routes>
              </main>
              <Footer />
              <ChatBot />
              <FloatingButtons />
            </>


          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
