import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCircle } from 'react-icons/fa';

function MachineTable ({ machines }) {

  function getStateColor(state) {
    switch (state) {
      case 'PRODUCTION':
        return 'green';
      case 'MALFUNCTION':
        return 'red';
      case 'MAINTENANCE':
        return 'yellow';
      case 'IDLE':
        return 'gray';
      default:
        return 'transparent';
    }
  }
  // const totalQuantityByMachine = machines.map(machine => {
    
  //   const totalQuantity = machine.reduce((accumulator, record)=>{
  //     return accumulator + record.quantity;
  //   }, 0);

  //   return {
  //     id: machine.id,
  //     quantity: totalQuantity
  //   };
  // });
  function getQuantityByDate(machine, target_date){
    const record = machine.records.find(record => record.record_date == target_date);
    return record ? record.quantity : null; 
  }

  return (
    <div
      className="table-responsive"
      style={{ maxHeight: "400px", overflowY: "auto" }}
    >
      <table className="table table-bordered">
        {/* TODO: 這裡用position-sticky top-0背後會透一點東西 */}
        <thead className="table-light position-sticky top-0">
          <tr>
            <th>ID</th>
            <th>State</th>
            <th>Quantity</th>
            <th>Department</th>
            <th>Area</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((machine) => (
            <tr key={machine.id}>
              <td>{machine.id.toString().padStart(4, "0")}</td>
              <td>
                <div>
                  <FaCircle
                    style={{
                      color: getStateColor(machine.currentState),
                      fontSize: "16px",
                      marginRight: "8px",
                    }}
                  />
                  {machine.currentState}
                </div>
              </td>

              <td>
                {getQuantityByDate(machine, "2024-09-01")
                  .toString()
                  .padStart(3, "0")}
              </td>

              <td>{machine.currentDepartment}</td>
              <td>{machine.currentArea}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineTable;
