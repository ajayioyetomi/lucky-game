import { useContext } from "react";
import { IoMdSettings as Setting } from "react-icons/io";
import { GameContext } from "../App";
import css from "../css/header.module.css";

const Header = () => {
  const { modalStatus, setModalStatus } = useContext<any>(GameContext);
  const handlShowSettings = () => {
    setModalStatus({ ...modalStatus, show: true, contentType: 1, setting: 1 });
  };
  return (
    <header className={css.header}>
      <nav>
        <div>
          <span>
            <img alt={"logo"} src="./images/luckyLogo-1.png" />
          </span>
        </div>
        <div>
          <span onClick={handlShowSettings}>
            <Setting />
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
