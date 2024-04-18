import "./EditButton.css";

interface Props {
    onButtonClick: () => void;
    editMode: boolean;
}

export const EditButton = ({ onButtonClick, editMode }: Props) => {

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault(); // Prevent default button click behavior
        onButtonClick(); // Toggle edit mode
    }

    const editSymbol = (
        <svg className="edit-svg" xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path d="m16.188 7.542-3.73-3.73 1.021-1.02q.521-.521 1.24-.521t1.239.521l1.25 1.25q.5.5.5 1.239 0 .74-.5 1.24ZM3.375 17.5q-.354 0-.615-.26-.26-.261-.26-.615v-2.5q0-.167.062-.323.063-.156.188-.281l8.479-8.479 3.729 3.729-8.479 8.479q-.125.125-.281.188-.156.062-.323.062Z" fill="blue" />
        </svg>
    );

    const checkCircle = (
        <svg className="check-svg" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m10.6 13.8-2.175-2.175q-.275-.275-.687-.262-.413.012-.688.287-.275.275-.275.7 0 .425.275.7L9.9 15.9q.275.275.7.275.425 0 .7-.275l5.675-5.675q.275-.275.263-.688-.013-.412-.288-.687-.275-.275-.7-.275-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"/></svg>
    );

    return (
        <button className="edit-btn" onClick={handleButtonClick}>
            {editMode ? <>{checkCircle} Save Changes</> : <>{editSymbol} Edit</>}
        </button>
    );
}
