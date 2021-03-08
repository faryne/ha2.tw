export default {
    renderHTML(str){
        return str.replace("\n", "<br />");
    },
    returnLimitWords(str, begin, end){
        return str.substr(begin, end) + (str.length > end ? '...' : '');
    }
}