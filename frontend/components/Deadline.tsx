import { Text } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";

interface IDeadline {
  endTime: number;
}
const Deadline: FC<IDeadline> = ({ endTime }) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [timeState, setTimeState] = useState<number>(0);
  const [d, setD] = useState<number>(0);
  const [h, setH] = useState<number>(0);
  const [m, setM] = useState<number>(0);
  const [s, setS] = useState<number>(0);

  const countdown = async () => {
    try {
      let dateNow = Math.floor(Number(new Date()));
      let current = 0;
      let timestate = 0;

      let endDiff = endTime - dateNow / 1000;
      if (parseInt(endTime.toString()) == 0) {
        current = 0;
        timestate = 0;
        setCurrentTime(current);
      } else if (endDiff > 0) {
        current = parseInt(endTime.toString());
        timestate = 3;
        endDiff = endTime - dateNow / 1000;
        setCurrentTime(endDiff);
      } else {
        current = 0;
        timestate = 4;
        setCurrentTime(current);
      }

      setTimeState(timestate);
    } catch (e) {
      console.log("Error during countdown function", e);
    }
  };

  useEffect(() => {
    if (currentTime > 0) {
      const intervalId = setInterval(() => {
        var _days = Math.floor(currentTime / 86400);
        if (_days > 1) {
          _days = _days - 1;
        }
        var hours = Math.floor((currentTime % (3600 * 24)) / 3600);

        var minutes = Math.floor((currentTime % 3600) / 60);
        var seconds = Math.floor(currentTime % 60);
        setD(_days);
        setH(hours);
        setM(minutes);
        setS(seconds);

        setCurrentTime(currentTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      countdown();
    }
  }, [currentTime, endTime]);
  return (
    <>
      <Text css={{ color: "$descriptionFontColor" }}>
        Deadline: {h} : {m} : {s}
      </Text>
    </>
  );
};

export default Deadline;
