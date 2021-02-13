export default {
    convert (unit, to, precision) {
        return Math.round(unit * to).toPrecision(precision);
    }
}