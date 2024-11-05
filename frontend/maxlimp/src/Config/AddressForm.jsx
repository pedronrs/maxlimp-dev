import BaseInput from "../components/BaseInput";

function AddressForm({
  onSubmit,
  district,
  setDistrict,
  address,
  setAddress,
  complement,
  setComplement,
  error,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-6 mt-6 mb-4 px-6"
    >
      {error && <p className="text-xs text-red-500">{error}</p>}
      <BaseInput
        value={district}
        setValue={setDistrict}
        type="text"
        bg="bg-indigo-50"
        name="Bairro"
        placeholder="Cosmos"
      />
      <BaseInput
        value={address}
        setValue={setAddress}
        type="text"
        bg="bg-indigo-50"
        name="Endereço"
        placeholder="Rua de cosmos 120"
      />
      <BaseInput
        value={complement}
        setValue={setComplement}
        type="text"
        bg="bg-indigo-50"
        name="Complemento"
        placeholder="apartamento 101, bloco 4"
      />
    </form>
  );
}

export default AddressForm;
