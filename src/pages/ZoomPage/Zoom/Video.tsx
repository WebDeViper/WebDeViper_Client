import { useEffect, useRef } from 'react';

interface Props {
  stream: MediaStream | null;
}

export default function Video({ stream }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!stream) return;
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <video ref={videoRef} muted={true} autoPlay width={300} height={300}>
      Video
    </video>
  );
}
