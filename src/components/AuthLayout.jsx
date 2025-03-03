import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // ✅ Use the correct authStatus from Redux
    const authStatus = useSelector((state) => state.auth.status);

    console.log("🔍 Protected Route - Requires Auth:", authentication);
    console.log("🔑 User Auth Status:", authStatus);

    useEffect(() => {
        // ✅ Adjusted conditions based on authStatus being a boolean
        if (authentication && !authStatus) {
            console.log("🚫 User NOT authenticated! Redirecting to /login...");
            navigate("/login", { replace: true });
        } else if (!authentication && authStatus) {
            console.log("✅ User already logged in! Redirecting to home...");
            navigate("/", { replace: true });
        } else {
            setLoading(false);
        }
    }, [authStatus, navigate, authentication]);

    if (loading) return <h1>Loading...</h1>;
    return <>{children}</>;
}
