let df = require("dateformat");
export default {
    returnLocalDate($str){
        if ($str == 'undefined' || $str == null) {
            return '-';
        }
        let newStr = $str.replace(" ", "T");
        if (newStr.substring(newStr.length - 1) != 'Z') {
            newStr += 'Z';
        }
        let $d = new Date(newStr);

        return df($d, 'yyyy-mm-dd HH:MM:ss') + " " + Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
}