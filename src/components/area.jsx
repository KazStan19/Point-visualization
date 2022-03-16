import React,{useRef,useEffect,useContext} from 'react'
import {ThemeContext} from './home'

export const Area = (props) => {
    
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const {width,height,scale,contours,pic} = useContext(ThemeContext)

    function findMinMax(arr) {
        let minX = arr[0][0], maxX = arr[0][0];
        let minY = arr[0][1], maxY = arr[0][1]
      
        for (let i = 1, len=arr.length; i < len; i++) {
          let v = arr[i][0],b= arr[i][1];
          minX = (v < minX) ? v : minX;
          maxX = (v > maxX) ? v : maxX;
          minY = (b < minY) ? b : minY;
          maxY = (b > maxY) ? b : maxY;
        }
      
        return {'x':[minX, maxX],'y':[minY,maxY]};
      }


    useEffect(() => {
      
        const canvas = canvasRef.current
        canvas.width = width *scale
        canvas.height = height*scale
        canvas.style.position = 'absolute'
        canvas.style.zIndex = '100'
        
        

        const context = canvas.getContext("2d")
        

        let color = 'red'
        let opacity = 0.8

    
            context.beginPath()
            
            context.fillStyle = color
            context.strokeStyle = color
            context.globalAlpha = opacity

        context.moveTo(props.item.coords.coordinates[0][0] * scale,props.item.coords.coordinates[0][1] * scale)
        
        for(let i=1;i < props.item.coords.coordinates.length;i++){

            context.lineTo(props.item.coords.coordinates[i][0] * scale,props.item.coords.coordinates[i][1] * scale)
            context.fillRect(props.item.coords.coordinates[i][0] * scale-5, props.item.coords.coordinates[i][1] * scale-5, 10, 10);
            
        
        context.stroke()
        }
        context.fillStyle = 'rgba(255, 255, 255, 0)' 
        context.fill()
        
        contextRef.current = context
    }, [pic,scale])
    

    return (
        <canvas id={props.id} onClick={(e)=>{
    
            let x = (e.clientX - e.target.offsetLeft)/scale
            let y = (e.clientY - e.target.offsetTop) 
            let MinMax = findMinMax(props.item.coords.coordinates)
    
            if(x >= MinMax.x[0] && x <= MinMax.x[1] && y >= MinMax.y[0] && y <= MinMax.y[1]){
    
                alert(e.target.id + " Defect")
    
            }
    
        }} ref={canvasRef}></canvas>
      )
    
}
