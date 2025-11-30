const FormatDateTime = (dateString) => {
    const date = new Date(dateString);

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    const formattedDate = date.toLocaleString('en-US', options);

    const day = date.getDate();
    const suffix = getDaySuffix(day);

    return formattedDate.replace(`${day}`, `${day}${suffix}`);
};

const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
        return 'th';
    }

    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
};

export default FormatDateTime;