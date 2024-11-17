import useSWR from "swr";
import Loading from "../components/Loading";
import HeaderHome from "../components/HeaderHome";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { Grid } from "@mui/material";
import { getFetcher } from "../services/data";
import { Link } from "react-router-dom";

function adjustHours(date) {
  return date < 10 ? `0${date}` : date;
}

function Orders() {
  useAuthRedirect("/pedidos");

  const { data, isLoading } = useSWR("products/get-orders/", getFetcher);

  if (isLoading) {
    return (
      <>
        {" "}
        <HeaderHome showSearch={false}></HeaderHome>
        <Grid container justifyContent="center" alignItems="center">
          <Loading classNames="w-[30%]" />
        </Grid>
      </>
    );
  }
  if (!data?.length) {
    return (
      <>
        <HeaderHome showSearch={false} />
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
          <h2 className="text-2xl font-semibold">Você não tem pedidos!</h2>
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
      <div className="flex flex-col gap-6 px-12 mt-20 mb-20">
        <h1 className="text-2xl tracking-tight mb-8 text-stone-800 capitalize">
          Pedidos
        </h1>
        <div className="divide-y-2 divide-stone-400 flex flex-col gap-6">
          {data.map((order) => {
            const date = new Date(order.createdAt);
            return (
              <div key={order.createdAt} className="flex flex-col gap-4 py-2 ">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold capitalize">
                    Pedido: {order.status}
                  </h2>
                  <p className="text-sm font-medium text-stone-600">
                    <span className="font-semibold text-lg">
                      Pedido feito em:{" "}
                    </span>
                    {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}{" "}
                    {adjustHours(date.getHours())}:
                    {adjustHours(date.getMinutes())}
                  </p>
                </div>
                <div className="divide-y-2 divide-stone-400 flex flex-col gap-4">
                  {order.products.map((product) => {
                    return (
                      <div
                        key={product.name}
                        className="flex justify-between items-center"
                      >
                        <div className="flex gap-4 items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div>
                            <h3 className="text-lg font-semibold">
                              {product.name}
                            </h3>
                            <p className="text-sm text-stone-600">
                              {product.quantity}x R${product.price}
                            </p>
                          </div>
                        </div>
                        <p className="text-lg font-semibold">
                          <span className="font-semibold text-lg">Total:</span>{" "}
                          R${product.quantity * product.price}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-start items-center gap-4 capitalize">
                  <h3 className="text-lg font-semibold">Endereço:</h3>
                  <p className="text-sm text-stone-600">
                    {order.address}, {order.district} - {order.complement}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Orders;
