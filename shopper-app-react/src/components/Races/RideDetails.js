import React, { useState, useEffect } from "react";

function RideDetails({ rideData }) {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch(`http://localhost:8080/ride/${rideData}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar os dados da API");
        }

        const result = await response.json();
        setRides(result.rides || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, [rideData]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "Arial" }}>
      <h1>Detalhes das Viagens</h1>
      {rides.length === 0 ? (
        <p>Nenhuma viagem encontrada.</p>
      ) : (
        rides.map((ride, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <p>
              <strong>ID do Cliente:</strong> {ride.customer_id}
            </p>
            <p>
              <strong>Origem:</strong> {ride.origin}
            </p>
            <p>
              <strong>Destino:</strong> {ride.destination}
            </p>
            <p>
              <strong>Distância:</strong> {ride.distance} metros
            </p>
            <p>
              <strong>Duração:</strong> {ride.duration}
            </p>
            <div>
              <strong>Motorista:</strong>
              <p style={{ marginLeft: "16px" }}>
                <strong>ID:</strong> {ride.driver.id}
              </p>
              <p style={{ marginLeft: "16px" }}>
                <strong>Nome:</strong> {ride.driver.name}
              </p>
            </div>
            <p>
              <strong>Valor:</strong> R$ {ride.value.toFixed(2)}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default RideDetails;
