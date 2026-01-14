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
    const start = new Date(startDate);
    const end = new Date(endDate);

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
    const date = new Date(inputDate);
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

