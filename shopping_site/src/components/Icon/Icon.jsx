import React from 'react';
import classes from './Icon.module.css'
import { SketchOutlined, LikeOutlined } from '@ant-design/icons'

const Icon = ({ star, like }) => {

    //星级和好评
    const arrStar = new Array(star);
    for (let i = 0; i < star; i++) {
        arrStar[i] = <SketchOutlined
            style={{ color: 'yellow', fontSize: 15 }} key={i} />
    }
    const arrLike = new Array(like);
    for (let i = 0; i < like; i++) {
        arrLike[i] = <span className={classes.Icon} key={i}>
            <LikeOutlined
                style={{ color: 'white', fontSize: 17 }} />
        </span>
    }

    return (
        <>
            <span className={classes.Icons}>
                {
                    arrStar.map(item => item)
                }
            </span>
            <span>
                {
                    arrLike.map(item => item)
                }
            </span>

        </>
    );
};

export default Icon;