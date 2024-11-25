import { useState } from "react";

import Modal from "../components/Modal";
import AddressForm from "./AddressForm";

import { getFetcher, postFetcher } from "../services/data";

import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import AddressList from "./AddressList";

function Address({ showDelete }) {
  const [show, setShow] = useState(false);

  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [error, setError] = useState("");

  const {
    data: addresses,
    isLoading,
    error: addressError,
    mutate,
  } = useSWR("auth/get-address/", getFetcher);

  console.log(addresses);

  const { trigger: addAddress, isMutating } = useSWRMutation(
    "auth/address/",
    postFetcher
  );

  async function handleAddAddress() {
    if (!district || !address || !complement) {
      setError("Preencha todos os campos!");
      return;
    }
    setError("");
    try {
      await addAddress({
        district: district.toLowerCase().trim(),
        address: address.toLowerCase().trim(),
        complement: complement.toLowerCase().trim(),
      });
      setError("");
      setAddress("");
      setComplement("");
      setDistrict("");
      setShow(false);
      mutate();
    } catch (e) {
      setError(e);
    }
  }
  return (
    <div className="max-h-96 overflow-auto flex flex-col gap-4">
      {show && (
        <Modal
          disabled={isMutating}
          onSuccess={handleAddAddress}
          text="Adicionar um novo endereço!"
          onCancel={() => setShow(false)}
        >
          <AddressForm
            error={error}
            onSubmit={handleAddAddress}
            district={district}
            setDistrict={setDistrict}
            address={address}
            setAddress={setAddress}
            complement={complement}
            setComplement={setComplement}
          />
        </Modal>
      )}

      <AddressList
        showDelete={showDelete}
        mutate={mutate}
        isLoading={isLoading}
        addresses={addresses}
      />

      <button
        onClick={() => setShow(true)}
        className="uppercase w-full text-slate-50 bg-indigo-600 py-2 px-4 items-center rounded-md justify-center flex"
      >
        Adicionar
      </button>
    </div>
  );
}

export default Address;
