import React, { useState } from 'react';
import { Row, Col, Tree, Space, Table, Button } from 'antd';
import { FolderOpenOutlined, FileOutlined, FormOutlined } from '@ant-design/icons';

// tree的数据
const projectTreeData = [
    {
        title: '上海普华科技',
        key: '0-0',
        icon: <FolderOpenOutlined />,
        children: [
            {
                title: '任华测试项目',
                key: '0-0-0',
                icon: <FolderOpenOutlined />,
                children: [
                    {
                        title: '任华测试项目1',
                        key: '0-0-0-0',
                        icon: <FileOutlined />,
                    },
                    {
                        title: '任华测试项目2',
                        key: '0-0-0-1',
                        icon: <FileOutlined />,
                    },
                    {
                        title: '任华测试项目4',
                        key: '0-0-0-2',
                        icon: <FileOutlined />,
                    },
                ],
            },
            {
                title: '刘志测试项目',
                key: '0-0-1',
                icon: <FolderOpenOutlined />,
                children: [
                    {
                        title: '费用1',
                        key: '0-0-1-0',
                        icon: <FileOutlined />,
                    },
                    {
                        title: '费用2',
                        key: '0-0-1-1',
                        icon: <FileOutlined />,
                    },
                    {
                        title: '费用3',
                        key: '0-0-1-2',
                        icon: <FileOutlined />,
                    },
                ],
            },
            {
                title: '费用2',
                key: '0-0-2',
                icon: <FolderOpenOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-2-0',
                        icon: <FileOutlined />,
                    },
                    {
                        title: 'leaf',
                        key: '0-0-2-1',
                        icon: <FormOutlined />,
                    },
                ],
            },
        ],
    },
    {
        title: '杭州普华',
        key: '0-1',
        icon: <FolderOpenOutlined />,
        children: [
            {
                title: '测试0729',
                key: '0-1-0',
                icon: <FolderOpenOutlined />,
                children: [
                    {
                        title: '合同',
                        key: '0-1-0-0',
                        icon: <FolderOpenOutlined />,
                        children: [
                            {
                                title: '合同1',
                                key: '0-1-0-0-0',
                                icon: <FileOutlined />,
                            },
                            {
                                title: '质量',
                                key: '0-1-0-0-1',
                                icon: <FileOutlined />,
                            },
                        ],
                    },
                    {
                        title: '子公司',
                        key: '0-1-0-1',
                        icon: <FileOutlined />,
                    },
                ],
            },
        ],
    },
];

const departmentTreeData = [
    {
        title: '上海普华科技',
        key: '0-0',
        icon: <FolderOpenOutlined />,
        children: [
            {
                title: '研发部',
                key: '0-0-0',
                icon: <FolderOpenOutlined />,
                children: [
                    {
                        title: '前端',
                        key: '0-0-0-0',
                        icon: <FileOutlined />,
                    },
                    {
                        title: '后端',
                        key: '0-0-0-1',
                        icon: <FileOutlined />,
                    },
                    {
                        title: '测试',
                        key: '0-0-0-2',
                        icon: <FileOutlined />,
                    },
                ],
            },
            {
                title: 'PowerPIP',
                key: '0-0-1',
                icon: <FolderOpenOutlined />,
                children: [
                    {
                        title: '前端',
                        key: '0-0-1-0',
                        icon: <FileOutlined />,
                    },
                    {
                        title: '后端',
                        key: '0-0-1-1',
                        icon: <FileOutlined />,
                    },
                    {
                        title: '安卓',
                        key: '0-0-1-2',
                        icon: <FileOutlined />,
                    },
                ],
            },
            {
                title: '市场部',
                key: '0-0-2',
                icon: <FolderOpenOutlined />,
                children: [
                    {
                        title: '市场部1',
                        key: '0-0-2-0',
                        icon: <FileOutlined />,
                    },
                    {
                        title: '市场部2',
                        key: '0-0-2-1',
                        icon: <FormOutlined />,
                    },
                ],
            },
        ],
    },
    {
        title: '杭州普华',
        key: '0-1',
        icon: <FolderOpenOutlined />,
        children: [
            {
                title: '研发部',
                key: '0-1-0',
                icon: <FolderOpenOutlined />,
                children: [
                    {
                        title: '测试',
                        key: '0-1-0-0',
                        icon: <FolderOpenOutlined />,
                        children: [
                            {
                                title: '前端测试',
                                key: '0-1-0-0-0',
                                icon: <FileOutlined />,
                            },
                            {
                                title: '接口测试',
                                key: '0-1-0-0-1',
                                icon: <FileOutlined />,
                            },
                        ],
                    },
                    {
                        title: '开发',
                        key: '0-1-0-1',
                        icon: <FileOutlined />,
                    },
                ],
            },
        ],
    },
];

// 中间Table的表格字段
const columns = [
    {
        // 自增序号
        title: '',
        render: (text, record, index) => `${index + 1}`,
        // title: 'key',
        // dataIndex: (index) => index + 1,
        // key: 'key',
        // render: (index) => `${index + 1}`
    },
    {
        title: '编码',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: '名字',
        dataIndex: 'name',
        key: 'name',
    },
];

