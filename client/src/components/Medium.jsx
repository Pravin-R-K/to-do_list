import { useEffect, useState } from "react";
import axios from "axios";
import Info from "../Info";
import Cookies from "js-cookie";

const Medium = () => {
    const id = Cookies.get("id");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios
            .get(`${Info.server}/api/v1/task?taskOwner=${id}&priority=Medium`)
            .then((resp) => setTasks(resp.data));
    }, []);

    const handleUpdate = (task) => {
        let url = Info.server + "/api/v1/task/" + task._id;
        if (task.status == "Pending") {
            axios
                .patch(url, {
                    status: "On Progress",
                })
                .then((resp) => {
                    if (resp.data == true) {
                        window.location.reload(true);
                    }
                });
        } else if (task.status == "On Progress") {
            axios
                .patch(url, {
                    status: "Completed",
                })
                .then((resp) => {
                    if (resp.data == true) {
                        window.location.reload(true);
                    }
                });
        }
    };

    const completed = (task) => {
        let url = Info.server + "/api/v1/task/" + task._id;

        axios
            .patch(url, {
                status: "Completed",
            })
            .then((resp) => {
                if (resp.data == true) {
                    window.location.reload(true);
                }
            });
    };

    const handleDelete = (taskId) => {
        let choice = prompt("Confirm to delete [Y / N]:");
        if (choice == "Y" || choice == "y") {
            axios
                .delete(`${Info.server}/api/v1/task/${taskId}`)
                .then((resp) => {
                    if (resp.data == true) {
                        window.location.reload(true);
                    }
                });
        }
    };

    return (
        <div className="task-container flex f-wrap">
            {tasks.map((task) => {
                if (task.status != "Completed") {
                    return (
                        <div
                        key={task._id}
                            className={`task ${task.status} flex f-column f-around`}
                        >
                            <div style={{ fontWeight: "bold" }}>
                                {task.taskName}
                            </div>
                            <div>{task.taskDesc}</div>
                            <div className="buttons flex f-center">
                                <img
                                    onClick={() => completed(task)}
                                    src={Info.images.done}
                                />
                                {(task.status == "On Progress") ? (
                                    ""
                                ) : (
                                    <img
                                        onClick={() => {
                                            handleUpdate(task);
                                        }}
                                        src={Info.images.edit}
                                    />
                                )}

                                <img
                                    onClick={() => handleDelete(task._id)}
                                    src={Info.images.bin}
                                />
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default Medium;
