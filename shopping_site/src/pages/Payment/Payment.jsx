import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Payment.module.css';
import { CheckCircleFilled, LeftOutlined } from '@ant-design/icons'
import { updateOrder } from '../../api';
import user from '../../store/user/user'
import dayjs from 'dayjs'
import Duration from 'dayjs/plugin/duration'

dayjs.extend(Duration)

const Payment = () => {
    //接受传递的房间信息
    const location = useLocation();
    const { roomDetails, order, hotelDetails, totalTime } = location.state;

    const startDate = dayjs(order.start_date)
    const endDate = dayjs(order.end_date)


    const formatDate = (date) => date.format('YYYY-MM-DD')

    //支付倒计时
    const [time, setTime] = useState(15 * 60);
    const [isChosen, setIsChosen] = useState(true);
    const tickRef = useRef();
    const tick = () => {
        if (time > 0) {
            setTime(time - 1);
        }
    };
    useEffect(() => {
        tickRef.current = tick;
    });

    useEffect(() => {
        const timer = setInterval(() => tickRef.current(), 1000);
        return () => clearInterval(timer);
    }, []);

    const leftPad = (i) => {
        return i < 10 ? '0' + i : i + '';
    }

    const showTime = time =>
        time >= 0 ? '00:' + leftPad(Math.floor(time / 60)) + ':' + leftPad(Math.floor(time % 60)) : '';

    //点击选择银行卡支付
    const chooseHandler = () => {
        setIsChosen(!isChosen);
    }

    //返回支付页
    const navigate = useNavigate();
    const backToCart = () => {
        navigate(-1);
    }

    const doCreateOrder = async () => {
        const params = {
            pay_type: 1,
            status: 1,
            orderid: order.orderid
        }

        const response = await updateOrder(params)

        navigate(user.isAdmin ? '/home' : '/home/list')
    }
    return (
        <div className={classes.Payment}>
            <div className={classes.Header}>安全支付</div>
            <div className={classes.Money}>
                <div className={classes.Price}>
                    <div className={classes.TotalPrice}>
                        <span>订单金额：</span>
                        <span className={classes.Num}>￥{roomDetails.price}</span>
                    </div>
                    <div>
                        剩余时间:
                        <span className={classes.Num} style={{ fontSize: 15 }}>
                            {showTime(time)}
                        </span>
                        ，超时订单可能会被取消
                    </div>
                </div>
                <div className={classes.Destination}>
                    <div className={classes.Title}>{hotelDetails.name}</div>
                    <div className={classes.Text}>
                        {roomDetails.name}{order.room_num}间 入住：{formatDate(startDate)} 退房：{formatDate(endDate)} 入住{totalTime === 0 ? 1 : totalTime}晚
                    </div>
                </div>
                <div className={classes.Alert}>
                    订单确认后15分钟内可免费取消。逾期不可取消/修改，若未入住将收取您全额房费（如用优惠券则以券后支付价为准）。订单需等酒店或供应商确认后生效，订单确认结果以携程短信、邮件或app通知为准，如订单不确认将全额退款至您的付款账户。使用礼品卡支付将不再享受返现。
                </div>
            </div>
            <div className={classes.PayAll}>
                <div className={`${classes.Card} ${isChosen ? classes.ChosenCard : ''}`} onClick={chooseHandler}>
                    <span className={classes.Btn}>
                        {
                            isChosen ? <i>
                                <CheckCircleFilled style={{ color: '#0086F6', fontSize: '16' }} />
                            </i> : ''
                        }
                    </span>
                    招商银行 储蓄卡(3455)
                </div>
                <div className={`${classes.Card} ${!isChosen ? classes.ChosenCard : ''}`} onClick={chooseHandler}>
                    <span className={classes.Btn}>
                        {
                            !isChosen ? <i>
                                <CheckCircleFilled style={{ color: '#0086F6', fontSize: '16' }} />
                            </i> : ''
                        }
                    </span>
                    添加新卡支付
                </div>
                <div className={classes.Pay} onClick={doCreateOrder} >
                    <span>银行卡支付</span>
                    <span>￥{roomDetails.price}</span>
                </div>
            </div>
            <div className={classes.PayMethod}>
                <div className={classes.PayIcon}>
                    <div className={classes.Img1}></div>
                    <span>支付宝</span>
                </div>
                <div className={classes.PayIcon}>
                    <div className={classes.Img2}></div>
                    <span>微信支付</span>
                </div>
            </div>
            <div className={classes.Return} onClick={backToCart}>
                <LeftOutlined />
                <div className={classes.Return_Text}>
                    修改订单
                </div>
            </div>
        </div>
    );
};

export default Payment;