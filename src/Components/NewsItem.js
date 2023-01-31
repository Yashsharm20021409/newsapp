import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    // this is how we use props in class based components
    // here first date converted to object then fetch toGMTString()
    let {title,discription,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
          <img src={!imageUrl?'https://static.toiimg.com/thumb/msid-47529300,width-1070,height-580,imgsize-110164,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg':imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title} <span className="badge rounded-pill text-bg-danger">{source}</span></h5>
              <p className="card-text">{discription}</p>
              <p className="card-text"><small className="text-muted">by {author} on {new Date(date).toGMTString()}</small></p>
              <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}
