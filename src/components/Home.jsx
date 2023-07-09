//Dependencies
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { Routes, Route, Link } from 'react-router-dom'

//Components
import { domain } from './Util'
import ViewMyPosts from './ViewMyPosts'
import ViewAllPosts from './ViewAllPosts'
import FileNotFound from './FileNotFound'

//Assets
import Logo from '../assets/images/logo.png'
import Logout from '../assets/images/logout.jpg'
import Add from '../assets/images/add.png'
import './Home.css'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        width: '50%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    overlay: {
        background: "rgba(0,0,0,0.6)",
    },
};

Modal.setAppElement('#root');

export default function Home() {

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [delAccountOpen, setDelAccountOpen] = useState(false);
    const [personalContent, setPersonalContent] = useState();
    const post = useRef();

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = 'black';
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openDelModal() {
        setDelAccountOpen(true);
    }

    function afterOpenDelModal() {
        subtitle.style.color = 'black';
    }

    function closeDelModal() {
        setDelAccountOpen(false);
    }

    var user = localStorage.getItem("login");

    function logout() {
        localStorage.removeItem("login");
        window.location = "";
    }

    function postContent(e) {
        if (!post.current.value) { }
        else {
            e.preventDefault();
            axios.get(domain + `addpost/${Math.random() + "." + Math.random()}/${atob(user)}/${post.current.value}/${new Date()}/${personalContent}`);
            setIsOpen(false);
            alert('Successfully posted!');
            window.location = "";
        }
    }

    useEffect(() => {
        axios.get('https://ipwho.is')
            .then(res => setPersonalContent("IP : " + res.data.ip + " | City : " + res.data.city + " | Region : " + res.data.region + " | Country : " + res.data.country))

    }, []);

    function delAccount() {
        if (confirm("You sure?") == true) {
            axios.get(domain + `delete/${atob(user)}`);
            localStorage.removeItem("login");
            window.location = "";
        }
    }

    return (<>

        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <a href="" className="navbar-brand"><img width={50} height={50} src={Logo} /></a>
                <div className="d-flex text-info"><div onClick={openDelModal}>[ {atob(user).toLowerCase()} </div> &nbsp;- <div><Link className='text-info' to="/viewmyposts"> &nbsp;ViewMyPosts&nbsp;</Link></div> &nbsp;- <div><Link className='text-info' to="/viewallposts"> &nbsp;ViewAllPosts&nbsp;</Link></div> ]</div>
                <img onClick={openModal} width={50} height={50} className='addIcon' src={Add} />
                <img onClick={logout} width={50} height={50} src={Logout} />
            </div>
        </nav>

        <div id="posting" style={{ margin: '5%' }}>

            <Routes>
                <Route path="/" element={<ViewMyPosts />} />
                <Route path="/index.html" element={<ViewMyPosts />} />
                <Route path="/viewmyposts" element={<ViewMyPosts />} />
                <Route path="/viewallposts" element={<ViewAllPosts />} />
                <Route path="*" element={<FileNotFound />} />
            </Routes>

        </div>


        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal">

            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add A Post!</h2>
            <form onSubmit={postContent}>
                <textarea placeholder="WHAT'S ON YOUR MIND?" ref={post} style={{ height: '160px' }} name="postData" className="form-control"></textarea><br />
                <button className='loadBtn'>Post!</button>
            </form>

        </Modal>

        <Modal
            isOpen={delAccountOpen}
            onAfterOpen={afterOpenDelModal}
            onRequestClose={closeDelModal}
            style={customStyles}
            contentLabel="Example Modal">

            <form>
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Want to Delete your Account?</h2>
                <button className='loadBtn' onClick={delAccount}>YUP!</button>
            </form>

        </Modal>

    </>);
}