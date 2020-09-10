import {pubSub} from "./pubSub.js";

function byTitle(title) {
    if (!localStorage.getItem(title)) return;
    let item = JSON.parse( localStorage.getItem( title ) );
    return item;
};

export {
    byTitle
};