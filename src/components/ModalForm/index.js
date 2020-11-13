import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import ModalContent from '../ModalContent'

const { Search } = Input;

const children = [];

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const CollectionCreateForm = (values) => {
    const {
        visible,
        state,
        onCreate,
        onCancel,
        handleCodeInputChange,
        handleNameInputChange,
        handleAgeInputChange,
        handleClickOpenModal,
        handleSearchRes
    } = values
    const { codeInputValue, nameInputValue, ageInputValue, principalValue, searchRes } = state

    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="人员信息"
            okText="确定"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                name="form_in_modal"
                {...formItemLayout}
                initialValues={{
                    title: "jsaodijwo",
                    modifier: 'public',
                    code: codeInputValue,
                    name: nameInputValue,
                    age: ageInputValue,
                    // principal: principalValue
                }}
            >
                <Form.Item label="编号" name="code">
                    <Input onChange={handleCodeInputChange} />
                </Form.Item>
                <Form.Item label="姓名" name="name">
                    <Input onChange={handleNameInputChange} />
                </Form.Item>
                <Form.Item label="年龄" name="age">
                    <InputNumber min={0} max={150} onChange={handleAgeInputChange} />
                </Form.Item>
                {/* <Form.Item label="负责人" name="principal" onClick={handleClickOpenModal} >
                    <Input value={principalValue} placeholder={principalValue} suffix={<EllipsisOutlined />} />
                </Form.Item> */}
                {/* <Form.Item label="负责人" name="principal" onClick={handleClickOpenModal} >
                    <Search
                        placeholder={principalValue}
                        suffix={<EllipsisOutlined />}
                        onSearch={handleSearchRes}
                    />
                </Form.Item> */}
                <Form.Item label="负责人" name="principal"  >
                    {/* <Input value={principalValue} placeholder={principalValue} suffix={<EllipsisOutlined />} /> */}
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        defaultValue={['a10', 'c12']}
                        onClick={handleClickOpenModal}
                        onChange={handleSearchRes}
                    // suffix={<EllipsisOutlined />}
                    >
                        {searchRes}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

class ModalForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: props.visible,
            record: {},
            codeInputValue: props.record.code,
            nameInputValue: props.record.code,
            ageInputValue: props.record.age,
            principalValue: '张三',
            childvisible: false,
            // 负责人
            searchRes: ['shdieh', 'ansdifoh']
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible,
            record: nextProps.record,
            codeInputValue: nextProps.record.code,
            nameInputValue: nextProps.record.name,
            ageInputValue: nextProps.record.age
        })
    }

    onCreate = (values) => {
        console.log('Received values of form: ', values);
        this.setState({ visible: false });
        this.props.onUpdateTable(values)
    };


    handleCodeInputChange = (e) => {
        this.setState({
            codeInputValue: e.target.value
        })
    }

    handleNameInputChange = (e) => {
        this.setState({
            nameInputValue: e.target.value
        })
    }

    handleAgeInputChange = (value) => {
        this.setState({
            ageInputValue: value,
        })
    }

    handleClickOpenModal = () => {
        this.setState({
            childvisible: true
        })
    }

    handleUpdateForm = (principal) => {
        console.log(principal)
        this.setState({
            childvisible: false,
            principalValue: principal,
            searchRes: [principal]
        })
        console.log(this.state.principalValue)
    }

    // componentDidUpdate() {
    //     this.setState({
    //         principalValue: this.state.principal,
    //     })
    // }

    handleSearchRes = (value, event) => {
        console.log(value, event)
    }

    render() {
        const { visible, childvisible } = this.state
        return (
            <>
                <CollectionCreateForm
                    visible={visible}
                    onCreate={this.onCreate}
                    onCancel={() => {
                        this.setState({ visible: false });
                    }}
                    state={this.state}
                    handleCodeInputChange={this.handleCodeInputChange}
                    handleNameInputChange={this.handleNameInputChange}
                    handleAgeInputChange={this.handleAgeInputChange}
                    handleClickOpenModal={this.handleClickOpenModal}
                    handleSearchRes={this.handleSearchRes}
                />
                <ModalContent
                    visible={childvisible}
                    // record={record}
                    onUpdateForm={this.handleUpdateForm}
                />
            </ >
        );
    }

};

export default ModalForm