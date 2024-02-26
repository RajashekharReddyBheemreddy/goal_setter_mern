import { useDispatch } from "react-redux";
import { deleteGoals } from "../features/goals/goalSlice";
import { EditGoal } from "./EditGoal";
import { useState } from "react";

export const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  return (
    <>
      <div className="goal">
        <div>{new Date(goal.createdAt).toLocaleString("en-us")}</div>
        <h2>{goal.text}</h2>
        <button
          className="close"
          onClick={() => dispatch(deleteGoals(goal._id))}
        >
          X
        </button>
        <button className="edit" onClick={() => setId(goal)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            style={{ margin: "-9px", marginBottom: "9px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>
      {id && <EditGoal id={id} />}
    </>
  );
};
