import React, { createContext, useState, useContext } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [races, setRaces] = useState([]);
  const [championship, setChampionship] = useState([]);
  const [championshipConstructors, setChampionshipConstructors] = useState([]);
  const [loadingRaces, setLoadingRaces] = useState(true);
  const [loadingChampionship, setLoadingChampionship] = useState(true);
  const [loadingChampionshipConstructors, setLoadingChampionshipConstructors] = useState(true);
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar corridas
  const fetchRaces = async () => {
    try {
      const response = await fetch('https://f1api.dev/api/current');
      const data = await response.json();
      setRaces(data.races || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingRaces(false);
    }
  };

  // Função para buscar o campeonato com os corredores
  const fetchChampionship = async () => {
    try {
      const response = await fetch('https://f1api.dev/api/current/drivers-championship');
      const data = await response.json();
      setChampionship(data.drivers_championship || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingChampionship(false);
    }
  };
  // Função para buscar o campeonato com os construtores
  const fetchChampionshipConstructors = async () => {
    try {
      const response = await fetch('https://f1api.dev/api/current/constructors-championship');
      const data = await response.json();
      setChampionshipConstructors(data.constructors_championship || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingChampionshipConstructors(false);
    }
  };

  // Função para buscar a classificação de uma corrida específica
  const fetchRaceResults = async (raceId) => {
    try {
      const response = await fetch(`https://f1api.dev/api/2025/${raceId}/race`);
      const data = await response.json();
      return data.races.results;
    } catch (error) {
      console.error("Erro ao buscar corrida:", error);
      return [];
    }
  };

    // Função para buscar vídeos
    const fetchVideos = async () => {
      try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCB_qr75-ydFVKSF9Dmo6izg');
        const data = await response.json();
        setVideos(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingVideos(false);
      }
    };

  return (
    <ApiContext.Provider value={{
      races,
      championship,
      championshipConstructors,
      videos,
      loadingRaces,
      loadingChampionship,
      loadingChampionshipConstructors,
      loadingVideos,
      error,
      fetchRaces,
      fetchChampionship,
      fetchChampionshipConstructors,
      fetchRaceResults,
      fetchVideos
    }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
