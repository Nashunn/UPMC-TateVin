exports.dateLocale=function( date ){
    var options= {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(date).toLocaleDateString('fr-FR', options);
}
exports.dateLocaleHours=function( date ){
    var options= { year: 'numeric', month: 'numeric', day: 'numeric', hours:'numeric', minutes:'numeric', seconde:'numeric'};
    return new Date(date).toLocaleDateString('fr-FR', options);
}
exports.getParagraphe=function( text ){
    var p=[];
    text=text.split("<div>");
    for(var i=0; i<text.length;i++){
        var text2=text[i].replace("</div>", "").replace("<br>","");
        p.push(text2);
    }
    return p;
}
