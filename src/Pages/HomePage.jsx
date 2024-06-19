import { Button, Spinner} from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../Components/Navbar';
import '../CSS/HomePage.css'
import SchemeCard from '../Components/SchemeCard';
import FooterCom from '../Components/Footer';



function HomePage() {
  const [message, setMessage] = useState('');
  const [loading,setLoading]=useState(false);
  const [policy,setPolicy]=useState('');
  const [recommendations,setRecommendations]=useState('')
  const [user_tags,setUserTags]=useState('')
  const [age,setAge]=useState('')
  const [social_category,setSocial_Category]=useState('')
  const [gender,setGender]=useState('')
  const [domicile_of_tripura,set_domicile_of_tripura]=useState('')
  const [recommendations_on_user_Inputs,set_recommendations_on_user_Inputs]=useState('')

  useEffect(() => {
    setLoading(false)
    axios.get('https://unique-arda-chandan1971-b4d1758e.koyeb.app/hello-world/')
      .then(response => {
        
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleChange=(e)=>{
    setPolicy(e.target.value);
    
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    axios
    .get(`https://unique-arda-chandan1971-b4d1758e.koyeb.app/result?policy=${policy}`)
    .then((response)=>{
     
      response.data=response.data.slice(1,-1);
      console.log(response.data.split('+'));
      setRecommendations(response.data.split("+"));
    })
    
  }
  
  const handleUserInput=(e)=>{
    setLoading(true);
    e.preventDefault();
    console.log(user_tags);
    console.log(age);
    console.log(social_category);
    console.log(gender);
    console.log(domicile_of_tripura);
    axios
    .get(`https://unique-arda-chandan1971-b4d1758e.koyeb.app/recommend?user_tags=${user_tags}&age=${age}&social_category=${social_category}&gender=${gender}&domicile_of_tripura=${domicile_of_tripura}`)
    .then((response)=>{
      response.data=response.data.slice(1,-1);
      response.data=response.data.split('+');
      const schemes=[];
      console.log(response.data.length);
      for(let i=0;i<response.data.length;i+=3){
        const scheme={};
        console.log(i);
        scheme.id=response.data[i];
        scheme.description=response.data[i+1];
        scheme.name=response.data[i+2];
        schemes.push(scheme);
      }
      console.log(response.data.length);

      console.log(JSON.stringify(schemes));
      set_recommendations_on_user_Inputs(schemes);
      setLoading(false);
    })
    
  }



  return (
    <div className='overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 m-0 p-0 '> 
        <div className='fixed top-0 -z-10 h-full w-full'>
        {/* <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div> */}
        <div class="relative h-full w-full bg-black"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div><div class="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div></div>
        </div>
        <Navbar></Navbar>
        {/* <hr  className='text-white'/> */}
        {/* <div class="form-section">
        <div class="box">
          <form action="">
            <h2>Sign In</h2>
              <div class="InputBox">
                <input type='text' required="required"></input><span>Username</span>
                <i></i>
              </div>
              <div class="InputBox">
                <input type='text' required="required"></input><span>Password</span>
                <i></i>
              </div>
              {/* <div className='InputBox'>
              <label >Choose a Policy:</label>
                <select name="policy" onChange={handleChange} >
                  <option value="Pre-Matric Scholarship for ST (VI to VIII)">Pre-Matric Scholarship for ST (VI to VIII)</option>
                  <option value="Mukhyamantri Yuba Yogajog Yojana">Mukhyamantri Yuba Yogajog Yojana</option>
                  <option value="Pre-Matric Scholarship Class VI to VIII for SC Students">Pre-Matric Scholarship Class VI to VIII for SC Students</option>
                  <option value="Dr. B. R. Ambedkar Merit Award">Dr. B. R. Ambedkar Merit Award</option>
              </select>
              <i></i>
              </div> */}
              {/* <div class="links">
                <a href="#">Forgot Password</a>
                <a href="#">Sign up</a>
              </div>
            <input type="submit"value="login" className='cursor-pointer'></input>
          </form> */}
        {/* </div> */}
      {/* </div>  */}
        {/* <div>{message}</div>
        <h1 className="text-3xl font-bold underline">BMS Recommendation System</h1> */}
        {/* <form onSubmit={handleSubmit} >
            <label >Choose a Policy:</label>
            <select name="policy" onChange={handleChange} >
                <option value="Pre-Matric Scholarship for ST (VI to VIII)">Pre-Matric Scholarship for ST (VI to VIII)</option>
                <option value="Mukhyamantri Yuba Yogajog Yojana">Mukhyamantri Yuba Yogajog Yojana</option>
                <option value="Pre-Matric Scholarship Class VI to VIII for SC Students">Pre-Matric Scholarship Class VI to VIII for SC Students</option>
                <option value="Dr. B. R. Ambedkar Merit Award">Dr. B. R. Ambedkar Merit Award</option>
            </select> 
            <Button type='submit'>Submit</Button>
        </form>  */}
      <br />
        {recommendations &&
          recommendations.map((keyy) => (
            
            <p>{keyy}</p>
          ))} 
          
      <div class="form-section">
        <div class="box">

       
      <form onSubmit={handleUserInput}>
          <h2>BMS Recommendation System</h2>
          <div class="InputBox">
                <input type='text' required="required" onChange={(e)=>{setUserTags(e.target.value)}}></input><span>Enter the description of the scheme :</span>
                <i></i>
          </div>
          <div class="InputBox">
                <input type='text' required="required" onChange={(e)=>{setAge(e.target.value)}}></input><span>Enter Your Age :</span>
                <i></i>
          </div>
          <div class="InputBox">
            <label>Choose a Category:</label>
            <select onChange={(e)=>setSocial_Category(e.target.value)} >
                <option value="">Click here to Select</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="OBC">OBC</option>
                <option value="Others">Others</option>
            </select>
            <i></i>
          </div>
          <div class="InputBox">
          <label >Choose a Gender:</label>
          <select onChange={(e)=>setGender(e.target.value)} >
              <option value="">Click here to Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="T">Transgender</option>
          </select> 
          <i></i>
          </div>
          <div class="InputBox">
            <label >Are you a resident of Tripura :</label>
            <select  onChange={(e)=> set_domicile_of_tripura(e.target.value)}>
                <option value="">Click here to Select</option>
                <option value="Y">Yes</option>
                <option value="N">No</option>
            </select> 
            <i></i>
          </div>
          <Button gradientDuoTone="purpleToBlue" type='submit' disabled={loading} className='mt-5'>
              {
                loading?(
                  <>
                  <Spinner size='sm'></Spinner>
                  <span>Loading...</span>
                  </>
                ):'Submit'
              }
            </Button>
          {/* <Button type='submit' className='mt-5'>Submit</Button> */}
        </form>
        </div>
      </div>
        
        <br />
        {/* {recommendations_on_user_Inputs &&
          recommendations_on_user_Inputs.map((keyy) => (
            <p>{keyy}</p>
          ))}  */}
      <hr></hr>
      <div className='mx-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {
          recommendations_on_user_Inputs  && (
            <div className='flex flex-col gap-6 '>
              <h2 className='text-2xl font-semibold text-center'>Recommended Schemes</h2>
              <div className='flex flex-wrap gap-4 justify-center'>
                {
                  recommendations_on_user_Inputs.map((schemes,index)=>(
        
                      <SchemeCard key={schemes.id} scheme={schemes}></SchemeCard>
                  ))
                }
              </div>
              
            </div>
          )
        }
      </div>
      <FooterCom></FooterCom>
     
    </div>
  )
}

export default HomePage