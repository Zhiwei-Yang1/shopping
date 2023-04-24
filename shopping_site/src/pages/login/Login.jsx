import React, { useState } from 'react';
import { Button, message } from 'antd';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import user from '../../store/user/user'
import classes from './Login.module.css';

const Login = () => {

    //获取用户名和密码
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const usernameHandler = e => {
        setUsername(e.target.value.trim());
    }
    const pwdHandler = e => {
        setPwd(e.target.value.trim());
    }

    const navigate = useNavigate()

    //提示信息
    const [messageApi, contextHolder] = message.useMessage();

    //点击登录
    const loginHandler = () => {
        if (!username || !pwd) {
            messageApi.open({
                type: 'error',
                content: '请输入用户名或密码',
            })
        }

        user.login(username, pwd).then((response) => {
            if (response.code === 0) {
                const next = '/home/list'
                navigate(next)
            } else {
                messageApi.error(response.message)
            }
        })
    }

    return (
        <>
            {contextHolder}
            <div className={classes.loginPage}>
                <div className={classes.loginBox}>
                    <h1>用户登录</h1>
                    <div className={classes.loginForm}>
                        <div className={classes.loginInput}>
                            <span className={classes.loginTitle}>
                                用户名
                            </span>
                            <input type="text"
                                value={username}
                                id="fname"
                                name="fname"
                                placeholder='账户名'
                                onChange={usernameHandler} />
                        </div>
                        <div className={classes.loginInput}>
                            <span className={classes.loginTitle}>
                                密&nbsp;&nbsp;&nbsp;码
                            </span>
                            <input type="password"
                                value={pwd}
                                id="pwd"
                                name="pwd"
                                placeholder='密码'
                                onChange={pwdHandler} />
                        </div>
                        <Button
                            type='primary'
                            block
                            size='large'
                            onClick={loginHandler}>登录</Button>
                        <Link to="/register" className={classes.Link}>点击注册</Link>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Login;