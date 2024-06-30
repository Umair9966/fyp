import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    username: '',
    email: '',
    password: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios.get('/users')
      .then(response => {
        setUsers(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setLoading(true);
    axios.delete(`/users/${id}`)
      .then(() => {
        setSuccess('User deleted successfully');
        fetchUsers();
      })
      .catch(() => {
        setError('Failed to delete user');
        setLoading(false);
      });
  };

  const handleCreate = () => {
    setCurrentUser({
      id: null,
      username: '',
      email: '',
      password: '',
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { id, username, email, password } = currentUser;
    setLoading(true);

    const request = isEditMode
      ? axios.post(`/update-user/${id}`, { username, email, password })
      : axios.post('/create-user', { username, email, password });

    request.then(() => {
      setSuccess(`User ${isEditMode ? 'updated' : 'created'} successfully`);
      fetchUsers();
      handleCloseModal();
    })
    .catch(() => {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} user`);
      setLoading(false);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="container mt-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      <button className="btn btn-primary mb-3" onClick={handleCreate}>Create User</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEdit(user)}>Edit</button>
                {/* <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className={`modal ${isModalOpen ? 'open' : ''}`} style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditMode ? 'Edit User' : 'Create User'}</h5>
                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close" style={{ marginLeft: 'auto' }}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" name="username" value={currentUser.username} onChange={handleChange} placeholder="Username" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={currentUser.email} onChange={handleChange} placeholder="Email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={currentUser.password} onChange={handleChange} placeholder="Password" required />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
