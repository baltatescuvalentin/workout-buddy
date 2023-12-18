import '../../Styles/workouts.css';
import WorkoutsRedirectButton from '../../components/buttons/WorkoutsRedirectButton';

const WorkoutsMain = () => {
    return (
        <div className="workout_wrapper">
            <div className='workouts_main_wrapper'>
                <h1>Workouts</h1>
                <p>Our platform provides every tool you need for you fitness journey</p>
                <h3>
                    1. Finding an Exercise:
                </h3>
                <p>
                    Are you struggling to find the right exercises that suit your goals and preferences? Workout Buddy simplifies the process by providing a comprehensive database of exercises, sorted and categorized by muscle groups, equipment, difficulty, or exercise type. Users can effortlessly explore a wide range of exercises, from beginner-friendly routines to advanced workouts, all at their fingertips. Whether it's strength training, cardio, yoga, or something else, Workout Buddy serves as your personal exercise library, making it easy to discover new and effective movements tailored to your fitness journey.
                </p>
                <WorkoutsRedirectButton title='Check it out!' path="/workouts/findexercise" />
                <h3>
                    2. Creating Workouts for Each Day:
                </h3>
                <p>
                    Customization is key when it comes to achieving fitness milestones. Workout Buddy empowers users to craft personalized workout routines effortlessly. With an intuitive interface, users can create daily workout plans by selecting exercises from the vast library. You can mix and match exercises, set repetitions, adjust sets, and allocate time for each routine. Additionally, the platform offers the flexibility to create diverse workout schedules tailored to individual fitness levels, whether you're a beginner looking to establish a routine or an experienced fitness enthusiast aiming for a more challenging regimen.
                </p>
                <WorkoutsRedirectButton title='Check it out!' path="/workouts/create_workout" />
                <h3>
                    3. Storing and Viewing Each Workout:
                </h3>
                <p>
                    Keeping track of your progress is crucial for staying motivated and accountable. Workout Buddy streamlines this process by enabling users to store and view each created workout. The platform organizes and archives your workout plans, allowing you to revisit and execute them conveniently. Users can track their performance, monitor consistency, and view their past workouts for insights into progress and areas for improvement. With an accessible history of workouts, users can analyze trends, adapt their routines, and maintain a clear record of their fitness journey, fostering continuous improvement and goal attainment.
                </p>
                <WorkoutsRedirectButton title='Check it out!' path="/workouts/myworkouts" />
            </div>
        </div>
    )
}

export default WorkoutsMain;