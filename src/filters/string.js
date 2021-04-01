export default {
    renderHTML(str){
        return str.replace("\n", "<br />");
    },
    returnLimitWords(str, begin, end) {
        if (str == null) {
            return "";
        }
        return str.substr(begin, end) + (str.length > end ? '...' : '');
    }
}