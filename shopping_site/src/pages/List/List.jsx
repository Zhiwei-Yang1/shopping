import React, { useState } from 'react';
import classes from './List.module.css';
import ListCategory from '../../components/ListCategory/ListCategory';
import { useNavigate } from 'react-router-dom';
import { useMount } from 'ahooks';
import { getHotels } from '../../api';

const sort = [
    {
        name: '欢迎度排序',
        key: 1,
        chosen: false,
    }, {
        name: '好评优先',
        key: 2,
        chosen: false,
    }, {
        name: '价格（由低到高）',
        key: 3,
        chosen: false,
    }, {
        name: '距离（由近到远）',
        key: 4,
        chosen: false,
    }, {
        name: '星级（由高到低）',
        key: 5,
        chosen: false,
    }
]


const List = () => {
    const [details, setDetails] = useState([]);

    //点击跳转页面,并传参
    const navigate = useNavigate();
    const jumpToHandler = hotelDetails => {
        navigate('/home/orderdetail', {
            replace: true,
            state: {
                hotelDetails
            }
        })
    }

    //点击选择排序方式,并排序
    const [navSort, setNavSort] = useState(sort)
    const selectHandler = key => {
        const newNavSort = [...navSort];
        const newHotelSort = [...details];
        newNavSort.forEach(item => {
            key === item.key ? item.chosen = true : item.chosen = false;
        })
        switch (key) {
            case 1:
                newHotelSort.sort((a, b) => b.like - a.like);
                break;
            case 2:
                newHotelSort.sort((a, b) => b.score - a.score);
                break;
            case 3:
                newHotelSort.sort((a, b) => a.price_new - b.price_new);
                break;
            case 4:
                newHotelSort.sort((a, b) => a.distance - b.distance);
                break;
            case 5:
                newHotelSort.sort((a, b) => b.star - a.star);
                break;
            default:
                break;
        }
        setNavSort(newNavSort);
        setDetails(newHotelSort);
    }

    const getHotelList = async () => {
        const response = await getHotels()

        const hotels = response.data.map(hotel => {
            return {
                address: hotel.address,
                comment: hotel.comment,
                comments_num: hotel.comments_num,
                distance: hotel.distance,
                hotelid: hotel.hotelid,
                src: hotel.image || '',
                like: hotel.like,
                name: hotel.name,
                preference: hotel.preference,
                price_new: hotel.price_new,
                price_old: hotel.price_old,
                score: hotel.score,
                star: hotel.star,
                label: hotel.label
            }
        })

        setDetails(hotels)
    }

    useMount(getHotelList)

    return (
        <>
            <div className={classes.List}>
                <div className={classes.Header}>
                    {
                        navSort.map(items =>
                            <div className={`${classes.Sort} ${items.chosen ? classes.Blue : ''}`}
                                key={items.key}
                                onClick={() => selectHandler(items.key)}>
                                {items.name}
                            </div>
                        )
                    }
                </div>
                {
                    details.map((items, key) =>
                        <ListCategory
                            hotelDetails={items}
                            key={key}
                            jumpTo={jumpToHandler}
                        />)
                }
            </div>
        </>

    );
};

export default List;