import React from 'react';
import {
    Row,
    Col,
    Pagination
} from 'antd';
import MovieCard from '../movieCard/MovieCard'
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
    const rows = [];
    let incKey = 0;

    for (let i = 0; i < props.movies.length; i++) {
        if (i % 4 === 0) {
            cols.push(<Col key={`col${i}`} span={3}/>);
            rows.push(<Row key={`row${i}`}>{cols.map(c => c)}</Row>);
            cols = [];
            cols.push(<Col key={`col${i + 1}`} span={2}/>);
        }
        cols.push(<ACol key={`ACol${i}`} movie={props.movies[i]}/>);
    }

    rows.push(cols.map(c => c));
    return <div>{rows.map(r => <div key={incKey++}><br/>{r}</div>)}</div>;
}

class MovieCategoryList extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            count: 0
        }
    }

    componentDidMount() {
        console.log("Component didmount called");
        this.fetchDataCount(this.props.match.params.type);
        this.fetchData(this.props.match.params.type, 0);
    }

    /*
    * khi component được tải xong, không gọi componentDidMount nữa
    * mỗi khi nó được tải lại, phương thức trên sẽ được gọi lại
    * phương thức này để request danh sách phim của một thể loại
    * */
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({data: [], count: 0});
        this.fetchDataCount(nextProps.match.params.type);
        this.fetchData(nextProps.match.params.type, 0);
    }

    onPageChange(pageNumber) {
        console.log('Page: ', pageNumber);
        this.fetchData(pageNumber - 1);
    }

    fetchDataCount(type) {
        fetch(Api.typeCount(type), {
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

    fetchData(type, page) {
        fetch(Api.categoryList(type, page), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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
                <Row>
                    <Rows movies={data}/>
                </Row>
                <br/>
                <br/>
                <br/>
                <Row>
                    <Col span={24} id="pagination">
                        <Pagination defaultCurrent={1} total={count} pageSize={12}
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

export default MovieCategoryList;