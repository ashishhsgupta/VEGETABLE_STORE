import React, { useState } from 'react'

const ViewMore = ({ text = null, maxLength = 200 }) => {
  const [isExpand, setIsExpand] = useState(false)

  const toggleExpand = () => {
    setIsExpand(prev => !prev)

    if (isExpand === true) {
      ScrollTo()
    }
  }

  const ScrollTo = () => {
    const top = document.querySelector('.react-hero_internal')
    window.scrollTo({
      top: top.offSetHeight,
      behavior: 'smooth'
    })
  }

  const safeText = text || ''
  const displayText = isExpand
    ? safeText
    : safeText.length > maxLength
    ? `${safeText.slice(0, maxLength)}...`
    : safeText

  const spantext = displayText => {
    return displayText.replace(/<\/?(p)>/gi, '<span>')
  }

  return (
    <>
      <span className='mb-1 me-2 text-justify'>
        <span
          dangerouslySetInnerHTML={{ __html: spantext(displayText) }}
          className='text-wrap'
        ></span>
        {text?.length > maxLength && (
          <span className='viewMoreButtonBox'>
            {!isExpand}
            <button
              onClick={toggleExpand}
              style={{
                color: 'red',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              {isExpand ? (
                <>
                  <i className='bi bi-arrow-left-circle-fill'></i> view less
                </>
              ) : (
                <>
                  read more <i className='bi bi-arrow-left-circle-fill'></i>
                </>
              )}
            </button>
          </span>
        )}
      </span>
    </>
  )
}

export default ViewMore
