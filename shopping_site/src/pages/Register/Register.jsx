import React from 'react';
import classes from './Register.module.css'
import { Input, Button, message, Form, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { reqRegister } from '../../api';

const Register = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const userTypeOptions = [
        { label: '普通用户', value: 'user' },
        { label: '管理员', value: 'admin' }
    ]

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const register = async () => {
        await form.validateFields()

        const value = form.getFieldsValue()

        const user = {
            username: value.username,
            password: value.password,
            phone: value.phone,
            email: value.email,
            isAdmin: value.roleType === 'admin'
        }

        const result = await reqRegister(user)

        if (result.code) {
            messageApi.error(result.message)
            return
        }

        navigate('/login')
    }

    return (
        <>
            {contextHolder}
            <div className={classes.Register}>
                <div className={classes.Title}>基础信息</div>
                <Form form={form} {...layout} name='register'>
                    <Form.Item label="用户名" name="username" required rules={[{ required: true, message: "请输入用户名" }]}>
                        <Input size="large" placeholder="请输入" />
                    </Form.Item>
                    <Form.Item label="密码" name="password" required rules={[{ required: true, message: "请输入密码" }]}>
                        <Input size="large" placeholder="请输入" />
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
                <div className={classes.button}>
                    <Button type='primary'
                        size='large'
                        onClick={register}>立即注册</Button>
                </div>
            </div>

        </>
    );
};

export default Register;