import React from 'react'
import {
    Rate
} from 'antd';
import {
    Link
} from 'react-router-dom'

import './MovieCard.css';

// dùng hiển thị phim trên trang chủ thành từng thẻ
class MovieCard extends React.Component {
    render() {
        // xử lý score để hiển thị đánh giá dạng hình sao, max = 5 sao
        const half = parseInt(this.props.score, 10) % 2 === 1 ? 0.5 : 0;
        const star = parseInt(this.props.score / 2, 10) + half;
        const desc =
            <div id="description">
                <Rate disabled allowHalf value={star}/> {this.props.score / 2}
            </div>;
        return (
            <Link to={`/movieInfo/${this.props.title}`} target='_self'>
                <div id="figure">
                    <img alt="post" src={this.props.post}/>
                    <div id="figcaption">
                        <h3>{this.props.title}</h3>
                        <span>{desc}</span>
                    </div>
                </div>
            </Link>
        );
    }
}

export default MovieCard;