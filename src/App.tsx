import { createContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header, Modal } from "./ui-components";
import { Game } from "./views";
import { genRandLow, genLimits, genLuckyNumber } from "./helperFunction";
import { GameStatusInterface } from "./interface";
import "./styles.css";

export const GameContext = createContext<any>({});

export default function App() {
  const [luckyNumber, setluckNumber] = useState(0);
  const [limits, setLimits] = useState({ min: 1, max: 10 });
  const [gameStatus, setGameStatus] = useState<GameStatusInterface>({
    trials: 3,
    score: 0,
    gP: 0
  });
  const [settings, setSettings] = useState({
    level: 1,
    mode: "light",
    logged_in: false,
    theme: 3
  });
  const [modalStatus, setModalStatus] = useState({
    show: false,
    contentType: 1,
    setting: 1
  });

  useEffect(() => {
    setModalStatus({
      show: false,
      contentType: 1,
      setting: 1
    });
    setSettings({
      level: 1,
      mode: "light",
      logged_in: false,
      theme: 3
    });
    setGameStatus({
      trials: 3,
      score: 0,
      gP: 0
    });
  }, []);

  useEffect(() => {
    if (typeof settings.level === "number") {
      let lowRand = genRandLow(settings.level);
      const { min, max } = genLimits(lowRand, settings.level);
      setLimits({ min, max });
      setluckNumber(genLuckyNumber(min, max));
    }
  }, [gameStatus.gP, settings.level]);
  // useEffect(() => {
  //   console.log(luckyNumber);
  // }, [luckyNumber]);
  return (
    <GameContext.Provider
      value={{
        luckyNumber,
        setluckNumber,
        limits,
        setLimits,
        settings,
        setSettings,
        modalStatus,
        setModalStatus,
        gameStatus,
        setGameStatus
      }}
    >
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Game />} />
        </Routes>
      </div>
      <Modal />
    </GameContext.Provider>
  );
}
