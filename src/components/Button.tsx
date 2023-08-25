import React, { MouseEvent } from "react";

interface ButtonProps {
    action: (e: MouseEvent<HTMLButtonElement>) => void;
    id: string;
  name: string;
  style: string;
}

const Button = ({ action, id, name, style }: ButtonProps) => {
  return (
    <>
      <button
        id={id}
        onClick={(e) => action(e)}
        className={`hover:brightness-50 ${style}`}
      >
        {" "}
        {name}{" "}
      </button>
    </>
  );
};
export default Button;
