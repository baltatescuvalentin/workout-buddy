import '../../Styles/workouts.css';
import '../../Styles/fitness.css';
import BMICalculator from '../../components/calculators/BMICalculator';
import IdealWeightCalculator from '../../components/calculators/IdealWeightCalculator';
import BodyFatCalculator from '../../components/calculators/BodyFatCalculator';
import DailyCaloriesCalculator from '../../components/calculators/DailyCaloriesCalculator';
import MacrosCalculator from '../../components/calculators/MacrosCalculator';

const FitnessCalculator = () => {
    return (
        <div className='workout_wrapper'>
            <div className='workouts_create_wrapper'>
                <h1>
                    Fitness Calculator
                </h1>
                <p>
                    This tool helps you to find what you need for your fitness life and to maximize your workout gains. 
                    The calculator let's you find things like: BMI, daily calory, body fat percentage, ideal weight, macros,
                    burned calories. 
                </p>
                
                <div className='calculators_wrapper'>
                    <BMICalculator />
                    <IdealWeightCalculator />
                    <BodyFatCalculator />
                    <DailyCaloriesCalculator />
                    <MacrosCalculator />
                </div>
            </div>
        </div> 
    )
}

export default FitnessCalculator;