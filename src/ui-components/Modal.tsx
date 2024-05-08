import { useContext, useState, useEffect } from "react";
import {
  BsChevronDown as DownArrow,
  BsChevronUp as UpArrow
} from "react-icons/bs";
import { GameContext } from "../App";
import { Button } from "../components";
import { EachLevel } from "../ui-components";
import {
  handleShowLevel,
  genRandLow,
  genLimits,
  genLuckyNumber,
  checkTrialStatus
} from "../helperFunction";

import { FiSun as Light } from "react-icons/fi";
import { BsMoonStarsFill as Dark } from "react-icons/bs";
import css from "../css/modal.module.css";

const Modal = () => {
  const [themeArr, setThemeArr] = useState<any>([]);
  const [levelArr, setLevelArr] = useState<any>([]);
  const [selLevel, setSelLevel] = useState<any>(null);
  const [tempTheme, setTempTheme] = useState<number>(1);
  const [showLevel, setShowLevel] = useState<boolean>(false);
  const [tempMode, setTempMode] = useState<string>("light");
  const {
    modalStatus,
    setModalStatus,
    settings,
    setSettings,
    setGameStatus,
    setLimits,
    setluckNumber,
    gameStatus
  } = useContext<any>(GameContext);
  const handleShow = () => {
    // console.log("false");
    setModalStatus({ ...modalStatus, show: false });
  };
  const changeLevel = (level: number) => {
    // console.log(level);
    setSelLevel(level);
  };
  const saveSettings = () => {
    const {status,trials} = checkTrialStatus(settings.level,gameStatus.trials)
    setSettings({
      ...settings,
      level: status?Number(selLevel):settings.level,
      theme: tempTheme,
      mode: tempMode
    });
    setModalStatus({ ...modalStatus, show: false });
  };

  const handleRetry = () => {
    let lowRand = genRandLow(settings.level);
    const { min, max } = genLimits(lowRand, settings.level);
    setLimits({ min, max });
    setluckNumber(genLuckyNumber(min, max));
    setSettings({ ...settings, level: 1 });
    setModalStatus({ modalStatus, contentType: 1, setting: 1, show: false });
    setGameStatus({ score: 0, gP: 0, trials: 3 });
  };

  useEffect(() => {
    setThemeArr(["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"]);
    setLevelArr(["Beginner", "Medium", "Hard", "Expert", "God Mode"]);
  }, []);

  useEffect(() => {
    setSelLevel(Number(settings.level));
    setTempTheme(Number(settings.theme));
    setTempMode(settings.mode);
  }, [settings, modalStatus]);

  return (
    <>
      {modalStatus.show ? (
        <div className={css.modal}>
          <div
            onClick={modalStatus.setting === 1 ? () => handleShow() : () => {}}
          ></div>
          <div className={css.modalContent}>
            {modalStatus && modalStatus.setting !== 2 ? (
              <span onClick={handleShow}>&times;</span>
            ) : (
              <></>
            )}
            {modalStatus.contentType === 1 ? (
              <div className={css.settingModal}>
                <h2>SETTINGS</h2>
                <div>
                  <span>Level</span>
                  <div>
                    <span>{showLevel ? <UpArrow /> : <DownArrow />}</span>
                    <span onClick={() => setShowLevel(!showLevel)}>
                      {handleShowLevel(selLevel)}
                    </span>
                    {showLevel ? (
                      <>
                        <div className={css.lDiv2}>
                          {levelArr.length > 0 ? (
                            levelArr.map((level: string, index: number) => (
                              <EachLevel
                                key={index}
                                level={level}
                                click={() => {
                                  changeLevel(index + 1);
                                  setShowLevel(false);
                                }}
                              />
                            ))
                          ) : (
                            <></>
                          )}
                        </div>
                        <div
                          className={css.lDiv}
                          onClick={() => setShowLevel(false)}
                        ></div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className={css.modeDiv}>
                  <span>Mode</span>
                  <div>
                    <Light />
                    <span
                      onClick={() =>
                        tempMode === "light"
                          ? setTempMode("dark")
                          : setTempMode("light")
                      }
                      style={
                        tempMode === "light"
                          ? { backgroundColor: "lightgrey" }
                          : { backgroundColor: "var(--dark-purple)" }
                      }
                    >
                      <span
                        style={
                          tempMode === "light"
                            ? { left: "0px" }
                            : { left: "calc(100% - 13px)" }
                        }
                      ></span>
                    </span>
                    <Dark />
                  </div>
                </div>
                <div>
                  <span>Wallpaper</span>
                  <div>
                    {themeArr &&
                      themeArr.length > 0 &&
                      themeArr.map((img: string, ind: number) => (
                        <img
                          className={
                            ind + 1 === tempTheme ? css.activeTheme : ""
                          }
                          onClick={() => setTempTheme(ind + 1)}
                          alt={`theme ${ind + 1}`}
                          src={`./images/${img}`}
                          key={ind}
                        />
                      ))}
                  </div>
                </div>
                <p>
                  <Button text="Save Settings" click={saveSettings} />
                </p>
              </div>
            ) : (
              <></>
            )}

            {modalStatus.contentType === 2 ? <div></div> : <></>}
            {modalStatus.contentType === 3 ? (
              <div className={css.gameOverModal}>
                <div>
                  <h2>Game Over</h2>
                  <p>Better luck next Time</p>
                  <p>
                    <Button text="Retry" click={handleRetry} />
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
