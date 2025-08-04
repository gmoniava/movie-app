import Loading from "./loading";
const LoadingOverlay = ({ positionClass = "inset-0", responsiveClass = "", useLoading = false }) => {
  return (
    <div
      className={`fixed ${positionClass} ${responsiveClass} bg-black opacity-25 flex items-center justify-center z-950 pointer-events-auto`}
    >
      {useLoading && <Loading />}
    </div>
  );
};

export default LoadingOverlay;
