import { useRef, useEffect, useState } from 'react';

export default function ZoomPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const setupWebcam = async () => {
      try {
        // 사용자의 비디오 및 오디오에 접근
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: videoEnabled, audio: audioEnabled });

        // video 엘리먼트에 스트림 연결
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        console.log(mediaStream.getTracks(), 'tracks');

        // 스트림 상태 저장
        setStream(mediaStream);
        console.log(stream);
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    setupWebcam();
  }, [audioEnabled, videoEnabled]); // useEffect가 audioEnabled 또는 videoEnabled 값이 변경될 때마다 다시 실행

  useEffect(() => {
    const setupCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log(devices, 'devices');
      } catch (error) {
        console.error('ERROR', error);
      }
    };
    setupCameras();
  }, []);

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
  };

  return (
    <div>
      <h1>Webcam Demo</h1>
      <div>
        <video ref={videoRef} autoPlay playsInline />
      </div>
      <div>
        <button onClick={toggleAudio}>{audioEnabled ? '음성 끄기' : '음성 켜기'}</button>
        <button onClick={toggleVideo}>{videoEnabled ? '카메라 끄기' : '카메라 켜기'}</button>
      </div>
    </div>
  );
}
