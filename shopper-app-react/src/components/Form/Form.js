import React, { useState } from 'react';
import Races from '../Races/Races'

function Form() {

  const [formData, setFormData] = useState({
    customer_id: '',
    origin: '',
    destination: '',
  });
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(formData && formData.origin === formData.destination) {
      alert('Endereço de destino não pode ser igual de origem');
    } else {
      try {
        const response = await fetch('http://localhost:8080/ride/estimate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer_id: formData.customer_id,
            origin: formData.origin,
            destination: formData.destination,
          })
        })
        const submiting = await response.json();
        const sender = {
          submiting, formData
        }
        setSubmittedData(sender)

      } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao enviar os dados.');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', fontFamily: 'Arial' }}>
      <h2>Solicitação de Viagem</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="customer_id">ID do Usuário:</label>
          <input
            type="text"
            id="customer_id"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            style={{
              display: 'block',
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="origin">Endereço de Origem:</label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            style={{
              display: 'block',
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="destination">Endereço de Destino:</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            style={{
              display: 'block',
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Enviar
        </button>
      </form>
      {submittedData && <Races data={submittedData} />}
    </div>
  );
}

export default Form;
