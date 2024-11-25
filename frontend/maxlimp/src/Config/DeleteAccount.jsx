import { useState } from "react";
import DangerButton from "./DangerButton";
import DangerRow from "./DangerRow";
import Modal from "../components/Modal";
import useSWRMutation from "swr/mutation";
import { deleteFetcher } from "../services/data";
import { useNavigate } from "react-router";

function DeleteAccount() {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const { trigger, isMutating } = useSWRMutation("auth/delete/", deleteFetcher);

  return (
    <DangerRow title="deletar a conta">
      {show && (
        <Modal
          disabled={isMutating}
          text={"Tem certeza que deseja deletar sua conta?"}
          onCancel={() => {
            setShow(false);
          }}
          onSuccess={async () => {
            await trigger();
            setShow(false);
            navigate("/registro");
          }}
        />
      )}
      <DangerButton onClick={() => setShow(true)} name="deletar" />
    </DangerRow>
  );
}

export default DeleteAccount;
