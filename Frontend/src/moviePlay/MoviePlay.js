import React from 'react'
import {
    Col,
    Row,
    message,
    Button,
    Tooltip
} from 'antd';
import {
    Player,
    LoadingSpinner,
    BigPlayButton
} from 'video-react';

import './MoviePlay.css'
import Api from '../Api'

class MoviePlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: '',
            isLoading: true,
            text: 'Click to download the movie'
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        const hide = message.loading('Loading resources, please wait...', 10);
        fetch(Api.playMovie(this.props.match.params.movie), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        }).then(response => response.json())
            .then(req => {
                setTimeout(hide, 1);
                if (req.status === 0) {
                    // title của phim phải khớp với tên file để có thể load được video từ local service
                    message.error('Failed! Please make sure the title MATCHES with the video file name!');
                } else {
                    message.success('Loaded Successfully');
                    this.setState({src: req.data, isLoading: false})
                }
            })
            .catch(error => console.error('Error:', error));
    }

    render() {
        const {src, text} = this.state;
        const source = src === '' ? '' :
            <Tooltip placement="right" title={text}>
                <a href={src}>
                    <Button icon="download" size="large" shape="circle"/>
                    <span>
                        Download {this.props.match.params.movie}
                    </span>
                </a>
            </Tooltip>;
        return (
            <div>
                <Row>
                    <Col span={4}/>
                    <Col span={15}>
                        <h1>
                            You are watching &nbsp;
                            <span className="titleMovie">
                                {this.props.match.params.movie}
                            </span>
                        </h1>
                        <Button onClick={() => this.props.history.goBack()}>
                            Back
                        </Button>
                        <hr/>
                        {source}
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={4}/>
                    <Col span={18}>
                    <Player playsInline src={src}>
                        <LoadingSpinner />
                        <BigPlayButton position="center"/>
                    </Player>
                    </Col>
                </Row>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

export default MoviePlay;