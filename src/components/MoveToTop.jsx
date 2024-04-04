import React, { useState } from 'react';
import { Fab } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

const ScrollToTopButton = () => {
  const [isVisible, ] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };



  return (
    <div>
      {isVisible && (
        <Fab color="primary" aria-label="scroll-to-top" onClick={scrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <KeyboardArrowUp />
        </Fab>
      )}
    </div>
  );
};

export default ScrollToTopButton;
