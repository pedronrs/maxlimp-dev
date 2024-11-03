import React from 'react';
import { useProducts } from "../contexts/ProductsProvider";
import { useLocation } from "react-router-dom";
import Sidebar from './SideBar';
import SubHeaderPage from './SubHeaderPage';

function SubHeaderHome({ user }) {
  const { pathname: location, hash } = useLocation();
  const { cleanSearch } = useProducts();

  return (
    <div className="flex justify-start items-center gap-10 py-4 pb-8">
      <Sidebar user={user} />
      <div className="hidden sm:flex gap-10">
        <SubHeaderPage
          onClick={() => {
            cleanSearch();
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
      </div>
    </div>
  );
}

export default SubHeaderHome;
