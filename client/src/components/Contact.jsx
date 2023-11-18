import '../Styles/styles.css';
import contactImage from '../utils/images/contact.jpg';
import googleIcon from '../utils/icons/gmail.png';
import discordIcon from '../utils/icons/discord.png';
import mailIcon from '../utils/icons/mailcom.webp';

const Contact = () => {
    return (
        <div className='contact'>
            <div className='contact_container'>
                <p className='contact_title'>
                    Contact
                </p>
                <div className='contact_item'>
                    <img src={googleIcon} alt="GMail" className='contact_logo' />
                    <p>
                        baltatescuvalentin14@gmail
                    </p>
                </div>

                <div className='contact_item'>
                    <img src={mailIcon} alt="Mail.com" className='contact_logo' />
                    <p>
                        baltatescuv@mail.com
                    </p>
                </div>

                <div className='contact_item'>
                    <img src={discordIcon} alt="Discord" className='contact_logo' />
                    <p>
                        bure#9731
                    </p>
                </div>
            </div>
            <img src={contactImage} alt="Contact" className='contact_image'/>
        </div>
    )
}

export default Contact;