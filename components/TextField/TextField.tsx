import styles from "./TextField.module.scss";
import { ChangeEventHandler, MouseEventHandler, RefObject } from "react";

export const TextField = ({
  append,
  prepend,
  placeholder,
  prependClicked,
  handleInputChange,
  searchTerm,
  inputRef,
}: {
  append: JSX.Element;
  prepend: JSX.Element;
  placeholder: string;
  prependClicked: MouseEventHandler<HTMLDivElement>;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  searchTerm: string;
  inputRef: RefObject<HTMLInputElement>;
}) => {
  return (
    <div className={styles["input-group"]}>
      {append && <div className={styles["input-group__append"]}>{append}</div>}
      {prepend && <div onClick={prependClicked} className={styles["input-group__prepend"]}>{prepend}</div>}
      <input
        value={searchTerm}
        onChange={handleInputChange}
        ref={inputRef}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};
