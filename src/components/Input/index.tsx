import { useState } from "react";
import css from "./index.module.scss";

export const Input = ({
  name,
  label,
  changeHandler,
  type = "text",
}: {
  name: string;
  label: string;
  changeHandler: (str: string) => void;
  type?: "text" | "number";
}) => {
  const [value, setValue] = useState("");

  const handleChange = (string: string) => {
    setValue(() => string);
    changeHandler(string);
  };

  return (
    <div className={css.wrapper}>
      <label htmlFor={name} className={css.label}>
        {label}
      </label>
      <input
        type={type}
        onInput={(e) => {
          if (e.target instanceof (EventTarget && HTMLInputElement)) {
            handleChange(e.target.value);
          }
        }}
        className={css.input}
        value={value}
        name={name}
        id={name}
      />
    </div>
  );
};
