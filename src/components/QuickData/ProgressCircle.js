import React from 'react';

const ProgressCircle = ({ radius, stroke, data, onEarnings }) => {
  const { initialBalance, total } = data;
  const progressSvgValue = ($radius, $stroke, totalAmount) => {
    const normalizedRadius = $radius - $stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const progress = totalAmount / initialBalance;
    const strokeDashoffset = circumference - progress * circumference;

    return { strokeDashoffset, circumference, normalizedRadius };
  };

  const circle1 = progressSvgValue(radius, stroke, total);

  const getStrokeClr = () => {
    const progressDoneStroke = onEarnings ? '#F5AD42' : '#316CD3';
    const totalProgressStroke = onEarnings ? '#316CD3' : '#F5AD42';
    return { progressDoneStroke, totalProgressStroke };
  };

  const strokeClr = getStrokeClr();
  return (
    <>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke={strokeClr.totalProgressStroke}
          fill="transparent"
          strokeWidth={1}
          strokeDasharray={`${circle1.circumference} ${circle1.circumference}`}
          style={{ strokeDashoffset: 0 }}
          r={circle1.normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={strokeClr.progressDoneStroke}
          fill="transparent"
          strokeWidth={4}
          strokeDasharray={`${circle1.circumference} ${circle1.circumference}`}
          style={{ strokeDashoffset: circle1.strokeDashoffset }}
          r={circle1.normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    </>
  );
};

export default ProgressCircle;
