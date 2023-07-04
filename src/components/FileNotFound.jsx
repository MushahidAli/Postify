//Dependencies
import {Link} from 'react-router-dom'

//Assets
import FileNotFoundImg from '../assets/images/404.png'

export default function FileNotFound() {
    return (<div style={{color: '#3e0303'}}>
    <br /><br />
    <h2>. : : 404 - Client Side Error - File Not Found : : .</h2>
    <code>
    The requested URL returned ERR_CODE: 404.<br />Go back to <Link to="/viewmyposts">/HOME</Link>.
    </code>
    <br /><br />
    <img width="30%" height="30%" src={FileNotFoundImg} />
    </div>);
}