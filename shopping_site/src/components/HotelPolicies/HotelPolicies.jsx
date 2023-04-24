import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import classes from './HotelPolicies.module.css'

const HotelPolicies = ({ getPolicyRef }) => {

    const policyRef = useRef();
    useEffect(() => {
        getPolicyRef(policyRef.current.offsetTop);
    }, [getPolicyRef]);

    return (
        <div className={classes.Room_Policies} ref={policyRef}>
            <div className={classes.Title}>
                酒店政策
            </div>
            <div className={classes.Main}>
                <div className={classes.Policy_List}>
                    <div className={classes.Left}>
                        订房必读
                    </div>
                    <div className={classes.Right}>
                        <div className={classes.Disc}>
                            城市通知
                        </div>
                        <div className={classes.Text}>
                            为贯彻落实《上海市生活垃圾管理条例》相关规定，推进生活垃圾源头减量，上海市文化和旅游局特制定《关于本市旅游住宿业不主动提供客房一次性日用品的实施意见》，2019年7月1日起，上海市旅游住宿业将不再主动提供牙刷、梳子、浴擦、剃须刀、指甲锉、鞋擦这些一次性日用品。若需要可咨询酒店。
                        </div>
                    </div>
                </div>
                <div className={classes.Policy_List}>
                    <div className={classes.Left}>
                        入离时间
                    </div>
                    <div className={classes.Right}>
                        <div className={classes.Disc}>
                            <span>入住时间： 14:00后</span>
                            <span>退房时间： 12:00前</span>
                        </div>
                    </div>
                </div>
                <div className={classes.Policy_List}>
                    <div className={classes.Left}>
                        儿童及加床
                    </div>
                    <div className={classes.Right}>
                        <div className={classes.Text}>
                            欢迎携带儿童入住
                        </div>
                        <div className={classes.Disc}>
                            婴儿床及加床政策
                        </div>
                        <div className={classes.Text}>
                            所有房型不可加床、不提供婴儿床
                        </div>
                    </div>
                </div>
                <div className={classes.Policy_List}>
                    <div className={classes.Left}>
                        宠物
                    </div>
                    <div className={classes.Right}>
                        <div className={classes.Text}>
                            不可携带宠物。
                        </div>
                    </div>
                </div>
                <div className={classes.Policy_List}>
                    <div className={classes.Left}>
                        早餐
                    </div>
                    <div className={classes.Right}>
                        <div className={classes.Text}>
                            餐食类型：西式、中式<br />
                            餐食形式：自助餐<br />
                            餐食价格：￥48/人<br />
                            营业时间：每天06:30-09:30开放
                        </div>
                    </div>
                </div>
                <div className={classes.Policy_List}>
                    <div className={classes.Left}>
                        预订提示
                    </div>
                    <div className={classes.Right}>
                        <div className={classes.Text}>
                            订单需等酒店或供应商确认后生效，订单确认结果以携程短信、邮件或app通知为准。
                        </div>
                    </div>
                </div>
                <div className={classes.Policy_List}>
                    <div className={classes.Left}>
                        酒店前台可用的支付方式
                    </div>
                    <div className={classes.Right}>
                        <div className={classes.Text}>
                            <img src='https://pages.c-ctrip.com/hotels/creditcard/111_pic.png' alt='' />
                            <img src='https://pages.c-ctrip.com/hotels/creditcard/7_pic.png' alt='' />
                            <img src='https://pages.c-ctrip.com/hotels/creditcard/6_pic.png' alt='' />
                            <img src='https://pages.c-ctrip.com/hotels/creditcard/14_pic.png' alt='' />
                            <img src='https://pages.c-ctrip.com/hotels/creditcard/113_pic.png' alt='' />
                            <img src='https://pages.c-ctrip.com/hotels/creditcard/10_pic.png' alt='' />
                            <img src='https://pages.c-ctrip.com/hotels/creditcard/9_pic.png' alt='' />
                            <img src='https://pages.c-ctrip.com/hotels/creditcard/8_pic.png' alt='' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelPolicies;