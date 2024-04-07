import { TailSpin } from "react-loader-spinner";
import wrongpage from "../../assets/img/wrong-page.jpg";
import "./Loader.css";
const Loader = ({
  visible,
  height,
  width,
  color,
  ariaLabel,
  radius,
  wrapperStyle,
  wrapperClass,
}) => {
  return (
    <main
      className="main-loader"
      style={{ backgroundImage: `url(${wrongpage})` }}
    >
      <TailSpin
        visible={visible}
        height={height}
        width={width}
        color={color}
        ariaLabel={ariaLabel}
        radius={radius}
        wrapperStyle={wrapperStyle}
        wrapperClass={wrapperClass}
      />
    </main>
  );
};
export default Loader;
