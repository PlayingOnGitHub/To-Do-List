function element(type, idOrClass, name, href) {
    let newElement = document.createElement(type);
    (idOrClass == "id") ? newElement.id = name : newElement.className = name;
    if ( href !== false ) {
        if ( type == "img") {
            newElement.src = href;
        }
        if ( type == "a" ) {
            newElement.href = href;
        }
    }
    return newElement;
};

export {
    element
};