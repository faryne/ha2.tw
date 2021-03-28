let df = require("dateformat");
export default {
    returnLocalDate($str){
        let newStr = $str.replace(" ", "T");
        if (newStr.substring(newStr.length - 1) != 'Z') {
            newStr += 'Z';
        }

        return df(new Date(newStr), 'yyyy-mm-dd HH:MM:ss') + " " + Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
}