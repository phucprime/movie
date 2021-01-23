import React from 'react'
import {
    Col,
    Row,
    Form,
    Select,
    Button,
    Slider,
    Upload,
    Icon,
    Input,
    InputNumber,
    message,
    Tabs,
    Checkbox,
    Divider,
    Popover,
    Pagination,
    notification,
    Spin,
    Modal,
    Tag
} from 'antd';
import IconTitle from '../iconTitle/IconTitle'
import './MovieResourceManage.css'
import Api from '../Api'
import 'reactjs-popup/dist/index.css'
import TypesManagement from './TypesManagement'


const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;
const {TextArea} = Input;
const TabPane = Tabs.TabPane;
const Dragger = Upload.Dragger;

class MovieResourceManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: 'https://icon-library.com/images/poster-icon/poster-icon-0.jpg',
            uploadLoading: false,
            updateLoading: false,
            reloadLoading: false,
            deleteLoading: false,
            data: [],
            count: 0,
            selectedMovies: [],
            fileList: [],
            modalIsVisible: false,
            itemData: [],
            typeData: []
        };
    }

    componentDidMount() {
        this.fetchTypeData();
        this.fetchDataCount();
        this.fetchData(0);
    }

    onPageChange(pageNumber) {
        console.log('Page: ', pageNumber);
        this.setState({selectedMovies: []});
        this.fetchData(pageNumber - 1);
    }

    // khi duyệt qua các trang, lấy số lượng phim trên trang hiện tại
    fetchDataCount() {
        fetch(Api.movieCount(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        }).then(response => response.json())
            .then(info => this.setState({count: info.data}))
            .catch(error => console.error('Error:', error));
    }

    // khi duyệt qua các trang, lấy danh sách phim trên trang hiện tại
    fetchData(page) {
        fetch(Api.movieList(page), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/js on',
            },
            mode: 'cors',
        }).then(response => response.json())
            .then(info => this.setState({data: info.data}))
            .catch(error => console.error('Error:', error));
    }

    fetchTypeData(){
        fetch(Api.types(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        }).then(response => response.json())
            .then(info => this.setState({typeData: info.data}))
            .catch(error => console.error('Error:', error));
    }

    setIsModalVisible(value) {
        this.setState({modalIsVisible: value});
    };

    setItemData(item) {
        this.setState({itemData: item});
    }

    handleRecordsClick(e) {
        this.setIsModalVisible(true);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({uploadLoading: true});

        const formData = this.props.form.getFieldsValue();

        const title = formData.title;
        const score = formData.score;
        const alias = formData.alias;
        const releaseDate = formData.releaseDate;
        const length = formData.length;
        const director = formData.director;
        const screenwriter = formData.screenwriter;
        const cast = formData.cast;
        const overview = formData.overview;
        const post = formData.post;
        const movieType = formData.movieType;

        fetch(Api.addMovieInfo(movieType), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                title: title,
                score: score,
                alias: alias,
                releaseDate: releaseDate,
                length: length,
                director: director,
                screenwriter: screenwriter,
                cast: cast,
                overview: overview,
                post: post
            })
        }).then(response => response.json())
            .then(info => {
                if (info.status !== 1) {
                    message.error("Cannot add movie, please check movie information");
                    console.log(`error message: ${info.msg}`);
                } else {
                    message.success("Movie added successfully");
                    this.setState({post: 'https://icon-library.com/images/poster-icon/poster-icon-0.jpg'});
                    this.props.form.resetFields();
                }
                this.setState({uploadLoading: false});
            });
    };

    handleSubmitUpdate(e) {
        e.preventDefault();
        this.setState({updateLoading: true});

        const formData = this.props.form.getFieldsValue();

        const title = formData.titleUpdate;
        const score = formData.scoreUpdate;
        const alias = formData.aliasUpdate;
        const releaseDate = formData.releaseDateUpdate;
        const length = formData.lengthUpdate;
        const director = formData.directorUpdate;
        const screenwriter = formData.screenwriterUpdate;
        const cast = formData.castUpdate;
        const overview = formData.overviewUpdate;
        const post = formData.postUpdate;
        const movieType = formData.movieTypeUpdate;
        const id = this.state.itemData.id;

        fetch(Api.updateMovieInfo(movieType), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                title: title,
                score: score,
                alias: alias,
                releaseDate: releaseDate,
                length: length,
                director: director,
                screenwriter: screenwriter,
                cast: cast,
                overview: overview,
                post: post,
                type: movieType,
                id: id
            })
        }).then(response => response.json())
            .then(info => {
                if (info.status !== 1) {
                    message.error("Cannot update movie, please check movie information");
                    console.log(`error message: ${info.msg}`);
                } else {
                    message.success("Updated successfully");
                    let dataUp = {
                        'title': title,
                        'post' : post,
                        'score' : score,
                        'alias' : alias,
                        'releaseDate' : releaseDate,
                        'length' : length,
                        'director' : director,
                        'screenwriter' : screenwriter,
                        'cast' : cast,
                        'overview' : overview,
                        'type': movieType,
                        'id': id
                    };
                    this.setState({ itemData: dataUp });
                    this.props.form.resetFields();
                    this.fetchData(0);
                }
                this.setState({updateLoading: false});
            });
    };

    onHandleChangePostUrl(e) {
        const {value} = e.target;
        const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
        if ((reg.test(value))) {
            this.setState({post: value});
        }
    };

    onSelectedMovie(e) {
        const selectedMovies = this.state.selectedMovies;
        const target = e.target;
        if (target.checked) {
            if (selectedMovies.indexOf(target.value) === -1) {
                selectedMovies.push(target.value);
            }
        } else {
            const index = selectedMovies.indexOf(target.value);
            if (index !== -1) {
                selectedMovies.splice(index, 1);
            }
        }
        this.setState({selectedMovies});
    }

    onHandleConfirmDeleteTips() {
        const key = `open${Date.now()}`;
        if (this.state.selectedMovies.length === 0) {
            notification.info({
                message: "Oops!",
                description: "No movies selected",
                duration: 4,
                key,
                placement: "topLeft",
            })
        } else {
            notification.warning(
                {
                    message: 'Are you want to delete?',
                    description: this.state.selectedMovies.join("\t"),
                    key,
                    btn: (
                        <Button icon="delete" type="danger" 
                                ghost onClick={() => {
                                        notification.close(key);
                                        this.onHandleDeleteMovies();
                                        }}
                        >
                            Confirm 
                        </Button>),
                    placement: "topLeft",
                }
            )
        }
    }
    
    onHandleDeleteMovies() {
        const {data, selectedMovies}= this.state;
        for (let i = 0; i < selectedMovies.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (selectedMovies[i] === data[j].title) {
                    data.splice(j, 1);
                }
            }
        }

        this.setState({selectedMovies: [], data, deleteLoading: true});

        fetch(Api.deleteMovies(selectedMovies), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        })
        .then(response => response.json())
        .then(info => {
                if (info.status !== 1) {
                    message.error("Movie deletion failed, please refresh!");
                    console.log(`error message: ${info.msg}`);
                } else {
                    message.success("Movie deleted successfully");
                }
                this.setState({deleteLoading: false});
        });
    }

    render() {
        let increaseKey = 10;
        // data: dữ liệu phim
        // count: danh sách phim của một trang, dùng để phân trang
        // typeData: dữ liệu thể loại phim
        let {data, count, typeData} = this.state;

        // chuyển đổi this bên trong thân hàm vì khi gọi không đồng bộ thì nó không phải là this bên ngoài
        const that = this;
        const {getFieldDecorator} = this.props.form;

        // layout cho các input items
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };

        const uploadProps = {
            accept: "video／*",
            name: 'file',   
            listType: 'text',
            action: Api.uploadMovie(),
            beforeUpload(file, fileList) {
                that.setState(({fileList}) => ({
                    fileList: [...fileList, file],
                }));
                that.setState({fileList});
            },
            fileList: this.state.fileList,
            customRequest() {
                const {fileList} = that.state;
                const formData = new FormData();
                formData.append("file", fileList[0]);
                const hide = message.loading('Resource uploading', 0);
                fetch(Api.uploadMovie(), {
                    method: 'POST',
                    mode: 'cors',
                    headers: {},
                    body: formData,
                }).then(response => response.json())
                    .then(info => {
                        setTimeout(hide, 1);
                        if (info.status !== 1) {
                            message.error("Upload Failed!");
                            console.log(`error message: ${info.msg}`);
                        } else {
                            message.success("Uploaded Successfully!");
                        }
                    })
                    .catch(error => console.error('Error:', error));
            },
        };

        return (
            <div>
                <IconTitle/>
                <br/>
                <br/>
                <Row>
                    <Col span={2}/>
                    <Col span={20}>
                    { localStorage.permission !== '0' ? 
                        <div id="pad">
                            <Divider orientation="left">
                                <h2>Movie Manager</h2>
                            </Divider>
                            <Tabs defaultActiveKey="1" tabPosition='left' onTabClick={() => this.fetchTypeData()}>
                                <TabPane tab={ <span><Icon type="cloud-upload"/>Upload Movie</span>} key='1'>
                                    <div id="info">
                                        <Form onSubmit={this.handleSubmit.bind(this)}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="Movie Name">
                                                {getFieldDecorator('title', {
                                                    rules: [{required: true, 
                                                    message: 'Please enter the Movie name!'}],
                                                })(
                                                    <Input placeholder="Must be same with video file name" 
                                                    required={true} className="inputFiled"/>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="Score"
                                            >
                                                {getFieldDecorator('score')(
                                                    <Slider max={10}
                                                            step={1}
                                                            marks={{
                                                                0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5',
                                                                6: '6', 7: '7', 8: '8', 9: '9', 10: '10'
                                                            }}/>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="Alias">
                                                {getFieldDecorator('alias', {
                                                    rules: [{required: true,
                                                    message: 'Please enter a movie Alias!'}],
                                                })(
                                                    <Input required={true} className="inputFiled"/>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="Duration"
                                            >
                                                {getFieldDecorator('length', {initialValue: 120})(
                                                    <InputNumber required={true} min={1}/>
                                                )}
                                                <span className="ant-form-text"> minutes</span>
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="Release Date">
                                                {getFieldDecorator('releaseDate', {
                                                    rules: [{required: true, 
                                                             message: 'Please enter the movie Release date!'}],
                                                })(
                                                    <Input required={true} className="inputFiled"/>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="Director">
                                                {getFieldDecorator('director', {
                                                    rules: [{required: true, 
                                                             message: 'Please enter the Director!'}],
                                                })(
                                                    <Input required={true} className="inputFiled"/>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="Trailer(Embedded URL)">
                                                {getFieldDecorator('screenwriter', {
                                                    rules: [{required: true, 
                                                             message: 'Please enter the Link trailer!'}],
                                                })(
                                                    <Input required={true} className="inputFiled"/>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="Actor Information">
                                                {getFieldDecorator('cast', {
                                                    rules: [{required: true, 
                                                             message: 'Please enter the Actor Information!'}],
                                                })(
                                                    <Input required={true} className="inputFiled"/>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="Movie Type"
                                                hasFeedback>
                                                {getFieldDecorator('movieType', {
                                                    rules: [
                                                        {required: true, message: 'Please select a Movie Type!'},
                                                    ],
                                                })(
                                                    <Select mode="tags"
                                                            style={{width: '100%'}}
                                                            tokenSeparators={[',']}
                                                            placeholder="Choose movie type"
                                                            allowClear={true}
                                                            autoClearSearchValue={true}>
                                                        <OptGroup key={increaseKey++} label="Movie types">
                                                        {
                                                            typeData.map((typeData) =>
                                                                <Option key={increaseKey++}>
                                                                    {typeData}
                                                                </Option>
                                                            )
                                                        }
                                                        </OptGroup>
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="Description">
                                                {getFieldDecorator('overview', {
                                                    rules: [{required: true, 
                                                             message: 'Please enter the description!'}],
                                                })(
                                                    <TextArea required={true} className="inputFiled" rows={5}/>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="Poster(Url)"
                                                extra={
                                                    <img className="imgExtra" 
                                                    src={this.state.post} alt="post" />
                                                }
                                                >
                                                {getFieldDecorator('post', {
                                                    rules: [{required: true, 
                                                             message: 'Please enter the poster URL!'}],
                                                })(
                                                    <Input required={true} 
                                                           onChange={this.onHandleChangePostUrl.bind(this)}
                                                           className="inputFiled"/>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="Upload Media"
                                            >
                                                {getFieldDecorator('upload')(
                                                    <Dragger {...uploadProps}>
                                                        <p className="ant-upload-drag-icon">
                                                            <Icon type="inbox"/>
                                                        </p>
                                                        <p className="ant-upload-text">
                                                            Click this area to upload movie file
                                                        </p>
                                                        <p className="ant-upload-hint">
                                                            The upload movie file type must be MP4
                                                        </p>
                                                    </Dragger>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                wrapperCol={{span: 12, offset: 6}}
                                            >
                                                <Button type="primary" htmlType="submit"
                                                        icon="upload"
                                                        loading={this.state.uploadLoading}> Upload </Button>
                                            </FormItem>
                                        </Form>
                                    </div>
                                </TabPane>
                                <TabPane tab={<span><Icon type="edit"/>Update Movie</span>} key={increaseKey++}>
                                    <Row>
                                            <Col>
                                            <table style={{ textAlign: 'center', width:'100%' }}>
                                                <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Alias</th>
                                                    <th>Cast</th>
                                                    <th>Director</th>
                                                    <th>Duration</th>
                                                    <th>Type</th>
                                                    <th>Release</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody key={increaseKey++}>
                                                    {
                                                        (data[0] == null || count == null) 
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
                                                                <tr key={item.id}>
                                                                    <td> {item.title} </td>
                                                                    <td> {item.alias} </td>
                                                                    <td> {item.cast} </td>
                                                                    <td> {item.director} </td>
                                                                    <td> {item.length} minutes</td>
                                                                    <td>
                                                                        {item.type.map(
                                                                            type => (
                                                                                <Tag color="blue" key={item.title + type}>
                                                                                    {type}
                                                                                </Tag>)
                                                                        )}
                                                                    </td>
                                                                    <td> {item.releaseDate} </td>
                                                                    <td>
                                                                        <Button className="btn btn-dark" 
                                                                                onClick={
                                                                                  () => { 
                                                                                        this.handleRecordsClick(this);
                                                                                        this.setItemData(item);
                                                                                    }
                                                                                }
                                                                                style={{ cursor:'pointer' }}
                                                                                icon='edit'
                                                                                type='primary'
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            )
                                                    }
                                                    </tbody>
                                                </table>
                                              <Modal title="Update Movie"
                                                        wrapClassName="vertical-center-modal"
                                                        visible={this.state.modalIsVisible}
                                                        onCancel={() => {
                                                            this.setIsModalVisible(false)
                                                            }
                                                        }
                                                        destroyOnClose={true}
                                                        footer={null}
                                                        width='45%'
                                                >
                                                        <Form onSubmit={this.handleSubmitUpdate.bind(this)}>
                                                            <FormItem
                                                                {...formItemLayout}
                                                                label="Movie Name" 
                                                                validateStatus="warning"
                                                                hasFeedback
                                                                help="Values in this field can't be different from the filename" 
                                                                >
                                                                {getFieldDecorator('titleUpdate', {
                                                                    initialValue: this.state.itemData.title,
                                                                    rules: [{required: true}]
                                                                })(
                                                                    <Input required={true} className="inputFiled"/>
                                                                )}
                                                            </FormItem>
                                                            <FormItem
                                                                {...formItemLayout}
                                                                label="Poster(Url)"
                                                                extra={
                                                                    <img className="imgExtra" 
                                                                    src={this.state.itemData.post} alt="post" />
                                                                }
                                                                >
                                                                {getFieldDecorator('postUpdate', {
                                                                    rules: [{required: true, 
                                                                            message: 'Please enter the poster URL!'}],
                                                                            initialValue: this.state.itemData.post
                                                                })(
                                                                    <Input required={true} 
                                                                        onChange={this.onHandleChangePostUrl.bind(this)}
                                                                        className="inputFiled"/>
                                                                )}
                                                            </FormItem>
                                                            <FormItem
                                                                {...formItemLayout}
                                                                label="Score"
                                                            >
                                                                {getFieldDecorator('scoreUpdate',
                                                                {initialValue: this.state.itemData.score}
                                                                )(
                                                                    <Slider max={10}
                                                                            step={1}
                                                                            marks={{
                                                                                0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5',
                                                                                6: '6', 7: '7', 8: '8', 9: '9', 10: '10'
                                                                            }}/>
                                                                )}
                                                            </FormItem>
                                                            <FormItem
                                                                {...formItemLayout}
                                                                label="Alias">
                                                                {getFieldDecorator('aliasUpdate', {
                                                                    rules: [{required: true,
                                                                    message: 'Please enter a movie Alias!'}],
                                                                    initialValue: this.state.itemData.alias
                                                                })(
                                                                    <Input required={true} className="inputFiled"/>
                                                                )}
                                                            </FormItem>
                                                            <FormItem
                                                                {...formItemLayout}
                                                                label="Duration"
                                                            >
                                                                {getFieldDecorator('lengthUpdate', 
                                                                {initialValue: this.state.itemData.length})(
                                                                    <InputNumber required={true} min={1}/>
                                                                )}
                                                                <span className="ant-form-text"> minutes</span>
                                                            </FormItem>
                                                            <FormItem
                                                                {...formItemLayout}
                                                                label="Release Date">
                                                                {getFieldDecorator('releaseDateUpdate', {
                                                                    rules: [{required: true, 
                                                                            message: 'Please enter the movie Release date!'}],
                                                                            initialValue: this.state.itemData.releaseDate
                                                                })(
                                                                    <Input required={true} className="inputFiled"/>
                                                                )}
                                                            </FormItem>
                                                            <FormItem
                                                                {...formItemLayout}
                                                                label="Director">
                                                                {getFieldDecorator('directorUpdate', {
                                                                    rules: [{required: true, 
                                                                            message: 'Please enter the Director!'}],
                                                                            initialValue: this.state.itemData.director
                                                                })(
                                                                    <Input required={true} className="inputFiled"/>
                                                                )}
                                                            </FormItem>
                                                            <FormItem
                                                                {...formItemLayout}
                                                                label="Trailer(Embedded URL)">
                                                                {getFieldDecorator('screenwriterUpdate', {
                                                                    rules: [{required: true, 
                                                                            message: 'Please enter the Link trailer!'}],
                                                                            initialValue: this.state.itemData.screenwriter
                                                                })(
                                                                    <Input required={true} className="inputFiled"/>
                                                                )}
                                                            </FormItem>
                                                            <FormItem
                                                                {...formItemLayout}
                                                                label="Actor Information">
                                                                {getFieldDecorator('castUpdate', {
                                                                    rules: [{required: true, 
                                                                            message: 'Please enter the Actor Information!'}],
                                                                            initialValue: this.state.itemData.cast
                                                                })(
                                                                    <Input required={true} className="inputFiled"/>
                                                                )}
                                                            </FormItem>
                                                            <FormItem
                                                                {...formItemLayout}
                                                                label="Movie Type"
                                                                hasFeedback>
                                                                {getFieldDecorator('movieTypeUpdate', {
                                                                    rules: [
                                                                        {required: true, message: 'Please select at least one of types!'},
                                                                    ],
                                                                    initialValue: this.state.itemData.type
                                                                })(
                                                                    <Select mode="tags"
                                                                            style={{width: '100%'}}
                                                                            tokenSeparators={[',']}
                                                                            placeholder="Choose movie type"
                                                                            allowClear={true}
                                                                            autoClearSearchValue={true}>
                                                                        <OptGroup key={increaseKey++} label="Movie types">
                                                                        {
                                                                            typeData.map((typeData) =>
                                                                                <Option key={increaseKey++}>
                                                                                    {typeData}
                                                                                </Option>
                                                                            )
                                                                        }
                                                                        </OptGroup>
                                                                    </Select>
                                                                )}
                                                            </FormItem>
                                                            <FormItem
                                                                {...formItemLayout}
                                                                label="Description">
                                                                {getFieldDecorator('overviewUpdate', {
                                                                    rules: [{required: true, 
                                                                            message: 'Please enter the description!'}],
                                                                            initialValue: this.state.itemData.overview
                                                                })(
                                                                    <TextArea required={true} className="inputFiled" rows={5}/>
                                                                )}
                                                            </FormItem>
                                                            <FormItem
                                                                wrapperCol={{span: 12, offset: 6}}
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
                                        <br/>
                                        <Row style={{ marginBottom: '2em' }}>
                                            <Col span={10}/>
                                            <Col span={10}>
                                                <Pagination defaultCurrent={1} total={count} defaultPageSize={12}
                                                            onChange={this.onPageChange.bind(this)} />
                                            </Col>
                                        </Row>
                                </TabPane>
                                <TabPane tab={<span><Icon type="delete"/>Remove Movie</span>} key={increaseKey++}>
                                    <br/>
                                    <br/>
                                    <Spin tip="Deleting movie information, please wait..." 
                                          spinning={this.state.deleteLoading}>
                                        <Row>
                                            <Col span={10}/>
                                            <Col span={4}>
                                                <Checkbox.Group>
                                                {
                                                    (data[0] == null || count == null) 
                                                    ? 
                                                        <div></div>
                                                    :
                                                    data.map(item =>
                                                        <div id="movieItem" key={increaseKey++}>
                                                            <Popover content={
                                                                        <img id='poster_hover' 
                                                                            src={item.post} alt="post" />
                                                                        }
                                                                    placement="leftTop"
                                                            >
                                                                <Checkbox value={item.title} key={item.title}
                                                                    onChange={this.onSelectedMovie.bind(this)}
                                                                >
                                                                        {item.title}
                                                                </Checkbox>
                                                                <br/><br/>
                                                            </Popover>
                                                        </div>
                                                    )
                                                }
                                                </Checkbox.Group>
                                            </Col>
                                            <Col>
                                                <Button icon="delete" type="danger" ghost
                                                        onClick={this.onHandleConfirmDeleteTips.bind(this)}
                                                > 
                                                        Delete
                                                </Button>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <br/>
                                        <Row>
                                            <Col span={10}/>
                                            <Col span={10}>
                                                <Pagination defaultCurrent={1} total={count} defaultPageSize={12}
                                                            onChange={this.onPageChange.bind(this)} />
                                            </Col>
                                        </Row>
                                    </Spin>
                                    <br/>
                                    <br/>
                                </TabPane>
                                <TabPane tab={<span><Icon type="form"/>Types of Movie</span>} key={increaseKey++}>
                                        <TypesManagement />
                                </TabPane>
                            </Tabs>
                        </div>
                        :
                        // không đăng nhập bằng tài khoản admin, ứng dụng sẽ hiển thị div bên dưới
                        <div>
                            <span style={{ color:'red', fontSize: '24px' }}>
                                You must be have an admin account.
                            </span>
                        </div>
                        }
                    </Col>
                    <Col span={5}/>
                </Row>
                
            </div>

        )
    }
}

export default MovieResourceManage = Form.create({})(MovieResourceManage);