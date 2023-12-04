import '../../Styles/inputs.css';

const ActivityLevelDropdown = ({id, register, options}) => {
    return (
        <div className='activity_wrapper'>
            <select className='activity_dropdown' {...register(id)}>
                {options.map((option, index) => {
                    return <option key={index} value={option.value} disabled={option.disabled}>{option.title}</option>
                })}
            </select>
        </div>
    )
}

export default ActivityLevelDropdown;