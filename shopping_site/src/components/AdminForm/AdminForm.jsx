import { Button, Dropdown, Input, Space } from 'antd';
import React, { useState } from 'react';
import classes from './AdminForm.module.css'

const items = [
    {
        key: '1',
        label: (
            <Button type='primary'>用户</Button>
        ),
    },
    {
        key: '2',
        label: (
            <Button type='primary'>管理员</Button>
        ),
    }
];

const AdminForm = ({ userList, deleteHandler, choose }) => {

    //点击选择某一行表单
    const checkHandler = e => {
        choose(e.target.id)
    }

    // 点击编辑用户信息
    const [isEdit, setIsEdit] = useState(false);
    const editHandler = () => {
        setIsEdit(true);
    }

    return (
        <>
            <tr className={classes.tr}>
                <td>
                    <input
                        type='checkbox'
                        onChange={checkHandler}
                        id={userList.id}
                        checked={userList.checked}
                    />
                </td>
                <td>{userList.id}</td>
                <td>
                    {isEdit ?
                        <Input placeholder='姓名' /> :
                        userList.name}
                </td>
                <td>
                    {isEdit ?
                        <Input placeholder='密码' /> :
                        userList.pwd}
                </td>
                <td>
                    {isEdit ?
                        <Input placeholder='电话' /> :
                        userList.phone}
                </td>
                <td>
                    {isEdit ?
                        <Input placeholder='邮箱' /> :
                        userList.mail}
                </td>
                <td>
                    {isEdit ?
                        <Space direction="vertical">
                            <Space wrap>
                                <Dropdown
                                    menu={{
                                        items,
                                    }}
                                    placement="bottom"
                                >
                                    <Button>权限选择</Button>
                                </Dropdown>
                            </Space>
                        </Space> :
                        userList.access}
                </td>
                <td className={classes.Btn}>
                    <Button type='primary' onClick={editHandler}>{isEdit ? '确认' : '编辑'}</Button>
                    <Button type='primary' danger>{isEdit ? '返回' : '删除'}</Button>
                </td>
            </tr>
        </>
    );
};

export default AdminForm;