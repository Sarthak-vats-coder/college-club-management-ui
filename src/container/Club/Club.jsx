import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import './Club.scss';
// For Production
// const API = "https://localhost/college-club-management-backend-service/view/allClubs";
//For Build
const API = "/college-club-management-backend-service/view/allClubs"; 

const Club = () => {
  const [clubs, setclubs] = useState([]);

  const fetchClubs = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.length > 0) {
        setclubs(data);
      }
      console.log(data);
    } catch (e) {
      console.error("Error fetching clubs:", e);
    }
  };

  useEffect(() => {
    fetchClubs(API);
  }, [API]);

  return (
    <>
      <h2 className="head-text">Currently Recognised <span>Clubs</span> <br />At <span>NIT Patna</span></h2>

      <div className="app__profiles">
        {clubs.length > 0 ? (
          clubs.map((club, index) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: 'tween' }}
              className="app__profile-item"
              key={club.name + index}
            >
              {/* Display profile picture if available */}
              {club.profilePicture ? (
                <img 
                  src={`data:image/jpeg;base64,${club.profilePicture}`} 
                  alt={`${club.name} profile`} 
                  className="club-profile-pic"
                />
              ) : (
                <div className="club-profile-placeholder">No Image</div>
              )}
              <h2 className="bold-text" style={{ marginTop: 20 }}>{club.name}</h2>
              <p className="p-text" style={{ marginTop: 10 }}>{club.description}</p>
            </motion.div>
          ))
        ) : (
          <p className="p-text" style={{ marginTop: 20 }}>No clubs available at the moment.</p>
        )}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Club, 'app__about'),
  'club',
  'app__whitebg',
);
