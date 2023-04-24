import React from 'react';
import classes from './RoomList.module.css'
import { UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

const RoomList = ({ roomDetails, hotelDetails }) => {

    //点击预定按钮,跳转至购物车
    const navigate = useNavigate();
    const chooseHandler = item => {
        navigate('/home/cart', {
            replace: false,
            state: {
                hotelDetails,
                roomDetails: item,
            }
        })
    }

    return (
        <div className={classes.RoomList}>
            <div className={classes.RoomList_Left}>
                <div className={classes.Img}>
                    <img src='https://dimg04.c-ctrip.com/images/200a1g000001hdzdr0123_W_1080_808_R5_D.jpg_.webp' alt="" />
                </div>
                <h1>{roomDetails.name}</h1>
                <ul className={classes.Labels}>
                    {
                        roomDetails.label.map((item, key) =>
                            <li key={key}
                                className={classes.Label}>
                                {item}
                            </li>
                        )}
                </ul>
                <div className={classes.RoomList_More}>
                    查看客房信息
                </div>
            </div>
            <div className={classes.RoomList_Right}>
                {
                    roomDetails.items.map((item, key) =>
                        <div className={classes.SaleCard} key={key}>
                            <div className={classes.Adult}>
                                <UserOutlined />
                                <UserOutlined />
                            </div>
                            <div className={classes.BedFacility}>
                                <div className={classes.BF_Top}>
                                    <span>{key === 0 ? '有早餐' : '双份早餐'}</span>
                                </div >
                                <div className={classes.BF_Bottom}>
                                    套餐可享礼遇
                                </div >
                            </div>
                            <div className={classes.Policy}>
                                <div className={classes.BF_Top}>
                                    <span>30分钟内免费取消</span>
                                </div >
                                <div className={classes.Policy_Bottom}>
                                    <span>立即确认</span>
                                </div >
                            </div>
                            <div style={{ flex: 1.1 }}></div>
                            <div className={classes.Price}>
                                <div className={classes.PriceNum}>
                                    ￥{item.price}
                                </div>
                                <div className={classes.Btn}
                                    onClick={() => chooseHandler(item)}>
                                    <div className={classes.btn}>预定</div>
                                    <div className={classes.PayNow}>在线付</div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default RoomList;