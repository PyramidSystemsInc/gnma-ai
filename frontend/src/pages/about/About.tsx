import React from 'react';
import styles from './About.module.css';

const About: React.FC = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1>About This Application</h1>
      <p>
        This Ginnie Mae HECM MBS Chatbot application was developed by Pyramid Systems Inc. 
        in collaboration with Ginnie Mae.
      </p>
      <p>
        The application utilizes advanced AI to provide users with information based solely on the 
        Ginnie Mae HECM MBS Base Prospectus (GINNIE MAE 5500.3, REV. 1). 
        Its purpose is to make understanding the prospectus easier and more accessible.
      </p>
      {/* Add more relevant information as needed */}
    </div>
  );
};

export default About; 