import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Info from "../../Info";

const Signup = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validate = (e) => {
        e.preventDefault();
        if (username == "" || password == "" || email == "") {
            toast.error("Please fill the fields!");
        } else {
            handleSubmit();
        }
    };

    let body = {
        username: username,
        password: password,
        email: email,
    };

    const handleSubmit = () => {
        axios
            .post(Info.server + "/api/v1/auth", body)
            .then((resp) => {
                if (resp.data == true) {
                    toast.success("Account Created Successfully!");
                    setTimeout(() => {
                        navigate("/");
                    }, 2500);
                } else {
                    toast.error("Error Occured, Please try again!");
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
                <h2>SIGNUP</h2>
                <div className="inp flex f-column">
                    <label>
                        Username <span className="star">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="eg. Varun S"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>
                <div className="inp flex f-column">
                    <label>
                        Email <span className="star">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="yours@awesome.com"
                        onChange={(e) => {
                            setEmail(e.target.value);
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
                    Already an user?
                    <Link to="/" className="link">
                        Login
                    </Link>
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
