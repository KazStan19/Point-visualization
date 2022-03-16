import React,{useState} from 'react'
import { Area } from './area'
import { Area2 } from './area2'
import { Image } from './image'

export const ThemeContext = React.createContext(null)

export const Home = () => {

    const [pic, setPic] = useState('')
    const [draw, setDraw] = useState(false)
    const [save, setSave] = useState(false)
    const [scale, setScale] = useState(1)
    const [contours,setContours] = useState([])
    
    let alt = 'empty'
    let width = 1400
    let height = 750


      const [fullCoords, setFullCoords] = useState({"coords":[],"name":''})

      function onClickHandler(e){

        e.preventDefault()
        let coords = [(e.clientX - e.target.offsetLeft)/scale ,(e.clientY - e.target.offsetTop)/scale]


        if(draw === true && fullCoords.coords !== undefined){
    
          if(fullCoords.coords.length <= 3){
          
          console.log([e.clientX,e.clientY])
          setFullCoords(old =>({"coords":[...old.coords,coords],"name":pic.name}))
          
          }else if(fullCoords.coords[0][0] >= coords[0]-7 && fullCoords.coords[0][0] <= coords[0]+7 && fullCoords.coords[0][1] >= coords[1]-7 && fullCoords.coords[0][1] <= coords[1]+7 ){ 
    
            setSave(true)
            setFullCoords(old =>({"coords":[...old.coords,fullCoords.coords[0]],"name":pic.name}))

          }else if(save === false){

            setFullCoords(old =>({"coords":[...old.coords,coords],"name":pic.name}))

          }

        }
       
     
      }
    
      function saveHandler(){

        let old = fullCoords

        old.coords[old.coords.length-1]= old.coords[0]

        setFullCoords(old)

        setContours(old =>([...old,{

        name: fullCoords.name,
         coords: {
        type: "LineString",
        coordinates: fullCoords.coords
        }

        }]))
  

      setFullCoords({"coords":[],"name":''})
      setSave(false)
      setDraw(!draw)
    

      }

      function cancelHanler(){

      setFullCoords({"coords":[],"name":''})
      setSave(false)
      setDraw(!draw)

      }


    return (
    <>
    <div style={{display:'flex',justifyContent:'space-evenly',alignItem:'center'}}>

    <input type='file' onChange={(e) => {setPic(e.target.files[0]);setDraw(false)}}/>

    <input type='number' min={0.1} style={{width:"100px"}} max={2} step={0.1} value={scale} onChange={(e) => setScale(e.target.value)}/>
    
    {!draw ? <button style={{padding:'5px'}} onClick={(e)=>{
      e.preventDefault();
      setSave(false) 
      //setScale(1)
      setDraw(!draw); 
      setFullCoords({"coords":[],"name":''})

      }}>Mark defect</button> : (<button style={{padding:'5px'}} onClick={(e)=>{
        e.preventDefault(); 
        
        saveHandler()
  
        }}>Save defect</button>) }

    {!draw ? null : (<button style={{padding:'5px'}} onClick={(e)=>{
        e.preventDefault(); 
        
        cancelHanler()
  
        }}>Cancel</button>) }
    </div>
    <div onMouseDown={onClickHandler} style={{display:'flex',justifyContent:'space-evenly',alignItem:'center'}}>
        <ThemeContext.Provider  value={{width,height,scale,pic,alt,contours,draw,fullCoords}}>
        <Image />
        <Area2/>
        { contours.map(item =>{
          let id = Math.floor(Math.random() * 100);
          if(item.name === pic.name && pic !== ''){
            return(<Area item={item} key={id} id={id}/>)
          }

        })}
        </ThemeContext.Provider>
    </div>
    </>
  )
}
