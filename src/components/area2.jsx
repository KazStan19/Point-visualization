import React,{useRef,useEffect,useContext} from 'react'
import {ThemeContext} from './home'

export const Area2 = (props) => {
    
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const {width,height,scale,contours,pic,draw,fullCoords} = useContext(ThemeContext)


    useEffect(() => {
      
        const canvas = canvasRef.current
        canvas.width = width *scale
        canvas.height = height*scale
        canvas.style.width = width*scale+'px'
        canvas.style.height = height*scale+'px'
        canvas.style.position = 'absolute'
        canvas.style.zIndex = '96'

        const context = canvas.getContext("2d")

        if(draw === true){

            if(fullCoords.coords !== undefined ){
                if(fullCoords.coords[0] !== undefined){
                context.beginPath()
  
                context.moveTo(fullCoords.coords[0][0] * scale,fullCoords.coords[0][1] * scale)
                context.fillRect(fullCoords.coords[0][0] * scale-5, fullCoords.coords[0][1] * scale-5, 10, 10);

                for(let i=1;i < fullCoords.coords.length;i++){

                    context.lineTo(fullCoords.coords[i][0] * scale,fullCoords.coords[i][1] * scale)
                    context.fillRect(fullCoords.coords[i][0] * scale-5, fullCoords.coords[i][1] * scale-5, 10, 10);
        
          
                context.stroke()
                }}
            }
            }
  
        contextRef.current = context
    }, [pic,contours,fullCoords,scale,draw])
    

    return (
    <canvas ref={canvasRef}></canvas>
  )
}
