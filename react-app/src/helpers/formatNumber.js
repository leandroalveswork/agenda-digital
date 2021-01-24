export default function formatNumber(x, times = 2, chr = "0") {
    let y = x + "";
    while (y.length < times) {
        y = chr + y;
    }
    return y;
}