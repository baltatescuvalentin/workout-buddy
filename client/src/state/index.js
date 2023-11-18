import { createSlice, current } from '@reduxjs/toolkit';

const initialSlice = {
    mode: "light",
    user: null,
    token: null,
    exercices: [],
    mNavbar: false,
};

/*const lowercaseString = (input) => {
    return input.toLowerCase();
};

const condition = (input) => (exercise) => {

    

    if(input === "") {
        return false;
    }
    return lowercaseString(exercise.name).includes(input) || lowercaseString(exercise.target).includes(input) || 
    lowercaseString(exercise.bodyPart).includes(input) || lowercaseString(exercise.equipment).includes(input);
}*/

export const clientSlice = createSlice({
    name: "client",
    initialState: initialSlice,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setExercices: (state, action) => {
            state.exercices = [...action.payload.exercices];
        },
        setMNavbar: (state, action) => {
            state.mNavbar = action.payload.mNavbar;
        },
        /*getExercises: (state, action) => {
            const input = action.payload.input.toLowerCase();
      
            // Check if input is empty
            if (input === "") {
                return [];
            } else {
                // Use the filter method to create a new array with elements that satisfy the condition
                state.filteredExercises = state.exercices.filter((exercise) => {
                    const lowercaseName = exercise.name.toLowerCase();
                    const lowercaseTarget = exercise.target.toLowerCase();
                    const lowercaseBodyPart = exercise.bodyPart.toLowerCase();
                    const lowercaseEquipment = exercise.equipment.toLowerCase();

                    // Check if any property contains the input
                    return (
                        lowercaseName.includes(input) ||
                        lowercaseTarget.includes(input) ||
                        lowercaseBodyPart.includes(input) ||
                        lowercaseEquipment.includes(input)
                    );
                });
            }
            
            for(let i = 0; i < exercises.length; i++) {
                if(lowercaseString(exercises[i].name).includes(input)) {
                    results.push(exercises[i]);
                }
                if(lowercaseString(exercises[i].bodyPart).includes(input)) {
                    results.push(exercises[i]);
                }
                if(lowercaseString(exercises[i].target).includes(input)) {
                    results.push(exercises[i]);
                }
                if(lowercaseString(exercises[i].equipment).includes(input)) {
                    results.push(exercises[i]);
                }
            }
            return results;
        }*/
    }
});

export const { setMode, setLogin, setLogout, setExercices, setMNavbar, getExercises } = clientSlice.actions;
export default clientSlice.reducer;