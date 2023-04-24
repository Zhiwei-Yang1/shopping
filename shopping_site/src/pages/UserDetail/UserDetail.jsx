import React from 'react';
import classes from './UseDetail.module.css'
import { MailOutlined, RightOutlined } from '@ant-design/icons';
import OrderCategories from '../../components/OrderCategories/OrderCategories';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
const UserDetail = () => {

    //跳转至酒店列表页
    const navigate = useNavigate();
    const navigateHandler = () => {
        navigate('/home/list');
    }
    //登出
    const logout = () => {
        navigate('/');
    }

    //用户信息
    return (
        <div className={classes.UserBgc}>
            {/* 头部 */}
            <header>
                <div className={classes.Username}>
                    <div className={classes.Img}>
                        <div className={classes.Triangle}></div>
                        <img src='https://dimg04.c-ctrip.com/images/0202r12000ac7t5ec4523_R_600_400_R5_D.jpg' alt='' />
                    </div>
                    <span>张三</span>
                    <Button type='primary' className={classes.Logout} onClick={logout}>退出登录</Button>
                    <div className={classes.IconBoard}>
                        <MailOutlined className={classes.Icon} style={{ color: '#fff' }} />
                    </div>
                </div>
                <div className={classes.Userprice}>
                    <div className={classes.Money}>
                        钱包余额 :
                        <div className={classes.Price}>10000</div>
                    </div>
                    <div className={classes.Tickets}>
                        优惠券 ：
                        <div className={classes.Num}>2</div>
                    </div>
                    <div style={{ flex: 1 }}></div>
                    <div className={classes.Btn}
                        onClick={navigateHandler}>
                        酒店列表页
                        <RightOutlined />
                    </div>
                </div>
            </header >
            {/* 菜单栏 */}
            <div classes={classes.Categories}>
                <OrderCategories />
            </div>
        </div >
    );
};

export default UserDetail;