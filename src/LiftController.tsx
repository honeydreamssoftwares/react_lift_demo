import React, { useState } from "react";
import Lift from "./Lift"; 
import { Badge } from "@/components/ui/badge";
import { currentFloorState, liftDirectionStateAtom } from "./atoms/LiftState";
import { useRecoilValue } from "recoil";
import { Label } from "@/components/ui/label";

const LiftController: React.FC = () => {
  const [floor, setFloor] = useState(0);
  const currentFloor = useRecoilValue(currentFloorState);
  const liftDirection = useRecoilValue(liftDirectionStateAtom);
  const changeFloorCallback = (which_floor: number) => {
    setFloor(which_floor);
  };

  return (
    <div className="columns-1">
      <div className="building">
        <div className="floors"></div>
        <div className="floors">
          <div className="floor">
            <Label>Level 3</Label>
            <br></br>
            <Badge variant={"destructive"}>
              Lift at L{currentFloor} {liftDirection}
            </Badge>{" "}
            <Badge className="lift-button"  onClick={() => changeFloorCallback(3)}>O</Badge>{" "}
          </div>
          <div className="floor">
            <Label>Level 2</Label>
            <br></br>
            <Badge variant={"destructive"}>
              Lift at L{currentFloor} {liftDirection}
            </Badge>
            <Badge className="lift-button" onClick={() => changeFloorCallback(2)}>O</Badge>{" "}
          </div> 
          <div className="floor">
            <Label>Level 1</Label> <br></br>
            <Badge variant={"destructive"}>
              Lift at L{currentFloor} {liftDirection}
            </Badge>
            <Badge className="lift-button" onClick={() => changeFloorCallback(1)}>O</Badge>{" "}
          </div>
          <div className="floor">
            <Label>Level G</Label> <br></br>
            <Badge variant={"destructive"}>
              Lift at L{currentFloor} {liftDirection}
            </Badge>
            <Badge className="lift-button" onClick={() => changeFloorCallback(0)}>O</Badge>{" "}
          </div>
        </div>
        <Lift floor={floor} changeFloorCallback={changeFloorCallback} />
      </div>
    </div>
  );
};

export default LiftController;
