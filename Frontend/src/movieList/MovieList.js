import React from 'react';
import {
    Row,
    Col,
    Pagination
} from 'antd';

import MovieCard from '../movieCard/MovieCard'
import './MovieList.css'
import Api from '../Api'

function ACol(props) {
    return (
        <div>
            <Col span={1}/>
            <Col span={4}>
                <MovieCard key={props.movie.title} {...props.movie}/>
            </Col>
        </div>
    )
}

function Rows(props) {
    let cols = [];
    let incKey=0;
    const rows = [];
    for (let i = 0; i < props.movies.length; i++) {
        if (i % 4 === 0) {
            cols.push(<Col span={3} key={incKey++}/>);
            rows.push(<Row key={i}>{cols.map(c => c)}</Row>);
            cols = [];
            cols.push(<Col span={2} key={incKey++}/>);
        }
        cols.push(<ACol movie={props.movies[i]} key={incKey++}/>);
    }
    rows.push(cols.map(c => c));
    return <div> {rows.map(r => <div key={incKey++}><br />{r}</div>)} </div>;
}

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            count: 0
        }
    }

    // lấy danh sách tất cả các phim và số lượng phim trên trang hiện tại
    componentDidMount() {
        this.fetchDataCount();
        this.fetchData(0);
    }

    onPageChange(pageNumber) {
        console.log('Page: ', pageNumber);
        this.fetchData(pageNumber - 1);
    }

    // sau khi phân trang, lấy lại số lượng phim
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

    // lấy danh sách phim sau khi phân trang
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

    render() {

        let {data, count} = this.state;

        if (data[0] == null || count == null) {
            return <div></div>;
        }

        return (
            <div>
                <br/>
                <br/>
                <br/>
                <span id='list_span'>List Film</span>
                <Row>
                    <Rows key="movie-list" movies={data}/>
                </Row>
                <br/>
                <br/>
                <br/>
                <Row>
                    <Col span={24} id="pagination">
                        <Pagination defaultCurrent={1} 
                                    total={count} 
                                    pageSize={12}
                                    onChange={this.onPageChange.bind(this)}/>
                    </Col>
                </Row>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

export default MovieList;