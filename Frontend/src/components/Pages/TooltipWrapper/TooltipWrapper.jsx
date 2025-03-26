import React from 'react'
import '../Header/Header.css';
import {Tooltip, OverlayTrigger} from "react-bootstrap";

const TooltipWrapper = ({children, tooltipText, placement="top"}) => {

    const renderTooltip = (props) =>(
        <Tooltip id='tooltip-menu' {...props} className='custom-tooltip'>
         {tooltipText}
        </Tooltip>
    );

  return (
    <OverlayTrigger placement={placement} overlay={renderTooltip}>
      <span style={{display:"inline-block"}}>{children}</span>
    </OverlayTrigger>
  )
}

export default TooltipWrapper;
