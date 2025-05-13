import { MuteSvg, PauseSvg, PlaySvg, UnmuteSvg, VideoSvg } from "@/assets";
import { setActiveVideoId } from "@/features/ui/uiSlice";
import { formatDuration } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function VideoMessage({ file }) {
  const dispatch = useDispatch();
  const { activeVideoId } = useSelector((store) => store.ui);
  const videoRef = useRef(null);
  const uniqueIdRef = useRef(crypto.randomUUID());
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [showControls, setShowControls] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      dispatch(setActiveVideoId(uniqueIdRef.current));
    } else {
      video.pause();
      dispatch(setActiveVideoId(null));
    }
  };
  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };
  const handleMouseMove = () => {
    setShowControls(true);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
    }
    if (!video || !uniqueIdRef.current) return;
    if (activeVideoId != uniqueIdRef.current) {
      video.pause();
    }
  }, [activeVideoId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleLoadedMetadata = () => {
      setDuration(formatDuration(video.duration));
    };
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="tca-file-video-outer">
      <div className="tca-file-video">
        <video
          src={file}
          ref={videoRef}
          onEnded={() => dispatch(setActiveVideoId(null))}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseMove}
        />
        {showControls && (
          <div className="tca-file-video-inner">
            {activeVideoId === uniqueIdRef.current ? (
              <PauseSvg onClick={togglePlayback} />
            ) : (
              <PlaySvg onClick={togglePlayback} />
            )}
          </div>
        )}
        <div className="tca-file-video-inner-bottom">
          <div className="tca-file-video-inner-bottom-left">
            <VideoSvg />
            <span>{duration}</span>
          </div>
          {showControls && (
            <div className="tca-file-video-inner-bottom-right">
              {isMuted ? (
                <MuteSvg onClick={toggleMute} />
              ) : (
                <UnmuteSvg onClick={toggleMute} />
              )}
              <span>{formatDuration(currentTime)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoMessage;
