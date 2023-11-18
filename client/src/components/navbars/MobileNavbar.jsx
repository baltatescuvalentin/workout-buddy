import '../../Styles/navbars.css';
import { TiTimes } from "react-icons/ti";
import NavbarContent from './NavbarContent';
import { useDispatch, useSelector } from 'react-redux';
import { setMNavbar } from '../../state';
import { useEffect } from 'react';

const MobileNavbar = () => {

    const mNavbar = useSelector(state => state.mNavbar);
    const mode = useSelector(state => state.mode);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleScroll = (event) => {
            if(mNavbar) {
             event.preventDefault();
            }
        };
    
        // Add event listeners when the component mounts
        document.addEventListener('wheel', handleScroll, { passive: false });
        document.addEventListener('touchmove', handleScroll, { passive: false });
    
        // Remove event listeners when the component unmounts
        return () => {
          document.removeEventListener('wheel', handleScroll);
          document.removeEventListener('touchmove', handleScroll);
        };
      }, [mNavbar]);

    return (
        <div className={`${mNavbar === true ? 'mobile_navbar_active' : 'mobile_navbar_hidden'} ${mode === 'light' ? 'mobile_navbar_light' : 'mobile_navbar_dark'}`}>
            <div className='close_navbar_position'>
                <TiTimes onClick={() => dispatch(setMNavbar({mNavbar: false}))} className='close_navbar'/>
            </div>
            <NavbarContent />
        </div>
    )
}

export default MobileNavbar;