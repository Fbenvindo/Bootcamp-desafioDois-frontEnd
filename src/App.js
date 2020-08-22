import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
      
    const response = await api.post('repositories', {
      title: `Desafio ReactJS`, 
      url: 'https://github.com/fbenvindo', 
      techs: ['React', 'React Native', 'Node'], 
    });
    
    const repository = response.data;

    setRepositories([...repositories, repository]);
  
  }

  async function handleRemoveRepository(id) {
    
    const repository = repositories.find(repository => repository.id === id);
    
    const response = await api.delete(`repositories/${id}`)
    
    repositories.splice(repository, 1);
    
    setRepositories([...repositories]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 && repositories.map(repository => 
        
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(`${repository.id}`)} key={repository.id}>
              Remover
            </button><input type="hidden" value={repository.id}/>
          </li>

        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );

};

export default App;