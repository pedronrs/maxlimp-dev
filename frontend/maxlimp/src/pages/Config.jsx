import HeaderHome from "../components/HeaderHome";
import Footer from "../components/Footer";

import useAuthRedirect from "../hooks/useAuthRedirect";
import ConfigContainer from "../Config/ConfigContainer";
import { useParams } from "react-router";

function Config() {
  const { config } = useParams();
  const path = config || "";
  useAuthRedirect(`/configuracoes/${path}`);

  return (
    <div>
      <HeaderHome showSearch={false} />
      <ConfigContainer config={path} />
      <Footer />
    </div>
  );
}

export default Config;
