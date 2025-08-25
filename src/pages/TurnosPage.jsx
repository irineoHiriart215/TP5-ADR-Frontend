import React, { useEffect, useState } from 'react';
import { fetchConToken } from '../services/api';

const TurnosPage = () => {
    const [turnos, setTurnos] = useState([]);
    const [error, setError] = useState(null);

    useEffect (() => {
        const cargarTurnos = async () => {
            try {
                const data = await fetchConToken('turnos');
                setTurnos(data);
            }
            catch (error) {
                setError('Error al cargar los turnos');
                console.error(error);
            }
        };

        cargarTurnos();
    }, []);

    return (
        <div>
            <h2>Turnos</h2>
            { error && <p>error</p>}
            <ul>
                {turnos.map((turno) => (
                    <li key={turno.id}>
                        {turno.fecha_hora} - {turno.paciente?.nombre} ({turno.tipo})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TurnosPage;