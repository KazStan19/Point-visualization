import React,{useContext} from 'react'
import {ThemeContext} from './home'

export const Image = () => {


    const {width,height,scale,pic,alt} = useContext(ThemeContext)
    let url = ''

    if(pic !== ''){url = URL.createObjectURL(pic)}
    console.log(url)
    return (
      <img id='img' width={width * scale} height={height * scale} max-width={width * scale} max-height={height * scale} src={url} style={{position:"absolute"}} alt={alt} />
    )
}
