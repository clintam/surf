import React from 'react'
import moment from 'moment'

const FetchResult = ({item}) => {
  const id = item._id
  const lastFetch = item.lastFetch
  const lastFetchDate = lastFetch && moment(lastFetch.date)
  const lastFetchError = lastFetch && lastFetch.error
  const lastFetchHash = lastFetch && lastFetch.hash
  const lastFetchSuccess = lastFetchDate && !lastFetchError
  const lastFetchTitle = lastFetch && lastFetch.title
  const maxImgHeight = '300px'
  const maxOverallHeight = '450px'
  return (
    <div>
      <div className='row'>
        <div className='col-sm-12'>
          <span className='text-muted'>
            {lastFetchDate
              ? `Last updated: ${lastFetchDate.fromNow()}`
              : 'Not yet processed'}
          </span>

        </div>
      </div>
      <div className='row'>
        {lastFetchSuccess &&
          <div className='col-sm-4'>
            <h4> {lastFetchTitle} </h4>
            <a target='new' href={item.url} className='thumbnail'>
              <img src={`items/${id}/image.png?hash=${lastFetchHash}`}
                style={{
                  width: 'auto',
                  height: maxImgHeight
                }} />
            </a>
          </div>
        }
        <div className='col-sm-8'>
          {lastFetchError &&
            <div className='alert alert-warning'>
              {lastFetchError}
            </div>
          }
          {lastFetchSuccess && item.lastFetch.result &&
            <ul className='list-group' style={{
              maxHeight: maxOverallHeight,
              overflowY: 'auto'
            }}>
              { item.lastFetch.result.map((r, i) => {
                if (r.href) {
                  return (
                    <a key={i} target='new' href={r.href} className='list-group-item'>
                      {r.text}
                    </a>
                  )
                }
                return (
                  <li key={i} className='list-group-item'>
                    {r.text}
                  </li>
                )
              }) }
            </ul>
          }
        </div>
      </div>
    </div>
  )
}
FetchResult.propTypes = {
  item: React.PropTypes.object.isRequired
}

export default FetchResult
