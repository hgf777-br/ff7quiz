/* eslint-disable react/prop-types */
// UncontrolledLottie.jsx
import React from 'react';
import Lottie from 'react-lottie';

function Ulottie({ animationData, width = 300, height = 300 }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={height}
        width={width}
      />
    </div>
  );
}

export default Ulottie;