// 中间Table的数据
const projectDataTable = [
    {
        treeId: '0-0',
        data: []
    },
    {
        treeId: '0-0-0',
        data: []
    },
    {
        treeId: '0-0-0-0',
        data: [
            {
                key: '1',
                code: 'liming',
                name: '李明',
            },
            {
                key: '2',
                code: 'liuzhi',
                name: '刘志',
            },
            {
                key: '3',
                code: 'ceshi',
                name: '测试',
            },
        ]
    },
    {
        treeId: '0-0-0-1',
        data: [
            {
                key: '1',
                code: 'liming',
                name: '李明1',
            },
            {
                key: '2',
                code: 'liuzhi',
                name: '刘志1',
            },
            {
                key: '3',
                code: 'ceshi',
                name: '测试1',
            },
        ]
    },
    {
        treeId: '0-0-0-2',
        data: [
            {
                key: '1',
                code: 'liming',
                name: '李明2',
            },
            {
                key: '2',
                code: 'liuzhi',
                name: '刘志2',
            },
            {
                key: '3',
                code: 'ceshi',
                name: '测试2',
            },
        ]
    },

];

const departmentDataTable = [
    {
        treeId: '0-0',
        data: []
    },
    {
        treeId: '0-0-0',
        data: []
    },
    {
        treeId: '0-0-0-0',
        data: [
            {
                key: '1',
                code: 'liming',
                name: '李明',
            },
            {
                key: '2',
                code: 'liming1',
                name: '李明1',
            },
            {
                key: '3',
                code: 'liming2',
                name: '李明2',
            },
        ]
    },
    {
        treeId: '0-0-0-1',
        data: [
            {
                key: '1',
                code: 'liuzhi',
                name: '刘志',
            },
            {
                key: '2',
                code: 'liuzhi1',
                name: '刘志1',
            },
            {
                key: '3',
                code: 'liuzhi2',
                name: '刘志2',
            },
        ]
    },
    {
        treeId: '0-0-0-2',
        data: [
            {
                key: '1',
                code: 'ceshi',
                name: '测试',
            },
            {
                key: '2',
                code: 'ceshi1',
                name: '测试1',
            },
            {
                key: '3',
                code: 'ceshi2',
                name: '测试2',
            },
        ]
    },

];

const ModalTree = (props) => {
    const [treeData, setTreeData] = useState(projectTreeData)
    const [dataTable, setDataTable] = useState(projectDataTable)
    const [data, setData] = useState([])
    const [hasData, setHasData] = useState(false)
    const [dataSelect, setdataSelect] = useState([{
        key: '',
        code: '',
        name: '',
    }])
    const [projectButton, setProjectButton] = useState('primary')
    const [departmentButton, setDepartmentButton] = useState('default')

    // tree的代码
    const showLine = {
        showLine: true,
        showLeafIcon: false
    }

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
        let flag = true
        for (let i = 0; i < dataTable.length; i++) {
            if (dataTable[i].treeId === selectedKeys[0]) {
                flag = false
                setData(dataTable[i].data)
            }
        }
        if (flag) {
            setData([])
        }
    };

    const handleProjectClick = () => {
        setProjectButton('primary');
        setDepartmentButton('default')
        setTreeData(projectTreeData)
        setDataTable(projectDataTable)
    }

    const handleDepartmentClick = () => {
        setProjectButton('default');
        setDepartmentButton('primary')
        setTreeData(departmentTreeData)
        setDataTable(departmentDataTable)
    }

    // 中间表格的代码

    const handleClickRow = (record) => {
        setdataSelect([{ ...record }])
        setHasData(true)
        props.onSelectPeople(record.name)
    }

    // 右边Select表格的字段
    const columnsSelect = [
        {
            title: '已选中人员',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '操作',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <a href='#' onClick={handleDeleteSelect}>Delete</a>
                </Space>
            )
        }
    ];

    //  右边Select表格的代码

    const handleDeleteSelect = () => {
        setHasData(false)
    }

    return (
        <Row gutter={16}>
            <Col className="gutter-row" span={6}>
                <div>
                    <Button type={projectButton} onClick={handleProjectClick} style={{ margin: '10px' }}>按项目</Button>
                    <Button type={departmentButton} onClick={handleDepartmentClick} >按部门</Button>
                </div>
                <Tree
                    style={{ border: '1px solid #eeeeee', padding: '10px' }}
                    showLine={showLine}
                    showIcon
                    defaultExpandedKeys={['0-0-0']}
                    onSelect={onSelect}
                    treeData={treeData}
                />
            </Col>
            <Col className="gutter-row" span={10}>
                <Table
                    bordered
                    columns={columns}
                    dataSource={data ? data : null}
                    pagination={data.length > 5 ? true : false}
                    onRow={record => {
                        return {
                            onClick: event => { handleClickRow(record) }, // 点击行
                        };
                    }}
                />
            </Col>
            <Col className="gutter-row" span={6} >
                <Table
                    bordered
                    columns={columnsSelect}
                    dataSource={hasData ? dataSelect : null}
                    pagination={false}
                />
            </Col>
        </Row>
    );
};

export default ModalTree