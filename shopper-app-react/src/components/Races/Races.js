import React, { useState } from 'react';
import RideDetails from './RideDetails'

const ChildComponent = ({data}) => {

  const [submittedData, setSubmittedData] = useState(null);


  const handleSelect = async (driverId) => {
    try {
      const body = {
        customer_id: data.formData.customer_id,
        origin: data.formData.origin,
        destination: data.formData.destination,
        distance: data.submiting.distance,
        duration: data.submiting.duration,
        driver: {
            id: data.submiting.options[driverId -1].id,
            name: data.submiting.options[driverId-1].name
        },
        value: data.submiting.options[driverId-1].value
    }
      await fetch('http://localhost:8080/ride/confirm', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
    } catch (error) {
      console.log(error.message);
    }

    setSubmittedData(data.formData.customer_id)
  };

  return (
    <div>
      <h1>Lista de Motoristas</h1>
      <ul>
        {data.submiting.options.map((driver) => (
          <li key={driver.id} style={{ border: "1px solid #ccc", padding: "16px", margin: "16px 0" }}>
            <h2>{driver.name}</h2>
            <p><strong>Descrição:</strong> {driver.description}</p>
            <p><strong>Veículo:</strong> {driver.vehicle}</p>
            <p><strong>Avaliação:</strong> {driver.review.rating} estrelas</p>
            <p><strong>Comentário:</strong> {driver.review.comment}</p>
            <p><strong>Valor da viagem:</strong> R$ {driver.value.toFixed(2)}</p>
            <button onClick={() => handleSelect(driver.id)}>Selecionar</button>
          </li>
        ))}
      </ul>

      {submittedData && <RideDetails rideData={submittedData} />}
    </div>
  );
};


export default ChildComponent;
