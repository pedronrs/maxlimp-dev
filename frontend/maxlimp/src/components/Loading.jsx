import loading from "../assets/loading.svg";

function Loading({ classNames }) {
  return <img src={loading} className={classNames || "h-full"} alt="loading" />;
}

export default Loading;
