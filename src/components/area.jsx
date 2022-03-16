import React,{useRef,useEffect,useContext,useState} from 'react'
import {ThemeContext} from './home'

export const Area = (props) => {
    
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [first, setfirst] = useState([])
    const {width,height,scale,contours,pic} = useContext(ThemeContext)


    useEffect(() => {
      
        const canvas = canvasRef.current
        canvas.width = width *scale
        canvas.height = height*scale
        canvas.style.width = width*scale+'px'
        canvas.style.height = height*scale+'px'
        canvas.style.position = 'absolute'
        canvas.style.zIndex = '97'

        const context = canvas.getContext("2d")
     
        let color = 'red'
        let opacity = 0.8
        let num = -1
        let name = []

        contours.forEach(item=>{
        
        if(item.name === pic.name && pic !== ''){
            
            name.push({name: new Path2D()})
            num+=1
            context.beginPath(name[num].name)
            context.fillStyle = color
            context.strokeStyle = color
            context.globalAlpha = opacity

        name[num].name.moveTo(item.coords.coordinates[0][0] * scale,item.coords.coordinates[0][1] * scale)
        
        for(let i=1;i < item.coords.coordinates.length;i++){

            name[num].name.lineTo(item.coords.coordinates[i][0] * scale,item.coords.coordinates[i][1] * scale)
            context.fillRect(item.coords.coordinates[i][0] * scale-5, item.coords.coordinates[i][1] * scale-5, 10, 10);
            
        
        context.stroke(name[num].name)
        }}
        context.fillStyle = 'rgba(255, 255, 255, 0)' 
        context.fill(name[num].name)
        setfirst(name)
    
    })
        contextRef.current = context
    }, [pic,contours,scale])
    
    if(document.getElementById("canvas") !==null){document.getElementById("canvas").addEventListener('click', function(event) {
        event = event || window.event;
        var ctx = document.getElementById("canvas").getContext("2d")
        
        for (var i = first.length - 1; i >= 0; i--){  
        
        if (first[i].name && ctx.isPointInPath(first[i].name, event.offsetX, event.offsetY)) {
        
            alert(event.clientX + ' : ' + event.clientY)

        return
        } 
    }
    })}

    return (
    <canvas id='canvas'  ref={canvasRef}></canvas>
  )
}
