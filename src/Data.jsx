import React, { useState, useEffect } from 'react';

function Data() {
    
    const [machines, setMachines] = useState([]);
    const [humans, setHumans] = useState([]);
    const [description, setDescription] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const machine_api = 'http://localhost:8080/machine';
    const human_api = 'http://localhost:8080/human';
    const description_api = 'http://localhost:8080/description'

    useEffect(() => {
         async function fetchData() {
            setLoading(true);
            try {
                const [machineResponse, humanResponse, descriptionResponse] = await Promise.all([
                    fetch(machine_api),
                    fetch(human_api),
                    fetch(description_api)
                ]);

                if (!machineResponse.ok || !humanResponse.ok || !descriptionResponse) {
                    throw new Error('APIs were not ok');
                }

                const machines = await machineResponse.json();
                const humans = await humanResponse.json();
                const description = await descriptionResponse.json();

                setMachines(machines);
                setHumans(humans);
                setDescription(description);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    
    return [humans, machines,description];   

};

export default Data;
