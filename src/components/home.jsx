import React,{useState,useEffect} from 'react'
import { Area } from './area'
import { Area2 } from './area2'
import { Image } from './image'

export const ThemeContext = React.createContext(null)

export const Home = () => {

    const [pic, setPic] = useState('')
    const [draw, setDraw] = useState(false)
    const [save, setSave] = useState(false)
    const [file, setFile] = useState(false)
    const [json, setJson] = useState({})
    const [scale, setScale] = useState(1)
    const [contours,setContours] = useState([])
    
    let alt = 'empty'
    let width = 6000
    let height = 4000

    const [fullCoords, setFullCoords] = useState({"coords":[],"name":''})

    
    

      function onClickHandler(e){

        e.preventDefault()
        let coords = [(e.clientX - e.target.offsetLeft)/scale ,(e.clientY - e.target.offsetTop)/scale]


        if(draw === true && fullCoords.coords !== undefined){
    
          if(fullCoords.coords.length <= 3){
          
          console.log(fullCoords)
          setFullCoords(old =>({"coords":[...old.coords,coords],"name":'name'}))
          
          }else if(fullCoords.coords[0][0] >= coords[0]-7 && fullCoords.coords[0][0] <= coords[0]+7 && fullCoords.coords[0][1] >= coords[1]-7 && fullCoords.coords[0][1] <= coords[1]+7 ){ 
    
            setSave(true)
            setFullCoords(old =>({"coords":[...old.coords,fullCoords.coords[0]],"name":'name'}))

          }else if(save === false){

            setFullCoords(old =>({"coords":[...old.coords,coords],"name":'name'}))

          }

        }
       
     
      }
    
      function saveHandler(){

        let old = fullCoords

        old.coords[old.coords.length-1]= old.coords[0]

        setFullCoords(old)
        
        let checkIfegz = contours.findIndex(old => old.image === pic.name)
        console.log(checkIfegz)

        if(checkIfegz === -1){
        setContours(old =>([...old,{

        image: pic.name,
        contours: [{
        name: fullCoords.name,
        coords: fullCoords.coords
        }]

        }]))}
        else{

          contours[checkIfegz].contours.push({

            
            name: fullCoords.name,
            coords: fullCoords.coords
            

          })

        }

        console.log(contours)
  

      setFullCoords({"coords":[],"name":''})
      setSave(false)
      setDraw(!draw)
    

      }

      function cancelHanler(){

      setFullCoords({"coords":[],"name":''})
      setSave(false)
      setDraw(!draw)

      }

console.log(contours)
    return (
    <>
    <div style={{display:'flex',justifyContent:'space-evenly',alignItem:'center'}}>

    <input type='file' onChange={(e) => {setPic(e.target.files[0]);setDraw(false)}}/>

    <input type='number' min={0.1} style={{width:"100px"}} max={2} step={0.1} value={scale} onChange={(e) => setScale(e.target.value)}/>
    
    <input type='file' accept="application/JSON" onChange={(e) => {

        var reader = new FileReader();

        reader.addEventListener('load', function() {
          var result = JSON.parse(reader.result); // Parse the result into an object 
     

          let checkIfegz = contours.findIndex(old => old.image === result.image)

          if(checkIfegz === -1){
   
              setContours(old =>([...old,{
   
                image: result.image,
                contours: result.contours
      
                }]
                
                ))
   
          }
            else{
  
              contours[checkIfegz].contours.push(result.contours)
    
            }
          
        
        });

       reader.readAsText(e.target.files[0])

        
        
        //addFromFile()

        }
      
      }/> 

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
        <Area />
        </ThemeContext.Provider>
    </div>
    </>
  )
}
