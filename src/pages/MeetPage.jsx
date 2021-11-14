import randomstring from "randomstring";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MeetContext } from "../context/MeetContext";

const MeetPage = () => {
  //AS OF NOW DOMAIN WOULD BE JITSI'S AS WE ARE STILL USING SERVERS
  const domain = "meet.jit.si";
  let api = {};

  const history = useHistory();

  // THIS IS TO EXTRACT THE NAME WHICH WAS FILLED IN THE FIRST PAGE
  const [name] = useContext(MeetContext);

  const [meet, setMeet] = useState({
    // WE WILL
    room: randomstring.generate({
      length: 12,
      charset: "alphabetic",
    }),

    user: {
      name: name,
    },
    isAudioMuted: false,
    isVideoMuted: false,
  });

  const startMeet = useCallback(() => {
    const options = {
      roomName: meet.room,
      width: "100%",
      height: 500,
      configOverwrite: { prejoinPageEnabled: false },
      interfaceConfigOverwrite: {
        // overwrite interface properties
      },
      parentNode: document.querySelector("#jitsi-iframe"),
      userInfo: {
        displayName: meet.user.name,
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    api = new window.JitsiMeetExternalAPI(domain, options);

    api.addEventListeners({
      readyToClose: handleClose,
      participantLeft: handleParticipantLeft,
      participantJoined: handleParticipantJoined,
      videoConferenceJoined: handleVideoConferenceJoined,
      videoConferenceLeft: handleVideoConferenceLeft,
      audioMuteStatusChanged: handleMuteStatus,
      videoMuteStatusChanged: handleVideoStatus,
    });
  }, [api]);

  useEffect(() => {
    if (window.JitsiMeetExternalAPI) {
      startMeet();
    } else {
      alert("JitsiMeetExternalAPI not loaded");
    }
  }, [startMeet]);

  const handleClose = () => {
    console.log("handleClose");
  };

  const handleParticipantLeft = async (participant) => {
    console.log("handleParticipantLeft", participant);
    await getParticipants();
  };

  const handleParticipantJoined = async (participant) => {
    console.log("handleParticipantJoined", participant);
    await getParticipants();
  };

  const handleVideoConferenceJoined = async (participant) => {
    console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    await getParticipants();
  };

  const handleVideoConferenceLeft = () => {
    console.log("handleVideoConferenceLeft");
    history.push("/thank-you");
  };

  const handleMuteStatus = (audio) => {
    console.log("handleMuteStatus", audio); // { muted: true }
  };

  const handleVideoStatus = (video) => {
    console.log("handleVideoStatus", video); // { muted: true }
  };

  const getParticipants = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(api.getParticipantsInfo()); // get all participants
      }, 500);
    });
  };

  // custom events
  const executeCommand = (command) => {
    this.api.executeCommand(command);
    if (command === "hangup") {
      history.push("/thank-you");
    }

    if (command === "toggleAudio") {
      setMeet({ ...meet, isAudioMuted: !meet.isAudioMuted });
    }

    if (command === "toggleVideo") {
      setMeet({ ...meet, isVideoMuted: !meet.isVideoMuted });
    }
  };

  return (
    <React.Fragment>
      <header style={{ backgroundColor: "rgb(10, 25, 41)" }}>
        <p className="text-white ms-4 mt-0 mb-0 py-3">HIRA</p>
      </header>
      <div id="jitsi-iframe" className="mb-0"></div>
      <div
        style={{
          backgroundColor: "rgb(10, 25, 41)",
          height: "20vh",
          margin: 0,
        }}
      >
        {/* <span>Custom Controls</span> */}
      </div>
      <div class="item-center">
        <span>&nbsp;&nbsp;</span>
        <i
          onClick={() => executeCommand("toggleAudio")}
          className={`fas fa-2x grey-color ${
            meet.isAudioMuted ? "fa-microphone-slash" : "fa-microphone"
          }`}
          aria-hidden="true"
          title="Mute / Unmute"
        ></i>
        <i
          onClick={() => executeCommand("hangup")}
          className="fas fa-phone-slash fa-2x red-color"
          aria-hidden="true"
          title="Leave"
        ></i>
        <i
          onClick={() => executeCommand("toggleVideo")}
          className={`fas fa-2x grey-color ${
            meet.isVideoMuted ? "fa-video-slash" : "fa-video"
          }`}
          aria-hidden="true"
          title="Start / Stop camera"
        ></i>
        <i
          onClick={() => executeCommand("toggleShareScreen")}
          className="fas fa-film fa-2x grey-color"
          aria-hidden="true"
          title="Share your screen"
        ></i>
      </div>
    </React.Fragment>
  );
};

export default MeetPage;
