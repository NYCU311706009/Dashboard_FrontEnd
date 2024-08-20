
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateMachines(count) {
  const states = ["PRODUCTION", "MALFUNCTION", "MAINTENANCE", "IDLE"];
  const departments = ["PRODUCTION", "EQUIPMENT", "TESTING", "ENGINEER"];
  const areas = ["A", "B", "C", "D"];

  const machines = [];

  for (let i = 1; i <= count; i++) {
    const machine = {
      id: i,
      state: getRandomItem(states),
      quantity: Math.floor(Math.random() * 100) + 1,
      department: getRandomItem(departments),
      area: getRandomItem(areas),
    };
    machines.push(machine);
  }
  return machines;
}
export default generateMachines

