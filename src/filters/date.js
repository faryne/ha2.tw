let df = require("dateformat");
export default {
    returnLocalDate($str){
        let newStr = $str.replace(" ", "T") + "Z";
        return df(new Date(newStr), 'yyyy-mm-dd HH:MM:ss') + " " + Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
}