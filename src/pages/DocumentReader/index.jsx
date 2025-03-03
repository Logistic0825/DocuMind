import React from'react';
import { Layout, Card, Button, Input, message, Space } from 'antd';
import LayoutPage from "../Layout"; // 假设这是你的布局组件
import { useMediaQuery } from'react-responsive';

const { Header, Sider, Content } = Layout;

const DocumentReader = () => {
    // 模拟处理多格式文档的函数
    const handleDocumentUpload = () => {
        message.success('文档已成功上传并开始解析');
    };

    // 模拟智能问答的函数
    const handleQuestionSubmit = () => {
        message.success('问题已提交，正在获取答案');
    };

    // 模拟AI辅助内容生成的函数
    const handleContentGenerate = () => {
        message.success('内容生成任务已启动');
    };

    // 使用 useMediaQuery 检测屏幕宽度，这里以 768px 为分界点，可根据需求调整
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <LayoutPage>
            <Content style={{ padding: '24px', overflow: 'auto' }}>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: isSmallScreen? '1fr' : '1fr 1fr', 
                    gridTemplateRows: isSmallScreen? 'auto auto auto auto' : 'auto auto',
                    gridGap: '24px' 
                }}>
                    
                    {/* 多格式文档解析与知识库构建模块 */}
                    <Card title="多格式文档解析与知识库构建（PDF/DOCX/TXT）" bordered={true}>
                        <Button type="primary" onClick={handleDocumentUpload}>
                            上传文档
                        </Button>
                    </Card>
                    {/* 基于文档内容的智能问答系统模块 */}
                    <Card title="基于文档内容的智能问答系统" bordered={true}>
                        <Input placeholder="请输入你的问题" style={{ width: '400px', marginRight: '16px' }} />
                        <Button type="primary" onClick={handleQuestionSubmit}>
                            提交问题
                        </Button>
                    </Card>

                    {/* AI辅助内容生成模块 */}
                    <Card title="AI辅助内容生成（摘要/改写/续写）" bordered={true}>
                        <Space>
                            <Button type="primary" onClick={() => handleContentGenerate('摘要')}>
                                生成摘要
                            </Button>
                            <Button type="primary" onClick={() => handleContentGenerate('改写')}>
                                改写内容
                            </Button>
                            <Button type="primary" onClick={() => handleContentGenerate('续写')}>
                                续写内容
                            </Button>
                        </Space>
                    </Card>

                    {/* 对话式文档分析界面模块 */}
                    <Card title="对话式文档分析界面" bordered={true}>
                        {/* 这里可以添加更复杂的对话界面组件，比如聊天框等 */}
                        <p>这是一个简单的对话式文档分析界面展示区域，后续可进一步完善。</p>
                    </Card>
                </div>
            </Content>
        </LayoutPage>
    );
};

export default DocumentReader;