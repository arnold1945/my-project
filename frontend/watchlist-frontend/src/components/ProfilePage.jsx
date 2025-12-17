import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate('/loginsignup');

    }, [isAuthenticated, navigate]);


    return (
        <div>
            <h1>MY PROFILE PAGE</h1>
            
        </div>
    )

}