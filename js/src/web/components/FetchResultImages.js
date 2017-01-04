import React from 'react'

const FetchResultImages = ({fetch}) => {
  const maxImgHeight = '30px'

  const image = (result) => (
    <img src={result.imgSrc}
      style={{
        width: 'auto',
        height: maxImgHeight
      }} />
  )

  const imageCol = (result) => {
    if (result.href) {
      return (
        <a target='new' href={result.href}>
          {image(result) }
        </a>
      )
    }
    return image(result)
  }

  return (
    <div className='row'>
      <div className='col-sm-12'>
        {fetch.result && fetch.result.filter(r => r.imgSrc).map((result, i) => (
          <span key={i}>
            {imageCol(result) }
          </span>
        )) }
      </div>
    </div>
  )
}

FetchResultImages.propTypes = {
  fetch: React.PropTypes.object.isRequired
}

export default FetchResultImages
