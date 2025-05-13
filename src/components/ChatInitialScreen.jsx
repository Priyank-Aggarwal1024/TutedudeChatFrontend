import { ArrowRight, bot, CloseSvg, logo, QuestionSvg } from "@/assets";
import "../assets/styles/ChatInitialScreen.css";
import { setOpenChat } from "@/features/ui/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setRoom } from "@/features/room/roomSlice";
function ChatInitialScreen() {
  const dispatch = useDispatch();
  const { mentorAvailable } = useSelector((store) => store.ui);

  return (
    <>
      <div className="tca-doubts-home">
        <div className="tca-doubts-home-top">
          <div className="tca-dht-logo-outer">
            <img src={logo} className="tca-dht-logo" alt="Logo" />
          </div>
          <CloseSvg
            cursor="pointer"
            size={16}
            onClick={() => dispatch(setOpenChat(false))}
          />
        </div>
        {!mentorAvailable ? (
          <div className="tca-doubts-home-bottom">
            <h2 className="tca-dhb-heading">
              The Mentor is Currently Unavailable{" "}
              <span className="tca-dhb-heading-pink">Drop Us a Message!</span>
            </h2>
            <div
              className="tca-dhb-question"
              onClick={() =>
                dispatch(setRoom({ id: "60a7b0f0b18b0d1234567891" }))
              }
            >
              <span>Ask a question?</span>
              <QuestionSvg />
            </div>
          </div>
        ) : (
          <div className="tca-doubts-home-bottom-mentoravailable">
            <h2 className="tca-dhbm-heading">
              <span className="tca-dhbm-heading-gray">Hi there </span>
              <span>👋</span>
              <br />
              <span className="tca-dhb-heading-pink">How can we help?</span>
            </h2>
            <div className="tca-dhbm-recent">
              <h3 className="tca-dhbm-recent-head">Recent message</h3>
              <div className="tca-dhbm-recent-bottom">
                <div className="tca-dhbmrb-left">
                  <img src={bot} alt="Bot" />
                  <div className="tca-dhbm-message">
                    <p className="tca-dhbm-message-text">
                      Can I learn ethical hacking on mac?
                    </p>
                    <p className="tca-dhbm-message-time">• 1 hour ago</p>
                  </div>
                </div>
                <div className="tca-dhbmrb-right">
                  <ArrowRight />
                </div>
              </div>
            </div>
            <div
              className="tca-dhb-question"
              onClick={() =>
                dispatch(setRoom({ id: "60a7b0f0b18b0d1234567891" }))
              }
            >
              <span>Ask a question?</span>
              <QuestionSvg />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatInitialScreen;
