import React, { Component } from 'react';
import { Form, Checkbox, Button } from 'antd';
import Manager from '@/pages/Manager';
import { getHygiene, deleteHygiene } from '../../../api/menage';

const CheckboxGroup = Checkbox.Group;

class DeleteHygiene extends Component {
  state = {
    loading: true,
    plainOptions: [],
    indeterminate: true,
    checkAll: false
  };
  componentDidMount() {
    this.initData();
  }
  initData = async () => {
    const rowData = await getHygiene();
    const data = rowData.data.map(value => ({
      label: `第${value}周`,
      value,
      checked: true
    }));
    this.setState({
      loading: !!data.length,
      plainOptions: data
    });
  };
  onChange = checkedList => {
    this.setState({
      indeterminate: !!checkedList.length && checkedList.length < this.state.plainOptions.length,
      checkAll: checkedList.length === this.state.plainOptions.length
    });
  };
  onCheckAllChange = ({ target: { checked } }) => {
    const checkedList = this.state.plainOptions.map(el => el.value);
    this.setState({
      indeterminate: false,
      checkAll: checked
    });
    this.props.form.setFieldsValue({ selectedList: checked ? checkedList : [] });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields(async (err, values) => {
      try {
        if (!err) {
          await deleteHygiene({ weeks: JSON.stringify(values.selectedList) });
          await this.initData();
        }
      } catch (e) {
        console.error(e);
      }
    });
  };
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <Manager>
        <Form className="export-form" onSubmit={this.handleSubmit}>
          {/* <h2>删除卫生成绩</h2> */}
          {!!this.state.plainOptions.length && (
            <div>
              <Form.Item label="选择周">
                {getFieldDecorator('selectedList', {
                  initialValue: []
                })(<CheckboxGroup options={this.state.plainOptions} onChange={this.onChange} />)}
              </Form.Item>
              <div style={{ borderTop: '1px solid #E9E9E9', margin: '20px 0' }}>
                <Checkbox
                  indeterminate={this.state.indeterminate}
                  onChange={this.onCheckAllChange}
                  checked={this.state.checkAll}
                >
                  全选
                </Checkbox>
              </div>
            </div>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={!(getFieldValue('selectedList') && getFieldValue('selectedList').length)}
            >
              {this.state.plainOptions.length ? '删除选中数据' : '当前无数据'}
            </Button>
          </Form.Item>
        </Form>
      </Manager>
    );
  }
}

export default Form.create()(DeleteHygiene);
