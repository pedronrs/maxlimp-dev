import useSWRMutation from "swr/mutation";
import DangerButton from "./DangerButton";
import DangerRow from "./DangerRow";
import { postFetcher } from "../services/data";

function Logout() {
  const { trigger, isMutating } = useSWRMutation("auth/logout/", postFetcher);

  return (
    <DangerRow title="Sair da conta">
      <DangerButton
        onClick={async () => {
          await trigger();
          window.location.reload();
        }}
        disabled={isMutating}
        name="sair"
      />
    </DangerRow>
  );
}

export default Logout;
