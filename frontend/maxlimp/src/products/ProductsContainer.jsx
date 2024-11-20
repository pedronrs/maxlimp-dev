import { getFetcher } from "../services/data";
import { useProducts } from "../contexts/ProductsProvider";
import { useFilter } from "../contexts/FilterProvider";
import useSWR from "swr";
import ProductBox from "./ProductBox";
import ProductsTitle from "./ProductsTitle";
import Tag from "../components/Tag";
import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Box, Pagination, Button } from "@mui/material";
import { useAuth } from "../contexts/AuthProvider";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddProductModal from './AddProductModal';  // Assumindo que o modal está neste caminho

function ProductsContainer() {
  const { user } = useAuth();
  const { products, search, setProducts, setFilter } = useProducts();
  const { categories, price, handleCategoryChange } = useFilter();
  const [page, setPage] = useState(1);
  const maxItens = 4; // Quantidade para teste, mudar depois da adição de mais produtos
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data, isLoading } = useSWR("products/all-products/", getFetcher);

  useEffect(() => {
    if (products?.length) {
      setProducts(products);
      setTotalPages(Math.ceil(products.length / maxItens));
      return;
    }
    if (data && isLoading === false) {
      setProducts(data);
      setTotalPages(Math.ceil(data?.length / maxItens));
    }
  }, [data, products?.length]);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleAddProductSuccess = () => {
    setLoading(true);
    getFetcher("products/all-products/").then((newData) => {
      setProducts(newData);
      setTotalPages(Math.ceil(newData.length / maxItens));
      setLoading(false);
    });
  };

  if (isLoading || loading) {
    return (
      <>
        <ProductsTitle>{search ? `"${search}"` : "em destaque"}</ProductsTitle>
        <Grid container justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      </>
    );
  }

  if (!products?.length) {
    return (
      <>
        <ProductsTitle>{search ? `"${search}"` : "em destaque"}</ProductsTitle>
        <Grid container justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      </>
    );
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * maxItens;
  const displayableProducts = products?.slice(
    startIndex,
    startIndex + maxItens
  );

  return (
    <>
      {user.type === 'admin' && (
        <div className="flex justify-center items-center h-full mb-8">
          <button
            className="w-[250px] rounded-md px-6 py-2 bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-700 flex items-center justify-center gap-4 text-sm uppercase tracking-wide"
            onClick={handleModalOpen}
          >
            <IoMdAddCircleOutline className="w-8 h-8 fill-slate-50" />
            Adicionar Produto
          </button>
          <AddProductModal open={modalOpen} onClose={handleModalClose} onSuccess={handleAddProductSuccess} />
        </div>
      )}
      <ProductsTitle>
        <div className="flex gap-6">
          {search ? (
            <>
              Resultados da busca{" "}
              <span className="font-bold">&quot;{search}&quot;</span>
            </>
          ) : (
            <> em destaque</>
          )}{" "}
          {products !== undefined
            ? categories?.map?.((category) => (
                <Tag name={category} key={category} />
              ))
            : ""}
        </div>
      </ProductsTitle>
      <div className={`gap-8 flex items-center justify-center`}>
        <Grid container spacing={2} justifyContent="center">
          {displayableProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={product.name}>
              <ProductBox product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
  );
}

export default ProductsContainer;
