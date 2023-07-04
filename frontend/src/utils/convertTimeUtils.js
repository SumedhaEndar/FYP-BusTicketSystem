export function convertToTime(seconds){
    if (seconds === null) return '';
    const hours = Math.floor(seconds / (60 * 60));
    const minutes = (seconds % (60 * 60))/(60*60);
    if(minutes === 0.5){
        return `${hours.toString().padStart(2, '0')}:${"30"}`;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export function formatDate(inputDateString) {
    const dateObject = new Date(inputDateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');

    const outputDateString = `${year}-${month}-${day}`;

    return outputDateString;
}