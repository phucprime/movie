import React from 'react'
import {
    Row,
    Col,
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    Dropdown,
    Modal,
    Checkbox
} from 'antd';
import { Link } from 'react-router-dom'
import './header.css'
import Api from '../Api'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'unknown',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            username: '',
            signInLoading: false,
            signUpLoading: false,
            permission: '0'
        }
    }

    // lấy username và permission được lưu trữ tạm thời trong local storage khi component được tải
    UNSAFE_componentWillMount() {
        if (localStorage.username !== '') {
            this.setState({
                hasLogined: true,
                username: localStorage.username,
                permission: localStorage.permission
            });
        }
    };

    // thiết lập trạng thái hiển thị cho modal dựa trên value được truyền vào
    setModalVisible(value) {
        this.setState({modalVisible: value});
    };

    // xử lý click trên hai tab trong menu: trang chủ và thể loại phim
    handleMenuClick(e) {
        this.setState({
            current: e.key,
        });
    }

    // hiển thị modal user panel khi click để đăng nhập hoặc đăng ký
    handleButtonClick(e) {
        this.setModalVisible(true);
    }
    // xử lý đăng nhập
    handleSignIn(e) {

        // bắt đầu gửi dữ liệu
        e.preventDefault();
        this.setState({signInLoading: true});

        const formData = this.props.form.getFieldsValue();

        const username = formData.username;
        const password = formData.password;
        const permission = formData.permission ? 1 : 0;

        if (username === null || password === null) {
            message.warning("Username or Password cannot empty!");
            this.setState({signUpLoading: false});
            return;
        }

        // gửi yêu cầu đăng nhập, đăng nhập thành công > reload page
        fetch(Api.userSignIn(username, password, permission), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(response => response.json())
            .then(info => {
                if (info.status !== 1) {
                    message.error("Login failed, Username or password is incorrect!");
                    console.log(`error message: ${info.msg}`);
                } else {
                    message.success("Login Successfully");
                    this.setState({username});
                    localStorage.username = username;
                    localStorage.permission = `${permission}`;
                    if (this.state.action === "login") {
                        this.setState({hasLogined: true});
                    }
                    this.setModalVisible(false);
                    window.location.reload(true);
                }
                this.setState({signInLoading: false});
            })
    };

    // xử lý đăng ký tài khoản mới
    handleSignUp(e) {

        // bắt đầu gửi dữ liệu
        e.preventDefault();
        this.setState({signUpLoading: true});

        const formData = this.props.form.getFieldsValue();

        const username = formData.r_username;
        const password = formData.r_password;
        const confirmPassword = formData.r_confirmPassword;
        const permission = formData.r_permission ? 1 : 0;

        if (username === null || password === null || confirmPassword === null) {
            message.warning("Username, Password or Confirm Password cannot be empty!");
            this.setState({signUpLoading: false});
            return;
        }

        if (password !== confirmPassword) {
            message.warning("Password is not the same with Confirm Password!");
            this.setState({signUpLoading: false});
            return;
        }

        // gửi yêu cầu đăng ký 
        fetch(Api.userSignUp(username, password, permission), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        }).then(response => response.json())
            .then(info => {
                if (info.status !== 1) {
                    message.error("Registration failed!");
                    console.log(`error message: ${info.msg}`);
                } else {
                    message.success("Register successfully, you're logged in!");
                    this.setState({username});
                    localStorage.username = username;
                    localStorage.permission = `${permission}`;
                    if (this.state.action === "login") {
                        this.setState({hasLogined: true});
                    }
                    this.setModalVisible(false);
                }
                this.setState({signUpLoading: false});
            });
    }

    // đăng xuất, xóa thông tin người dùng được lưu trong local storage, reload page
    logout() {
        localStorage.username = '';
        localStorage.permission = '0';
        this.setState({hasLogined: false});
        window.location.reload(true);
    };

    // set role của tài khoản khi đăng nhập mà được tick/untick vô checkbox as administrator
    onHandleAdminToggle(e) {
        this.setState({isAdmin: !this.state.isAdmin});
    }

    render() {
        // với role admin sẽ hiển thị 2 option: admin dashboard và register ngược lại kết xuất div rỗng
        const upload = this.state.permission !== "0" 
            ?
            <Menu.Item>
                <Link to="/upload">
                    <Button icon="appstore-o" size="small">
                        Admin Dashboard
                    </Button>
                </Link>
                <br />
                <Button onClick={this.handleButtonClick.bind(this)}>
                    Add New User
                </Button>
            </Menu.Item>
            : 
            <div></div>;

        const menu = (
            <Menu>
                {upload}
                <Menu.Item>
                    <Button icon="logout" type="danger" size="small" onClick={this.logout.bind(this)}>
                        Sign Out
                    </Button>
                </Menu.Item>
            </Menu>
        );

        // chưa đăng nhập thì hiển thị nút 'log in', đã đăng nhập sẽ hiển thị username
        let {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined
            ?
            <Dropdown overlay={menu} placement="topCenter">
                <Button className="user" icon="user" type="primary" htmlType="button" size="large">
                   Hi, {this.state.username} <Icon type="down"/>
                </Button>
            </Dropdown>
            :
            <Button className="user" icon="user" type="primary" htmlType="button" ghost
                    onClick={this.handleButtonClick.bind(this)}>
                        Log in
            </Button>;

        return (
            <header>
                <Row>
                    <Col span={3}/>
                    <Col span={1}>
                       <a href="/" id="logo">
                            {/** ảnh logo trên thanh menu, 
                             * nhưng để logo lớn dưới menu khá ổn rồi nên để rỗng chỗ này */}
                        </a>
                    </Col>
                    <Col span={4}>
                        <Menu
                            onClick={this.handleMenuClick.bind(this)}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                            style={{lineHeight: '64px'}}>
                            <Menu.Item key="home">
                                <Link to={'/'}/><Icon type="home"/>
                                    Home 
                                </Menu.Item>
                            <Menu.Item key="app">
                                <Icon type="profile"/>
                                    Categories
                                <Link to={'/category'}/>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={10}/>
                    <Col span={2}>
                        {userShow}
                    </Col>
                    <Col span={3}/>
                </Row>

                {/** modal form đăng nhập | đăng ký */}
                <Modal title="User Panel"
                       wrapClassName="vertical-center-modal"
                       visible={this.state.modalVisible}
                       onOk={() => this.setModalVisible(true)}
                       onCancel={() => this.setModalVisible(false)}
                       okText="OK"
                       cancelText="Cancel"
                       >
                  <Tabs type="card">

                    {/** xử lý role admin | user sẽ ẩn hiện các phần login | register 
                       * tùy ngữ cảnh user hoặc admin
                       */}
                        <TabPane tab="REGISTER" key="2">
                            <Form horizontal="true" onSubmit={this.handleSignUp.bind(this)} className="login-form">
                                    <FormItem label="Username">
                                        {getFieldDecorator('r_username', {
                                            rules: [{required: true, message: 'Please enter your username!'}],
                                        })(
                                            <Input required={true} prefix={<Icon type="user" 
                                                style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                placeholder="username"/>
                                        )}
                                    </FormItem>
                                    <FormItem label="Password">
                                        {getFieldDecorator('r_password', {
                                            rules: [{required: true, message: 'Please enter your password!'}],
                                        })(
                                            <Input required={true} prefix={<Icon type="lock" 
                                                style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                type="password" placeholder="password"/>
                                        )}
                                    </FormItem>
                                    <FormItem label="Confirm Password">
                                        {getFieldDecorator('r_confirmPassword', {
                                            rules: [{
                                                required: true, message: 'Please confirm your password'
                                            }]
                                        })(
                                            <Input required={true} prefix={<Icon type="lock" 
                                                style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                type="password" placeholder="confirm password"/>
                                        )}
                                    </FormItem>
                                    { this.state.permission !== "0" // nếu login acc admin thì ẩn tuỳ chọn đăng ký như administrator
                                    ?
                                    <FormItem>
                                        {getFieldDecorator('r_permission', {
                                            valuePropName: 'unchecked',
                                            initialValue: false,
                                        })(
                                            <Checkbox onChange={this.onHandleAdminToggle.bind(this)}>
                                                Register as Administrator
                                            </Checkbox>
                                        )}
                                    </FormItem>
                                    :
                                        <div></div>
                                    }
                                    <Button type="primary" htmlType="submit" 
                                            loading={this.state.signUpLoading}
                                            className="login-form-button">
                                                Register
                                    </Button>
                            </Form>
                        </TabPane>
                        { this.state.permission !== "1" // nếu chưa đăng nhập thì chỉ hiển thị form login
                    ?
                        <TabPane tab="LOGIN" key="1">
                            <Form horizontal="true" onSubmit={this.handleSignIn.bind(this)} className="login-form">
                                    <FormItem label="Username">
                                        {getFieldDecorator('username', {
                                            rules: [{required: true, message: 'Please enter your username!'}],
                                        })(
                                            <Input required={true} prefix={<Icon type="user" 
                                                style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                placeholder="username"/>
                                        )}
                                    </FormItem>
                                    <FormItem label="Password">
                                        {getFieldDecorator('password', {
                                            rules: [{required: true, message: 'Please enter your password!'}],
                                        })(
                                            <Input required={true} prefix={<Icon type="lock" 
                                                style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                type="password" placeholder="password"/>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('permission', {
                                            valuePropName: 'unchecked',
                                            initialValue: false,
                                        })(
                                            <Checkbox onChange={this.onHandleAdminToggle.bind(this)}>
                                                Log in as Administrator
                                            </Checkbox>
                                        )}
                                    </FormItem>
                                    <Button type="primary" htmlType="submit" loading={this.state.signInLoading}
                                            className="login-form-button">
                                                Login
                                    </Button>
                            </Form>
                        </TabPane>
                        :
                            <TabPane tab="LOGIN" key="1">
                            </TabPane>                
                        }
                  </Tabs>
                </Modal>
                <br/>
                <br/>
            </header>
        )
    }
}
export default Header = Form.create({})(Header);