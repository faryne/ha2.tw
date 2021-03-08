let intl = new Intl.NumberFormat(navigator.language)

export default {
    format(str){
        return isNaN(str) ? 0 : intl.format(parseInt(str, 10));
    }
}