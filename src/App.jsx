import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import './global.css';
import '../src/css/buttons.css';
import './css/typography.css';
import './css/variables.css';
import './css/customForm.css';
import './css/animations.css';
import './css/tables.css';
import About from "./pages/about/About";
import HowItWorks from "./pages/howItWorks/HowItWorks";
import Contact from "./pages/contact/Contact";
import Temples from "./pages/temples/Temples";
import Temple from "./pages/temple/Temple";
import OurTeamAndJourney from "./pages/our-team-and-journey/OurTeamAndJourney";

import AddTemple from "./pages/admin/AddTemple";
import IsSuperadmin from "./routes/IsSuperadmin";
import IsTempleAdmin from "./routes/IsTempleAdmin";
import AdminTemples from "./pages/admin/AdminTemples";
import UpdateTemple from "./pages/admin/UpdateTemple";
import ViewTemple from "./pages/admin/ViewTemple";
import UpdateProfile from "./pages/profile/UpdateProfile";
import AllAdmins from "./pages/superadmin/AllAdmins";
import TemplesBySingleAdmin from "./pages/superadmin/TemplesBySingleAdmin";
import AllDonation from "./pages/superadmin/AllDonation";
import UnverifiedTemples from "./pages/superadmin/UnverifiedTemples";
import Checkout from "./pages/checkout/Checkout";
import VerifyTempleChanges from "./pages/superadmin/VerifyTempleChanges";
import UserDonations from "./pages/donation/UserDonations";
import IsSignedIn from "./routes/IsSignedIn";

import TrendingTemples from "./pages/superadmin/TrendingTemples";
import ContactTicket from "./pages/superadmin/ContactTicket";
import SubscribedEmails from "./pages/superadmin/SubscibedEmails";
import AllDonationsAdmin from "./pages/admin/AllDonationsAdmin";
import LoadingSpinner from "./components/loadingSpinner/LoadingSpinner";
import Faq from "./pages/staticPages/FAQ/Faq"
import PrivacyPolicy from "./pages/staticPages/PrivacyPolicy";
import TermsAndConditions from "./pages/staticPages/TermsAndConditions";
import AddEvent from "./pages/admin/AddEvent";
import UpdateEvent from "./pages/admin/UpdateEvent";
import ScrollToTop from "./components/ScrollToTop";
import Event from "./pages/temple/Event";
import AllSubscriptionsAdmin from "./pages/admin/AllSubscriptionAdmin";


function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="about" element={<About />} />
          <Route path="checkout" element={<Checkout />} />




          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/temples" element={<Temples />} />
          <Route path="/temple/:id" element={<Temple />} />
          <Route path="/temple/:id/:eventId" element={<Event />} />
          <Route path="/our-team-and-journey" element={<OurTeamAndJourney />} />




          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/faq" element={<Faq />} />




          <Route path="/user" element={<IsSignedIn />}>
            <Route path="donations" element={<UserDonations />} />

          </Route>
          <Route path="loading" element={<LoadingSpinner />} />

          <Route path="/add-temple" element={<AddTemple />} />

          <Route path="/admin" element={<IsTempleAdmin />} >
            <Route path="add-temple" element={<AddTemple />} />
            <Route path="update-temple/:id" element={<UpdateTemple />} />
            <Route path="temples" element={<AdminTemples />} />
            <Route path="temple/:id" element={<ViewTemple />} />
            <Route path="donations" element={<AllDonationsAdmin />} />
            <Route path="subscriptions" element={< AllSubscriptionsAdmin />} />
            <Route path="add-event/:id" element={<AddEvent />} />
            <Route path="update-event/:id" element={<UpdateEvent />} />

          </Route>

          <Route path="/superadmin" element={<IsSuperadmin />} >
            <Route path="add-temple" element={<AddTemple />} />
            <Route path="update-temple/:id" element={<UpdateTemple />} />
            <Route path="temples" element={<AdminTemples />} />
            <Route path="temple/:id" element={<ViewTemple />} />
            <Route path="temple-listers" element={<AllAdmins />} />
            <Route path="temples-listed/:id" element={<TemplesBySingleAdmin />} />
            <Route path="subscriptions" element={< AllSubscriptionsAdmin />} />
            <Route path="verify-temple-changes/:id" element={<VerifyTempleChanges />} />
            <Route path="donations" element={<AllDonation />} />
            <Route path="unverified-temples" element={<UnverifiedTemples />} />
            <Route path="contact-ticket" element={<ContactTicket />} />
            <Route path="subscribed-emails" element={<SubscribedEmails />} />

            <Route path="trending-temples" element={<TrendingTemples />} />

            <Route path="add-event/:id" element={<AddEvent />} />
            <Route path="update-event/:id" element={<UpdateEvent />} />

          </Route>



        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
