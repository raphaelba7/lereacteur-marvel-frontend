import { TailSpin } from "react-loader-spinner";
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
    <main>
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
