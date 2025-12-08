export const calculateRiskLevel = (score) => {
    if (score >= 70) return "High";
    if (score >= 40) return "Medium";
    return "Low";
};

export const toNumber = (value) => {
    if (value === null || value === undefined) return 0;
    const n = Number(value);
    return Number.isNaN(n) ? 0 : n;
};

export const average = (arr) => {
    if (!arr || arr.length === 0) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
};
