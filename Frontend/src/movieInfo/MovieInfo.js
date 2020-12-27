import React from 'react'
import {
    Col,
    Row,
    Button,
    Popover
} from 'antd';

import {
    Link
} from 'react-router-dom'

import Api from '../Api'
import './MovieInfo.css'

class MovieInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoading: false
        }
    }

    // khi component được tải, request thông tin của phim
    componentDidMount() {
        this.setState({isLoading: true});

        fetch(Api.movieDetail(this.props.match.params.title), {
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

    render() {
        const {data} = this.state;
        if (data == null) {
            return <div></div>;
        }

        const play = (<div>
            <div id="play">
                <Link to={`/play/${this.props.match.params.title}`}>
                    <Button type="primary" icon="play-circle-o" size="large">
                        PLAY
                    </Button>
                </Link>
            </div>
            <Button className="backButton" onClick={() => this.props.history.goBack()}>
                Back
            </Button>
        </div>);

        return (
            <div>
                <br/>
                <br/>
                <br/>
                <Row>
                    <Col span={4}/>
                    <Col span={5}>
                        <div>
                            <img id="post_img" alt="post" src={data.post}/>
                            {play}
                        </div>
                    </Col>
                    <Col span={1}/>
                    <Col span={5}>
                        <h1>{data.title}</h1>
                        <hr/>
                        <p>Rate：<span id="score">{data.score}/10</span></p>
                        <p>Director：{data.director}</p>
                        <p>Alias Name：{data.alias}</p>
                        <p>Release Date：{data.releaseDate}</p>
                        <p>Type：{data.type}</p>
                        <p>Duration：{data.length} minutes</p>
                        <Popover content={data.cast} title="Actor Information" trigger="hover">
                            <Button type="primary" ghost>
                                Actor Information
                            </Button>
                        </Popover>
                    </Col>
                    <Col span={1}/>
                    <Col span={7} id="overview">
                        <h1>Overview - Trailer</h1>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;{data.overview}</p>
                        {/* Nhúng video làm trailer phim, 
                        người dùng nhập url video dạng embedded lúc thêm phim mới, 
                        url sẽ được thêm vào src của thẻ iframe => video trailer */}
                        <iframe playsInline
                                src={`${data.screenwriter}`} 
                                width="100%" 
                                height="auto" 
                                frameBorder="0" 
                                allow="autoplay; fullscreen" 
                                allowFullScreen
                                title="Film's Trailer"
                                >
                        </iframe>
                    </Col>
                    <Col span={4}/>
                </Row>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

export default MovieInfo;