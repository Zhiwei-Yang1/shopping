import React from 'react';
import classes from './HotelHeader.module.css'
import Icon from '../Icon/Icon'
import { EnvironmentOutlined, BlockOutlined, CompassFilled, CarFilled, LeftOutlined } from '@ant-design/icons';

const HotelHeader = ({ hotelDetails, chooseRoom, backToList }) => {

    return (
        <div className={classes.hotelDetail_head}>
            <div className={classes.Return_btn} onClick={() => backToList()}>
                <LeftOutlined />
                返回列表页
            </div>
            <div className={classes.detailHeadline_container}>
                <div className={classes.detailHeadline_left}>
                    <h1>
                        {hotelDetails.name}
                        <Icon />
                    </h1>
                    <div>
                        <EnvironmentOutlined />
                        {hotelDetails.address}
                    </div>
                    <div>
                        <BlockOutlined />
                        装修：2015 酒店位于上海市静安区沪太路，紧邻地铁7号线行知路站；酒店地处于繁华地...
                    </div>
                    <div className={classes.Pic}>
                        <img src="https://dimg04.c-ctrip.com/images/0202y1200087eyzwyF985_R_600_400_R5_D.jpg" alt="" />
                    </div>
                    <ul className={classes.ul}>
                        <li>
                            <div className={classes.Pic1}>
                                <img src="https://dimg04.c-ctrip.com/images/0202y1200087eyzwyF985_R_600_400_R5_D.jpg" alt="" />
                            </div>
                        </li>
                        <li>
                            <div className={classes.Pic1}>
                                <img src="https://dimg04.c-ctrip.com/images/0202y1200087eyzwyF985_R_600_400_R5_D.jpg" alt="" />
                            </div>
                        </li>
                        <li>
                            <div className={classes.Pic1}>
                                <img src="https://dimg04.c-ctrip.com/images/0202y1200087eyzwyF985_R_600_400_R5_D.jpg" alt="" />
                            </div>
                        </li>
                        <li>
                            <div className={classes.Pic1}>
                                <img src="https://dimg04.c-ctrip.com/images/0202y1200087eyzwyF985_R_600_400_R5_D.jpg" alt="" />
                            </div>
                        </li>
                        <li>
                            <div className={classes.Pic1}>
                                <img src="https://dimg04.c-ctrip.com/images/0202y1200087eyzwyF985_R_600_400_R5_D.jpg" alt="" />
                            </div>
                        </li>
                        <li>
                            <div className={classes.Pic1}>
                                <img src="https://dimg04.c-ctrip.com/images/0202y1200087eyzwyF985_R_600_400_R5_D.jpg" alt="" />
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={classes.detailHeadline_right}>
                    <div className={classes.Price}>
                        <span className={classes.oldPrice}>￥{hotelDetails.price_old}</span>
                        <span className={classes.newPrice}>￥{hotelDetails.price_new}</span>
                    </div>
                    <div className={classes.select}
                        onClick={() => chooseRoom()}>选择房间</div>
                    <div className={classes.Comments}>
                        <div className={classes.Score}>
                            {hotelDetails.score}
                            <span>分</span>
                        </div>
                        <div className={classes.Comment}>
                            {hotelDetails.comment}
                        </div>
                        <div className={classes.CommentNum}>
                            显示所有{hotelDetails.comments_num}条点评
                        </div>
                        <div className={classes.Sum}>
                            体验很棒、服务很好
                        </div>
                    </div>
                    <div className={classes.CommentText}>
                        环境优美，服务很贴心 服务很亲切但不过度，饭菜也很可口 度假不二选择 离市区也...
                    </div>
                    <div className={classes.Map}>
                        <div className={classes.MapLeft}>
                            <img src="https://img2.baidu.com/it/u=3897332079,3972410459&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500" alt="" />
                        </div>
                        <div className={classes.MapRight}>
                            <div className={classes.MapRightTop}>
                                <div className={classes.Distance}>
                                    <CompassFilled />
                                    20.94公里
                                </div>
                                <div className={classes.Distance}>
                                    <CarFilled />
                                    46.21公里
                                </div>
                            </div>
                            <div className={classes.MapRightMid}>
                                距离市中心{hotelDetails.distance}公里
                            </div>
                            <div className={classes.MapRightBottom}>
                                查看地图
                            </div>
                        </div>
                    </div>
                    <div className={classes.Bottom}>
                        <div>接机服务 | 24小时前台服务 | 会议厅 | 智能门锁...</div>
                        <div className={classes.ShowAll}>显示所有设施</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelHeader;