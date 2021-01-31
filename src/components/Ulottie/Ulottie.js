/* eslint-disable react/prop-types */
// UncontrolledLottie.jsx
import React from 'react';
import Lottie from 'react-lottie';

function Ulottie({ animationData }) {
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
        height={300}
        width={300}
      />
    </div>
  );
}

export default Ulottie;
