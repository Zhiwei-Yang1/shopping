import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { UpOutlined } from '@ant-design/icons'
import { Tag, Menu, Select, Space } from 'antd';
import { useRef } from 'react';
import { useMount } from 'ahooks';
import { getRooms } from '../../api';
import { roomItems, navItems } from './config'
import HotelPolicies from '../../components/HotelPolicies/HotelPolicies';
import RoomList from '../../components/RoomList/RoomList';
import HotelHeader from '../../components/HotelHeader/HotelHeader';
import classes from './OrderDetail.module.css'

const createSmookTag = (room) => room.smook ? '不禁烟' : '禁烟'
const createWindowTag = (room) => room.window ? '有窗' : '无窗'
const formatFilterValue = (filter) => filter?.value

const OrderDetail = () => {
    //传递参数
    const location = useLocation();
    const { hotelDetails } = location.state;

    const [rooms, setRooms] = useState([])
    const [current, setCurrent] = useState('room');
    const roomRef = useRef();
    const [navFloat, setNavFloat] = useState(false);
    const [isToTop, setIsToTop] = useState(false);
    const [filter, setFilter] = useState({})
    const [roomFacilities] = useState(roomItems);
    const navigate = useNavigate();

    const doScroll = (top) => window.scrollTo({ top, behavior: 'smooth' })
    const upToTop = () => doScroll(0)
    const backToList = () => navigate('/home/list')
    const chooseRoom = () => doScroll(421)


    let policyHeight = 0;
    const getPolicyRef = height => {
        policyHeight = height
    };
    const navChooseHandler = (e) => {
        setCurrent(e.key);
        let top
        if (e.key === 'room') {
            top = 514
        }
        else if (e.key === 'policy') {
            top = policyHeight - 45
        }

        if (top) {
            doScroll(top)
        }
    };

    useMount(() => {
        const fixedTop = roomRef.current.offsetTop;
        window.onscroll = () => {
            let scrollTop = document.documentElement.scrollTop;
            //导航栏是否浮动
            const isFixed = scrollTop >= fixedTop;
            setNavFloat(isFixed);
            //是否显示按钮
            const isShow = scrollTop <= 40;
            setIsToTop(isShow);
        }
    });

    const handleFilterChange = (key, option) => {
        const value = filter[key]
        if (value?.value === option.value) {
            filter[key] = undefined
        } else {
            filter[key] = option
        }

        const newFilter = Object.assign({}, filter)

        setFilter(newFilter)
        getRoom(newFilter)
    }

    const getRoom = async (filter = {}) => {
        const { hotelid } = hotelDetails

        const params = {
            hotelid: hotelid,
            room_type: formatFilterValue(filter.room_type),
            rooms: formatFilterValue(filter.rooms),
            room: formatFilterValue(filter.room),
            price: formatFilterValue(filter.price),
            breakfast: formatFilterValue(filter.breakfast),
            service: formatFilterValue(filter.service),
            paytype: formatFilterValue(filter.paytype),
            easy: formatFilterValue(filter.easy),
            wifi: formatFilterValue(filter.wifi)
        }

        const response = await getRooms(params)

        let rooms = []
        if (response.data) {
            for (let room of response.data) {
                rooms.push({
                    name: room.name,
                    roomid: room.roomid,
                    address: room.address,
                    label: [room.bed, room.area, createSmookTag(room), createWindowTag(room)],
                    items: room.items?.map((goods) => {
                        return {
                            ...goods
                        }
                    }),
                    src: room.image,
                })
            }
        }

        setRooms(rooms)
    }

    useMount(getRoom)

    return (
        <div className={classes.hotelDetail}>
            <HotelHeader hotelDetails={hotelDetails} backToList={backToList} chooseRoom={chooseRoom} />
            <div className={classes.hotelDetail_Body} >
                <div className={`${classes.hotelDetail_Body_Title} ${navFloat ? classes.Fixed : ''}`} ref={roomRef}>
                    <Menu
                        onClick={navChooseHandler}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={navItems}
                        style={{ fontWeight: '600' }}
                    />
                </div>
                {navFloat ?
                    <div style={{ marginBottom: '5', visibility: 'hidden' }}>
                        <Menu
                            items={navItems}
                            style={{ fontWeight: '600' }}
                            onClick={navChooseHandler}
                        />
                    </div> : ''
                }

                <ul className={classes.RoomClassify}>
                    {roomFacilities.map(item =>
                        <Space wrap key={item.name}>
                            <Select
                                value={filter[item.name]}
                                placeholder={item.label}
                                style={{ width: 115, textAlign: 'center' }}
                                options={item.options}
                                placement='bottomLeft'
                                dropdownStyle={{ textAlign: 'center' }}
                                bordered={false}
                                onChange={(_, option) => handleFilterChange(item.name, option)}
                            >
                            </Select>
                        </Space>
                    )}

                </ul>
                <ul className={classes.Options}>
                    {Object.entries(filter).map(([name, option]) => {
                        return option == null ? null :
                            <Tag
                                className={classes.tag}
                                closable
                                key={option.value}
                                onClose={() => handleFilterChange(name, option)}>
                                {option.label}
                            </Tag>
                    })}
                </ul>
            </div>
            <div className={classes.hotelDetail_RoomList}>
                {
                    rooms.map(room =>
                        <RoomList
                            hotelDetails={hotelDetails}
                            key={room.roomid}
                            roomDetails={room}
                        />)
                }
            </div>
            {
                !isToTop ?
                    <div className={classes.Upbtn}
                        onClick={upToTop}>
                        <UpOutlined style={{ color: '#fff' }} />
                    </div> : ''
            }
            <HotelPolicies getPolicyRef={getPolicyRef}
            />
        </div >
    );
};

export default OrderDetail;