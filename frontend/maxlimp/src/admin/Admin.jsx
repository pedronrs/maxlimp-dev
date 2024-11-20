import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import HeaderHome from "../components/HeaderHome";
import Footer from "../components/Footer";
import Dashboard from "./Dashboard";


export function Admin(){
     const { user } = useAuth()

    return(
        <div>
            <HeaderHome showSearch={false} />
            {user.type == 'admin' ? (
                <div className="min-h-screen bg-gray-100">
                    <Dashboard/>
                </div>
            ) : (
                <div className="h-screen">
                    Você não tem as credenciais necessárias
                </div>
            )}
            <Footer />
        </div>
    )
}