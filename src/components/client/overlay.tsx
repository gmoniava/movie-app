import Loading from "../loading";
import { useIsClient } from "@uidotdev/usehooks";

const Overlay = ({ positionClass = "inset-0", responsiveClass = "", useLoading = false }) => {
  const isClient = useIsClient();

  // Render nothing on the server to avoid hydration mismatch
  if (!isClient) return null;

  return (
    <div
      className={`fixed ${positionClass} ${responsiveClass} bg-black opacity-25 flex items-center justify-center z-950 pointer-events-auto`}
    >
      {useLoading && <Loading />}
    </div>
  );
};

export default Overlay;
