import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber, Tag } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import ModalContent from '../ModalContent'
import './style.css'


// function log(e) {
//     console.log(e);
// }

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
        handleClose
    } = values
    const { codeInputValue, nameInputValue, ageInputValue, principalValue } = state

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
                <Form.Item label="负责人" name="principal" >
                    <div className='input-select-selector' >
                        {
                            principalValue.length ?
                                (
                                    principalValue.map((tag, i) => {
                                        return (
                                            <Tag
                                                closable
                                                onClose={e => {
                                                    e.preventDefault();
                                                    handleClose(tag);
                                                }}
                                                className="select-tag-item"
                                                key={i}
                                            >
                                                {tag}
                                            </Tag>
                                        )
                                    })
                                )
                                :
                                <span className="ant-select-selection-placeholder">请选择人员</span>
                        }
                        <div className='icon-openmodal' onClick={handleClickOpenModal} >
                            <EllipsisOutlined />
                        </div>
                    </div>
                </Form.Item>
                {/* <Form.Item label="负责人" name="principal" onClick={handleClickOpenModal} >
                    <Input value={principalValue} placeholder={principalValue} suffix={<EllipsisOutlined />} />
                </Form.Item> */}
            </Form>
        </Modal >
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
            principalValue: [],
            childvisible: false,
            dataSelect: []
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

    handleUpdateForm = (value) => {
        let principal = []
        for (let i = 0; i < value.length; i++) {
            principal.push(value[i].name)
        }

        this.setState({
            childvisible: false,
            principalValue: principal,
            dataSelect: value
        })
    }

    handleClose = removedTag => {
        let flag = [...this.state.principalValue]
        const tags = flag.filter(tag => tag !== removedTag);

        let newValue = [...this.state.dataSelect]
        for (let i = 0; i < newValue.length; i++) {
            if (newValue[i].name === removedTag) {
                newValue.splice(i, 1)
            }
        }
        this.setState({
            principalValue: tags,
            dataSelect: newValue
        });
    };

    render() {
        const { visible, childvisible, dataSelect } = this.state
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
                    handleClose={this.handleClose}
                />
                <ModalContent
                    visible={childvisible}
                    dataSelect={dataSelect}
                    onUpdateForm={this.handleUpdateForm}
                />
            </ >
        );
    }

};

export default ModalForm