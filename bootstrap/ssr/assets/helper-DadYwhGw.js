import { jsx } from "react/jsx-runtime";
const getStars = (rating, customClass, showEmptyStar = true) => {
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
        /* @__PURE__ */ jsx(
          "i",
          {
            className: `bi bi-star-fill text-gray-500 ${customClass}`
          },
          i
        )
      );
    } else if (i - adjusted === 0.5) {
      stars.push(
        /* @__PURE__ */ jsx(
          "i",
          {
            className: `bi bi-star-half text-gray-500 ${customClass}`
          },
          i
        )
      );
    } else {
      {
        showEmptyStar && stars.push(
          /* @__PURE__ */ jsx(
            "i",
            {
              className: `bi bi-star text-gray-500 ${customClass}`
            },
            i
          )
        );
      }
    }
  }
  return stars;
};
const formatDate = (rawDate) => {
  const dateObj = new Date(rawDate);
  return new Intl.DateTimeFormat("en-GB", {
    // en-GB : Menghasilkan format tanggal DD MMM YYYY.
    day: "2-digit",
    // Format hari: dua digit (01-31)
    month: "short",
    // Format bulan: tiga huruf (Jan, Feb, ...)
    year: "numeric"
    // Format tahun: empat digit (2025)
  }).format(dateObj);
};
const toIDR = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(value);
};
const calculateRating = (review) => {
  const ratingKeys = [
    "rate_checkin",
    "rate_keakuratan",
    "rate_kebersihan",
    "rate_komunikasi",
    "rate_lokasi",
    "rate_nilaiekonomis"
  ];
  const ratings = ratingKeys.map((key) => review[key] || 0);
  const average = ratings.reduce((sum, val) => sum + val, 0) / ratings.length;
  return parseFloat(average.toFixed(1));
};
export {
  calculateRating as c,
  formatDate as f,
  getStars as g,
  toIDR as t
};
