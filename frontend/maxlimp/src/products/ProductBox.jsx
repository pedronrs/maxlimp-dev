import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import AddToCart from "../components/AddToCart";
import { deleteFetcher, postFetcher } from "../services/data";
import EditProductModal from "./EditProductModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Importa o DeleteConfirmationModal
import useSWRMutation from "swr/mutation";

function ProductBox({ product }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { trigger } = useSWRMutation("admin/delete-product/", postFetcher);

  const handleSaibaMais = () => {
    navigate(`/produto/${product.id}`);
  };

  const handleDeleteProduct = async () => {
    try {
      await trigger({
        product: {
          id: product.id,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Erro ao deletar o produto:", error);
    }
  };

  const handleEditProduct = () => {
    setEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    window.location.reload();
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className="rounded-md p-4 border-2 border-indigo-600">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
        style={{ objectFit: "contain", width: "100%", height: "auto" }}
      />
      <h3 className="text-md text-stone-800 font-normal mt-2">
        {product.name}
      </h3>
      <p className="text-xl text-indigo-600 font-bold mt-2">
        R${product.price}
      </p>
      <div>
        {user?.type === "admin" ? (
          <div className="mt-4 flex flex-col gap-4">
            <button
              variant="contained"
              onClick={openDeleteModal}
              className="w-full rounded-md px-6 py-2 bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-700 flex items-center justify-center gap-4 text-sm uppercase tracking-wide"
            >
              <MdDelete className="w-8 h-8 fill-slate-50" />
              Deletar
            </button>
            <button
              variant="contained"
              onClick={handleEditProduct}
              className="w-full rounded-md px-6 py-2 bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-700 flex items-center justify-center gap-4 text-sm uppercase tracking-wide"
            >
              <MdModeEdit className="w-8 h-8 fill-slate-50" />
              Editar
            </button>
            <EditProductModal
              open={editModalOpen}
              onClose={() => setEditModalOpen(false)}
              product={product}
              onSuccess={handleEditSuccess}
            />
            <DeleteConfirmationModal
              open={deleteModalOpen}
              onClose={closeDeleteModal}
              onConfirm={handleDeleteProduct}
            />
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            <button
              variant="contained"
              onClick={handleSaibaMais}
              className="w-full rounded-md px-6 py-2 bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-700 flex items-center justify-center gap-4 text-sm uppercase tracking-wide"
            >
              <FaInfoCircle className="w-8 h-8 fill-slate-50" />
              Saiba mais
            </button>
            <AddToCart product={product} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductBox;
