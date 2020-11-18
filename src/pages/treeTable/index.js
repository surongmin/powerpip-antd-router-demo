import React from 'react'
import { Table, Switch, Space } from 'antd';

const columns = [
    // {
    //     // 自增序号
    //     title: '',
    //     render: (text, record, index) => `${index + 1}`,
    // },
    {
        title: '编号',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: '名字',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: '12%',
    },
    {
        title: '部门',
        dataIndex: 'deptName',
        // width: '30%',
        key: 'deptName',
    },
];

const data = [
    {
        key: 1,
        deptName: '产品部',
        code: 'limgming',
        posiName: "实施工程师",
        id: "7 c306e21 - 8 aad - 4 dcd - 81 de - d9fa1d3e58b6",
        roleType: 0,
        name: '李明',
        age: 100,
        children: [
            {
                key: 11,
                deptName: "研发部",
                code: 'liuzhi',
                posiName: '总经理',
                id: '3 c6ef1be - 7e4 a - 402 a - b882 - 7 b405114f6c1 ',
                roleType: 0,
                name: '刘志',
                age: 101
            },
            {
                key: 12,
                deptName: '任华测试1',
                code: 'yl01',
                posiName: '测试',
                id: 'b6a559ac - 0b 42 - 4 d38 - b7dc - fc3608de1f6f',
                roleType: 0,
                name: '杨林',
                age: 102,
                children: [
                    {
                        key: 121,
                        deptName: '任华测试1',
                        code: 'rhcs01',
                        posiName: '开发工程师',
                        id: '0 f3af920 - 46 d0 - 433 d - a57b - 936 da1a7b6e3',
                        roleType: 0,
                        name: '测试没有用户',
                        age: 103,
                        children: [
                            {
                                key: 1211,
                                deptName: '任华测试1',
                                code: 'rhcdfrvsdfs01',
                                posiName: '开发工程师',
                                id: '0 f3af920 - 46 d0 - 433 d - a57b - 936 da1a7b6e3',
                                roleType: 0,
                                name: '测试dfg',
                                age: 103
                            }
                        ]
                    },
                    {
                        key: 122,
                        deptName: '任华测试12222',
                        code: 'rhcssdfsd011',
                        posiName: '开发工程师',
                        id: '0 f3af920 - 46 d0 - 433 d - a57b - 936 da1a7b6e3',
                        roleType: 0,
                        name: '测试没有用户sdfvd1',
                        age: 103
                    },
                ]
            },
        ]
    },

    {
        key: 2,
        deptName: '任华测试451',
        code: 'rhcs01',
        posiName: '开发工程师',
        id: '0 f3af920 - 46 d0 - 433 d - a57b - 936 da1a7b6e3',
        roleType: 0,
        name: '测试没有用户',
        age: 103,
        children: [
            {
                key: 21,
                deptName: '任华测试122725722',
                code: 'rhcs011',
                posiName: '开发工程师',
                id: '0 f3af920 - 46 d0 - 433 d - a57b - 936 da1a7b6e3',
                roleType: 0,
                name: '测试没有用户1',
                age: 103
            }
        ]
    },
    {
        key: 3,
        deptName: '任华测试122725722',
        code: 'rhcs011',
        posiName: '开发工程师',
        id: '0 f3af920 - 46 d0 - 433 d - a57b - 936 da1a7b6e3',
        roleType: 0,
        name: '测试没有用户1',
        age: 103
    }
];

// rowSelection objects indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};

function Investment() {
    const [checkStrictly, setCheckStrictly] = React.useState(false);
    return (
        <>
            <Space align="center" style={{ marginBottom: 16 }}>
                完全受控: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
            </Space>
            <Table
                columns={columns}
                rowSelection={{ ...rowSelection, checkStrictly }}
                dataSource={data}
            />
        </>
    );
}

export default Investment
