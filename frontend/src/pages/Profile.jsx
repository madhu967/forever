import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { backendUrl, token, setToken, setCartItems, navigate, getCartCount } = useContext(ShopContext);

  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(backendUrl + '/api/user/profile', {
        headers: { token }
      });

      if (response.data.success) {
        setUserData(response.data.user);
        setName(response.data.user.name);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + '/api/user/update-profile',
        { name },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setUserData(prev => ({ ...prev, name }));
        setIsEditing(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login');
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchUserProfile();
    }
  }, [token]);

  if (loading) {
    return (
      <div className='min-h-[50vh] flex items-center justify-center'>
        <p className='text-gray-500 text-lg'>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className='border-t pt-10 pb-20 max-w-2xl mx-auto'>
      <div className='text-2xl text-center mb-8'>
        <Title text1={'MY'} text2={'PROFILE'} />
      </div>

      <div className='bg-white shadow-sm border border-gray-200 rounded-lg p-6 sm:p-8 flex flex-col gap-6'>
        {/* User Avatar & Header */}
        <div className='flex items-center gap-4 pb-6 border-b border-gray-100'>
          <div className='w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-semibold'>
            {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className='text-xl font-medium text-gray-800'>{userData?.name}</h2>
            <p className='text-gray-500 text-sm'>{userData?.email}</p>
          </div>
        </div>

        {/* Profile Details */}
        {isEditing ? (
          <form onSubmit={handleUpdateProfile} className='flex flex-col gap-4'>
            <div>
              <label className='block text-sm text-gray-600 mb-1 font-medium'>Full Name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-black'
                required
              />
            </div>
            <div>
              <label className='block text-sm text-gray-600 mb-1 font-medium'>Email Address</label>
              <input
                type='email'
                value={userData?.email || ''}
                disabled
                className='w-full px-3 py-2 border border-gray-200 bg-gray-100 text-gray-500 rounded outline-none cursor-not-allowed'
              />
            </div>
            <div className='flex gap-3 mt-2'>
              <button
                type='submit'
                className='bg-black text-white px-6 py-2 rounded text-sm hover:bg-gray-800 transition'
              >
                Save Changes
              </button>
              <button
                type='button'
                onClick={() => {
                  setName(userData?.name || '');
                  setIsEditing(false);
                }}
                className='border border-gray-300 px-6 py-2 rounded text-sm text-gray-600 hover:bg-gray-50 transition'
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between py-2 border-b border-gray-50'>
              <span className='text-gray-500 text-sm'>Full Name</span>
              <span className='text-gray-800 font-medium text-sm'>{userData?.name}</span>
            </div>
            <div className='flex justify-between py-2 border-b border-gray-50'>
              <span className='text-gray-500 text-sm'>Email</span>
              <span className='text-gray-800 font-medium text-sm'>{userData?.email}</span>
            </div>
            <div className='flex justify-between py-2 border-b border-gray-50'>
              <span className='text-gray-500 text-sm'>Cart Items</span>
              <span className='text-gray-800 font-medium text-sm'>{getCartCount()}</span>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className='mt-2 self-start border border-black text-black px-5 py-2 rounded text-sm hover:bg-black hover:text-white transition'
            >
              Edit Profile
            </button>
          </div>
        )}

        {/* Quick Links & Actions */}
        <div className='pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-between'>
          <button
            onClick={() => navigate('/orders')}
            className='border border-gray-300 px-5 py-2.5 rounded text-sm text-gray-700 hover:bg-gray-50 transition'
          >
            View My Orders
          </button>
          <button
            onClick={logout}
            className='bg-red-50 text-red-600 border border-red-200 px-5 py-2.5 rounded text-sm hover:bg-red-100 transition'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
