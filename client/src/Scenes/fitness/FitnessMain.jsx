import '../../Styles/workouts.css';
import WorkoutsRedirectButton from '../../components/buttons/WorkoutsRedirectButton';

const FitnessMain = () => {
    return (
        <div className="workout_wrapper">
            <div className='workouts_main_wrapper'>
                <h1>Workouts</h1>
                <p>Our platform provides every tool you need for you fitness journey</p>
                <h3>
                    1. Fitness Calculator:
                </h3>
                <p>
                    Understanding your body's metrics is a fundamental step toward a healthier lifestyle. Workout Buddy provides users with a suite of fitness calculators designed to assess and monitor essential health indicators. From calculating Body Mass Index (BMI) to estimating body fat percentage, users gain insights into their overall health status. These calculators serve as valuable tools, enabling individuals to gauge their progress, set realistic goals, and make informed decisions regarding their fitness and well-being. By offering a comprehensive analysis of various health measurements, Workout Buddy equips users with the necessary information to embark on a more effective and targeted fitness journey.
                </p>
                <WorkoutsRedirectButton title='Check it out!' path="" />
                <h3>
                    2. Fitness Tracker:
                </h3>
                <p>
                    Consistency and accountability are paramount on any fitness quest. Workout Buddy acts as a daily tracker, allowing users to log and monitor their progress systematically. Users can record a variety of metrics daily, such as weight, calorie intake, water consumption, exercise duration, and other fitness-related activities. With a user-friendly interface, the platform simplifies the process of maintaining a log of daily accomplishments. The tracking system empowers users to track their goals, observe trends, and make data-driven adjustments to their fitness regimen. By consolidating data on a day-to-day basis, Workout Buddy enables users to chart their evolution, identify patterns, and stay motivated on their fitness journey.
                </p>
                <WorkoutsRedirectButton title='Check it out!' path="" />
                <h3>
                    3. Summary and Stats:
                </h3>
                <p>
                    While you do a good job workout out and keeping a track of your daily macros and body changes you need a way to see how far you've come. So to be proud of what you did we give you the possibility to see various stats over time with the help of charts and tables. You will know your high and lows to learn from the past so the future you will be close to your ideal vision.
                </p>
                <WorkoutsRedirectButton title='Check it out!' path="" />
            </div>
        </div>
    )
}

export default FitnessMain;