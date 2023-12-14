import '../Styles/fitness.css';

const TableTracker = ({tableValues}) => {
    return (
        <div>
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
                        <td>{tableValues.weight[0]}</td>
                        <td>{tableValues.weight[1]}</td>
                        <td>{tableValues.weight[2]}</td>
                    </tr>
                    <tr>
                        <td>Body Fat %</td>
                        <td>{tableValues.bodyFat[0]}</td>
                        <td>{tableValues.bodyFat[1]}</td>
                        <td>{tableValues.bodyFat[2]}</td>
                    </tr>
                    <tr>
                        <td>Calories Intake</td>
                        <td>{tableValues.caloriesIntake[0]}</td>
                        <td>{tableValues.caloriesIntake[1]}</td>
                        <td>{tableValues.caloriesIntake[2]}</td>
                    </tr>
                    <tr>
                        <td>Calories Burned</td>
                        <td>{tableValues.caloriesBurned[0]}</td>
                        <td>{tableValues.caloriesBurned[1]}</td>
                        <td>{tableValues.caloriesBurned[2]}</td>
                    </tr>
                    <tr>
                        <td>BMI</td>
                        <td>{tableValues.bmi[0]}</td>
                        <td>{tableValues.bmi[1]}</td>
                        <td>{tableValues.bmi[2]}</td>
                    </tr>
                    <tr>
                        <td>Waist</td>
                        <td>{tableValues.waist[0]}</td>
                        <td>{tableValues.waist[1]}</td>
                        <td>{tableValues.waist[2]}</td>
                    </tr>
                    <tr>
                        <td>Hips</td>
                        <td>{tableValues.hips[0]}</td>
                        <td>{tableValues.hips[1]}</td>
                        <td>{tableValues.hips[2]}</td>
                    </tr>
                    <tr>
                        <td>Neck</td>
                        <td>{tableValues.neck[0]}</td>
                        <td>{tableValues.neck[1]}</td>
                        <td>{tableValues.neck[2]}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableTracker;