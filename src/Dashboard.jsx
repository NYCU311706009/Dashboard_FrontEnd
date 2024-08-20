import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DistributionChart from './components/DistributionChart'
import Data from './Data';
import MachineList from './components/MachineTable';
import { useState } from 'react';


function Dashboard() {
    const [humans, machines, description] = Data();
    const qty = machines.reduce((acc, curr) => {
      return acc + curr.quantity 
    }, 0)
    const [showMalfunctionOnly, setShowMalfunctionOnly] = useState(false);
    const brokenMachine = machines.filter(machine => machine.currentState === 'MALFUNCTION');
    const filtered = showMalfunctionOnly ? brokenMachine : machines;
    


    return (
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          {/* 
            flexbox default是假設有12個columns:
            * md-3是在medium screen下會是 3 columns wide
            * lg-2是 large screen下 2 columns wide
            * mb margin bottom
            * p padding 
          */}
          <aside className="col-md-3 col-lg-2 bg-light sidebar">
            {/* position-sticky可以固定element在z軸上的位置，top-0則表示保持在最上方(不是頁面上方，而是圖層) */}
            <div className="position-sticky top-0">
              <div className="mb-4 p-3 bg-white border">
                <h5>User Info</h5>
                <img
                  src="src/assets/user.png"
                  className="img-fluid"
                  alt="User"
                ></img>
              </div>
              <ul className="flex-grow-1 p-3 bg-white border">
                <h5>交代事項</h5>
                {description.map((description) => (
                  <h6 key={description.id}>{description.note}</h6>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          {/* col: md 3+9 or lg 2+10 */}
          <div className="col-md-9 col-lg-10 d-flex flex-column p-3">
            <div className="row mb-3">
              <div className="col-md-3 d-flex">
                <div className="p-3 bg-white border">
                  <h5>產線人員在各區的分配人數</h5>
                  <DistributionChart type={"area"} raw_data={humans} />
                </div>
              </div>
              <div className="col-md-3 d-flex">
                <div className="p-3 bg-white border">
                  <h5>機台在區域的分佈</h5>
                  <DistributionChart type={"area"} raw_data={machines} />
                </div>
              </div>
              <div className="col-md-3 d-flex">
                <div className="p-3 bg-white border">
                  <h5>當日機台生產總量統計:{qty}</h5>
                  <DistributionChart type={"qty"} raw_data={machines} />
                </div>
              </div>
              <div className="col-md-3 d-flex">
                <div className="p-3 bg-white border">
                  <h5>故障機台總量統計:{brokenMachine.length}</h5>
                  <DistributionChart type={"area"} raw_data={brokenMachine} />
                </div>
              </div>
            </div>

            <div className="flex-grow-1 p-3 bg-white border overflow-auto">
              <h5>機台目前的狀態統計</h5>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={showMalfunctionOnly}
                  onChange={() => setShowMalfunctionOnly(!showMalfunctionOnly)}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  {showMalfunctionOnly ? "只顯示當機機台" : "顯示所有機台"}
                </label>
              </div>
              <MachineList machines={filtered} />
            </div>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;
