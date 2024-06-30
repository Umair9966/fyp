import React, { useState } from 'react';
import UsersList from '../components/Users/UsersList';
import UserForm from '../components/Users/UserForm';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const UsersPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Users Management</h2>
      <div className="card">
        <div className="card-body">
          <UsersList />
        </div>
      </div>
      {/* <UserForm user={selectedUser} setUser={setSelectedUser} /> */}
    </div>
  );
};

export default UsersPage;
