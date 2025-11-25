'use client';

import React from 'react';
import Lottie from 'lottie-react';

const LottieIcon = ({ animationPath, className = '' }) => {
  const [animationData, setAnimationData] = React.useState(null);

  React.useEffect(() => {
    if (animationPath) {
      fetch(animationPath)
        .then((response) => response.json())
        .then((data) => setAnimationData(data))
        .catch((error) => {
          console.error('Error loading Lottie animation:', error);
        });
    }
  }, [animationPath]);

  if (!animationData) {
    return null;
  }

  return (
    <div className={className}>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottieIcon;

