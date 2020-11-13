import React, { useState, useCallback, useRef } from 'react';
import { Table } from 'antd';
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

const RNDContext = createDndContext(HTML5Backend);

const type = 'DragableBodyRow';

const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
    const ref = React.useRef();
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: monitor => {
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
            };
        },
        drop: item => {
            moveRow(item.index, index);
        },
    });
    const [, drag] = useDrag({
        item: { type, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drop(drag(ref));
    return (
        <tr
            ref={ref}
            className={`${className}${isOver ? dropClassName : ''}`}
            style={{ cursor: 'move', ...style }}
            {...restProps}
        />
    );
};

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
        // ...this.getColumnSearchProps('name'),
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

const TableDemo = () => {
    const [data, setData] = useState([
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

    ]);

    const components = {
        body: {
            row: DragableBodyRow,
        },
    };

    const moveRow = useCallback(
        (dragIndex, hoverIndex) => {
            const dragRow = data[dragIndex];
            setData(
                update(data, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragRow],
                    ],
                }),
            );
        },
        [data],
    );

    const manager = useRef(RNDContext);

    return (
        <DndProvider manager={manager.current.dragDropManager}>
            <Table
                columns={columns}
                dataSource={data}
                components={components}
                onRow={(record, index) => ({
                    index,
                    moveRow,
                })}
            />
        </DndProvider>
    );
};

export default TableDemo