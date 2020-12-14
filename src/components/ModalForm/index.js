import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Tag } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const ModalForm = (props) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(props.visible);
    const [codeInputValue, setCodeInputValue] = useState(props.record.code)
    const [nameInputValue, setNameInputValue] = useState(props.record.name)
    const [ageInputValue, setAgeInputValue] = useState(props.record.age)
    const [principalValue, setPrincipalValue] = useState([])
    const [childvisible, setChildvisible] = useState(false);

    useEffect(() => {
        setVisible(props.visible)
    }, [props.visible])

    useEffect(() => {
        // form.resetFields();
        setCodeInputValue(props.record.code)
        setNameInputValue(props.record.name)
        setAgeInputValue(props.record.age);
        form.setFieldsValue({
            ...props.record
        });
    }, [props.record])

    console.log(props.record)
    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setVisible(false);
        props.onUpdateTable(values)
    };

    const handleCodeInputChange = (e) => {
        setCodeInputValue(e.target.value)
    }

    const handleNameInputChange = (e) => {
        setNameInputValue(e.target.value)
    }

    const handleAgeInputChange = (e) => {
        setAgeInputValue(e.target.value)
    }

    const handleClickOpenModal = () => {
        setChildvisible(true)
    }

    const handleUpdateForm = (value) => {
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

    const handleClose = removedTag => {
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


    return (
        <>
            <Modal
                visible={visible}
                title="Create a new collection"
                okText="Create"
                cancelText="Cancel"
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                    props.onUpdateTable();
                    form.resetFields();
                }}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onCreate(values);
                            props.onUpdateTable()
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
                        <Input onChange={handleCodeInputChange}
                        // defaultValue={codeInputValue}
                        // value={codeInputValue}
                        />
                    </Form.Item>
                    <Form.Item label="姓名" name="name">
                        <Input onChange={handleNameInputChange}
                        // defaultValue={nameInputValue}
                        // value={nameInputValue}
                        />
                    </Form.Item>
                    <Form.Item label="年龄" name="age">
                        <InputNumber min={0} max={150} onChange={handleAgeInputChange}
                        // defaultValue={ageInputValue}
                        // value={ageInputValue}
                        />
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
                </Form>
            </Modal>
        </>
    );
};

export default ModalForm