import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailBlur = (event) => setEmail(event.target.value);
    const handlePasswordBlur = (event) => setPassword(event.target.value);

    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (user) {
            // console.log(from);
            navigate(from, { replace: true });
        }
    }, [from, navigate, user]);

    //handling login
    const handleLoginUser = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(email, password);
    };
    return (
        <div className="form-container">
            <div>
                <h2 className="form-title">login</h2>
                <form onSubmit={handleLoginUser}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onBlur={handleEmailBlur}
                            type="email"
                            name="email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onBlur={handlePasswordBlur}
                            type="password"
                            name="password"
                            required
                        />
                    </div>
                    <p>{loading && "Loading...."}</p>
                    <p style={{ color: "red" }}>{error?.message}</p>
                    <input className="form-submit" type="submit" value="Login" />
                </form>
                <p>
                    New to Ema-Jhon?{" "}
                    <Link className="form-link" to={"/sign-up"}>
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
