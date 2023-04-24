import React, { useCallback, useState, useMemo } from 'react';
import OrderCategory from './OrderCategory/OrderCategory';
import { useMount } from 'ahooks';
import { searchOrder } from '../../api';
import dayjs from 'dayjs'
import classes from './OrderCategories.module.css';
// 导航栏
const items = [
    {
        label: '全部订单',
        key: 1,
    },
    {
        label: '未出行',
        key: 3,
    },
    {
        label: '待付款',
        key: 2,
    },
    {
        label: '待评价',
        key: 4,
    }
]


const OrderCategories = () => {
    const [list, setList] = useState([]) //所有订单的列表
    const [activeList, setActiveList] = useState([]) // 当前激活的tab列表
    const [current, setCurrent] = useState(1)
    const [show, setShow] = useState(false); //点击更多展示全部订单

    const orders = useMemo(() => {

        const result = list.reduce((result, current) => {
            if (current.status === 0) { //待付款
                result['2'].push(current)
            } else if (current.status === 1) { // 带出行
                result['3'].push(current)
            } else if (current.status === 2) { //待评价
                result['4'].push(current)
            }
            result['1'].push(current)

            return result

        }, { 1: [], 2: [], 3: [], 4: [] })

        setCurrent(1)
        setActiveList(result['1'])

        return result
    }, [list])

    const statusHandler = useCallback((key) => {
        const newOrder = [...list];
        newOrder.forEach((items) => {
            if (items.key === key) {
                items.status = '已取消';
            }
        })
    }, [orders])

    const menuHandler = key => {
        setCurrent(key)
        setActiveList(orders[key])
    }
    const showHandler = () => setShow(true);

    const search = async () => {
        const response = await searchOrder()

        const orders = response.data?.map(record => {
            const order = {
                name: record.name,
                startTime: dayjs(record.start_time).format('YYYY-MM-DD'),
                endTime: dayjs(record.end_time).format('YYYY-MM-DD'),
                type: record.room_name,
                price: record.price,
                status: record.status,
                num: record.room_num,
                address: record.address,
                iconType: 'hotal',
                key: record.orderid
            }

            return order
        })

        setList(orders)
    }

    useMount(search)

    return (
        <div className={classes.Categories}>
            <ul className={classes.Menu}>
                {items.map(item =>
                    <li
                        key={item.key}
                        onClick={() => menuHandler(item.key)}
                        className={`${classes.List} ${item.key === current ? classes.Line : ''}`}
                    >
                        {item.label}
                    </li>)}
            </ul>

            {
                !show ?
                    activeList.slice(0, 3).map((item, key) =>
                        <OrderCategory orderDetails={item} statusHandler={statusHandler} key={key} />) :
                    activeList.map((item, key) =>
                        <OrderCategory orderDetails={item} statusHandler={statusHandler} key={key} />)
            }
            {
                !show && activeList.length >= 3 ?
                    <div className={classes.MoreOrder} onClick={showHandler}>
                        更多订单&gt;
                    </div> : ''
            }
        </div>

    );
};

export default OrderCategories;