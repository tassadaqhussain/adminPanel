
import CardComponent     from "../components/CardComponent.tsx";

import { FaMoneyBillWave, FaProjectDiagram, FaCheckCircle, FaChartLine, FaDollarSign, FaDownload, FaUserFriends, FaClock, FaPercent } from 'react-icons/fa';
const Home = () => {
    const data = [
        { title: "Total Investment", value: "$20,000", icon: <FaMoneyBillWave /> },
        { title: "Active Projects", value: 32, icon: <FaProjectDiagram /> },
        { title: "Completed Projects", value: 5, icon: <FaCheckCircle /> },
        { title: "New Investment (Last 24 hours)", value: "$6,000", icon: <FaChartLine /> },
        { title: "Total Fund Disbursed", value: "$4,550", icon: <FaDollarSign /> },
        { title: "Fund Disbursed (Last 24 hours)", value: "$1,200", icon: <FaDollarSign /> },
        { title: "No. of Downloads", value: 100, icon: <FaDownload /> },
        { title: "No. of Active Users", value: 93, icon: <FaUserFriends /> },
        { title: "Pending Withdrawal Requests", value: 2, icon: <FaClock /> },
        { title: "% Completed Projects", value: "--", description: "Calculated percentage data", icon: <FaPercent /> },
    ];


    return (
    // screen
    <div className="home w-full p-0 m-0">
      {/* grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 grid-flow-dense auto-rows-[minmax(200px,auto)] xl:auto-rows-[minmax(150px,auto)] gap-3 xl:gap-3 px-0">
          {data.map((item, index) => (
              <CardComponent
                  key={index}
                  title={item.title}
                  value={item.value}
                  description={item.description}
                  icon={item.icon}
              />
          ))}
      </div>
    </div>
  );
};

export default Home;
