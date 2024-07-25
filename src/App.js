import { React, useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const App = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [answer, setAnswer] = useState("");

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  const handleCommand = (command) => {
    if (command.includes("안녕")) {
      speak("안녕하세요");
      setAnswer("안녕하세요");
    } else {
      speak("모르겠습니다.");
      setAnswer("모르겠습니다.");
    }
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  useEffect(() => {
    if (transcript) {
      handleCommand(transcript);
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>음성 인식이 지원되지 않는 브라우저인 것 같습니다...</span>;
  }

  return (
    <div>
      <nav>
        <button onClick={startListening}>Start</button>
        <button onClick={stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
      </nav>

      <h3>마이크 상태:</h3>
      <p>{listening ? "true" : "false"}</p>
      <h3>들은 문장: </h3>
      <p>{transcript}</p>
      <h3>답변: </h3>
      <p>{answer}</p>
    </div>
  );
};

export default App;
