import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Tag } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import DndModalContent from '../DndModalContent'
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

// const CollectionCreateForm = (values) => {
//     const {
//         visible,
//         state,
//         onCreate,
//         onCancel,
//         handleCodeInputChange,
//         handleNameInputChange,
//         handleAgeInputChange,
//         handleClickOpenModal,
//         handleClose
//     } = values
//     const { codeInputValue, nameInputValue, ageInputValue, principalValue } = state
//     console.log(codeInputValue, nameInputValue, ageInputValue,)

//     const [form] = Form.useForm();
//     return (
//         <Modal
//             visible={visible}
//             title="人员信息"
//             okText="确定"
//             cancelText="取消"
//             onCancel={onCancel}
//             onOk={() => {
//                 form
//                     .validateFields()
//                     .then((values) => {
//                         form.resetFields();
//                         onCreate(values);
//                     })
//                     .catch((info) => {
//                         console.log('Validate Failed:', info);
//                     });
//             }}
//         >
//             <Form
//                 // form={form}
//                 name="form_in_modal"
//                 {...formItemLayout}
//                 initialValues={{
//                     code: codeInputValue,
//                     name: nameInputValue,
//                     age: ageInputValue,
//                     // principal: principalValue
//                 }}
//             >
//                 <Form.Item label="编号" name="code">
//                     <Input onChange={handleCodeInputChange} value={codeInputValue} />
//                 </Form.Item>
//                 <Form.Item label="姓名" name="name">
//                     {nameInputValue}
//                     <Input onChange={handleNameInputChange} value={nameInputValue} />
//                 </Form.Item>
//                 <Form.Item label="年龄" name="age">
//                     <InputNumber min={0} max={150} onChange={handleAgeInputChange} value={ageInputValue} />
//                 </Form.Item>
//                 <Form.Item label="负责人" name="principal" >
//                     <div className='input-select-selector' >
//                         {
//                             principalValue.length ?
//                                 (
//                                     principalValue.map((tag, i) => {
//                                         return (
//                                             <Tag
//                                                 closable
//                                                 onClose={e => {
//                                                     e.preventDefault();
//                                                     handleClose(tag);
//                                                 }}
//                                                 className="select-tag-item"
//                                                 key={i}
//                                             >
//                                                 {tag}
//                                             </Tag>
//                                         )
//                                     })
//                                 )
//                                 :
//                                 <span className="ant-select-selection-placeholder">请选择人员</span>
//                         }
//                         <div className='icon-openmodal' onClick={handleClickOpenModal} >
//                             <EllipsisOutlined />
//                         </div>
//                     </div>
//                 </Form.Item>
//             </Form>
//         </Modal >
//     );
// };

const DndModalForm = (props) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(props.visible);
    const [codeInputValue, setCodeInputValue] = useState(props.record.code)
    const [nameInputValue, setNameInputValue] = useState(props.record.name)
    const [ageInputValue, setAgeInputValue] = useState(props.record.age)
    const [principalValue, setPrincipalValue] = useState([])
    const [childvisible, setChildvisible] = useState(false);
    const [dataSelect, setDataSelect] = useState([]);

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         visible: props.visible,
    //         record: {},
    //         codeInputValue: props.record.code,
    //         nameInputValue: props.record.code,
    //         ageInputValue: props.record.age,
    //         principalValue: [],
    //         childvisible: false,
    //         dataSelect: []
    //     };
    // }

    useEffect(() => {
        setVisible(props.visible)
    }, [props.visible])

    useEffect(() => {
        setCodeInputValue(props.record.code)
        setNameInputValue(props.record.name)
        setAgeInputValue(props.record.age);
        form.setFieldsValue({
            ...props.record
        });
    }, [props.record])

    const onCreate = (values) => {
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
        setChildvisible(false)
        setPrincipalValue(principal)
        setDataSelect(value)
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

        setPrincipalValue(tags)
        setDataSelect(newValue)
    };


    return (
        <>
            <Modal
                visible={visible}
                title="人员信息1"
                okText="确定"
                cancelText="取消"
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
                </Form>
            </Modal >
            <DndModalContent
                visible={childvisible}
                dataSelect={dataSelect}
                onUpdateForm={handleUpdateForm}
            />
        </ >
    );
};

export default DndModalForm