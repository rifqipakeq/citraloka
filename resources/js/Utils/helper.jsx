export const getStars = (rating, customClass, showEmptyStar = true) => {
    const stars = [];
    const whole = Math.floor(rating);
    const decimal = rating - whole;

    let adjusted = whole;

    if (decimal >= 0.7) {
        adjusted = whole + 1;
    } else if (decimal >= 0.4) {
        adjusted = whole + 0.5;
    }

    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(adjusted)) {
            stars.push(
                <i
                    key={i}
                    className={`bi bi-star-fill text-gray-500 ${customClass}`}
                />
            );
        } else if (i - adjusted === 0.5) {
            stars.push(
                <i
                    key={i}
                    className={`bi bi-star-half text-gray-500 ${customClass}`}
                />
            );
        } else {
            {
                showEmptyStar &&
                    stars.push(
                        <i
                            key={i}
                            className={`bi bi-star text-gray-500 ${customClass}`}
                        />
                    );
            }
        }
    }

    return stars;
};

export const formatDate = (rawDate) => {
    const dateObj = new Date(rawDate);

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(dateObj);
};
