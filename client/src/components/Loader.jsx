import { ClipLoader } from 'react-spinners';
import '../Styles/styles.css';

const Loader = ({divStyle, color, size, loaderStyle}) => {
    return (
        <div className={`${divStyle}`}>
            <ClipLoader color={color} size={size} className={loaderStyle}/>
        </div>
    )
}

export default Loader;