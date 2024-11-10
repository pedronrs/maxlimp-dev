import React from 'react';
import { useProducts } from "../contexts/ProductsProvider";
import SubHeaderPage from "./SubHeaderPage";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from './SideBar';
import { Box } from '@mui/material';

function SubHeaderHome({ user }) {
  const { pathname: location, hash } = useLocation();

  const { cleanSearch, setProducts } = useProducts();

  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Sidebar user={user} />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' }}} className="flex justify-start items-center gap-10 py-4 pb-8">
        <SubHeaderPage
          onClick={(e) => {
            e.preventDefault();
            cleanSearch();
            setProducts(undefined);
            navigate("/");
          }}
          active={location === "/" && hash.slice(1) !== "contatos"}
          to="/"
        >
          Produtos
        </SubHeaderPage>
        <SubHeaderPage active={location === "sobre-nos/"} to="/sobre-nos">
          Sobre Nós
        </SubHeaderPage>
        {user && (
          <>
            <SubHeaderPage active={location === "pedidos/"} to="/pedidos">
              Pedidos
            </SubHeaderPage>
            <SubHeaderPage active={location === "suporte/"} to="/suporte">
              Suporte
            </SubHeaderPage>
          </>
        )}
        <SubHeaderPage
          onClick={() => {
            cleanSearch();
          }}
          active={location === "/" && hash.slice(1) === "contatos"}
          to="#contatos"
        >
          Contatos
        </SubHeaderPage>
        {user.type == 'admin' && (
          <SubHeaderPage active={location === "admin/"} to="/admin">
            Administrador
          </SubHeaderPage>
        )}
      </Box>
    </div>
  );
}

export default SubHeaderHome;
