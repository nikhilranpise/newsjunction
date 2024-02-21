import React from 'react'

const NewsItem = (props) => {

  let { title, description, imageUrl, newsUrl, publishedAt, source, author } = props;

  return (
    <div className="my-3">
      <div className="card" >
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0'
        }}>
          <span className="badge rounded-pill bg-danger">
            {source}
          </span>
        </div>
        <img src={!imageUrl ? "https://c.ndtvimg.com/2023-02/so1jdmog_bing-cover-letter-reuters-650_625x300_13_February_23.jpg" : imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">Published by {author ? author : "Unknown"} on  {new Date(publishedAt).toGMTString()}</small></p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
    </div>
  )

}

export default NewsItem
