import { useSelector } from "react-redux";
import darkImage from '../../utils/images/dark-image.jpg';
import lightImage from '../../utils/images/light-image.jpg';
import JoinButton from "../../components/buttons/JoinButtons";
import '../../Styles/styles.css';
import Contact from "../../components/Contact";
import HomeCard from "../../components/cards/HomeCard";
import { PiPencilLineLight, PiMagnifyingGlassBold, PiListBulletsFill } from 'react-icons/pi';
import { BsCalculator } from 'react-icons/bs';
import { FaChartBar } from 'react-icons/fa';
import { MdSummarize } from 'react-icons/md';
import HomepageNavbar from "../../components/navbars/HomepageNavbar";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import WorkoutsRedirectButton from "../../components/buttons/WorkoutsRedirectButton";
import ClearStorageBtn from "../../components/ClearStorageBtn";


const HomePage = () => {

    const mode = useSelector(state => state.mode);
    const user = useSelector(state => state.user);

    return (
        <>
            <div className="homepage_wrapper">
                {
                    mode === 'light' ? (
                        <img src={lightImage} alt="Light background" className="homepage_image" loading="lazy"/>
                    ) : (
                        <img src={darkImage} alt="Dark background" className="homepage_image" loading="lazy"/>
                    )
                }

                <HomepageNavbar />

                <div className="homepage_image_wrapper">
                    <div className="homepage_image_bold_text">
                        <p>
                            Get the most out of yourself
                        </p>
                        <p>
                            with <span>Workout Buddy</span>
                        </p>
                    </div>
                    <div className="homepage_image_text">
                        <p>
                            Join the community to track and achieve your goals
                        </p>
                        <p>
                            Let <span>Workout Buddy</span> be your trusted ally in sculpting a healthier, stronger, and more confident version of yourself
                        </p>
                    </div>
                    {!user && <JoinButton />}
                </div>

                
            </div>

            <div className="homepage_image_text_mobile">
                <div className="homepage_image_bold_text">
                    <p>
                        Get the most out of yourself
                    </p>
                    <p>
                        with <span>Workout Buddy</span>
                    </p>
                </div>
                <div className="homepage_image_text">
                    <p>
                        Join the community to track and achieve your goals
                    </p>
                    <p>
                        Let <span>Workout Buddy</span> be your trusted ally in sculpting a healthier, stronger, and more confident version of yourself
                    </p>
                </div>
                <JoinButton />
            </div>

            <div className="homepage_text">
                <p>
                Working out isn't just about getting that 'beach body'—it's a secret weapon for both your body and mind. Ever noticed that 'feel-good' vibe after a workout? That's the endorphins kicking in, acting as your personal stress busters. They're like natural mood-boosters, giving you a solid high and making tough days a bit brighter.
                </p>
                <p>
                But it's not just the post-workout glow; regular exercise is like a superhero cape for your brain. It's a memory booster, stress reliever, and a top-notch anxiety fighter. And hey, bonus points for improving sleep and keeping those nasty health issues at bay. So, get moving and give your body and mind the TLC they deserve. Exercise isn't just about reps and sets; it's your ticket to feeling awesome <span>inside</span> and <span>out</span> !
                </p>
            </div>

            <div className="workout_parallax">

            </div>
            <div className="homepage_text">
                <p>
                    <span>Workout Buddy</span> is your perfect partner for your fitness journey providing helpful features to make experience how you like
                </p>
            </div>
            <div className="homepage_card_wrapper">
                <HomeCard title="Find an exercise" text="If you are not sure how to do or what exercise is fit for your muscle group you can find your right choice" 
                    icon={<PiMagnifyingGlassBold className="card_icon" />}/>
                <HomeCard title="Create a workout" text="Create and customize your workout however you like, adding your favorite exercises to maximize your gains and goals" 
                    icon={<PiPencilLineLight className="card_icon" />}/>
                <HomeCard title="View your workouts" text="Save your workouts and access them at any moment, all days saved in one place. Your buddy is always with you" 
                    icon={<PiListBulletsFill className="card_icon" />}/>
            </div>
            <div className="homepage_text">
                <p className="subtitle">
                    1. Finding an Exercise:
                </p>
                <p>
                    Are you struggling to find the right exercises that suit your goals and preferences? Workout Buddy simplifies the process by providing a comprehensive database of exercises, sorted and categorized by muscle groups, equipment, difficulty, or exercise type. Users can effortlessly explore a wide range of exercises, from beginner-friendly routines to advanced workouts, all at their fingertips. Whether it's strength training, cardio, yoga, or something else, Workout Buddy serves as your personal exercise library, making it easy to discover new and effective movements tailored to your fitness journey.
                </p>
                <WorkoutsRedirectButton title='Check it out!' path="" />
                <p className="subtitle">
                    2. Creating Workouts for Each Day:
                </p>
                <p>
                Customization is key when it comes to achieving fitness milestones. Workout Buddy empowers users to craft personalized workout routines effortlessly. With an intuitive interface, users can create daily workout plans by selecting exercises from the vast library. You can mix and match exercises, set repetitions, adjust sets, and allocate time for each routine. Additionally, the platform offers the flexibility to create diverse workout schedules tailored to individual fitness levels, whether you're a beginner looking to establish a routine or an experienced fitness enthusiast aiming for a more challenging regimen.
                </p>
                <WorkoutsRedirectButton title='Check it out!' path="" />
                <p className="subtitle">
                    3. Storing and Viewing Each Workout:
                </p>
                <p>
                    Keeping track of your progress is crucial for staying motivated and accountable. Workout Buddy streamlines this process by enabling users to store and view each created workout. The platform organizes and archives your workout plans, allowing you to revisit and execute them conveniently. Users can track their performance, monitor consistency, and view their past workouts for insights into progress and areas for improvement. With an accessible history of workouts, users can analyze trends, adapt their routines, and maintain a clear record of their fitness journey, fostering continuous improvement and goal attainment.
                </p>
                <WorkoutsRedirectButton title='Check it out!' path="" />
                <p>
                Workout Buddy acts as your all-in-one fitness companion, streamlining the process of finding, planning, and tracking your workout routines, ensuring an optimal and tailored fitness experience.
                </p>
            </div>

            <div className="fitness_parallax">

            </div>
            <div className="homepage_text">
                <p>
                    <span>Workout Buddy</span> also has features for calculating different values about your body or your activities and your progress progress over time
                </p>
            </div>

            <div className="homepage_card_wrapper">
                <HomeCard title="Fitness Calculator" text="Your tool to calculate many body metrics as BMI, body fat, calories requirement and many others" 
                    icon={<BsCalculator className="card_icon" />}/>
                <HomeCard title="Fitness Tracker" text="Track your daily progress, body changes, activities to know how you are doing and later check the summary of your journey" 
                    icon={<MdSummarize className="card_icon" />}/>
                <HomeCard title="Summary" text="Various charts that summarize your tracked progress so you can see that you are close to your goals" 
                    icon={<FaChartBar className="card_icon" />}/>
            </div>

            <div className="homepage_text">
                <p className="subtitle">
                    1. Fitness Calculator 
                </p>
                <p>
                    Understanding your body's metrics is a fundamental step toward a healthier lifestyle. Workout Buddy provides users with a suite of fitness calculators designed to assess and monitor essential health indicators. From calculating Body Mass Index (BMI) to estimating body fat percentage, users gain insights into their overall health status. These calculators serve as valuable tools, enabling individuals to gauge their progress, set realistic goals, and make informed decisions regarding their fitness and well-being. By offering a comprehensive analysis of various health measurements, Workout Buddy equips users with the necessary information to embark on a more effective and targeted fitness journey.
                </p>
                <WorkoutsRedirectButton title='Check it out!' path="" />
                <p className="subtitle">
                    2. Fitness Tracker
                </p>
                <p>
                Consistency and accountability are paramount on any fitness quest. Workout Buddy acts as a daily tracker, allowing users to log and monitor their progress systematically. Users can record a variety of metrics daily, such as weight, calorie intake, water consumption, exercise duration, and other fitness-related activities. With a user-friendly interface, the platform simplifies the process of maintaining a log of daily accomplishments. The tracking system empowers users to track their goals, observe trends, and make data-driven adjustments to their fitness regimen. By consolidating data on a day-to-day basis, Workout Buddy enables users to chart their evolution, identify patterns, and stay motivated on their fitness journey.
                </p>
                <WorkoutsRedirectButton title='Check it out!' path="" />
                <p className="subtitle">
                    3. Summary and Stats
                </p>
                <p>
                    While you do a good job workout out and keeping a track of your daily macros and body changes you need a way to see how far you've come. So to be proud of what you did we give you the possibility to see various stats over time with the help of charts and tables. You will know your high and lows to learn from the past so the future you will be close to your ideal vision.
                </p>
                <WorkoutsRedirectButton title='Check it out!' path="" />
                <p>
                Workout Buddy serves as an invaluable tool, offering not only fitness calculators for critical health measurements but also a user-friendly tracking system for continuous progress monitoring. It equips individuals with the necessary insights and tools to make informed decisions, establish habits, and maintain consistent progress toward their fitness objectives.
                </p>
            </div>

            <Contact />

            <ThemeSwitcher />

            <ClearStorageBtn />
        </>
    )
}

export default HomePage;