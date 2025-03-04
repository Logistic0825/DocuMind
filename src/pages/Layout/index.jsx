import React, { useEffect, useState } from'react';
import { LaptopOutlined, NotificationOutlined, QqOutlined, SettingFilled, UserOutlined, WechatOutlined, WeiboCircleFilled } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, useNavigate, useLocation } from'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

const itemTop = [
    {
        key: 'documentreader',
        label: '智能文档分析助手',
    },
    {
        key: 'chatrobot',
        label: '智能聊天机器人'
    },
    {
        key: 'imagegenerater',
        label: '智能图片生成系统'
    },
    {
        key: 'likeanalyzer',
        label: 'Like Analyzer'
    }
];

const itemdocument = [
    {
        key: `documentanalyzer`,
        icon: <UserOutlined />,
        label: '多格式文档解析与知识库构建（PDF/DOCX/TXT）',
        children: [
            {
                key: 'pdf',
                icon: <QqOutlined />,
                label: 'PDF'
            },
            {
                key: 'docx',
                icon: <WechatOutlined />,
                label: 'DOCX'
            },
            {
                key: 'txt',
                icon: <WeiboCircleFilled />,
                label: 'TXT'
            }
        ]
    },
    {
        key: 'qabasedocu',
        icon: <QqOutlined />,
        label: '基于文档内容的智能问答系统',
        children: [
            {
                key: 'xec23',
                label: 'exg'
            },
            {
                key: 'xec233',
                label: 'exg4'
            }
        ]
    }
];

const itemchatrobot = [
    {
        key: 'qa',
        label: '问题回答',
    },
    {
        key: 'qawithmemory',
        label: '有记忆聊天机器人'
    }
];

const itemimg = [
    {
        key: 'img',
        label: '图片生成'
    }
];

const itemlikeAnalyzer = [
    {
        key: 'chatmsgextract',
        icons: <WechatOutlined />,
        label: '聊天记录提取'
    },
    {
        key: 'analysis',
        icons: <SettingFilled />,
        label: '情感分析'
    }
];

const findLabelByKey = (items, key) => {
    for (const item of items) {
        if (item.key === key) {
            return item.label;
        }
        if (item.children) {
            const found = findLabelByKey(item.children, key);
            if (found) {
                return found;
            }
        }
    }
    return null;
};

const LayoutPage = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [currentItemTop, setCurrentItemTop] = useState('documentreader');
    const [currentItemTopLabel, setCurrentItemTopLabel] = useState('');
    const [breadcrumbLabels, setBreadcrumbLabels] = useState([currentItemTopLabel]);
    const [currentSidebarItems, setCurrentSidebarItems] = useState(itemdocument);
    const navigate = useNavigate();
    const location = useLocation();

    const handleItemTopClick = (key) => {
        if (`/${key}` === location.pathname) {
            return;
        }
        setCurrentItemTop(key);
        navigate(`/${key}`);
    };

    useEffect(() => {
        const filteredItems = itemTop.filter(item => item.key === currentItemTop);
        if (filteredItems.length > 0) {
            const label = filteredItems[0].label;
            setCurrentItemTopLabel(label);
        }
    }, [currentItemTop]);

    useEffect(() => {
        const pathParts = location.pathname.split('/').filter(part => part);
        const topLevelKey = pathParts[0];
        if (itemTop.some(item => item.key === topLevelKey)) {
            setCurrentItemTop(topLevelKey);
        }
    }, [location]);

    useEffect(() => {
        let newSidebarItems;
        switch (currentItemTop) {
            case 'documentreader':
                newSidebarItems = itemdocument;
                break;
            case 'chatrobot':
                newSidebarItems = itemchatrobot;
                break;
            case 'imagegenerater':
                newSidebarItems = itemimg;
                break;
            case 'likeanalyzer':
                newSidebarItems = itemlikeAnalyzer;
                break;
            default:
                newSidebarItems = itemdocument;
        }
        setCurrentSidebarItems(newSidebarItems);
    }, [currentItemTop]);

    const handleSidebarItemClick = (parentKey, key) => {
        let newPath;
        if (parentKey) {
            newPath = `/${currentItemTop}/${parentKey}/${key}`;
        } else {
            newPath = `/${currentItemTop}/${key}`;
        }
        console.log('Navigate key:', newPath);
        navigate(newPath);
    };

    const renderSidebarItems = (items, parentKey = null) => {
        return items.map((item) => {
            if (item.children) {
                return {
                    ...item,
                    children: renderSidebarItems(item.children, item.key),
                    // 父菜单不进行路由跳转，只展开子菜单
                    onClick: () => {}, 
                };
            }
            return {
                ...item,
                onClick: () => handleSidebarItemClick(parentKey, item.key),
            };
        });
    };

    useEffect(() => {
        const pathParts = location.pathname.split('/').filter(part => part);
        const labels = [currentItemTopLabel];
        for (let i = 1; i < pathParts.length; i++) {
            const label = findLabelByKey(currentSidebarItems, pathParts[i]);
            if (label) {
                labels.push(label);
            }
        }
        setBreadcrumbLabels(labels);
    }, [location, currentItemTopLabel, currentSidebarItems]);

    return (
        <Layout
            style={{
                height: '90vh',
            }}
        >
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="light"
                    mode="horizontal"
                    selectedKeys={[currentItemTop]}
                    items={itemTop.map((item) => ({
                        ...item,
                        onClick: () => handleItemTopClick(item.key),
                    }))}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                />
            </Header>
            <div
                style={{
                    padding: '0 48px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    {breadcrumbLabels.map((label, index) => (
                        <Breadcrumb.Item key={index}>{label}</Breadcrumb.Item>
                    ))}
                </Breadcrumb>
                <Layout
                    style={{
                        padding: '24px 0',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Sider
                        style={{
                            background: colorBgContainer,
                            height: '60vh',
                        }}
                        width={200}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['documentreader']}
                            defaultOpenKeys={['pdf']}
                            style={{
                                height: '100%',
                            }}
                            items={renderSidebarItems(currentSidebarItems)}
                        />
                    </Sider>
                    <Content
                        style={{
                            padding: '0 24px',
                            height: '60vh',
                            border: 'black solid 1px'
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </div>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                智能文档分析助手（DocuMind）©{new Date().getFullYear()} Created by Your Team
            </Footer>
        </Layout>
    );
};

export default LayoutPage;