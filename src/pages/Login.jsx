import axios from 'axios';
import React, { useRef, useState } from 'react'
import { url } from '../utils/config';
import { useNavigate } from 'react-router-dom';
import AlertContent, { Alert } from '../components/Alert';
import styled from 'styled-components';

function Login() {
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });
    const [show, setShow] = useState(false)

    const loginRef = useRef()
    const passwordRef = useRef()

    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault()
        axios.post(`${url}/user_sigin_in_views/`, {
            username: loginRef.current.value,
            password: passwordRef.current.value
        }).then((res) => {
            localStorage.setItem("token", res.data?.token.accsess);
            navigate("/home")
        }).catch((err) => {
            Alert(setAlert, "danger", "login yoki parolda xatolik");
        })
    }

    return (
        <Wrapper class="p-0">
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner">
                    <div className="card">
                        <div className="card-body">
                            <div className="app-brand justify-content-center pb-0 mb-2">
                                <img src="./images/logo.png" alt="" height={"150px"} />
                            </div>
                            <h4 className="mb-2 justify-content-center text-center" style={{ color: "#152b03", fontWeight: "700" }}>
                                Добро пожаловать в панель администратора Букетная!
                            </h4>
                            <form onSubmit={login}>
                                <div className="mb-3">
                                    <label for="email" className="form-label" style={{ color: "#152b03", fontWeight: "700" }}>Логин</label>
                                    <input
                                        ref={loginRef}
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        name="email-username"
                                        placeholder="Введите ваш логин"
                                        autofocus
                                    />
                                </div>
                                <div className="mb-3 form-password-toggle">
                                    <div className="d-flex justify-content-between">
                                        <label className="form-label" for="password" style={{ color: "#152b03", fontWeight: "700" }}>Пароль </label>
                                    </div>
                                    <div className="input-group input-group-merge">
                                        <input
                                            ref={passwordRef}
                                            type={show ? "text" : "password"}
                                            id="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Введите пароль"
                                            aria-describedby="password"
                                        />
                                        <span className="input-group-text cursor-pointer"
                                            onClick={() => setShow(!show)}>
                                            {
                                                show ? <i className="bx bx-show"></i> : <i className="bx bx-hide"></i>
                                            }
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-0">
                                    <button className="btn btn-primary d-grid w-100 mb-0" type="submit">Входить</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* alert */}
            <AlertContent alert={alert} />
        </Wrapper>
    )
}

export default Login

const Wrapper = styled.div`
    .card {
        color: #FFF;
    }

    .authentication-wrapper.authentication-basic .authentication-inner:before {
        content: none;
    }
`