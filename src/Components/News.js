import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default class News extends Component {

  // we always set state in class Based component inside constructor

  constructor() {
    super();
    this.state = {
      article: [],
      loading: true,
      page: 1
    }
    // console.log(this.article)
  }


  // life cycle function(here we use it fetch api)
  // async always work with await only without async cant use await and vice verse
  async componentDidMount() {
    try {
      let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=e47e5c87bb9c4fffbeb851c5bcc15adc&page=1";
      
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        article: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading:false
      });
      // console.log("parsed Data ",parsedData);
    }
    catch (e) {
      console.log("something is not working");
    }
  }

  handleNextClick = async () => {
    // if current page is greater then total number of pages which we get after calc this opt in below line(if condition) we didvided by 10 because we set pageSize =10 (no. of news on page in url as you can see in handlePrev/nextClick)
    if (!this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    } else {
      try {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e47e5c87bb9c4fffbeb851c5bcc15adc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
          article: parsedData.articles,
          page: this.state.page + 1,
          // size:this.props.pageSize
          loading:false
        });
      }
      catch (e) {
        console.log("something is not working");
      }
    }
  }

  handlePrevClick = async () => {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e47e5c87bb9c4fffbeb851c5bcc15adc&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        article: parsedData.articles,
        page: this.state.page - 1,
        loading:false
      });
    }
    catch (e) {
      console.log("something is not working");
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <h2 className="text-center">NewsThunder - Top HeadLines of India</h2>
        {this.state.loading && <Spinner/>}
        <div className="container d-flex justify-content-between">
          {/* not able to click prev button is this.state.page is less then or equal to 1 */}
          <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}> &larr;
            Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        <div className="row" >
          {/* must be a unique key for every element that why we used this key={eleme.url} */}
          {!this.state.loading && this.state.article.map((element) => {
            return <div className="col-md-4 my-3" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 40) + '...' : ""} discription={element.description ? element.description.slice(0, 60) + `...` : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          {/* not able to click prev button is this.state.page is less then or equal to 1 */}
          <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}> &larr;
            Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
