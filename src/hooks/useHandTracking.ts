import { useEffect, useRef, useState, useCallback } from 'react';
import { Hands, Results, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

export interface HandTrackingResult {
  landmarks: any;
  tension: number;
  isDetecting: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export function useHandTracking(): HandTrackingResult {
  const [landmarks, setLandmarks] = useState<any>(null);
  const [tension, setTension] = useState(0);
  const [isDetecting, setIsDetecting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handsRef = useRef<Hands | null>(null);

  const onResults = useCallback((results: Results) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      setIsDetecting(true);
      const handLandmarks = results.multiHandLandmarks[0];
      setLandmarks(handLandmarks);

      // Calculate tension: Avg distance of finger tips (4,8,12,16,20) to wrist (0)
      const wrist = handLandmarks[0];
      const fingerTips = [4, 8, 12, 16, 20];
      let totalDist = 0;

      fingerTips.forEach((idx) => {
        const tip = handLandmarks[idx];
        const dist = Math.sqrt(
          Math.pow(tip.x - wrist.x, 2) +
          Math.pow(tip.y - wrist.y, 2) +
          Math.pow(tip.z - wrist.z, 2)
        );
        totalDist += dist;
      });

      const avgDist = totalDist / 5;
      // Heuristic: 0.15 (closed) to 0.4 (open)
      const minOpen = 0.15;
      const maxOpen = 0.4;
      let normalized = (avgDist - minOpen) / (maxOpen - minOpen);
      normalized = Math.max(0, Math.min(1, normalized));
      
      setTension(1.0 - normalized); // 1.0 = closed/tense, 0.0 = open/relaxed
    } else {
      setIsDetecting(false);
      setTension((prev) => prev * 0.9); // Smoothly decay tension
    }
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults(onResults);
    handsRef.current = hands;

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (handsRef.current && videoRef.current) {
          await handsRef.current.send({ image: videoRef.current });
        }
      },
      width: 320,
      height: 240,
    });

    camera.start().catch(console.error);

    return () => {
      camera.stop();
      hands.close();
    };
  }, [onResults]);

  return { landmarks, tension, isDetecting, videoRef };
}
