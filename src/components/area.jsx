import React,{useRef,useEffect,useContext,useState} from 'react'
import {ThemeContext} from './home'

export const Area = (props) => {
    
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [first, setfirst] = useState([])
    const {width,height,scale,contours,pic} = useContext(ThemeContext)
    

    function addEvent(event) {
        event = event || window.event;
        var ctx = document.getElementById("canvas").getContext("2d")
        console.log(first)

        let clickPlace = [(event.clientX - event.target.offsetLeft)/scale ,(event.clientY - event.target.offsetTop)/scale]
        
        for (var i = first.length - 1; i >= 0; i--){

            let minMax = findMinMax(first[i].coords)

        
            if(clickPlace[0] >= minMax.x[0] && clickPlace[0] <= minMax.x[1] && clickPlace[1] >= minMax.y[0] && clickPlace[1] <= minMax.y[1] ){

                alert(clickPlace[0] + " ; " + clickPlace[1])
                console.log(clickPlace[0] + " ; " + clickPlace[1])

                return;
            }
        
        
    }

    canvasRef.current.removeEventListener('click',addEvent,true)

    }

    
    function findMinMax(arr) {
        let minY = arr[0][1], maxY = arr[0][1];
        let minX = arr[0][0], maxX = arr[0][0];
      
        for (let i = 1, len=arr.length; i < len; i++) {
          let v = arr[i][0];
          let b = arr[i][1];
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
        canvas.style.width = width*scale+'px'
        canvas.style.height = height*scale+'px'
        canvas.style.position = 'absolute'
        canvas.style.zIndex = '97'

        const context = canvas.getContext("2d")
     
        let color = 'red'
        let opacity = 0.5
        let num = -1
        let name = []

        contours.forEach(item=>{
            
        
        if(item.image === pic.name && pic !== ''){

        for(let j=0;j < item.contours.length;j++){
            
            name.push({"name": new Path2D(),"coords":item.contours[j].coords})
            num+=1
            context.beginPath(name[num].name)
            context.fillStyle = color
            context.strokeStyle = color
            context.globalAlpha = opacity
            
        name[num].name.moveTo(item.contours[j].coords[0][0] * scale,item.contours[j].coords[0][1] * scale)
        
        for(let i=1;i < item.contours[j].coords.length;i++){

            name[num].name.lineTo(item.contours[j].coords[i][0] * scale,item.contours[j].coords[i][1] * scale)
            context.fillRect(item.contours[j].coords[i][0] * scale-5, item.contours[j].coords[i][1] * scale-5, 10, 10);
            
        
        context.stroke(name[num].name)
        }}


        
    }

    
        
        setfirst(name)
    
    })


       

        contextRef.current = context
    }, [pic,contours,scale])
    




    return (
    <canvas id='canvas' onMouseDown={addEvent}  ref={canvasRef}></canvas>
  )
}
