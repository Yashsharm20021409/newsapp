import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {

  // we always set state in class Based component inside constructor

  constructor() {
    super();
    this.state = {
      article: [],
      loading: true
    }
    // console.log(this.article)
  }

  
  // life cycle function(here we use it fetch api)
  async componentDidMount(){
    try{        
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=e47e5c87bb9c4fffbeb851c5bcc15adc";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            article: parsedData.articles
        });
        // console.log("parsed Data ",parsedData);
    }
    catch(e) {
        console.log("something is not working");
    }
}
  render() {
    return (
      <div className='container my-3'>
        <h2>NewsThunder - Top HeadLines</h2>
        <div className="row" >
          {this.state.article && this.state.article.map((element) => {
            {/* must be a unique key for every element that why we used this key={eleme.url} */ }
            return <div className="col-md-4 my-3" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0,40)+'...':""} discription={element.description?element.description.slice(0,60)+`...`:""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          
          })}
        </div>
      </div>
    )
  }
}
