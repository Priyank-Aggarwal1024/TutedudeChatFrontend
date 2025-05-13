import { useSelector } from "react-redux";
import "../assets/styles/Message.css";
import { convertTo12HourFormat, getFileType } from "@/utils";
import { FileSvg } from "@/assets";
import VideoMessage from "./VideoMessage";
import { useState } from "react";

const MessageComponent = ({ message, currentUser }) => {
  const [readMore, setReadMore] = useState(false);
  const len = String(message.data?.message || "").length || 0;
  return (
    <div
      className={`tca-message-row ${
        currentUser ? "tca-message-bycurrentuser" : "tca-message-byotheruser"
      }`}
    >
      {message.data?.message && (
        <div className="tca-message">
          {message.data?.message && (
            <pre className="tca-message-text">
              {String(message.data?.message || "").slice(
                0,
                !readMore && len > 1000 ? 1000 : len
              )}
              {!readMore && len > 1000 && (
                <span style={{ color: "black" }}> ... </span>
              )}
              {!readMore && len > 1000 && (
                <span
                  style={{
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={() => setReadMore(!readMore)}
                >
                  Read More
                </span>
              )}
            </pre>
          )}
          <div className="tca-message-time">
            {convertTo12HourFormat(message.data?.timeSent)},{" "}
            {message.data?.isRead ? "Seen" : "Not Seen"}
          </div>
        </div>
      )}
    </div>
  );
};
const FIleComponent = ({ message, file, currentUser = false }) => {
  return (
    <div
      className={`tca-message-row tca-file-container ${
        currentUser ? "tca-message-bycurrentuser" : "tca-message-byotheruser"
      }`}
    >
      <div className="tca-message">
        {["text", "pdf", "word", "excel", "ppt", "file"].includes(
          getFileType(file)
        ) ? (
          <div className="tca-file">
            <FileSvg
              className="tca-file-svg"
              fill={currentUser ? "#FF9DFF" : "#333333"}
            />
            <div className="tca-file-right">
              <div className="tca-file-right-name truncate-text">{file}</div>
            </div>
          </div>
        ) : ["image"].includes(getFileType(file)) ? (
          <div className="tca-file-image-outer">
            <div className="tca-file-image">
              <img src={file} alt={file} />
            </div>
          </div>
        ) : ["video"].includes(getFileType(file)) ? (
          <VideoMessage file={file} />
        ) : (
          ["audio"].includes(getFileType(file)) && (
            <div className="tca-file-audio-outer">
              <div className="tca-file-audio">
                <audio src={file} alt={file} controls></audio>
              </div>
            </div>
          )
        )}
        <div className="tca-message-time">
          {convertTo12HourFormat(message.data?.timeSent)},{" "}
          {message.data?.isRead ? "Seen" : "Not Seen"}
        </div>
      </div>
    </div>
  );
};

function Message({ message }) {
  const { userId } = useSelector((store) => store.user);

  return (
    <>
      {message.type == "message" ? (
        <>
          {message.data?.files &&
            message.data.files.length > 0 &&
            [...message.data.files].map((file, idx) => (
              <FIleComponent
                message={message}
                file={file}
                key={idx}
                userId={userId}
                currentUser={userId == message.data?.sender}
              />
            ))}
          <MessageComponent
            message={message}
            userId={userId}
            currentUser={userId == message.data?.sender}
          />
        </>
      ) : (
        <div className="tca-message-divider">
          <div className="tca-message-divider-left"></div>
          <span>{message.date}</span>
          <div className="tca-message-divider-right"></div>
        </div>
      )}
    </>
  );
}

export default Message;
