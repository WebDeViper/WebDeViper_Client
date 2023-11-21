const calculateTime = (seconds: number) => {
  seconds = Math.floor(seconds);
  const hour = Math.floor(seconds / 3600);
  seconds = seconds % 3600;
  const minute = Math.floor(seconds / 60);
  const second = seconds % 60;

  const formattedHour = hour.toString().padStart(2, '0');
  const formattedMinute = minute.toString().padStart(2, '0');
  const formattedSecond = second.toString().padStart(2, '0');

  return `${formattedHour}:${formattedMinute}:${formattedSecond}`;
};

export default calculateTime;
