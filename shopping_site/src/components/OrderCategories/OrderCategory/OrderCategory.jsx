import React, { useState } from 'react';
import classes from './OrderCategory.module.css'
import { HomeTwoTone, ShopTwoTone } from '@ant-design/icons'
import { Button, ConfigProvider } from 'antd';


//订单具体信息
const OrderCategory = ({ orderDetails, statusHandler }) => {

    // 点击取消按钮取消订单
    const [btn, setBtn] = useState(true);

    const btnHandler = () => {
        setBtn(false);
        statusHandler(orderDetails.key);
    }

    const orderStatus = () => {
        switch (orderDetails.status) {
            case 0:
                return '待付款';
                break;
            case 1:
                return '未出行';
                break;
            case 2:
                return '待评价';
                break;
            default:
                break;
        }
    }

    return (
        <div className={`${classes.Category} ${orderDetails.iconType === 'scenery' ? classes.Low : ''}`}>
            <div className={classes.Left}>
                <div className={classes.Icon}>
                    {
                        (() => {
                            switch (orderDetails.iconType) {
                                case 'hotel':
                                    return <HomeTwoTone twoToneColor='#fff' />;
                                case 'scenery':
                                    return <ShopTwoTone twoToneColor='#fff' />;
                                default:
                                    return <HomeTwoTone twoToneColor='#fff' />;
                            }
                        })()
                    }
                </div>
                <div className={classes.OrderDetails}>
                    <h1>{orderDetails.name}</h1>
                    <div className={classes.Grey}>
                        <div className={classes.Details}>
                            <div>
                                {orderDetails.address}
                            </div>
                            {
                                !orderDetails.endTime ?
                                    <div>
                                        使用日期：{orderDetails.startTime} {orderDetails.num}份
                                    </div> :
                                    <div>
                                        {orderDetails.startTime}至
                                        {orderDetails.endTime}
                                        <div style={{ width: 5 }}></div>
                                        { }晚/{orderDetails.num}间
                                    </div>
                            }

                            <div>
                                {orderDetails.type}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.Right}>
                <div className={`${classes.Status} ${orderDetails.status === '已取消' ? classes.Grey : classes.Blue}`}>
                    {orderStatus()}
                    {!btn ? '已取消' : ''}
                </div>
                <div className={classes.Payed}>
                    {orderDetails.status !== '已取消' ? '在线付' : ''}
                    <span>￥{orderDetails.price}</span>
                </div>
                {
                    orderDetails.status === 0 && btn ?
                        <ConfigProvider autoInsertSpaceInButton={false}>
                            <Button
                                className={classes.Blue}
                                size='small'
                                onClick={btnHandler}
                            >取消
                            </Button>
                        </ConfigProvider> : ''
                }

            </div>
        </div>

    );
};

export default OrderCategory;