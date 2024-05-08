import { useContext } from "react";
import { GameContext } from "../App";
const EachLevel = ({ index, level, click }: any) => {
  const { settings } = useContext<any>(GameContext);
  return (
    <span
      onClick={click}
      style={settings.level === index ? { color: "var(--active-level)" } : {}}
    >
      {level}
    </span>
  );
};

export default EachLevel;
