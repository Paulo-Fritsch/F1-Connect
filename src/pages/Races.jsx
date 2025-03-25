import React, { useState, useEffect } from 'react';
import { useApi } from '../Api/Context';
import '../styles/Races.css';  // Certifique-se de que o CSS está configurado corretamente

const Races = () => {
  const { races, loadingRaces, fetchRaces, error, fetchRaceResults } = useApi();
  const [selectedGP, setSelectedGP] = useState('');
  const [raceResults, setRaceResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [raceDetails, setRaceDetails] = useState(null);

  // Carregar as corridas apenas uma vez
  useEffect(() => {
    if (races.length === 0) {
      fetchRaces();
    }
  }, [races, fetchRaces]);

  // Carregar os resultados da corrida
  const loadRaceResults = async (round) => {
    setLoading(true);
    const results = await fetchRaceResults(round);
    setRaceResults(results || []);
    
    // Encontrar detalhes da corrida selecionada
    const selectedRace = races.find(race => race.round === round);
    setRaceDetails(selectedRace);
console.log ("aaaa", raceDetails)
    setLoading(false);
  };


  if (loadingRaces) {
    return <div className="loading">Carregando corridas...</div>;
  }

  return (
    <div className="classification-container">
      <h2 className="title">Selecione uma Corrida</h2>

      {/* Select para escolher o GP */}
      <div className="select-wrapper">
        <select
          value={selectedGP}
          onChange={(e) => {
            setSelectedGP(e.target.value);
            loadRaceResults(e.target.value);
          }}
        >
          <option value="" disabled>Selecione uma corrida</option>
          {races.map((race) => (
            <option key={race.round} value={race.round}>{race.raceName}</option>
          ))}
        </select>
      </div>

      {/* Exibindo detalhes da corrida */}
      {raceDetails && (
        <div className="race-details">
          <h3>Detalhes da Corrida</h3>
          <p><strong>Data:</strong> {raceDetails.date}</p>
          <p><strong>Circuito:</strong> {raceDetails.circuit?.circuitName}</p>
        </div>
      )}

      {/* Exibindo mensagem de erro, se houver */}
      {error && (
        <div className="error-message">
          Houve um erro ao carregar os resultados. Tente novamente.
        </div>
      )}

      {/* Tabela com os resultados */}
      {selectedGP && (
        <div className="classification-box">
          {loading ? (
            <div className="resultado">Carregando resultados...</div>
          ) : raceResults.length === 0 ? (
            <div className='resultado'>Nenhum resultado disponível.</div>
          ) : (
            <div className="classification-list">
              {raceResults.map((result, index) => (  
                <div className="classification-item" key={index}>
                  <div className="position">{result.position}</div>
                  <div className="driver-name">{result.driver?.name} {result.driver?.surname}</div>
                  <div className="race-time" style={{ fontSize: '0.8em', color: '#666' }}>{result.time || 'N/A'}</div>
                  <div className="points">{result.points}</div>
                </div>           
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Races;
