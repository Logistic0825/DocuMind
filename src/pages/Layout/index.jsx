import React from'react';
import { LaptopOutlined, NotificationOutlined, QqOutlined, UserOutlined, WechatOutlined, WeiboCircleFilled } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

// const items1 = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));
const items1 = [
    {
        key : 1,
        label : '智能文档分析助手'
    },
    {
        key : 2,
        label : '智能聊天机器人'
    },
    {
        key : 3,
        label : '智能图片生成系统'
    }
]
// 1. 多格式文档解析与知识库构建（PDF/DOCX/TXT）
// 2. 基于文档内容的智能问答系统
// 3. AI辅助内容生成（摘要/改写/续写）
// 4. 对话式文档分析界面
// 5. 模型微调管理平台
const items2 = [
    {
        key:`sub${1}`,
        icon:<UserOutlined/>,
        label:(
            <Link to='documentreader'>
                多格式文档解析与知识库构建（PDF/DOCX/TXT）
            </Link>
            ),
        children:[
            {
                key:'subsub 1',
                icon:<QqOutlined />,
                label:'PDF'
            },
            {
                key:'subesub 2',
                icon:<WechatOutlined/>,
                label:'DOCX'
            },
            {
                key:'subpsub 3',
                icon:<WeiboCircleFilled />,
                label:'TXT'
            }
        ]
    }
]

// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
//   const key = String(index + 1);
//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,
//     children: Array.from({
//       length: 4,
//     }).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   };
// });

const LayoutPage = ({children}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      // 整体布局高度设为90vh，留一些空间给浏览器的地址栏等，让页面显示更协调
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
        {/* 这里可以将demo-logo替换为项目名称相关的展示，比如项目logo */}
        <div className="demo-logo" /> 
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
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
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
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
              // 侧边栏高度和整体布局高度一致，占满有效显示区域
              height: '60vh', 
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
              }}
              items={items2}
            />
          </Sider>
          <Content
            // 内容区域最小高度设为70vh，为后续功能展示预留足够空间
            style={{
              padding: '0 24px',
              height: '60vh',
              border:'black solid 1px'
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