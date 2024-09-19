function HumanTable({humans}) {
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
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {humans.map((human) => (
            <tr key={human.id}>
              <td>{human.id.toString().padStart(4, "0")}</td>
              <td>{human.department}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
export default HumanTable;
