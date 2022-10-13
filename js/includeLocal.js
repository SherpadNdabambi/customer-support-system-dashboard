function includeLocalCSS(filename) {
    $("head").append(`<link href="css/vendor/${filename}" rel="stylesheet">`);
}

function includeLocalJS(filename) {
    document.write(`<script type="text/javascript" src="js/vendor/${filename}"><\/script>`);
}