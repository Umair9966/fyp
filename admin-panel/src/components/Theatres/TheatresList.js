import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TheatresList = () => {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTheatre, setEditingTheatre] = useState(null);

  useEffect(() => {
    fetchTheatres();
  }, []);

  const fetchTheatres = () => {
    setLoading(true);
    axios.get('/theatres')
      .then(response => {
        setTheatres(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch theatres');
        setLoading(false);
      });
  };

  const handleEdit = (theatre) => {
    setEditingTheatre(theatre);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setLoading(true);
    axios.delete(`/theatres/${id}`)
      .then(() => {
        setSuccess('Theatre deleted successfully');
        fetchTheatres();
      })
      .catch(() => {
        setError('Failed to delete theatre');
        setLoading(false);
      });
  };

  const handleCreate = () => {
    setEditingTheatre(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTheatre(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const address = event.target.address.value;
    const capacity = event.target.capacity.value;

    if (name && address && capacity) {
      setLoading(true);
      const request = editingTheatre
        ? axios.put(`/theatres/${editingTheatre.id}`, { name, address, capacity })
        : axios.post('/theatres', { name, address, capacity });

      request.then(() => {
          setSuccess(editingTheatre ? 'Theatre updated successfully' : 'Theatre created successfully');
          fetchTheatres();
          handleCloseModal();
        })
        .catch(() => {
          setError(editingTheatre ? 'Failed to update theatre' : 'Failed to create theatre');
          setLoading(false);
        });
    }
  };

  return (
    <div className="container">
      <button className="btn btn-primary mb-3" onClick={handleCreate}>Create Theatre</button>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {theatres.map(theatre => (
            <tr key={theatre.id}>
              <td>{theatre.id}</td>
              <td>{theatre.name}</td>
              <td>{theatre.address}</td>
              <td>{theatre.capacity}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => handleEdit(theatre)}>Edit</button>
                {/* <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(theatre.id)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className={`modal ${isModalOpen ? 'd-block' : 'd-none'}`} tabindex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingTheatre ? 'Edit Theatre' : 'Create Theatre'}</h5>
                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close" style={{ marginLeft: 'auto' }}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" defaultValue={editingTheatre ? editingTheatre.name : ''} placeholder="Name" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" defaultValue={editingTheatre ? editingTheatre.address : ''} placeholder="Address" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label>Capacity</label>
                    <input type="number" name="capacity" defaultValue={editingTheatre ? editingTheatre.capacity : ''} placeholder="Capacity" className="form-control" required />
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

export default TheatresList;
