import React, { useState, useEffect } from 'react';
import { useApi } from '../Api/Context';
import '../styles/Classification.css';

const Classification = () => {
  const { 
    fetchChampionship, 
    fetchChampionshipConstructors, 
    loadingChampionship, 
    loadingChampionshipConstructors, 
    error, 
    championship, 
    championshipConstructors 
  } = useApi();

  const [view, setView] = useState('pilots'); // Estado para alternar entre Pilotos e Construtores

  useEffect(() => {
    fetchChampionship();
    fetchChampionshipConstructors(); // Supondo que existe essa função para buscar construtores
  }, []);

  if (loadingChampionship || loadingChampionshipConstructors) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error">Erro: {error}</div>;
  }

  return (
    <div className="classification-container">
      <h2 className="title">Classificação</h2>

      {/* Botões para alternar entre Pilotos e Construtores */}
      <div className="toggle-buttons">
        <button 
          className={view === 'pilots' ? 'active' : ''} 
          onClick={() => setView('pilots')}
        >
          Pilotos
        </button>
        <button 
          className={view === 'constructors' ? 'active' : ''} 
          onClick={() => setView('constructors')}
        >
          Construtores
        </button>
      </div>

      <div className="table-container">
        <table className="classification-table">
          <tbody>
            {view === 'pilots' ? (
              championship.length === 0 ? (
                <tr>
                  <td colSpan={4}>Nenhuma classificação encontrada.</td>
                </tr>
              ) : (
                championship.map((champion, index) => (
                  <tr key={champion.position} className="table-row">
                    <td className="position">{index + 1}</td>
                    <td className="driver-name">
                      {champion.driver.name} <b>{champion.driver.surname}</b>
                    </td>
                    <td className="team-name">{champion.team.teamName}</td>
                    <td className="points">{champion.points} PTS</td>
                  </tr>
                ))
              )
            ) : (
              championshipConstructors.length === 0 ? (
                <tr>
                  <td colSpan={3}>Nenhuma classificação encontrada.</td>
                </tr>
              ) : (
                championshipConstructors.map((constructor, index) => (
                  <tr key={constructor.position} className="table-row">
                    <td className="position">{index + 1}</td>
                    <td className="team-name">{constructor.team.teamName}</td>
                    <td className="points">{constructor.points} PTS</td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Classification;
