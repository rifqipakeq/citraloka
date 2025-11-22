const optionsPriceRanges = [
  {
    label: "All Price",
    value: "all"
  },
  {
    label: "Di bawah Rp100.000",
    value: "0-100000"
  },
  {
    label: "Rp100.000 - Rp1.000.000",
    value: "100000-1000000"
  },
  {
    label: "Di atas Rp1.000.000",
    value: "1000000-999999999"
  }
];
const optionsSorts = [
  {
    label: "Harga Terendah",
    value: "asc"
  },
  {
    label: "Harga Tertinggi",
    value: "desc"
  }
];
const optionSortByDate = [
  {
    label: "Paling Baru",
    value: "newest"
  },
  {
    label: "Paling Lama",
    value: "oldest"
  }
];
const categoryColors = {
  2: "bg-xgreen",
  3: "bg-xorange",
  4: "bg-xgray",
  5: "bg-xpurple",
  6: "bg-xred",
  7: "bg-xdarkgreen"
};
export {
  optionsPriceRanges as a,
  optionsSorts as b,
  categoryColors as c,
  optionSortByDate as o
};
