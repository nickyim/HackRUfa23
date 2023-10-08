import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

function VideoRecorder() {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [showWebcam, setShowWebcam] = useState(false);

  const startCapture = () => {
    setRecordedChunks([]);  // Reset the recordedChunks at the start of a new capture

    setShowWebcam(true);
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        webcamRef.current.srcObject = stream;

        mediaRecorderRef.current = new MediaRecorder(stream);  // Omit mimeType to let the browser decide

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setRecordedChunks((prev) => prev.concat(event.data));
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(recordedChunks, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          window.open(url);
          setCapturing(false);
          setShowWebcam(false);
          setRecordedChunks([]);  // Reset the recordedChunks after processing
        };

        mediaRecorderRef.current.start();
        setCapturing(true);
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });
  };


  const stopCapture = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <div>
      {showWebcam && (
        <Webcam
          audio={false}
          ref={webcamRef}
          mirrored={true}
          width={640}
          height={480}
        />
      )}
      {capturing ? (
        <button onClick={stopCapture}>Stop Recording</button>
      ) : (
        <button onClick={startCapture}>Start Recording</button>
      )}
    </div>
  );
}

export default VideoRecorder;
