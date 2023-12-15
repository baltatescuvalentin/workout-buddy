import '../Styles/fitness.css';

const TableTracker = ({tableValues}) => {
    return (
        <div className='summary_table_wrapper'>
            <table className='summary_table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Minimum</th>
                        <th>Average</th>
                        <th>Maximum</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Weight</td>
                        <td>{tableValues.minWeight || 0}</td>
                        <td>{tableValues.avgWeight || 0}</td>
                        <td>{tableValues.maxWeight || 0}</td>
                    </tr>
                    <tr>
                        <td>Calories Intake</td>
                        <td>{tableValues.minCaloriesIntake || 0}</td>
                        <td>{tableValues.avgCaloriesIntake || 0}</td>
                        <td>{tableValues.maxCaloriesIntake || 0}</td>
                    </tr>
                    <tr>
                        <td>Calories Burned</td>
                        <td>{tableValues.minCaloriesBurned || 0}</td>
                        <td>{tableValues.avgCaloriesBurned || 0}</td>
                        <td>{tableValues.maxCaloriesBurned || 0}</td>
                    </tr>
                    <tr>
                        <td>Body Fat%</td>
                        <td>{tableValues.minBodyFat || 0}</td>
                        <td>{tableValues.avgBodyFat || 0}</td>
                        <td>{tableValues.maxBodyFat || 0}</td>
                    </tr>
                    <tr>
                        <td>BMI</td>
                        <td>{tableValues.minBMI || 0}</td>
                        <td>{tableValues.avgBMI || 0}</td>
                        <td>{tableValues.maxBMI || 0}</td>
                    </tr>
                    <tr>
                        <td>Waist</td>
                        <td>{tableValues.minWaist || 0}</td>
                        <td>{tableValues.avgWaist || 0}</td>
                        <td>{tableValues.maxWaist || 0}</td>
                    </tr>
                    <tr>
                        <td>Hips</td>
                        <td>{tableValues.minHips || 0}</td>
                        <td>{tableValues.avgHips || 0}</td>
                        <td>{tableValues.maxHips || 0}</td>
                    </tr>
                    <tr>
                        <td>WHR</td>
                        <td>{tableValues.minWHR || 0}</td>
                        <td>{tableValues.avgWHR|| 0}</td>
                        <td>{tableValues.maxWHR || 0}</td> 
                    </tr>
                    <tr>
                        <td>Neck</td>
                        <td>{tableValues.minNeck || 0}</td>
                        <td>{tableValues.avgNeck || 0}</td>
                        <td>{tableValues.maxNeck || 0}</td> 
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableTracker;