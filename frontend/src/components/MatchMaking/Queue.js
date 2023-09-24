import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from '../CountdownTimer/CountdownTimer.js';
import { joinQueue, exitQueue } from '../../api/QueueApi.js';
import { errorHandler } from '../../utils/errors.js';

const Queue = ({ user, complexity, onCancel }) => {

  const [status, setStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reply = await joinQueue(user, complexity);
        setStatus(reply.data.response.message);
        setIsLoading(false);

        // Navigate to collaboration page if match is found
        const isMatch = reply.data.response.isMatch;
        if (isMatch) {
          const roomId = reply.data.response.roomId;
          navigate('/collaboration', { state: { roomId } });
        }
      } catch (error) {
        errorHandler(error);
      }
    };
    fetchData();
  }, [user, complexity, navigate]);

  const handleCancelClick = () => {
    try {
      exitQueue(user, complexity);
      onCancel();
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleBackClick = () => {
    onCancel();
  };

  return isLoading ? (
    <div className='container'>
      <div className='row d-flex justify-content-center gap-3' style={{ marginTop: '10px' }}>
        <CountdownTimer duration={30} />
        <button className='btn btn-danger' onClick={handleCancelClick} >Cancel</button>
      </div>
    </div>
  ) : (
    <div className='container'>
      <div className='row' style={{ marginTop: '10px' }}>
        <h1>{status}</h1>
        <button className='btn btn-secondary' onClick={handleBackClick} >Back</button>
      </div>
    </div>
  );
};

export default Queue;
