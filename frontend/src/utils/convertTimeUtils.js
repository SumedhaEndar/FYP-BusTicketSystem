export function convertToTime(seconds){
    if (seconds === null) return '';
    const hours = Math.floor(seconds / (60 * 60));
    const minutes = (seconds % (60 * 60))/(60*60);
    if(minutes === 0.5){
        return `${hours.toString().padStart(2, '0')}:${"30"}`;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};