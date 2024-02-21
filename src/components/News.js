import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  




const updateNews = async () => {
  props.setProgress(10);
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  setLoading(true)
  let data = await fetch(url);
  props.setProgress(30);
  let parseData = await data.json();
  props.setProgress(70);

  setArticles(parseData.articles)
  setTotalResults(parseData.totalResults)
  setLoading(false)

  props.setProgress(100);
}

useEffect(() => {
  document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - News Junction`;
  updateNews()
  // eslint-disable-next-line
},[])


const fetchMoreData = async () => {
  
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
  setPage(page + 1)
  let data = await fetch(url);
  let parseData = await data.json();

  setArticles(parseData.articles.concat(parseData.articles))
  setTotalResults(parseData.totalResults)
  setLoading(false)


};


return (
  <>
    <h1 className='text-center' style={{ margin: '35px 0px', marginTop:'90px' }}>News Junction -Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines</h1>
    {loading && <Spinner />}
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMoreData}
      hasMore={articles.length !== totalResults}
      loader={<Spinner />}
    >
      <div className='container'>
        <div className="row">
          {articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} newsUrl={element.url} imageUrl={element.urlToImage} publishedAt={element.publishedAt} source={element.source.name} author={element.author} />
            </div>
          })}

        </div>
      </div>
    </InfiniteScroll>
  </>
)

}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
