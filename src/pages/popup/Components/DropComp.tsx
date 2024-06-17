import { MetaData } from "../utils";
import * as React from "react";
import { useDrop } from "react-dnd";
import DragComp from "./DragComp";

interface DropCompProps {
  metaDataList: MetaData[];
  r: number;
  c: number;

  setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>;
  setMetaDataSelected: React.Dispatch<React.SetStateAction<number>>;
  setDrawerState: React.Dispatch<React.SetStateAction<boolean>>;
}

const colSize: Record<number, number> = {
  1: 12,
  2: 6,
  3: 4,
  4: 3,
};
const DropComp: React.VFC<DropCompProps> = ({
  metaDataList,
  r,
  c,
  setMetaDataList,
  setMetaDataSelected,
  setDrawerState
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "card",
    drop: (item: MetaData) => {
      addDataToBoard(item);
    },
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  //var colIndex = value % cols;
  //var rowIndex = Math.floor(value / cols);
  const addDataToBoard = (item: MetaData) => {
    if (
      metaDataList.some((a) => a.cord[0] == c && a.cord[1] == r)
    ) {
      return;
    }

    setMetaDataList(
      [...metaDataList].map((object) => {
        if (object.id === item.id) {
          return {
            ...object,
            cord: [c, r],
          };
        } else return object;
      })
    );
  };

  return (

    <div className="flex w-full h-full min-h-[100px] items-center justify-center rounded-md border border-dashed border-slate-400" ref={drop}>
      {metaDataList.map((data) => {
        if (data.cord[0] == c && data.cord[1] == r) {
          return (
            <DragComp
              metadata={data}
              metaDataList={metaDataList}
              setMetaDataList={setMetaDataList}
              setMetaDataSelected={setMetaDataSelected}
              setDrawerState={setDrawerState}
            />
          );
        }
      })}
    </div>
  );
};
export default DropComp;