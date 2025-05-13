import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { ChatInitialScreen, ChatSection } from "./components";
import { setOpenChat, setWindowWidth } from "./features/ui/uiSlice";

function App() {
  const { roomId } = useSelector((store) => store.room);
  const { openChat } = useSelector((store) => store.ui);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      dispatch(setWindowWidth(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);
  return (
    <>
      <div className="app">
        {!openChat && (
          <button
            className="tca-open-chat"
            onClick={() => dispatch(setOpenChat(!openChat))}
          >
            Chat with mentor
          </button>
        )}
        {openChat && (
          <div className={"tutedude-chat-app"}>
            <div className="tca-doubts">
              {roomId ? <ChatSection /> : <ChatInitialScreen />}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
