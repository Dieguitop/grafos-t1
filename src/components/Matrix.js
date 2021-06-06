import React from "react";

export default function Matrix({ value, names }) {
  return (
    <>
      <div className="main_boxItem">
        <div>
          <p> &nbsp; </p>
          {names.map((name) => (
            <div className="main_boxMiniItem">
              <p>{name}</p>
            </div>
          ))}
        </div>
        {value.map((item, index) => (
          <div>
            <p>{names[index]}</p>
            {item.map((cell) => (
              <div className="main_boxMiniItem">
                <p className="main_p">
                  {cell === false ? "." : cell === true ? "✓" : cell} &nbsp;{" "}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
