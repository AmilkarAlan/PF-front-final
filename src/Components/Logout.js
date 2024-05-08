import React, { useEffect, useState } from "react";
import logOutbuttonstyles from './module.Logout.css';

function Logout() {
    const accessToken = localStorage.getItem("accessToken");
    const [ name, setName ] = useState("")

    useEffect(() => {
        if (accessToken === null) {
            return setName("Sign in");
        }
        return setName("Logout");
    }, [ accessToken, name ]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'
    };

    const handleLogin = () => {
        window.location.href = '/login'
    };


    return (
        <button className="Logout" onClick={ name === "Logout" ? handleLogout : handleLogin }>{ name }</button>

    )

};



export default Logout;
