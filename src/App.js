import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";

const App = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [answer, setAnswer] = useState("");
  const URL = "";

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  const handleCommand = async (command) => {
    // API에 명령어 전송 및 응답 처리
    const responseAnswer = await sendCommandToApi(command);
    if (responseAnswer) {
      setAnswer(responseAnswer);
      speak(responseAnswer);
    }
  };

  const sendCommandToApi = async (command) => {
    try {
      const response = await axios.post(URL, { command });
      console.log("API 응답:", response.data);
      return response.data.answer; // API에서 받은 답변을 반환
    } catch (error) {
      console.error("API 요청 실패:", error);
      return null;
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
