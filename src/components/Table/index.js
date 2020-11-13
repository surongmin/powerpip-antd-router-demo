import React, { Component } from 'react'
import { Table, Switch, Radio, Form, Space, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
// import { DownOutlined, SearchOutlined } from '@ant-design/icons';
// import ModalContent from '../ModalContent'
// import ModalDetail from '../ModalDetail'
import ModalForm from '../ModalForm'

const data = [
    {
        key: 1,
        deptName: '产品部',
        code: 'limgming',
        posiName: "实施工程师",
        id: "7 c306e21 - 8 aad - 4 dcd - 81 de - d9fa1d3e58b6",
        roleType: 0,
        name: '李明',
        age: 100
    },
    {
        key: 2,
        deptName: "研发部",
        code: 'liuzhi',
        posiName: '总经理',
        id: '3 c6ef1be - 7e4 a - 402 a - b882 - 7 b405114f6c1 ',
        roleType: 0,
        name: '刘志',
        age: 101
    },
    {
        key: 3,
        deptName: '任华测试1',
        code: 'yl01',
        posiName: '测试',
        id: 'b6a559ac - 0b 42 - 4 d38 - b7dc - fc3608de1f6f',
        roleType: 0,
        name: '杨林',
        age: 102
    },
    {
        key: 4,
        deptName: '任华测试1',
        code: 'rhcs01',
        posiName: '开发工程师',
        id: '0 f3af920 - 46 d0 - 433 d - a57b - 936 da1a7b6e3',
        roleType: 0,
        name: '测试没有用户',
        age: 103
    },
    {
        key: 5,
        deptName: '任华测试12222',
        code: 'rhcs011',
        posiName: '开发工程师',
        id: '0 f3af920 - 46 d0 - 433 d - a57b - 936 da1a7b6e3',
        roleType: 0,
        name: '测试没有用户1',
        age: 103
    }
]

const expandable = { expandedRowRender: record => <p>{record.description}</p> };
const title = () => '这里是表格标题';
const showHeader = true;
const footer = () => '这里是底部';
const pagination = { position: 'bottom' };

class TableDemo extends Component {
    state = {
        bordered: false,
        loading: false,
        pagination,
        size: 'default',
        expandable,
        title: undefined,
        showHeader,
        footer,
        rowSelection: {},
        scroll: undefined,
        hasData: true,
        tableLayout: undefined,
        top: 'none',
        bottom: 'bottomRight',
        dataTable: data,
        // Modal弹窗
        visible: false,
        record: {},
        // 搜索功能
        searchText: '',
        searchedColumn: '',
    };

    handleToggle = prop => enable => {
        this.setState({ [prop]: enable });
    };

    handleSizeChange = e => {
        this.setState({ size: e.target.value });
    };

    handleTableLayoutChange = e => {
        this.setState({ tableLayout: e.target.value });
    };

    handleExpandChange = enable => {
        this.setState({ expandable: enable ? expandable : undefined });
    };

    handleEllipsisChange = enable => {
        this.setState({ ellipsis: enable });
    };

    handleTitleChange = enable => {
        this.setState({ title: enable ? title : undefined });
    };

    handleHeaderChange = enable => {
        this.setState({ showHeader: enable ? showHeader : false });
    };

    handleFooterChange = enable => {
        this.setState({ footer: enable ? footer : undefined });
    };

    handleRowSelectionChange = enable => {
        this.setState({ rowSelection: enable ? {} : undefined });
    };

    handleYScrollChange = enable => {
        this.setState({ yScroll: enable });
    };

    handleXScrollChange = e => {
        this.setState({ xScroll: e.target.value });
    };

    handleDataChange = hasData => {
        this.setState({ hasData });
    };

    // Modal弹框
    handleDoubleClickRow = (record, event) => {
        // object的setState赋值方式
        this.setState({
            visible: true,
            record: {
                ...this.state.record,
                ...record
            }
        });
    }


    // 搜索功能
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        搜索
              </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        重置
              </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    handleUpdateTable = (values) => {
        const { code, name, age } = values
        const { dataTable, record } = this.state;
        let newData = dataTable.map(item => {
            return record.key === item.key ? { ...item, code, name, age } : item
        });
        this.setState({
            dataTable: newData,
            visible: false
        })
    }

    render() {
        const { visible, record, dataTable, xScroll, yScroll, ...state } = this.state;

        const scroll = {};
        if (yScroll) {
            scroll.y = 240;
        }
        if (xScroll) {
            scroll.x = '100vw';
        }

        const columns = [
            {
                title: '',
                render: (text, record, index) => `${index + 1}`,
            },
            {
                title: '编号',
                dataIndex: 'code',
            },
            {
                title: '名字',
                dataIndex: 'name',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: '年龄',
                dataIndex: 'age',
                sorter: (a, b) => a.age - b.age,
            },
            {
                title: '主部门',
                dataIndex: 'deptName',
                filters: [
                    {
                        text: '产品部',
                        value: '产品部',
                    },
                    {
                        text: '研发部',
                        value: '研发部',
                    },
                    {
                        text: '测试',
                        value: '任华测试1',
                    },
                ],
                onFilter: (value, record) => record.deptName.indexOf(value) === 0,
            },
            {
                title: '主岗位',
                dataIndex: 'posiName',
            }
        ];

        const tableColumns = columns.map(item => ({ ...item, ellipsis: state.ellipsis }));
        if (xScroll === 'fixed') {
            tableColumns[0].fixed = true;
            tableColumns[tableColumns.length - 1].fixed = 'right';
        };

        return (
            <>
                <Form
                    layout="inline"
                    className="components-table-demo-control-bar"
                    style={{ marginBottom: 16 }}
                >
                    <Form.Item label="边框">
                        <Switch checked={state.bordered} onChange={this.handleToggle('bordered')} />
                    </Form.Item>
                    <Form.Item label="加载">
                        <Switch checked={state.loading} onChange={this.handleToggle('loading')} />
                    </Form.Item>
                    <Form.Item label="标题">
                        <Switch checked={!!state.title} onChange={this.handleTitleChange} />
                    </Form.Item>
                    <Form.Item label="表头">
                        <Switch checked={!!state.showHeader} onChange={this.handleHeaderChange} />
                    </Form.Item>
                    <Form.Item label="底部">
                        <Switch checked={!!state.footer} onChange={this.handleFooterChange} />
                    </Form.Item>
                    <Form.Item label="扩展">
                        <Switch checked={!!state.expandable} onChange={this.handleExpandChange} />
                    </Form.Item>
                    <Form.Item label="复选框">
                        <Switch checked={!!state.rowSelection} onChange={this.handleRowSelectionChange} />
                    </Form.Item>
                    <Form.Item label="固定表头">
                        <Switch checked={!!yScroll} onChange={this.handleYScrollChange} />
                    </Form.Item>
                    <Form.Item label="数据">
                        <Switch checked={!!state.hasData} onChange={this.handleDataChange} />
                    </Form.Item>
                    <Form.Item label="省略">
                        <Switch checked={!!state.ellipsis} onChange={this.handleEllipsisChange} />
                    </Form.Item>
                    <Form.Item label="大小">
                        <Radio.Group value={state.size} onChange={this.handleSizeChange}>
                            <Radio.Button value="default">默认</Radio.Button>
                            <Radio.Button value="middle">中等</Radio.Button>
                            <Radio.Button value="small">小</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="表格样式">
                        <Radio.Group value={xScroll} onChange={this.handleXScrollChange}>
                            <Radio.Button value={undefined}>自适应</Radio.Button>
                            <Radio.Button value="scroll">滚动条</Radio.Button>
                            <Radio.Button value="fixed">固定列</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="列宽">
                        <Radio.Group value={state.tableLayout} onChange={this.handleTableLayoutChange}>
                            <Radio.Button value={undefined}>自适应</Radio.Button>
                            <Radio.Button value="fixed">固定</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="头部分页">
                        <Radio.Group
                            value={this.state.top}
                            onChange={e => {
                                this.setState({ top: e.target.value });
                            }}
                        >
                            <Radio.Button value="topLeft">左上</Radio.Button>
                            <Radio.Button value="topCenter">中上</Radio.Button>
                            <Radio.Button value="topRight">右上</Radio.Button>
                            <Radio.Button value="none">无</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="底部分页">
                        <Radio.Group
                            value={this.state.bottom}
                            onChange={e => {
                                this.setState({ bottom: e.target.value });
                            }}
                        >
                            <Radio.Button value="bottomLeft">左下</Radio.Button>
                            <Radio.Button value="bottomCenter">中下</Radio.Button>
                            <Radio.Button value="bottomRight">右下</Radio.Button>
                            <Radio.Button value="none">无</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Form>
                <Table
                    {...this.state}
                    pagination={dataTable.length > 4 ? { position: [this.state.top, this.state.bottom] } : false}
                    columns={tableColumns}
                    dataSource={state.hasData ? dataTable : null}
                    scroll={scroll}
                    onRow={record => {
                        return {
                            onDoubleClick: event => { setTimeout(() => { this.handleDoubleClickRow(record, event) }, 500) },
                        }
                    }
                    }
                />
                {/* <ModalContent visible={visible} /> */}
                {/* <ModalDetail visible={visible} record={record} /> */}
                <ModalForm
                    visible={visible}
                    record={record}
                    onUpdateTable={this.handleUpdateTable}
                />
            </>
        );
    }
}

export default TableDemo