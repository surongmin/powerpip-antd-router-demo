import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import './style.css'
import { withRouter } from 'react-router-dom'
import { Link } from "react-router-dom";
import { projectRoutes } from '../../routes'

const { Header, Content, Sider } = Layout;

const Frame = (props) => {
    const [breadcrumbData, setBreadcrumbData] = useState({})

    const handleClickMenu = ({ item, key, keyPath, domEvent }) => {
        setBreadcrumbData(item.props.children[1].props)
    }
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">项目管理</Menu.Item>
                    <Menu.Item key="2">系统管理</Menu.Item>
                    <Menu.Item key="3">后台管理</Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={handleClickMenu}
                    >
                        {
                            projectRoutes.map((route) => {
                                return (
                                    <Menu.Item key={route.path}>
                                        <Link to={route.path}>{route.title}</Link>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>
                            <Link to='#'>主页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={breadcrumbData.to}>{breadcrumbData.children}</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {props.children}

                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default withRouter(Frame)
