import React, { useMemo, useState } from 'react';
import classes from './UserManage.module.css';
import { Button, Form, Input, Table, Modal, Radio } from 'antd';
import { columns as IColumns } from './columns'
import { deleteUser, searchUser, updateUser } from '../../api/index'
import { useMount } from 'ahooks';

const UserManage = () => {
    const [form] = Form.useForm()
    const [innerForm] = Form.useForm()
    const [users, setUsers] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [userid, setUserid] = useState()
    const [showModal, setShowModal] = useState(false)

    const columns = useMemo(() => {
        const operate = {
            title: '操作',
            width: 200,
            render: (record) => {

                const modifyUser = () => {
                    const user = {
                        username: record.username,
                        password: record.password,
                        phone: record.phone,
                        email: record.email,
                        roleType: record.isAdmin ? 'admin' : 'user'
                    }

                    innerForm.setFieldsValue(user)
                    setShowModal(true)
                    setUserid(record.userid)
                }

                const deleteUser = () => {
                    Modal.confirm({
                        title: '确认删除',
                        onOk: () => doDelete(record),
                        onCancel: () => { }
                    })
                }

                return <div className={classes.operate}>
                    <Button type='primary' onClick={modifyUser}>编辑</Button>
                    <Button danger type='primary' onClick={deleteUser}>删除</Button>
                </div>
            }
        }

        return IColumns.concat(operate)
    }, [IColumns])

    const userTypeOptions = [
        { label: '普通用户', value: 'user' },
        { label: '管理员', value: 'admin' }
    ]

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    const doDelete = async (user) => {
        const { userid } = user

        await deleteUser(userid)

        search()
    }
    //批量删除
    const handleDelete = async () => {
        const id = selectedRowKeys;
        console.log(id);
        for (let i = 0; i < id.length; i++) {
            await deleteUser(id[i]);
        }
        search();
    };

    const search = async () => {
        const value = form.getFieldsValue()

        const params = {
            id: value.userid,
            username: value.username
        }


        console.log('search')
        const response = await searchUser(params)

        console.log('serached')

        setUsers(response.data)
    }

    const hideModal = () => {
        innerForm.resetFields()

        setShowModal(false)
    }

    const confirm = async () => {
        await innerForm.validateFields()
        const value = innerForm.getFieldsValue()

        const user = {
            username: value.username,
            password: value.password,
            email: value.email,
            phone: value.phone,
            isAdmin: value.roleType === 'admin',
            userid
        }

        const response = await updateUser(user)

        console.log('update')

        setShowModal(false)

        search()
    }

    const addUser = () => {
        setShowModal(true)
        setUserid('')
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
    };

    const hasSelected = selectedRowKeys.length > 0;

    useMount(search)

    return (
        <div >
            <div className={classes.Search}>
                <Form form={form} name='user-search' layout="inline" style={{ width: '100%' }}>
                    <Form.Item name="username" label="用户名">
                        <Input placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item name="userid" label="用户id">
                        <Input placeholder="请输入ID" />
                    </Form.Item>
                    <div className={classes['search-btns']}>
                        <Form.Item>
                            <Button type='primary' onClick={search}>搜索</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' onClick={addUser}>添加用户</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' disabled={!hasSelected} danger onClick={handleDelete}>批量删除</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <Table
                rowSelection={rowSelection}
                className={classes.table}
                rowKey={(record) => record.userid}
                columns={columns}
                dataSource={users}
            />
            <Modal open={showModal} onCancel={hideModal} onOk={confirm}>
                <div className={classes.editor}>
                    <Form form={innerForm} {...layout} name='user-editor'>
                        <Form.Item label="用户名" name="username" required rules={[{ required: true, message: "请输入用户名" }]}>
                            <Input size="large" placeholder="请输入" />
                        </Form.Item>
                        <Form.Item label="密码" name="password" required rules={[{ required: true, message: "请输入密码" }]}>
                            <Input size="large" placeholder="请输入" disabled={userid} />
                        </Form.Item>
                        <Form.Item label="手机" name="phone">
                            <Input size="large" placeholder="请输入" />
                        </Form.Item>
                        <Form.Item label="邮箱" name="email">
                            <Input size="large" placeholder="请输入" />
                        </Form.Item>
                        <Form.Item label="角色" name="roleType" required rules={[{ required: true, message: "请选择类型" }]}>
                            <Radio.Group options={userTypeOptions} />
                        </Form.Item>
                    </Form >
                </div>
            </Modal>
        </div >
    );
};

export default UserManage;