import React, { useState, useEffect } from 'react';

function Data() {
    
    const [machines, setMachines] = useState([]);
    const [humans, setHumans] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const machine_api = 'http://localhost:8080/machine';
    const human_api = 'http://localhost:8080/human';
    

    useEffect(() => {
         async function fetchData() {
            setLoading(true);
            try {
                const [machineResponse, humanResponse] = await Promise.all([
                    fetch(machine_api),
                    fetch(human_api)
                    
                ]);

                if (!machineResponse.ok || !humanResponse.ok ) {
                    throw new Error('APIs were not ok');
                }

                const machines = await machineResponse.json();
                const humans = await humanResponse.json();
                

                setMachines(machines);
                setHumans(humans);
                
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    
    return [humans, machines];   

};

export default Data;
