import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import '../index.css'

export default class News extends Component {

  // we always set state in class Based component inside constructor

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    // all these are byDefualt values of state
    this.state = {
      article: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    // console.log(this.article)
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsThunder`
  }


  // life cycle function(here we use it fetch api)
  // async always work with await only without async cant use await and vice verse
  async componentDidMount() {
    try {
      this.props.setProgress(10)
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e47e5c87bb9c4fffbeb851c5bcc15adc&page=1`;
      
      this.setState({ loading: true })
      let data = await fetch(url);
      this.props.setProgress(30)
      let parsedData = await data.json();
      this.props.setProgress(60)
      this.setState({
        article: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      });
      // console.log("parsed Data ",parsedData);
      // console.log(this.totalResults)
      this.props.setProgress(100)
    }
    catch (e) {
      console.log("something is not working");
    }
  }

  // handleNextClick = async () => {
  //   // if current page is greater then total number of pages which we get after calc this opt in below line(if condition) we didvided by 10 because we set pageSize =10 (no. of news on page in url as you can see in handlePrev/nextClick)
  //   if (!this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

  //   } else {
  //     try {
  //       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e47e5c87bb9c4fffbeb851c5bcc15adc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

  //       this.setState({ loading: true })
  //       let data = await fetch(url);
  //       let parsedData = await data.json();

  //       this.setState({
  //         article: parsedData.articles,
  //         page: this.state.page + 1,
  //         // size:this.props.pageSize
  //         loading: false
  //       });
  //     }
  //     catch (e) {
  //       console.log("something is not working");
  //     }
  //   }
  // }

  // handlePrevClick = async () => {
  //   try {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e47e5c87bb9c4fffbeb851c5bcc15adc&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //     this.setState({ loading: true })
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     this.setState({
  //       article: parsedData.articles,
  //       page: this.state.page - 1,
  //       loading: true
  //     });
  //   }
  //   catch (e) {
  //     console.log("something is not working");
  //   }
  // }

  fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e47e5c87bb9c4fffbeb851c5bcc15adc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({
      page: this.state.page + 1
    })
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      article: this.state.article.concat(parsedData.articles),
      loading: false,
      totalResults: parsedData.totalResults
    });
    
  };

  render() {
    return (
      <>    
          <h2 className="text-center padd">NewsThunder - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
          
          {/* to show spinner before first time fetching the api */}
          {this.state.loading && <Spinner/>}

        {/* <div className="container d-flex justify-content-between">
          not able to click prev button is this.state.page is less then or equal to 1
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr;
            Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */} 

          <InfiniteScroll
            dataLength={this.state.article.length}
            next={this.fetchMoreData}
            hasMore={this.state.article.length !== this.state.totalResults}
            loader={this.state.loading&&<Spinner/>}
          >
            <div className="container ">
              <div className="row" >
                {/* must be a unique key for every element that why we used this key={eleme.url} */}
                {this.state.article.map((element) => {
                  return <div className="col-md-4 my-3" key={element.url}>
                    <NewsItem title={element.title ? element.title.slice(0, 40) + '...' : ""} discription={element.description ? element.description.slice(0, 60) + `...` : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={!element.author ? "Unknown" : element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
                })}
              </div>
            </div>
          </InfiniteScroll>
          {/* <div className="container d-flex justify-content-between">
          not able to click prev button is this.state.page is less then or equal to 1
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr;
            Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      
      </>
    )
  }
}
