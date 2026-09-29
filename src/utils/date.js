export function startCountdown(targetDate, setTargetDate) {
    const interval = setInterval(() => {
        const now = new Date();
        const remaining = diffTime(now, targetDate);

        setTargetDate(remaining);

        if (remaining === "00:00:00") {
            clearInterval(interval);
        }
    }, 1000);
    return interval;
}

export function diffTime(startDate, endDate) {
    let start, end;
    
    // Parse start date
    if (typeof startDate === 'string' && startDate.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
        start = new Date(startDate.replace(' ', 'T'));
    } else {
        start = new Date(startDate);
    }
    
    // Parse end date
    if (typeof endDate === 'string' && endDate.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
        end = new Date(endDate.replace(' ', 'T'));
    } else {
        end = new Date(endDate);
    }

    let diffMs = end - start;
    if (diffMs < 0) diffMs = 0;

    const hours = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((diffMs % (1000 * 60)) / 1000)).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

export function timeAgo(date) {
    if (!date) return "";
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const isFuture = diffMs < 0;

    const absDiffMs = Math.abs(diffMs);
    const seconds = Math.floor(absDiffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const suffix = isFuture ? "from now" : "ago";

    if (days > 0) {
        return `${days} day${days > 1 ? "s" : ""} ${suffix}`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""} ${suffix}`;
    } else if (minutes > 0) {
        return `${minutes} min${minutes > 1 ? "s" : ""} ${suffix}`;
    } else {
        return `${seconds} sec${seconds > 1 ? "s" : ""} ${suffix}`;
    }
}

export function hasDatePassed(inputDate) {
    if (!inputDate) return false;
    
    const now = new Date();
    let date;
    
    // Handle different date formats
    if (typeof inputDate === 'string') {
        // Check if it's MySQL datetime format (YYYY-MM-DD HH:MM:SS)
        if (inputDate.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
            // Parse as LOCAL time (replace space with T, but DON'T add Z)
            // This keeps the year correct and treats it as local timezone
            date = new Date(inputDate.replace(' ', 'T'));
        } else {
            // Use default parsing for ISO formats or other formats
            date = new Date(inputDate);
        }
    } else {
        date = new Date(inputDate);
    }
    
    // Validate the date
    if (isNaN(date.getTime())) {
        console.warn('Invalid date:', inputDate);
        return false;
    }
    
    return date < now;
}

export function formatDate(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

