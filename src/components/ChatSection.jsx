import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/ChatSection.css";
import { groupMessagesByDate } from "@/utils";
import { ArrowRight, CloseSvg, DocumentSvg, EmojiSvg, SendSvg } from "@/assets";
import { Message } from ".";
import { useRef, useState } from "react";
import { setRoom } from "@/features/room/roomSlice";
import { setOpenChat } from "@/features/ui/uiSlice";
function ChatSection() {
  const { messages } = useSelector((store) => store.room);
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState({
    message: "",
    files: [],
  });
  const textareaRef = useRef(null);

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const maxHeight = 5 * 16;
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
      textarea.style.overflowY =
        textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    }
  };
  return (
    <div className="chat-section">
      <div className="chat-section-top">
        <div className="chat-st-left">
          <ArrowRight
            height="16"
            color="black"
            rotate={true}
            onClick={() => dispatch(setRoom({}))}
          />
          <div className="chat-st-left-messageus">Message us</div>
        </div>
        <CloseSvg
          cursor="pointer"
          onClick={() => dispatch(setOpenChat(false))}
        />
      </div>
      <div className="chat-section-messages">
        {groupMessagesByDate(messages).map((message, idx) => (
          <Message key={idx} message={message} />
        ))}
      </div>
      <div className="chat-section-inpopt">
        <div className="chat-section-inpopt-inner">
          <textarea
            ref={textareaRef}
            name="chat-message-typed"
            id="chat-message-typed"
            className="chat-section-inpopt-input chat-textarea-input"
            value={inputMessage.message}
            onChange={({ target }) => {
              setInputMessage({ ...inputMessage, message: target.value });
              autoResize();
            }}
            placeholder="Ask a question...."
            rows={1}
          />
          <EmojiSvg
            cursor="pointer"
            style={{ minHeight: "20px", minWidth: "20px" }}
          />
          <label htmlFor="chat-inp-file" className="chat-section-input-file">
            <DocumentSvg
              cursor="pointer"
              style={{ minHeight: "20px", minWidth: "20px" }}
            />
          </label>
          <input
            type="file"
            id="chat-inp-file"
            name="chat-inp-file"
            className="chat-inp-file"
            multiple
            onChange={({ target }) =>
              setInputMessage((prev) => ({
                ...prev,
                files: [...prev.files, ...Array.from(target.files)],
              }))
            }
          />
          <div
            className="chat-section-inpopt-sendsvg"
            onClick={() => console.log(inputMessage)}
          >
            <SendSvg />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSection;
