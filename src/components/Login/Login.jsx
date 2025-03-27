import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [formdata, setFormdata] = useState({
        username: "",
        password: ""
    });
    const [login, setLogin] = useState(false);
    const [id, setId] = useState(false);
    const [roleid, setRoleid] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (login) {
            const verifitcation = async () => {
                const response = await axios.post("http://localhost:8080/loginverification", formdata);
                if (response.data.success) {
                    localStorage.setItem("user",formdata. username)
                    alert(response.data.success);
                    setId(true);
                } else {
                    alert(response.data.failed);
                }
            };
            verifitcation();
            setLogin(false);
        }
    }, [login]);

    useEffect(() => {
        if (id) {
            const getUserID = async () => {
                const response = await axios.get(`http://localhost:8080/getroleid/${formdata.username}`);
                if (response.data.success) {
                    setRoleid(response.data.success);
                } else {
                    alert(response.data.failed);
                }
            };
            getUserID();
            setId(false);
        }
    }, [id]);

    useEffect(() => {
        if (roleid === 1) {
            localStorage.setItem("role",roleid);
            navigate(`/intialagent/${roleid}/${formdata.username}`);
        } else if (roleid === 2) {
            navigate(`/buyer/${roleid}/${formdata.username}`);
        }
    }, [roleid]);

    const handelInput = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formdata.username) {
            alert("Username should be entered");
            return;
        }
        if (!formdata.password) {
            alert("Password should be entered");
            return;
        }
        setLogin(true);
        console.log(formdata);
    };

    return (
        <div style={styles.container}>
            <div style={styles.overlay}></div>
            <form style={styles.form} onSubmit={handleSubmit}>
                <legend style={styles.legend}>Login</legend>

                <div style={styles.inputGroup}>
                    <label htmlFor="username" style={styles.label}>Username:</label>
                    <input type="text" name="username" id="username" style={styles.input} onChange={handelInput} />
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="password" style={styles.label}>Password:</label>
                    <input type="password" name="password" id="password" style={styles.input} onChange={handelInput} />
                </div>

                <button style={styles.button}>Login</button>
                <div className="end" style={styles.end}>
                    <p>Not yet Registered?</p>
                    <Link to='/register' style={styles.link} title='switch to Register page'>Register</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;

const styles = {
    container: {
        position: "relative",
        maxWidth: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "url('https://media.istockphoto.com/id/1409298953/photo/real-estate-agents-shake-hands-after-the-signing-of-the-contract-agreement-is-complete.jpg?s=612x612&w=0&k=20&c=SFybbpGMB0wIoI0tJotFqptzAYK_mICVITNdQIXqnyc=') center/cover no-repeat",
    },
    overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backdropFilter: "blur(5px)",
        backgroundColor: "rgba(0, 0, 0, 0.1)", 
        zIndex: 1
    },
    form: {
        position: "relative",
        zIndex: 2,
        background: "transparent", 
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "350px",
        backdropFilter: "blur(15px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    legend: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "rgba(243, 27, 225, 0.75)",
        marginBottom: "20px",
    },
    inputGroup: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        marginBottom: "15px"
    },
    label: {
        flex: "1",
        fontSize: "16px",
        color: "#fff",
        fontWeight: "bold"
    },
    input: {
        flex: "2",
        padding: "8px",
        fontSize: "16px",
        border: "none",
        borderRadius: "5px",
        outline: "none",
    },
    button: {
        padding: "10px 20px",
        background: "rgba(245, 114, 164, 0.97)",
        color: "white",
        border: "none",
        fontSize: "18px",
        borderRadius: "20px",
        cursor: "pointer",
        marginTop: "10px",
        transition: "0.3s",
    },
    end:{
        display:"flex",
        gap:"10px",
        color:"white",
        fontSize:"16px",
        fontWeight:"500",
        marginTop:"10px"
    },
    link:{
        color:"rgba(28, 57, 219, 0.97)",
        textDecoration:"none",
         fontWeight:"500"
    }
};
