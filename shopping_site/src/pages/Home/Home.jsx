import React, { useMemo } from 'react';
import {
    MobileOutlined,
    ToolOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Spin, theme, Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useMount } from 'ahooks'
import { getUserInfo } from '../../api';
import { observer } from 'mobx-react'
import home from '../../store/home/home'
import user from '../../store/user/user'

const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [


];

const App = observer(() => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const items = useMemo(() => {
        if (user.isAdmin) {
            return [getItem('我的', 'sub1', <MobileOutlined />,
                [getItem('订单信息', '/home/myorder')]),
            getItem('后台管理', 'sub2', <ToolOutlined />,
                [getItem('订单管理', '/home/ordermanage'),
                getItem('用户管理', '/home/usermanage')])]
        } else {
            return [getItem('我的', 'sub1', <MobileOutlined />,
                [getItem('订单信息', '/home/myorder')])]
        }
    }, [user.isAdmin])

    //点击跳转页面
    const navigateTo = useNavigate();
    const navigateHandler = e => {
        navigateTo(e.key);
    }

    useMount(() => {
        home.main()
    })

    return (
        <Spin spinning={home.loading}>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider style={{ backgroundColor: '#fff' }}>
                    <Menu
                        theme="light"
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        items={items}
                        onClick={navigateHandler}
                        style={{ position: 'fixed', width: 200 }} />
                </Sider>
                <Layout className="site-layout">
                    <Content style={{ margin: '0 16px' }}>
                        <div style={{
                            paddingLeft: 24,
                            paddingRight: 24,
                            minHeight: 360,
                            background: colorBgContainer
                        }}>

                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Spin>
    );
})

export default App;
