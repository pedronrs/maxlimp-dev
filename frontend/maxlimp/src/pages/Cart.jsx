import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import CheckoutActions from "../components/CheckoutActions";
import { Link } from "react-router-dom";
import HeaderHome from "../components/HeaderHome";
import useAuthRedirect from "../hooks/useAuthRedirect";
import Address from "./Address";

function Cart() {
  useAuthRedirect("/carrinho", "/entrar");
  const { cart, updateQuantity } = useCart();
  const [selectedItems, setSelectedItems] = useState(cart.map((p) => p?.name));

  const handleQuantityChange = (productName, newQuantity) => {
    updateQuantity(productName, newQuantity);
  };

  const handleCheckboxChange = (productName) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(productName)) {
        return prevSelected.filter((name) => name !== productName);
      } else {
        return [...prevSelected, productName];
      }
    });
  };

  const total = selectedItems?.reduce((acc, el) => {
    const cartCorr = cart.find(
      (c) => el.toLowerCase() === c.name.toLowerCase()
    );
    return acc + cartCorr?.price * cartCorr?.quantity;
  }, 0);

  if (!cart?.length) {
    return (
      <>
        <HeaderHome showSearch={false} />
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
          <h2 className="text-2xl font-semibold">Seu carrinho está vazio!</h2>
          <Link to="/">
            <button className="w-full rounded-md px-6 py-2 bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-700 flex items-center justify-center gap-4 text-sm uppercase tracking-wide">
              Retorne à loja!
            </button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderHome showSearch={false} />
      <div className="p-4 flex justify-center">
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Carrinho</h2>
          <TableContainer component={Paper} className="shadow-lg">
            <Table aria-label="cart table">
              <TableHead>
                <TableRow className="bg-indigo-600">
                  <TableCell style={{ color: "white" }}>Produto</TableCell>
                  <TableCell style={{ color: "white" }}>Categoria</TableCell>
                  <TableCell style={{ color: "white" }}>Quantidade</TableCell>
                  <TableCell style={{ color: "white" }}>Preço</TableCell>
                  <TableCell style={{ color: "white" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((product, index) => (
                  <TableRow
                    key={index}
                    className="odd:bg-gray-100 even:bg-gray-200"
                  >
                    <TableCell className="flex items-center">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 rounded-full mr-2"
                        />
                        <span>{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <input
                        type="number"
                        className="border rounded w-10 p-1"
                        value={product.quantity}
                        min="0"
                        onChange={(e) =>
                          handleQuantityChange(
                            product.name,
                            Number(e.target.value)
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>R${product.price}</TableCell>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.includes(product.name)}
                        onChange={() => handleCheckboxChange(product.name)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <span className="block text-xl mt-4 ">
            Total R$
            {total.toFixed(2)}
          </span>
        </div>
      </div>
      <Address
        selectedItems={selectedItems?.map((c) => {
          return cart.find((d) => {
            return c.toLowerCase() === d.name.toLowerCase();
          });
        })}
        total={total}
      />
    </>
  );
}

export default Cart;
