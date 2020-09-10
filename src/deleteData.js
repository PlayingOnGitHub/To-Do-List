import {pubSub} from "./pubSub.js";
import * as getData from "./getData.js";

function data() {
    let projectOrToDoData = this;
    let title = projectOrToDoData.title;
    if ( localStorage.getItem(title) ) {
         localStorage.removeItem(title);
         pubSub.publish("delete", projectOrToDoData );
    }
    else {
        pubSub.publish("delete-failed", projectOrToDoData );
        console.log("nothing to delete");
    }
};

export {
    data
};