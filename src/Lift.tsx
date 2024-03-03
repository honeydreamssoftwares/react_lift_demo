import React, { useEffect, useState } from "react";
//import { Button } from "./components/ui/button";
import { Badge } from "@/components/ui/badge";
import { currentFloorState,liftDirectionStateAtom } from "./atoms/LiftState";
import { useRecoilState } from "recoil";

// Define a type for the component props
interface LiftProps {
  floor: number;
  changeFloorCallback: (which_floor: number) => void;
}

const Lift: React.FC<LiftProps> = ({ floor, changeFloorCallback }) => {
  const [currentFloor, setCurrentFloor] = useRecoilState(currentFloorState);
  const [doorState, setDoorState] = useState<
    "closed" | "opening" | "open" | "closing"
  >("open");
  const [liftDirectionState, setliftDirectionState] = useRecoilState(liftDirectionStateAtom);

  useEffect(() => {
    console.log("currentFloor_diff", floor - currentFloor);
    let floor_difference = floor - currentFloor;

    const processMoveLift = () => {
      if (floor_difference > 0) {
        setCurrentFloor(currentFloor + 1);
        floor_difference--;
        setliftDirectionState("↑");
      } else {
        setCurrentFloor(currentFloor - 1);
        floor_difference++;
        setliftDirectionState("↓");
      }
    };

    if (floor !== currentFloor) {
      if (doorState === "open" || doorState === "opening") {
        setDoorState("closing");
      } else {
        const moveLift = setTimeout(() => {
          processMoveLift();
          setDoorState("opening");
        }, 1000);

        return () => clearTimeout(moveLift);
      }
    }

    if (doorState === "closing") {
      const closeDoor = setTimeout(() => {
        setDoorState("closed");
        if (floor !== currentFloor) {
          processMoveLift();
          setDoorState("opening");
        }
      }, 1000);
      return () => clearTimeout(closeDoor);
    } else if (doorState === "opening") {
      const openDoor = setTimeout(() => {
        //Lift is stopped now
        setliftDirectionState("");
        setDoorState("open");
      }, 1000);

      return () => clearTimeout(openDoor);
    }
  }, [doorState, floor, currentFloor]);

  const totalFloors = 4;

  return (
    <div className={`lift-container ${"floor-" + currentFloor} `}>
      <div className={`lift-door ${doorState}`}>
        <Badge variant={"destructive"}>
          L{currentFloor} {liftDirectionState}
        </Badge>
      <div className="floor-selection-buttons lift-button">
        {Array.from({ length: totalFloors }, (_, i) => totalFloors - 1 - i).map(
          (i) => (
            <Badge key={i} onClick={() => changeFloorCallback(i)}>
              {i !== 0 ? i : "G"}
            </Badge>
          )
        )}
      </div>

      </div>

    </div>
  );
};

export default Lift;
