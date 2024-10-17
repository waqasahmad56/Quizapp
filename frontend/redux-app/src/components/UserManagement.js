
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUsers,
  setLoading,
  setError,
} from '../features/users/usersSlice';
import {
  fetchUsers,
  createUser,
  updateUser as updateUserAPI,
  deleteUser as deleteUserAPI,
} from '../api/api'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { userList, loading, error } = useSelector(state => state.users);
  
  const [formData, setFormData] = useState({ id: '', firstname: '', lastname: '', email: '', password: '', role: 'student' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      dispatch(setLoading(true));
      try {
        const usersData = await fetchUsers();
        dispatch(setUsers(usersData));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadUsers();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateUserAPI(formData);
      } else {
        await createUser(formData);
      }
      resetForm();
      window.location.reload();
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const handleEditUser = (user) => {
    setFormData(user);
    setIsEditing(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserAPI(userId);
      window.location.reload(); 
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const resetForm = () => {
    setFormData({ id: '', firstname: '', lastname: '', email: '', password: '', role: 'student' });
    setIsEditing(false);
  };

  return (
    <div className="container mt-2 ">
      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row mb-4 ">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="mb-4 mylist myform2 ">
          <h1 className="mb-4 d-flex justify-content-center">User Management</h1>

            <div className="form ">
              <div className="col mt-3 ">
                <input
                  type="text"
                  name="firstname"
                  className="form-control formselect"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col mt-3">
                <input
                  type="text"
                  name="lastname"
                  className="form-control formselect"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col mt-3">
                <input
                  type="email"
                  name="email"
                  className="form-control formselect"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col mt-3">
                <input
                  type="password"
                  name="password"
                  className="form-control formselect"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col mt-3">
                <select
                  name="role"
                  className="form-control formselect"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="col mt-3">
                <button type="submit" className="btn btn-success">
                  {isEditing ? 'Update User' : 'Add User'}
                </button>
                {isEditing && (
                  <button type="button" className="btn btn-secondary ml-2" onClick={resetForm}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-6">
          <div className="" style={{ height: 'calc(100vh - 250px)' }}>
            <ul className="list-group mylist">
              <h1 className='mb-3'>Users Lists</h1>
              {userList.map(user => (
                <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center border ">
                  {user.firstname} {user.lastname} ({user.email}) - {user.role}
                  <div className='d-flex gap-3'>
                    <button className="btn btn-warning btn-sm" onClick={() => handleEditUser(user)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;




































































































































































































































































































































































































