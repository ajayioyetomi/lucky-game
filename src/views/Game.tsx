import { useContext, useState, useRef, useEffect } from "react";
import { IoMdInformationCircleOutline as Info } from "react-icons/io";
import { GameContext } from "../App";
import {
  handleShowLevel,
  getPoint,
  getTrials,
  getGPStatus,
  checkTrialStatus
} from "../helperFunction";
import css from "../css/game.module.css";

const Game = () => {
  const [message, setMessage] = useState<string>("");
  const [inputVal, setInputVal] = useState<string>("");
  // const [tempGp, setTempGp] = useState<number>(0);
  const paraRef = useRef<null | HTMLParagraphElement>(null);
  const btnRef = useRef<null | HTMLButtonElement>(null);
  const {
    settings,
    setSettings,
    limits,
    luckyNumber,
    gameStatus,
    setGameStatus,
    setModalStatus,
    modalStatus
  } = useContext(GameContext);

  const handleInputChange = (e: any) => {
    let value = e.target.value;
    setInputVal(value.trim());
    if (isNaN(Number(value)) && value.length >= 1) {
      while (isNaN(Number(value)) && value.length > 1) {
        value = value.slice(0, value.length - 1);
      }
      if (isNaN(Number(value)) && value.length === 1) {
        value = "";
      }
      setInputVal(value);
    }
  };

  const handleGuess = () => {
    if (typeof inputVal === "undefined" || inputVal === "") {
      setMessage("Enter a number");
    } else {
      if (btnRef && btnRef.current) {
        btnRef.current.disabled = true;
      }
      let guess: number = Number(inputVal);
      if (guess > luckyNumber) {
        setGameStatus({
          ...gameStatus,
          trials: getTrials(gameStatus.trials)
        });
        setMessage("Lucky number is lower");
      } else if (guess < luckyNumber) {
        setGameStatus({
          ...gameStatus,
          trials: getTrials(gameStatus.trials)
        });
        setMessage("Lucky number is higher");
      } else {
        setGameStatus({
          ...gameStatus,
          score: gameStatus.score + Number(getPoint(settings.level))
        });
        setMessage(`${getPoint(settings.level)} more points for you`);
      }
    }
    setInputVal("");
    if (paraRef && paraRef.current) {
      paraRef.current.style.color = "var(--purple-color)";
    }
    setTimeout(() => {
      if (paraRef && paraRef.current) {
        paraRef.current.style.color = "transparent";
      }
      if (btnRef && btnRef.current) {
        btnRef.current.disabled = false;
      }
    }, 1000);
  };

  useEffect(() => {
    if (gameStatus.trials !== 0 && typeof gameStatus.score === "number") {
      let tempGp = Number(gameStatus.gP) + Number(getPoint(settings.level));
      let { level, gP, status } = getGPStatus(tempGp, settings.level);
      //console.log(level);
      setGameStatus({
        ...gameStatus,
        gP,
        trials: getTrials(gameStatus.trials, level, status)
      });
      setSettings({ ...settings, level });
    }
  }, [gameStatus.score]);

  useEffect(() => {
    if (typeof gameStatus.trials === "number" && gameStatus.trials === 0) {
      //gameOver
      setModalStatus({
        ...modalStatus,
        contentType: 3,
        setting: 2,
        show: true
      });
    }
  }, [gameStatus.trials]);

  useEffect(() => {
    if (typeof settings.level === "number") {
      const trials = getTrials(gameStatus.trials, settings.level);
      setGameStatus({ ...gameStatus, trials });
    }
  }, [settings.level]);

  return (
    <section className={css.section}>
      <div
        style={{
          backgroundImage: `url(./images/img${settings.theme}.jpg)`
        }}
      ></div>
      <div></div>
      <div>
        <div>
          <span>Level: {handleShowLevel(settings.level)}</span>
          <span>Score: {gameStatus.score ? gameStatus.score : "0"}</span>
          <span>Trial: {gameStatus.trials ? gameStatus.trials : "0"}</span>
        </div>
        <div>
          <p className={css.headPara}>
            Guess a number between {limits ? limits.min : "1"} and{" "}
            {limits ? limits.max : "10"}
          </p>
          <div className={css.guessDiv}>
            <p ref={paraRef}>{message ? message : ""}</p>
            <label>
              <input
                placeholder="Enter a lucky number"
                value={inputVal ? inputVal : ""}
                onChange={(e) => handleInputChange(e)}
              />
            </label>
            <button ref={btnRef} onClick={handleGuess}>
              Make a Guess
            </button>
          </div>
        </div>
        <span>
          <Info />
        </span>
      </div>
    </section>
  );
};

export default Game;
