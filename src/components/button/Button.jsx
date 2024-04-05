const Button = (props) => {
  return (
    <>
      <button
        className={props.className}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.name}
      </button>
    </>
  );
};

export default Button;
