import {
  B_LOW,
  M_LOW,
  H_LOW,
  E_LOW,
  G_LOW,
  B_RANGE,
  M_RANGE,
  H_RANGE,
  E_RANGE,
  G_RANGE,
  BEGINNER_POINT,
  MEDIUM_POINT,
  HARD_POINT,
  EXPERT_POINT,
  GOD_MODE_POINT,
  B_TRIAL,
  M_TRIAL,
  H_TRIAL,
  E_TRIAL,
  G_TRIAL,
  B_GP,
  M_GP,
  H_GP,
  E_GP,
  G_GP
} from "../constants";

export const handleShowLevel = (arg: number | null): string => {
  return arg
    ? arg === 1
      ? "Beginner"
      : arg === 2
      ? "Medium"
      : arg === 3
      ? "Hard"
      : arg === 4
      ? "Expert"
      : "God Mode"
    : "";
};

export const genLimits = (arg: number, level: number): any => {
  let max: number = 0;
  let min: number = arg;
  max =
    level === 1
      ? min + B_RANGE
      : level === 2
      ? min + M_RANGE
      : level === 3
      ? min + H_RANGE
      : level === 4
      ? min + E_RANGE
      : arg + G_RANGE;
  return { min, max };
};

export const genRandLow = (level: number): number => {
  let min: number =
    level === 1
      ? B_LOW
      : level === 2
      ? M_LOW
      : level === 3
      ? H_LOW
      : level === 4
      ? E_LOW
      : G_LOW;
  let max: number =
    level === 1
      ? B_RANGE
      : level === 2
      ? M_RANGE
      : level === 3
      ? H_RANGE
      : level === 4
      ? E_RANGE
      : G_RANGE;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const genLuckyNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getPoint = (level: number): string => {
  return level === 1
    ? BEGINNER_POINT.toString()
    : level === 2
    ? MEDIUM_POINT.toString()
    : level === 3
    ? HARD_POINT.toString()
    : level === 4
    ? EXPERT_POINT.toString()
    : GOD_MODE_POINT.toString();
};

export const getTrials = (
  trial: number,
  level?: number,
  status?: boolean
): number => {
  if (!level) return Number(trial) - 1;
  return level === 1
    ? B_TRIAL
    : level === 2
    ? M_TRIAL
    : level === 3
    ? H_TRIAL
    : level === 4
    ? E_TRIAL
    : G_TRIAL;
};

export const getGPStatus = (
  gP: number,
  level: number
): { level: number; gP: number; status: boolean } => {
  const status: boolean = false;
  if (level === 1)
    return gP === B_GP
      ? { level: 2, gP: 0, status: true }
      : { level, gP, status };
  if (level === 2)
    return gP === M_GP
      ? { level: 3, gP: 0, status: true }
      : { level, gP, status };
  if (level === 3)
    return gP === H_GP
      ? { level: 4, gP: 0, status: true }
      : { level, gP, status };
  if (level === 4)
    return gP === E_GP
      ? { level: 5, gP: 0, status: true }
      : { level, gP, status };
  return gP === G_GP ? { level: 1, gP: 0, status } : { level, gP, status };
};

export const checkTrialStatus = (
  level: number,
  trials: number
): { status: boolean; trials?: number } => {
  const status: boolean = false;
  if (level === 1)
    return trials === B_TRIAL ? { status: true, trials: M_TRIAL } : { status };
  if (level === 2)
    return trials === M_TRIAL ? { status: true, trials: H_TRIAL } : { status };
  if (level === 3)
    return trials === H_TRIAL ? { status: true, trials: E_TRIAL } : { status };
  if (level === 4)
    return trials === E_TRIAL ? { status: true, trials: G_TRIAL } : { status };
  return trials === G_TRIAL ? { status: true, trials: B_TRIAL } : { status };
};
