//Dependencies
import { useState, useEffect } from 'react'
import axios from 'axios'

//Components
import { domain } from './Util'

//Assets
import Warning from '../assets/images/warning.png'
import Delete from '../assets/images/delete.png'
import './Home.css'

export default function ViewMyPosts() {

    const [postValue, setPostValue] = useState([]);
    const [totalPost, setTotalPost] = useState();
    const [count, setCount] = useState(5);
    const [canDelete, setCanDelete] = useState(true);
    var user = localStorage.getItem("login");

    useEffect(() => {
        axios.get(domain + `viewpost/${atob(user)}/5`)
            .then(res => setPostValue(res.data))

        axios.get(domain + `howmanyposts/${atob(user)}`)
            .then(res => setTotalPost(res.data.posts))

        setCount(count + 1);
    }, []);

    async function loadView() {
        setCount(count + 5);
        setPostValue([]);
        setCanDelete(true);
        await axios.get(domain + `viewpost/${atob(user)}/${count}`)
            .then(res => setPostValue(res.data))
        setTimeout(()=>{window.scrollTo(0, document.body.scrollHeight*document.body.scrollHeight);},1);
    }

    return (<>

        {
            (postValue) ?
                postValue.map((data) =>
                    <div key={data.newid}>

                        <br /><div className='mainContainer'>
                            <div onClick={() => { if (confirm('You Sure?')) { axios.get(domain + `deletepost/${data.newid}`); alert('Post Deleted Successfully!'); window.location = "" } }} className='x'>{(canDelete == true) ? <img width={50} height={50} src={Delete} /> : ('')}</div>
                            Post: {data.post}<br />
                            <div className='contentFontSize'>Date/Time: {data.dateandtime}</div>
                            <div className='contentFontSize'>By: {data.user}</div>
                        </div><br />

                    </div>)
                :
                ('No Posts Found!')
        }

        {
            (postValue.length == 0) ?

                <div style={{ fontSize: '50px' }}>
                    <img className="warning" width={200} height={200} src={Warning} /><br />
                    No Post Found!<br />
                    Click On The ADD(+) Icon To Post!

                </div>

                :

                (totalPost !== postValue.length) ?

                    <button id="loadview" className='loadBtn' onClick={loadView}>LOAD MORE</button>
                    :
                    <h2><b>No More Posts Available To Show Right Now!</b></h2>
        }


    </>);
}