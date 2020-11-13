import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import ModalForm from '../ModalForm'

class ModalDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            // visible: false,
            visible: props.visible,
            record: props.record || {}
        };
    }

    // 监听父组件双击事件
    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible,
            record: {
                ...this.state.record,
                ...nextProps.record
            }
        })
    }

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible, loading } = this.state;
        return (
            <>
                <Modal
                    visible={visible}
                    title="人员信息"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            返回
            </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            确定
            </Button>,
                    ]}
                >
                    <ModalForm  record={this.state.record}/>
                </Modal>
            </>
        );
    }
}

export default ModalDetail