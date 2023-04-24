import React, { useState } from 'react';
import classes from './ListCategory.module.css'
import Icon from '../Icon/Icon'
import Label from '../Label/Label';
import { Button } from 'antd';

const ListCategory = ({ hotelDetails, jumpTo }) => {

    //阴影显示
    const [shadow, setShadow] = useState(false);
    const showHandler = () => {
        setShadow(true);
    }

    const noShowHandler = () => {
        setShadow(false);
    }

    //是否跳转回调函数传参
    const showDetail = () => {
        jumpTo(hotelDetails);
    }
    return (
        <div className={`${classes.ListCategory} ${shadow ? classes.Shadow : ''}`}
            onMouseOver={showHandler}
            onMouseOut={noShowHandler}>
            <div className={classes.Pic}>
                <img src={hotelDetails.src} alt="" />
            </div>
            <div className={classes.Introduce}>
                <h1>
                    {hotelDetails.name}
                    <Icon
                        star={hotelDetails.star}
                        like={hotelDetails.like}
                    />
                </h1>
                <div className={classes.address}>
                    {hotelDetails.address}
                </div>
                <div className={classes.Map}>
                    查看地图
                </div>
                <div className={classes.Labels}>
                    {
                        hotelDetails.label.map((items, key) =>
                            <Label items={items}
                                key={key} />)
                    }
                </div>
            </div>
            <div className={classes.Right}>
                <div className={classes.Comments}>
                    <div className={classes.Comment}>
                        {hotelDetails.comment}
                    </div>
                    <div className={classes.CommentNum}>
                        {hotelDetails.comments_num}条点评
                    </div>
                    <div className={classes.Score}>
                        {hotelDetails.score}
                    </div>
                </div>
                <div className={classes.Price}>
                    <span className={classes.oldPrice}>
                        ￥{hotelDetails.price_old}
                    </span>
                    <span className={classes.newPrice}>
                        ￥{hotelDetails.price_new}
                    </span>
                    起
                </div>
                <div className={classes.Perference}>
                    <Label items={hotelDetails.preference} />
                </div>
                <div className={classes.Btn}>
                    <Button
                        type='primary'
                        onClick={showDetail}
                    >查看详情</Button>
                </div>
            </div>
        </div>
    );
};

export default ListCategory;