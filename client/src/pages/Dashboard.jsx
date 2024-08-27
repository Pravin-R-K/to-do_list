import { useState } from "react";
import Cookies from "js-cookie";
import Info from "../Info";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import High from "../components/High";
import Low from "../components/Low";
import Medium from "../components/Medium";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const id = Cookies.get("id");
    const user = Cookies.get("username");

    const [addDisplay, setAddDisplay] = useState("none");

    const logout = () => {
        toast.info("Logging Out...");
        setTimeout(() => {
            Cookies.remove("id");
            Cookies.remove("username");
            navigate("/");
        }, 2500);
    };

    const addTask = (e) => {
        e.preventDefault();

        let priority = document.getElementById("priority");
        let status = document.getElementById("status");

        let body = {
            taskName: document.getElementById("taskName").value,
            taskDesc: document.getElementById("taskDesc").value,
            priority: priority.options[priority.selectedIndex].text,
            status: status.options[status.selectedIndex].text,
            taskOwner: id,
        };

        axios.post(Info.server + "/api/v1/task", body).then((resp) => {
            if (resp.data == true) {
                toast.success("Task added !");
                setTimeout(() => {
                    window.location.reload(true);
                }, 2500);

                console.log(resp.data);
            }
        });
    };

    return (
        <div className="page-container">
            <ToastContainer autoClose={2000} theme="dark" />
            <div className="welcome">
                Hello <span>{user}!</span>
            </div>
            <div className="tasks flex f-column f-around">
                <High />
                <Medium />
                <Low />
            </div>
            <div
                style={{ display: addDisplay }}
                className="add-task-container auth-container flex f-center"
            >
                <form
                    onSubmit={addTask}
                    className="add-form auth-form flex f-column f-center"
                >
                    <div
                        className="close"
                        onClick={() => {
                            setAddDisplay("none");
                        }}
                    >
                        X
                    </div>
                    <h2>Add Task</h2>
                    <div className="inp flex f-column">
                        <label>Task Name</label>
                        <input
                            id="taskName"
                            type="text"
                            placeholder="Enter Task Name"
                        />
                    </div>
                    <div className="inp flex f-column">
                        <label>Task Description</label>
                        <input
                            id="taskDesc"
                            type="text"
                            placeholder="Enter Task Description"
                        />
                    </div>
                    <div className="inp flex f-column">
                        <label>Priority</label>
                        <select id="priority">
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </div>
                    <div className="inp flex f-column">
                        <label>Status</label>
                        <select id="status">
                            <option>Pending</option>
                            <option>On Progress</option>
                            <option>Completed</option>
                        </select>
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
            <div className="boxes flex f-column">
                <div className="box flex f-center">HIGH PRIORITY</div>
                <div className="box flex f-center">MEDIUM PRIORITY</div>
                <div className="box flex f-center">LOW PRIORITY</div>
                <div className="box flex f-center">PENDING STATUS</div>
                <div className="box flex f-center">ON PROGRESS STATUS</div>
            </div>
            <div className="icons flex f-column">
                <img
                    onClick={() => {
                        setAddDisplay("");
                    }}
                    src={Info.images.add}
                />
                <img
                    onClick={() => {
                        logout();
                    }}
                    src={Info.images.logout}
                />
            </div>
        </div>
    );
};

export default Dashboard;
