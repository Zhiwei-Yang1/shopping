import React, { useState, useMemo } from 'react';
import { Button, Form, Input, Table, Modal, DatePicker } from 'antd';
import { columns as IColumns } from './columns'
import { useMount } from 'ahooks'
import { deleteOrder, searchOrder, updateOrder } from '../../api';
import dayjs from 'dayjs'
import classes from './OrderManage.module.css';

const OrderManage = () => {
    const [form] = Form.useForm()
    const [innerForm] = Form.useForm()
    const [list, setList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [orderId, setOrderId] = useState()

    const columns = useMemo(() => {
        const operate = {
            title: '操作',
            width: 200,
            render: (record) => {

                const modifyUser = () => {
                    const user = {
                        custom_name: record.custom_name,
                        custom_phone: record.custom_phone,
                        name: record.name,
                        start_date: dayjs(Number(record.start_date)),
                        end_date: dayjs(Number(record.end_date)),
                    }

                    innerForm.setFieldsValue(user)

                    setShowModal(true)
                    setOrderId(record.orderid)
                }

                const deleteOrder = () => {
                    Modal.confirm({
                        title: '确认删除',
                        onOk: () => doDelete(record),
                        onCancel: () => { }
                    })
                }

                return <div className={classes.operate}>
                    <Button type='primary' onClick={modifyUser}>编辑</Button>
                    <Button danger type='primary' onClick={deleteOrder}>删除</Button>
                </div>
            }
        }

        return IColumns.concat(operate)
    }, [IColumns])


    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };


    const doDelete = async (order) => {
        const { orderid } = order

        await deleteOrder(orderid)

        search()
    }

    const handleDelete = async () => {
        const orderid = selectedRowKeys;
        console.log(orderid);
        for (let i = 0; i < orderid.length; i++) {
            await deleteOrder(orderid[i]);
        }
        search();
    };

    const search = async () => {
        const value = form.getFieldsValue()

        const params = {
            orderid: value.orderid,
            username: value.username,
            name: value.name,
        }

        const response = await searchOrder(params)

        setList(response.data)
    }

    const hideModal = () => {
        innerForm.resetFields()

        setShowModal(false)
    }

    const confirm = async () => {
        await innerForm.validateFields()
        const value = innerForm.getFieldsValue()

        const user = {
            custom_name: value.custom_name,
            custom_phone: value.custom_phone,
            name: value.name,
            start_date: value.start_date.valueOf(),
            end_time: value.end_date.valueOf(),
            orderid: orderId
        }

        const response = await updateOrder(user)

        setShowModal(false)

        search()
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
    };

    const hasSelected = selectedRowKeys.length > 0;

    useMount(search)

    const initHotel = async () => {
        await window.__init__hotel__();
        await window.__init__room__();
    }


    return (
        <div>
            <div className={classes.Search}>
                <Form form={form} name='order-search' layout="inline" style={{ width: '100%' }}>
                    <Form.Item name="orderid" label="订单号">
                        <Input placeholder="请输入订单号" />
                    </Form.Item>
                    <Form.Item name="name" label="酒店名">
                        <Input placeholder="请输入酒店名" />
                    </Form.Item>
                    <Form.Item name="username" label="用户名">
                        <Input placeholder="请输入用户名" />
                    </Form.Item>
                    <div className={classes['search-btns']}>
                        <Form.Item>
                            <Button type="primary" onClick={initHotel}>酒店信息初始化</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' onClick={search}>搜索</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' disabled={!hasSelected} danger onClick={handleDelete}>批量删除</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <Table columns={columns} dataSource={list} rowSelection={rowSelection} rowKey={record => record.orderid} />
            <Modal open={showModal} onCancel={hideModal} onOk={confirm}>
                <div className={classes.editor}>
                    <Form form={innerForm} {...layout} name='user-editor'>
                        <Form.Item label="酒店名" name="name" required rules={[{ required: true, message: "请输入酒店名" }]} >
                            <Input size="large" placeholder="请输入" />
                        </Form.Item>
                        <Form.Item label="用户名" name="custom_name" required rules={[{ required: true, message: "请输入用户名" }]}>
                            <Input size="large" placeholder="请输入" />
                        </Form.Item>
                        <Form.Item label="手机" name="custom_phone">
                            <Input size="large" placeholder="请输入" />
                        </Form.Item>
                        <Form.Item label="开始时间" name="start_date" required rules={[{ required: true, message: "请选择开始时间" }]}>
                            <DatePicker size="large" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="结束时间" name="end_date" required rules={[{ required: true, message: "请选择结束时间" }]}>
                            <DatePicker size="large" style={{ width: '100%' }} />
                        </Form.Item>
                    </Form >
                </div>
            </Modal>
        </div>
    );
};

export default OrderManage;