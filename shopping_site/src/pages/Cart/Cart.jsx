import React, { useEffect, useState } from 'react';
import classes from './Cart.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon/Icon';
import {
    EnvironmentOutlined,
    ExclamationCircleOutlined,
    UserOutlined,
    BankOutlined,
    ShoppingCartOutlined,
    LeftOutlined
} from '@ant-design/icons'
import { DatePicker, Select, Input, Form } from 'antd';
import user from '../../store/user/user'
import { observer } from 'mobx-react';
import { useMount } from 'ahooks';
import { createOrder } from '../../api';

const Cart = observer(() => {
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const location = useLocation();
    const { roomDetails, hotelDetails } = location.state;

    const arriveAtOption = [
        { value: 12, label: '12:00' },
        { value: 14, label: '14:00' },
        { value: 16, label: '16:00' },
        { value: 18, label: '18:00' },
        { value: 20, label: '20:00' },
    ]

    const roomNumOption = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
    ]

    //返回酒店详情页
    const backToDetails = () => {
        navigate(-1);
    }

    //计算总时长
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const startTimeChoose = (date, dateString) => {
        setStartTime(dateString);
    };
    const endTimeChoose = (date, dateString) => {
        setEndTime(dateString);
    };
    let totalTime = (Date.parse(endTime) - Date.parse(startTime)) / 1000 / 3600 / 24;

    //进入支付界面
    const navigateToPay = async () => {
        await form.validateFields()
        const value = form.getFieldsValue()

        const order = {
            ...value,
            start_date: value.start_date.valueOf(),
            end_date: value.end_date.valueOf(),
        }

        const params = {
            room_num: order.room_num,
            arrive_at: order.arrive_at,
            start_date: order.start_date,
            end_date: order.end_date,
            custom_name: order.custom_name,
            custom_phone: order.custom_phone,
            custom_email: order.custom_email,
            address: roomDetails.address,
            price: roomDetails.price,
            name: hotelDetails.name,
            room_name: roomDetails.name,
            totalTime
        }

        const response = await createOrder(params)

        const { orderid } = response.data
        navigate('/home/payment', {
            replace: false,
            state: {
                hotelDetails,
                roomDetails,
                order: order,
                totalTime
            }
        })
    }

    useMount(() => {
        form.setFieldsValue({
            arrive_at: 12,
            room_num: '1'
        })
    })

    useEffect(() => {
        form.setFieldsValue({
            custom_name: user.info.username,
            custom_email: user.info.email,
            custom_phone: user.info.phone
        })
    }, [user.info])

    return (
        <div className={classes.Cart}>
            <div className={classes.RoomInfo}>
                <div className={classes.Title}>
                    <div className={classes.TitleName}>
                        {hotelDetails.name}
                    </div>
                    <Icon />
                </div>
                <div className={classes.Address}>
                    <EnvironmentOutlined />
                    <span>{roomDetails.address}</span>
                </div>
                <div className={classes.RoomType}>
                    {roomDetails.name}
                </div>
                <div className={classes.Facilities}>
                    <div className={classes.Fac_text}>
                        <UserOutlined />
                        <span>1人</span>
                    </div>
                    <div className={classes.Fac_text}>
                        <BankOutlined />
                        <span>一张特大床</span>
                    </div>
                    <div className={classes.Fac_text}>
                        <ShoppingCartOutlined />
                        {console.log(roomDetails)}
                        <span>{roomDetails.price > 450 ? '双份' : '有'}早餐</span>
                    </div>
                </div>
            </div>
            <Form form={form} name='cart'>
                <div className={classes.GuestInfo}>
                    <div className={classes.Duration}>
                        <div className={classes.Date}>
                            <div className={classes.Text}>入住日期</div>
                            <div className={classes.Time}>
                                <Form.Item className={classes.mb0} name='start_date' rules={[{ required: true, message: '请选择开始日期' }]}>
                                    <DatePicker size='small' placeholder='选择开始日期' bordered={false} onChange={startTimeChoose} />
                                </Form.Item>
                            </div>
                        </div>
                        <div className={classes.Length}>{isNaN(totalTime) ? '' : totalTime}晚</div>
                        <div className={classes.Date}>
                            <div className={classes.Text}>退房日期</div>
                            <div className={classes.Time}>
                                <Form.Item className={classes.mb0} name='end_date' rules={[{ required: true, message: '请选择离开日期' }]}>
                                    <DatePicker size='small' placeholder='选择离开日期' bordered={false} onChange={endTimeChoose} />
                                </Form.Item>
                            </div>
                        </div>
                        <div style={{ flex: 1 }}></div>
                        <div className={classes.Num}>
                            <div className={classes.Text} style={{ textAlign: 'center' }}>房间数</div>
                            <Form.Item noStyle name='room_num'>
                                <Select style={{ width: 120, textAlign: 'center' }} bordered={false} options={roomNumOption} />
                            </Form.Item>
                        </div>
                    </div>
                    <div className={classes.GuestDetail}>
                        <div className={classes.GuestDetail}>
                            <div className={classes.Guest_title}>
                                <h3>住客资料</h3>
                                <div className={classes.Remind}>
                                    请按实际入住人数填写，姓名与证件保持一致
                                    <ExclamationCircleOutlined />
                                </div>
                            </div>
                            <div className={classes.GuestDetail}>
                                <div className={`${classes.Text} ${classes.GuestText}`}>住客姓名</div>
                                <Form.Item className={classes.mb0} name='custom_name' rules={[{ required: true, message: '请输入住客姓名' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className={classes.GuestDetail}>
                                <div className={`${classes.Text} ${classes.GuestText}`}>电子邮件</div>
                                <Form.Item className={classes.mb0} name='custom_email' rules={[{ required: true, message: '请输入电子邮件' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className={classes.GuestDetail}>
                                <div className={`${classes.Text} ${classes.GuestText}`}>电话号码</div>
                                <div className={classes.PhoneNum}>
                                    <Form.Item className={classes.mb0} name='custom_phone' rules={[{ required: true, message: '请输入电话号码' }]}>
                                        <Input />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.ArrivalTime}>
                    <h3>预计到店</h3>
                    <div className={classes.Content}>
                        <div className={classes.Text} style={{ marginBottom: '5' }}>到达时间</div>
                        <div className={classes.Input}>
                            <Form.Item noStyle name='arrive_at'>
                                <Select style={{ width: 120 }} bordered={false} options={arriveAtOption} />
                            </Form.Item>
                        </div>
                    </div>
                    <div className={classes.Text}>房间整晚保留</div>
                </div>
            </Form>

            <div className={classes.Pay}>
                <div className={classes.Pay_Price}>
                    在线付
                    <span>￥{roomDetails.price}</span>
                </div>
                <div style={{ flex: 1 }}></div>
                <div className={classes.Pay_Btn} onClick={navigateToPay}>去支付</div>
            </div>
            <div className={classes.Return} onClick={backToDetails}>
                <LeftOutlined />
                <div className={classes.Return_Text}>更改我的选择</div>
            </div>
        </div >
    );
})

export default Cart;