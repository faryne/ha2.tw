let df = require("dateformat");
export default {
    returnUTCDate($str){
        let newStr = $str.replace(" ", "T") + "Z";
        return df(new Date(newStr), 'yyyy-mm-dd HH:MM:ss') + " UTC"
    }
}