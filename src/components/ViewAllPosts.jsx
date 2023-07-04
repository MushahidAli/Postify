//Dependencies
import { useState, useEffect } from 'react'
import axios from 'axios'

//Components
import { domain } from './Util'

//Assets
import Warning from '../assets/images/warning.png'
import Delete from '../assets/images/delete.png'
import './Home.css'

export default function ViewAllPosts() {

    const [postValue, setPostValue] = useState([]);
    const [totalPost, setTotalPost] = useState();
    const [countAll, setCountAll] = useState(5);
    const [canDelete, setCanDelete] = useState(false);
    var user = localStorage.getItem("login");

    useEffect(() => {
        axios.get(domain + `viewallpost/5`)
            .then(res => setPostValue(res.data))

        axios.get(domain + `numberofallposts`)
            .then(res => setTotalPost(res.data.posts))

        setCountAll(countAll + 1);
    }, []);

    async function loadViewAll() {
        setCountAll(countAll + 5);
        setPostValue([]);
        setCanDelete(false);
        await axios.get(domain + `viewallpost/${countAll}`)
            .then(res => setPostValue(res.data))
        setTimeout(() => { window.scrollTo(0, document.body.scrollHeight * document.body.scrollHeight); }, 1);
    }


    return (<>
        <div id="posting" style={{ margin: '5%' }}>

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
                        <img className="warning" width={200} height={200} src={Warning} style={{ mixBlendMode: 'darken' }} /><br />
                        No Post Found!<br />
                        Click On The ADD(+) Icon To Post!

                    </div>

                    :

                    (totalPost !== postValue.length) ?

                        <button id="loadviewall" className='loadBtn' onClick={loadViewAll}>LOAD MORE</button>
                        :
                        <h2><b>No More Posts Available To Show Right Now!</b></h2>
            }

        </div>
    </>);
}