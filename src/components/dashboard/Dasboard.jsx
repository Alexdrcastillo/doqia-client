import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [numeroSaludFilter, setNumeroSaludFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://doqia-backend.onrender.com/users');
      setUsers(response.data);
      setFilteredUsers(response.data); // Inicialmente mostramos todos los usuarios
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleNumeroSaludFilterChange = (event) => {
    setNumeroSaludFilter(event.target.value);
    filterUsers(event.target.value);
  };

  const filterUsers = (numeroSalud) => {
    if (numeroSalud === '') {
      setFilteredUsers(users); // Mostrar todos si el filtro está vacío
    } else {
      const filtered = users.filter((user) =>
        user.numero_salud.includes(numeroSalud)
      );
      setFilteredUsers(filtered);
    }
  };

  const handleToggleIsClient = async (userId, newIsClientState) => {
    try {
      const response = await axios.patch(`https://doqia-backend.onrender.com/users/${userId}/is_client`, {
        is_client: newIsClientState,
      });

      // Actualizar el estado local después de la actualización en el servidor
      const updatedUsers = users.map((user) =>
        user.id === userId ? response.data : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>User Dashboard</h1>
      <input
        type="text"
        placeholder="Filtrar por número de salud"
        value={numeroSaludFilter}
        onChange={handleNumeroSaludFilterChange}
        style={styles.input}
      />
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>es Cliente</th>
            <th>Número de Salud</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.filter(user => user.numero_salud).map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.is_client ? 'Cliente' : 'No Cliente'}</td>
              <td>{user.numero_salud}</td>
              <td>
                <button
                  onClick={() => handleToggleIsClient(user.id, !user.is_client)}
                  style={styles.button}
                >
                  {user.is_client ? 'Aceptar' : 'Rechazar'}
                </button>
                {/* Otras acciones como ver información detallada */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    margin: '20px',
  },
  heading: {
    color: '#007acc',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #007acc',
    borderRadius: '5px',
    width: '300px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  button: {
    padding: '5px 10px',
    color: '#fff',
    backgroundColor: '#007acc',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  th: {
    backgroundColor: '#007acc',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
};

export default Dashboard;
