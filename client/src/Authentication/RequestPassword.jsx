import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';



export default function RequestPassword() {
    const [email, setEmail] = useState('');
    const { api_endpoint} = useContext(AuthContext);
    
     const [message, setMessage] = useState('A recovery link will be sent to this email');
     const navigate = useNavigate()

     const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`${api_endpoint}/admins/password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: { email } })
          });
          if (response.ok) {
            setMessage('Password reset email sent. Please check your inbox.');
            navigate('/password/reset/:resetToken')
          } else {
            setMessage('Error sending password reset email.');
          }
        } catch (error) {
          setMessage('An error occurred. Please try again.');
        }
      };
 
  return (
    <div className='lg:w-2/5 max-sm:w-4/5 max-md:w-3/5 m-auto'>
    <form onSubmit={handleSubmit} className='request
    px-5 py-10 m-auto flex flex-col gap-5 mt-20 rounded-lg shadow-lg' id='dashboard-header'>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder='example@gmail.com'
        className='ring-1 ring-gray-400 hover:ring-2 outline-none'
      />
      <button type="submit">Send Password Reset</button>
    </form>
    {message && <p className='text-center mt-5  text-gray-400'>{message}</p>}
    <p className='mt-5 text-center'>
    <Link to={'/login'} >← login</Link>
    </p>
  </div>
  )
}
