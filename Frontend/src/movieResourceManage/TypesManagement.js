import React from 'react';
import {
    Button,
    Icon,
    Tag,
    Form,
    Col,
    Row,
    Modal,
    Input,
    message,
    Popconfirm
} from 'antd'
import Api from '../Api'

const FormItem = Form.Item;

class TypesManagement extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: [],
            itemData: [],
            updateLoading: false,
            addLoading: false,
            deleteLoading: false,
            dataUp: [],
            loading: false,
            modalIsVisible: false,
            modalAddIsVisible: false
        };
    }
    
    componentDidMount() {
        this.setState({isLoading: true});
        fetch(Api.types(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        }).then(response => response.json())
            .then(info => this.setState({data: info.data, isLoading: false}))
            .catch(error => console.error('Error:', error));
    }

    setIsModalVisible(value) {
        this.setState({modalIsVisible: value});
    };

    setIsModalAddVisible(value) {
        this.setState({modalAddIsVisible: value});
    };

    setItemData(item) {
        this.setState({itemData: item});
    }

    handleAddClick(e) {
        this.setIsModalAddVisible(true);
    }

    handleRecordsClick(e) {
        this.setIsModalVisible(true);
    }

    handleAddType(e) {
        e.preventDefault();
        this.setState({addLoading: true});

        const formData = this.props.form.getFieldsValue();

        const typeAdd = formData.typeAdd;

        fetch(Api.addType(typeAdd), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                name: typeAdd
            })
        }).then(response => response.json())
            .then(info => {
                if (info.status !== 1) {
                    message.error(`Error: ${info.msg}`);
                    console.log(`error message: ${info.msg}`);
                } else {
                    message.success(`${info.msg}`);
                    this.props.form.resetFields();
                    this.componentDidMount();
                }
                this.setState({addLoading: false});
            });
    };

    handleUpdateType(e) {
        e.preventDefault();
        this.setState({updateLoading: true});

        const formData = this.props.form.getFieldsValue();

        const type = formData.typeUpdate;
        const oldType = this.state.itemData;
        const id = this.state.itemData.id;

        fetch(Api.updateType(oldType), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                name: type,
                id: id
            })
        }).then(response => response.json())
            .then(info => {
                if (info.status !== 1) {
                    message.error(`Error: ${info.msg}`);
                    console.log(`error message: ${info.msg}`);
                } else {
                    message.success(`${info.msg}`);
                    this.setState({ itemData: type });
                    this.props.form.resetFields();
                    this.componentDidMount();
                }
                this.setState({updateLoading: false});
            });
    };

    handleDeleteType() {
        this.setState({deleteLoading: true});

        const typeDelete = this.state.itemData;

        fetch(Api.deleteType(typeDelete), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        }).then(response => response.json())
            .then(info => {
                if (info.status !== 1) {
                    message.error(`Error: ${info.msg}`);
                    console.log(`error message: ${info.msg}`);
                } else {
                    message.success(`${info.msg}`);
                    this.componentDidMount();
                }
                this.setState({deleteLoading: false});
            });
    };

    render() {
        const {data} = this.state;
        let increaseKey = 10;

        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };

        const {getFieldDecorator} = this.props.form;

        return(
            <Row>
                <Col span={5}/>
                <Col>
                    <table style={{ textAlign: 'center', width:'50%' }}>
                        <thead>
                        <tr>
                            <th>
                                Type Name
                            </th>
                            <th>
                                <Button shape='circle' icon='plus' onClick={this.handleAddClick.bind(this)}/>
                                <Modal title="Add Type"
                                    wrapClassName="vertical-center-modal"
                                    centered={true}
                                    visible={this.state.modalAddIsVisible}
                                    onCancel={() => this.setIsModalAddVisible(false) }
                                    destroyOnClose={true}
                                    footer={null}
                                    width='25%'
                                >
                                    <Form onSubmit={this.handleAddType.bind(this)}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="Type Name"
                                            >
                                            {getFieldDecorator('typeAdd', {
                                                rules: [{required: true}]
                                            })(
                                                <Input required={true} className="inputFiled"/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            wrapperCol={{span: 14, offset: 8}}
                                        >
                                            <Button type="primary" htmlType="submit"
                                                    icon="plus"
                                                    loading={this.state.addLoading}
                                            > 
                                                Add Type
                                            </Button>
                                        </FormItem>
                                    </Form>
                                </Modal>
                            </th>
                        </tr>
                        </thead>
                        <tbody key={increaseKey++}>
                            {
                                (data[0] == null) 
                                ? 
                                <tr>
                                    <td colSpan="9">
                                        <p>
                                            There is no data. Please check your connection to server and refresh the page.
                                        </p>
                                        <Button onClick={() => window.location.reload()}>
                                            <Icon type='reload'/>Refresh
                                        </Button>
                                    </td>
                                </tr>
                                :
                                data.map(item =>
                                        <tr key={item}>
                                            <td> 
                                                <Tag key={item} color='blue'>
                                                    {item}
                                                </Tag> 
                                            </td>
                                            <td>
                                                <Button className="btn btn-dark"
                                                        style={{ marginRight:20 }}
                                                        icon='form'
                                                        type='primary'
                                                        onClick={
                                                            () => { 
                                                                this.handleRecordsClick(this);
                                                                this.setItemData(item);
                                                            }
                                                        }
                                                />
                                                <Popconfirm
                                                    title="Delete permanent?"
                                                    okText="Yes"
                                                    cancelText="No"
                                                    onConfirm={()=> this.handleDeleteType(this)}
                                                    onVisibleChange={()=> this.setItemData(item)}
                                                >
                                                    <Button type='danger'
                                                            icon='delete'
                                                    />
                                                </Popconfirm>
                                            </td>
                                        </tr>
                                    )
                            }
                            </tbody>
                        </table>
                        <Modal title="Update Type"
                                wrapClassName="vertical-center-modal"
                                centered={true}
                                visible={this.state.modalIsVisible}
                                onCancel={() => this.setIsModalVisible(false) }
                                destroyOnClose={true}
                                footer={null}
                                width='25%'
                        >
                            <Form onSubmit={this.handleUpdateType.bind(this)}>
                                <FormItem
                                    {...formItemLayout}
                                    label="Type Name"
                                    >
                                    {getFieldDecorator('typeUpdate', {
                                        initialValue: this.state.itemData,
                                        rules: [{required: true}]
                                    })(
                                        <Input required={true} className="inputFiled"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    wrapperCol={{span: 14, offset: 8}}
                                >
                                    <Button type="primary" htmlType="submit"
                                            icon="edit"
                                            loading={this.state.updateLoading}
                                    > 
                                        Update 
                                    </Button>
                                </FormItem>
                            </Form>
                        </Modal>
                    </Col>
            </Row>      
        )
    }
    
}
export default TypesManagement = Form.create({})(TypesManagement);