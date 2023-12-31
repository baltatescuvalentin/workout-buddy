import { useSelector } from 'react-redux';
import '../../Styles/inputs.css';
import { useState, useEffect } from 'react';

const CreateWorkoutDescription = ({id, name, register, defaultValue, styles}) => {

    const mode = useSelector(state => state.mode);
    const [rows, setRows] = useState(1);
    const [text, setText] = useState('');

    useEffect(() => {
        const calculateRows = (text) => {
            return text.split('\n').length + 1;
          };
        setRows(calculateRows(text));
    }, [text]);

    return (
        <textarea rows={rows} id={id} placeholder={name} defaultValue={defaultValue} {...register(id)} onChange={(e) => setText(e.target.value)}
            className={`${styles} ${mode === 'light' ? 'light_input' : 'dark_input'}`}>

        </textarea>
    )
}

export default CreateWorkoutDescription;