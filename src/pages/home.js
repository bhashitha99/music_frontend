import Form from 'react-bootstrap/Form';
import '../css/home.css';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function Home(){
    const [lyrics, setLyrics] = useState('');
    const [find, setFind] = useState(false);
    const [predData, setPredData] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL 

    useEffect(()=>{

        setPredData([
            {
              name: 'Page A',
              val: 0.6000,
            },
            {
              name: 'Page B',
              val: 0.3000,
            },
            {
              name: 'Page C',
              val: 0.2000,
            },
          ])},[find]);


    const onClickFunc = async () =>{
        setFind(false);
        if(lyrics.length===0){
            alert("Please input the lyrics");
            return;
        }
        try{
            const response = fetch(`${apiUrl}/lyrics/predict`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({lyrics: lyrics}),
            })
            const results = await response.json();
        }catch(err){
            console.log(err);
        } 
        setFind(true);
    }
    return(
        <div className='container'>
            <h1 className='home-hedding'>Welcome to the music class classifier</h1>
            <Form className='home-form'> 
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Input lyrics</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={5} 
                        value={lyrics}
                        onChange={(e)=> setLyrics(e.target.value)}/>
                </Form.Group>
                <Button variant="outline-primary" onClick={onClickFunc}>Find the genre</Button>
            </Form>
            
            {/* <ResponsiveContainer width="50%" height={300} align="center" className='home-chart'>
                <XAxis dataKey="name" />
                <BarChart width={150} height={40} data={data}>
                <Bar dataKey="uv" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer> */}
            {find===true && (<ResponsiveContainer width="50%" height={300} className='home-chart'>
                <BarChart
                width={500}
                height={300}
                data={predData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} /> */}
                <Bar dataKey="val" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                </BarChart>
            </ResponsiveContainer>
            )};

        </div>

        
    )
}
export default Home;