import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate('/loginsignup');

    }, [isAuthenticated, navigate]);


    return (
        <div>
            <h1>MY PROFILE PAGE</h1>
            <h2>WELCOME {user?.email}</h2>
            
        </div>
    )

}