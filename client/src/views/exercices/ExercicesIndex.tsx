import SearchExercise from "../../components/SearchExercise";

function Exercices() {
  return (
    <>
      <div>
        <p className="text-3xl">Exercise Library</p>
        <p className="text-lg">
          Discover thousands of exercises with detailed instructions
        </p>
        <SearchExercise />
      </div>
    </>
  );
}

export default Exercices;
