const Button = ({ text, click, className }: any) => {
  return (
    <button
      onClick={click}
      className={className ? className : ""}
      style={{
        padding: "10px 25px",
        borderRadius: "8px",
        border: "none",
        outline: "none",
        cursor: "pointer"
      }}
    >
      {text}
    </button>
  );
};

export default Button;
