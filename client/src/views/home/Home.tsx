import Button from "../../components/ui/buttons/Button";
import Gym from "../../assets/gym.png";
import { useNavigate } from "react-router";
import Card from "../../components/ui/cards/Card";
import { BsJournalBookmark } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { SlCalculator } from "react-icons/sl";
import { FaDumbbell } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 sm:gap-14">
      <div className="relative w-full h-[200px] sm:h-[850px]">
        <img
          src={Gym}
          alt="gym"
          className="rounded-sm w-full h-full object-cover"
          loading="lazy"
        />

        <div className="absolute rounded-xs inset-y-0 left-0 w-3/4 bg-gradient-to-r from-white/90 via-white/70 to-transparent "></div>

        <div className="absolute hidden sm:flex flex-col gap-4 left-8 top-1/2 -translate-y-1/2 z-2 max-w-md">
          <div>
            <p className="text-[56px] font-bold">Transfor Your</p>
            <p className="text-[56px] font-bold text-main-blue">
              Fitness Journey
            </p>
          </div>
          <p className="text-lg">
            Discover thousands of exercises, track your progress, and achieve
            your fitness goals with our comprehensive workout platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="medium"
              color="primary"
              handleClick={() => navigate("/workouts")}
            >
              Start Training
            </Button>

            <Button
              size="medium"
              color="secondary"
              handleClick={() => navigate("/calculators")}
            >
              Find body values
            </Button>
          </div>
        </div>
      </div>
      <div className=" flex sm:hidden flex-col gap-4">
        <div>
          <p className="text-3xl">Transfor Your</p>
          <p className="text-3xl text-main-blue">Fitness Journey</p>
        </div>
        <p>
          Discover thousands of exercises, track your progress, and achieve your
          fitness goals with our comprehensive workout platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            size="medium"
            color="primary"
            handleClick={() => navigate("/exercises")}
          >
            Start Training
          </Button>

          <Button
            size="medium"
            color="secondary"
            handleClick={() => navigate("/calculators")}
          >
            Find body values
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 mt-8 sm:mt-0">
        <p className="font-extrabold text-xl sm:text-3xl">
          Everything You Need to Succeed
        </p>
        <p className="text-base sm:text-xl">
          Comprehensive tools for your fitness journey
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-evenly gap-8">
        <Card
          styles="w-sm cursor-pointer"
          handleClick={() => navigate("/exercises")}
        >
          <div className="rounded-full flex items-center justify-center h-16 w-16  bg-[var(--secondary-blue)]">
            <BsJournalBookmark color="var(--main-blue)" size={24} />
          </div>
          <p className="font-bold text-lg text-center">Exercise Library</p>
          <p className="text-center">
            Access thousands of exercises with detailed instructions and video
            demonstrations
          </p>
        </Card>
        <Card
          styles="w-sm cursor-pointer"
          handleClick={() => navigate("/tracker")}
        >
          <div className="rounded-full flex items-center justify-center h-16 w-16  bg-[var(--secondary-green)]">
            <CiCalendar color="var(--main-green)" size={30} />
          </div>
          <p className="font-bold text-lg text-center">Progress Tracking</p>
          <p className="text-center">
            Monitor your workouts, track weights and visualize your progress
            over time
          </p>
        </Card>
        <Card
          styles="w-sm cursor-pointer"
          handleClick={() => navigate("/calculators")}
        >
          <div className="rounded-full flex items-center justify-center h-16 w-16  bg-[var(--secondary-purple)]">
            <SlCalculator color="var(--main-purple)" size={24} />
          </div>
          <p className="font-bold text-lg text-center">Fitness Calculators</p>
          <p className="text-center">
            Calculate BMI, TDEE, body fat percentage and other important metrics
          </p>
        </Card>
      </div>

      <div className="w-full bg-[#1F2937] rounded-md py-8 px-6">
        <div className="flex flex-col sm:flex-row justify-evenly gap-6">
          <div>
            <div className="flex flex-row gap-2 items-center mb-2">
              <FaDumbbell size={26} color="var(--main-blue)" />{" "}
              <span className="font-bold text-white text-lg">
                Workout Buddy
              </span>
            </div>
            <p className="text-utility">Your ultimate fitness companion</p>
          </div>

          <div className="flex flex-col">
            <p className="text-lg text-white mb-2">Features</p>
            <a
              href="/exercises"
              className="text-utility hover:text-white cursor-pointer"
            >
              Exercise Library
            </a>
            <a
              href="/tracker"
              className="text-utility hover:text-white cursor-pointer"
            >
              Progress Tracking
            </a>
            <a
              href="/calculators"
              className="text-utility hover:text-white cursor-pointer"
            >
              Calculators
            </a>
          </div>

          <div>
            <p className="text-lg text-white mb-2">Connect</p>
            <div className="flex flex-row gap-2 mb-2">
              <a href="https://github.com/baltatescuvalentin">
                <FaGithub size={20} color="white" />
              </a>
              <a href="mailto:baltatescuv@mail.com">
                <IoMdMail size={24} color="white" />
              </a>
            </div>
            <a
              href="mailto:baltatescuv@mail.com"
              className="text-utility hover:text-white hover:cursor-pointer"
            >
              Support
            </a>
          </div>
        </div>
        <hr className="w-full mt-6 border-white" />
        <p className="text-utility text-center mt-4">
          © {new Date().getFullYear()} Workout Buddy
        </p>
      </div>
    </div>
  );
}

export default Home;
