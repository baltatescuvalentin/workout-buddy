import { clearStorage } from "../utils/functions/localStorage";


const ClearStorageBtn = () => {
    return (
        <button onClick={clearStorage}>
            clear
        </button>
    )
}

export default ClearStorageBtn;