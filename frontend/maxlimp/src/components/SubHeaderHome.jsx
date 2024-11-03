import { useProducts } from "../contexts/ProductsProvider";
import SubHeaderPage from "./SubHeaderPage";
import { useLocation, useNavigate } from "react-router-dom";

function SubHeaderHome({ user }) {
  const { pathname: location, hash } = useLocation();

  const { cleanSearch, setProducts } = useProducts();

  const navigate = useNavigate();

  return (
    <div className="flex justify-start items-center gap-10 py-4 pb-8">
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
    </div>
  );
}

export default SubHeaderHome;
