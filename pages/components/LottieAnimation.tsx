import React from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
  animationData: any;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData }) => {
  return <Lottie animationData={animationData} loop={true} autoplay style={{ width: "40%", height: "40%" }} />;
};

export default LottieAnimation;
