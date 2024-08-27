import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Info from "../../Info";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const validate = (e) => {
        e.preventDefault();
        if (username == "" || password == "") {
            toast.error("Please fill the fields!");
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        axios
            .get(
                Info.server +
                    `/api/v1/auth?username=${username}&password=${password}`
            )
            .then((resp) => {
                if (resp.data.id) {
                    Cookies.set("id", resp.data.id);
                    Cookies.set("username", resp.data.username);
                    toast.success("Login Successful!");
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 2500);
                } else {
                    toast.error("Login Failed!");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="auth-container flex f-center">
            <ToastContainer autoClose={2000} theme="dark" />
            <form
                onSubmit={validate}
                className="auth-form flex f-column f-center"
            >
                <h2>LOGIN</h2>
                <div className="inp flex f-column">
                    <label>
                        Username <span className="star">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Your Username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>
                <div className="inp flex f-column">
                    <label>
                        Password <span className="star">*</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div className="auth-redirect flex f-between">
                    New User?
                    <Link to="/signup" className="link">
                        Register
                    </Link>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
