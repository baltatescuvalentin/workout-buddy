

export const filterExercises = (input, exercises) => {
    const inputLower = input.toLowerCase();
      
    // Check if input is empty
    if (input === "") {
        return [];
    } else {
        // Use the filter method to create a new array with elements that satisfy the condition
        const filteredExercises = exercises.filter((exercise) => {
            const lowercaseName = exercise.name.toLowerCase();
            const lowercaseTarget = exercise.target.toLowerCase();
            const lowercaseBodyPart = exercise.bodyPart.toLowerCase();
            const lowercaseEquipment = exercise.equipment.toLowerCase();

            // Check if any property contains the input
            return (
                lowercaseName.includes(inputLower) ||
                lowercaseTarget.includes(inputLower) ||
                lowercaseBodyPart.includes(inputLower) ||
                lowercaseEquipment.includes(inputLower)
            );
        });

        return filteredExercises;
    }
}