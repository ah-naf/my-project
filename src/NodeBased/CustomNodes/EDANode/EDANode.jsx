import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Handle, Position, useReactFlow } from "reactflow";
import {
  setNodeIdRedux,
  setPlotOptionRedux,
  setPlotRedux,
} from "../../../Slices/NodeBasedSlices/EDASlice";
import { setActiveID, setNodeType, setRightSidebarData } from "../../../Slices/SideBarSlice";
import { handlePlotOptions } from "../../../util/NodeFunctions";
import UpdateEDANode from "../../UpdateNodes/UpdateEDANode/UpdateEDANode";

function EDANode({ id, data }) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const rflow = useReactFlow();
  const type = rflow.getNode(id).type;
  const activeID = useSelector((state) => state.sideBar.active_id);

  useEffect(() => {
    if (activeID === id) {
      dispatch(setRightSidebarData(data));
    }
  }, [activeID, id, data]);

  useEffect(() => {
    (async function () {
      const temp = rflow
        .getEdges()
        .filter(
          (edge) =>
            edge.source === id && rflow.getNode(edge.target).type === "Graph"
        );
      temp.forEach(async (val) => {
        await handlePlotOptions(rflow, val);
      });
    })();
    if (data) {
      dispatch(setPlotOptionRedux(data.plotOption));
      dispatch(setPlotRedux(data.plot));
    }
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setNodeIdRedux(id));
  }, [dispatch, visible]);

  return (
    <>
      <div
        className="relative flex bg-white border-2 border-black shadow-[6px_6px_0_1px_rgba(0,0,0,0.7)]"
        onDoubleClick={() => {
          setVisible(!visible);
        }}
        onClick={() => {
          dispatch(setRightSidebarData(data));
          dispatch(setNodeType(type));
          dispatch(setActiveID(id));
        }}
      >
        <Handle type="source" position={Position.Right}></Handle>
        <Handle type="target" position={Position.Left}></Handle>
        {activeID === id && (
          <div className="absolute w-2.5 h-2.5 rounded-full top-0 left-0 translate-x-1/2 translate-y-1/2 bg-green-700"></div>
        )}
        <div className="grid place-items-center p-2 py-3 min-w-[80px]">
          <InsertChartOutlinedIcon />
          <span>EDA</span>
        </div>
      </div>
      {data && data.table && (
        <UpdateEDANode
          visible={visible}
          setVisible={setVisible}
          csvData={data.table}
          id={id}
        />
      )}
    </>
  );
}

export default EDANode;
