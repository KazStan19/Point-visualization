import React,{useRef,useEffect,useContext} from 'react'
import {ThemeContext} from './home'

export const Area = (props) => {
    
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const {width,height,scale,contours,pic} = useContext(ThemeContext)


    useEffect(() => {
      
        const canvas = canvasRef.current
        canvas.width = width *scale
        canvas.height = height*scale
        canvas.style.width = width*scale+'px'
        canvas.style.height = height*scale+'px'
        canvas.style.position = 'absolute'
        canvas.style.zIndex = '98'

        const context = canvas.getContext("2d")

        let color = 'red'

        contours.forEach(item=>{
        
        if(item.name === pic.name && pic !== ''){
            context.beginPath()
            context.fillStyle = color
            context.strokeStyle = color

        context.moveTo(item.coords.coordinates[0][0] * scale,item.coords.coordinates[0][1] * scale)
        
        for(let i=1;i < item.coords.coordinates.length;i++){

            context.lineTo(item.coords.coordinates[i][0] * scale,item.coords.coordinates[i][1] * scale)
            context.fillRect(item.coords.coordinates[i][0] * scale-5, item.coords.coordinates[i][1] * scale-5, 10, 10);
            
  
        context.stroke()
        }}
    
    })
        contextRef.current = context
    }, [pic,contours,scale])
    

    return (
    <canvas ref={canvasRef}></canvas>
  )
}
