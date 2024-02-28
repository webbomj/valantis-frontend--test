import css from "./index.module.scss";

export const Pagination = ({
  cbLeft,
  cbRight,
  disableLeft,
  disableRight,
}: {
  cbLeft: () => void;
  cbRight: () => void;
  disableLeft: boolean;
  disableRight: boolean;
}) => {
  return (
    <div>
      <button
        className={disableLeft ? css.disabled : undefined}
        disabled={disableLeft}
        onClick={() => cbLeft()}
      >{`<<<`}</button>
      <button
        className={disableRight ? css.disabled : undefined}
        disabled={disableRight}
        onClick={() => cbRight()}
      >{`>>>`}</button>
    </div>
  );
};
