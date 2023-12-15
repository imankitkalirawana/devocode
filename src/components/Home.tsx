import Banner from "./Banner";
import NewsBanner from "./NewsBanner";
import WarningPopup from "./WarningPopup";

const Home = () => (
  <div className="container">
    <NewsBanner />
    <Banner />
    <WarningPopup />
  </div>
);

export default Home;
