import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import ModalTree from '../ModalTree'

class ModalContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      visible: props.visible,
      dataSelect: props.dataSelect
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      dataSelect: nextProps.dataSelect
    })
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
      this.props.onUpdateForm(this.state.dataSelect)
    }, 1000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleSelectPeople = (dataSelect) => {
    this.setState({
      dataSelect: dataSelect
    })
  }

  render() {
    const { visible, loading, dataSelect } = this.state;
    return (
      <Modal
        width={1000}
        visible={visible}
        title="人员选择"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            取消
            </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
            确认
            </Button>,
        ]}
      >
        <ModalTree
          onSelectPeople={this.handleSelectPeople}
          dataSelect={dataSelect}
        />
      </Modal>
    );
  }
}

export default ModalContent