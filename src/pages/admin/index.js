import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Switch, Divider, Radio, Button } from 'antd'

const borderstyle = { border: '1px solid rgba(0,0,0,.06)', padding: '20px 20px' }
export const ConfigurationContext = React.createContext()

const Admin = () => {
    const [checkStrictly, setCheckStrictly] = useState(false);
    const [border, setBorder] = useState(true);

    const [dndvalue, setDndvalue] = useState({});
    const [dndborder, setdndborder] = useState(localStorage.getItem("dndborder") || false);
    const [dndtitle, setDndtitle] = useState(localStorage.getItem("dndtitle") || false);
    const [dndheader, setDndheader] = useState(localStorage.getItem("dndheader") || false);
    const [dndrowselection, setDndrowselection] = useState(localStorage.getItem("dndrowselection") || false);
    const [dndsize, setDndsize] = useState(localStorage.getItem("dndsize") || 'default');

    useEffect(() => {
        let flagDndvalue = {}
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            let flag = localStorage.getItem(key)
            if (flag === 'true') {
                flag = true
            }
            if (flag === 'false') {
                flag = false
            }
            flagDndvalue[key] = flag
        }
        console.log(flagDndvalue)
        setdndborder(flagDndvalue.dndborder)
        setDndtitle(flagDndvalue.dndtitle)
        setDndheader(flagDndvalue.dndheader)
        setDndrowselection(flagDndvalue.dndrowselection)
        setDndsize(flagDndvalue.dndsize)
    }, [localStorage])

    const handleDndBorderChange = (checked) => {
        setdndborder(checked)
    }

    const handleDndtitleChange = (checked) => {
        setDndtitle(checked)
    }

    const handleDndheaderChange = (checked) => {
        setDndheader(checked)
    }

    const handleDndrowSelectionChange = (checked) => {
        setDndrowselection(checked)
    }

    const handleDndsizeChange = (e) => {
        console.log('radio checked', e.target.value);
        setDndsize(e.target.value)
    }

    const onFinish = values => {
        console.log('Success:', values);
        setDndvalue(values)
        // localStorage = { ...values }
        localStorage.setItem("dndborder", values.dndborder)
        localStorage.setItem("dndtitle", values.dndtitle)
        localStorage.setItem("dndheader", values.dndheader)
        localStorage.setItem("dndrowselection", values.dndrowselection)
        localStorage.setItem("dndsize", values.dndsize)
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    console.log(dndvalue)
    return (
        <Row gutter={24}>
            <Col className="gutter-row" span={8} >
                <div style={borderstyle}>
                    <h2>可拖拽表格</h2>
                    <Divider />
                    <Form
                        initialValues={{
                            dndborder: dndborder,
                            dndtitle: dndtitle,
                            dndheader: dndheader,
                            dndrowselection: dndrowselection,
                            dndsize: dndsize,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item label="边框" name='dndborder'>
                            <Switch checked={dndborder} onChange={handleDndBorderChange} />
                        </Form.Item>
                        <Form.Item label="标题" name='dndtitle'>
                            <Switch checked={dndtitle} onChange={handleDndtitleChange} />
                        </Form.Item>
                        <Form.Item label="表头" name='dndheader'>
                            <Switch checked={dndheader} onChange={handleDndheaderChange} />
                        </Form.Item>
                        <Form.Item label="复选框" name='dndrowselection'>
                            <Switch checked={dndrowselection} onChange={handleDndrowSelectionChange} />
                        </Form.Item>
                        <Form.Item label="大小" name='dndsize'>
                            <Radio.Group value={dndsize} onChange={handleDndsizeChange}>
                                <Radio.Button value="default">默认</Radio.Button>
                                <Radio.Button value="middle">中等</Radio.Button>
                                <Radio.Button value="small">小</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
            <Col className="gutter-row" span={8}>
                <div style={borderstyle}>
                    <h2>树形数据表格</h2>
                    <Divider />
                    <Form>
                        <Form.Item label="完全受控" name='border'>
                            <Switch checked={checkStrictly} onChange={setCheckStrictly} />
                        </Form.Item>
                        <Form.Item label="边框" name='border'>
                            <Switch checked={border} onChange={setBorder} />
                        </Form.Item>
                    </Form>
                </div>
            </Col>
            <Col className="gutter-row" span={8} gutter={24}>
                <div style={borderstyle}>
                    <h2>基础表格</h2>
                    <Divider />
                    <Form>
                        <Form.Item label="完全受控" name='strictly'>
                            <Switch checked={checkStrictly} onChange={setCheckStrictly} />
                        </Form.Item>
                        <Form.Item label="边框" name='border'>
                            <Switch checked={border} onChange={setBorder} />
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    )
}

export default Admin
