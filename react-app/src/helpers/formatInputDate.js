import formatNumber from "./formatNumber";

export default function formatInputDate(d) {
    let totalStr = "";
    totalStr += d.getFullYear() + "-"
    totalStr += formatNumber(d.getMonth() + 1) + "-"
    totalStr += formatNumber(d.getDate()) + "T"
    totalStr += formatNumber(d.getHours()) + ":"
    totalStr += formatNumber(d.getMinutes())
    return totalStr;
}