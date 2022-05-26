
let solVersion = 'a2.0.1';


// State
let component = []

// Generics
let gen = (input) => {
    let el = document.createElement(input);
    return el;
};
let pullID = (target) => {
    let tar = document.getElementById(target)
    return tar;
};
let pullCN = (target) => {
    let tar = document.getElementsByClassName(target);
    return tar;
};
let val = (id, inpval) => {
    if (inpval != undefined && inpval != '') {
        pullID(id).value = inpval;
    } else {
        return pullID(id).value;
    }
}
let body = pullID('root');
let components = pullID('components');
let pages = pullID('pages');
let scripts = pullID('scripts');
//Grabs the root for future use

let add = (type, func, source) => {
    if(type == 'script'){
        $script(scripts,router(func), '', '', source);
    } else if (type = 'component'){
        $script(components,'', '', '', source);
    } else {
        console.log('add error: Type is improperly configured.');
    }
}

let comment = (t, com) => {
    let comment = com;
    pullID(t).appendChild(comment); 
}

//Simple enough generic element generator to make generic addins universal
let $g = (target, type, argument, identity, identity2, alt, s1, s2, s3) => {
    console.log(identity.startsWith('#'));

    let newEl = gen(type);
    if (type === "form") {
        if (s1 !== undefined) {
            newEl.action = s1;
        };
        if (s2 !== undefined) {
            newEl.method = s2;
        };
        if (s3 !== undefined) {
            newEl.method = s3;
        };
    };
    if (type === "input") {
        if (s1 !== undefined) {
            newEl.type = s1;
        };
        if (s2 !== undefined) {
            newEl.name = s2;
        };
        if (s3 == 'true') {
            newEl.disabled = true;
        };
    };
    if (type === "script") {
        newEl.src = alt;
    };
    if (type === "img") {
        newEl.src = argument;
    };
    if (type === "a") {
        newEl.href = alt;
        newEl.textContent = argument;
    };
    if (type === "p" || "h1" || "h2" || "h3" || "h4" || "h5") {
        newEl.textContent = argument;
    };
    if (type === "button") {
        newEl.onclick = alt;
    };
   
    if(identity != undefined || identity != ''){
        if(identity.toString().startsWith('.')){
            newEl.className = identity.substring(1);
        } if(identity.toString().startsWith('#')){
            newEl.id = identity.substring(1);
        }
    } else {
        
    }
    
    
    if (identity2 != undefined || identity2 != '') {
        if(identity2.startsWith('.')){
            newEl.className = identity2.toString().substring(1);
        } if(identity2.startsWith('#')){
            newEl.id = identity2.toString().substring(1);
        }
    } else {
        
    }

    if (alt && type === "img") {
        newEl.alt = alt;
    };
    target.appendChild(newEl);
}


// $g calls the function, target sets where the new element will live, type sets what it is, value is the
// Source for images, text for text elements, id and class are obvious, alt is only used for images and links.
// $g(target, typeOf, value, id, class, alt)
// alt in links is instead the link target than an alt text.


//Generic DOM node generators
// let $img = (target, src, alt, cname, id) => {
//     $g(target, "img", src, id, cname, alt);
// };


let $img = (t, src, identity, alt, identity2) => {
    $g(t, "img", src, identity, identity2, alt);
}

let $p = (t, c, identity, identity2) => {
    $g(t, "p", c, identity, identity2);
};

let $h = (n, t, c, identity, identity2) => {
    $g(t, "h" + n, c, identity, identity2);
};

let $d = (t, identity, identity2) => {
    $g(t, "div", "", identity, identity2);
};

let $hr = (t, identity, identity2) => {
    $g(t, "hr", "", identity, identity2);
};

let $nav = (t, identity, identity2) => {
    $g(t, "nav", "", identity, identity2);
};

let $na = (t, c, ln, identity, identity2) => {
    $g(t, "a", c, identity,identity2,ln);
};
// NOTE: A and NA are functionally identical but kept for readability.
let $a = (t, c, ln, identity, identity2) => {
    $g(t, "a", c, identity, identity2, ln);
};

let $sel = (t, identity, identity2) => {
    $g(t, "select", "", identity, identity2);
}

let $opt = (t, c, identity, identity2) => {
    $g(t, "option", c, identity, identity2);
}

let $l = (type, t, c, identity, identity2) => {
    if (type === "ul" || type === "ol") {
        $g(t, type, c, identity, identity2);
    } else {
        $h(1, body, "$l error: Type is improperly configured.");
    }
}

let $li = (t, c, identity, identity2) => {
    $g(t, "li", c, identity, identity2);
}

let $script = (t, c, identity, identity2, src) => {
    $g(t, "script", c, identity, identity2, src);
} // src and content are technically optional, however not using one is... perhaps a tad pointless.

let $form = (t, identity, identity2, action, method, name) => {
    $g(t, "form", "", identity, identity2, "", action, method, name);
}

let $input = (t, c, identity, identity2, type, name, label, isEnabled) => {
    $p(t, label, identity + 'label', identity2 + 'label');
    $g(t, "input", c, identity, identity2, "", type, name, isEnabled);
}

let $b = (t, c, oc, identity, identity2) => {
    $g(t, "button", c, identity, identity2, oc);
};

let $area = (t, c, identity, identity2, label) => {
    $p(t, label, identity + 'label', identity2 + 'label');
    $g(t, "textarea", c, identity, identity2, "");
}

let $abbr = (t, c, identity, identity2) => {
    $g(t, "abbr", c, identity, identity2);
}

let $acr = (t, c, identity, identity2) => {
    $g(t, "acronym", c, identity, identity2);
}

let $adr = (t, c, identity, identity2) => {
    $g(t, "address", c, identity, identity2);
}

let $article = (t, c, identity, identity2) => {
    $g(t, "article", c, identity, identity2);
}



//Generic bulk generators
let $header = () => {
    $d(body, "", "header");
    $d(pullID('header'), "", "logoHold");
    $d(pullID('header'), "", "navHold");
    $nav(pullID('navHold'), "", "headNav");
};

let $foot = (content, nav, pos) => {
    function navDiv() {
        return $d(pullID('footer'), "", "footNavContainer"), $nav(pullID('footNavContainer', "", "footNav"));
    };
    function noticeDiv() {
        return $d(pullID('footer'), "", "noticeDiv"), $p(pullID('noticeDiv'), content, "", "footerNotice");
    };
    $d(body, "", "footer");
    if (nav === true) {
        if (pos === "l") {
            navDiv();
            noticeDiv();
        } else if (pos === "r") {
            noticeDiv();
            navDiv();
        } else { $h(1, body, "Footer improperly configured, see console"); console.log('Err: Position parameter not set') }
    } else {
        $p(pullID('footer'), content, "", "footerNotice");
    }
}
// Foot generation cheatsheet: IDs[footNavContainer, footNav, footerNotice]

let routeTick = window.setInterval(routeCheck, 100);
var currentPage = '#home()';
var prevPage = '';

//Takes the input data (a function name in string form), clears the page, runs the render function, then changes window location var
function router(inp) {
    // A little hacky. Checks if header exists, if it does it will render, otherwise it moves on.
    try {
        if(typeof header() != undefined){
            header();
        }
    } catch {

    }
    nhash = window.location.hash;
    prevPage = nhash.substring(1);
    if (inp != undefined) {
        clear();
        eval(inp);
        winLoc(inp);
        currentPage = inp;
    } else {

    }
    // Same as header
    try {
        if(typeof footer() != undefined){
            footer();
        }
    } catch {}

}

async function routeCheck() {
    // If win loc != current page, router current page
    if (window.location.hash.substring(1) != currentPage) {
        currentPage = window.location.hash.substring(1);
        router(currentPage);
    }
}


function clear() {
    if (pullID('content') != undefined) {
        pullID('content').remove()
        if (pullID('auxCounter') != undefined) {
            pullID('auxCounter').remove(); //Fixes a weird bug
        }
    }
}

function page() {
    $d(body, '', 'content');
    let con = pullID('content');
    return con;
}

function winLoc(inp) {
    window.location.hash = inp;
}

// First Load
let firstLoad = () => {
    $d(body, '', 'components');
    $d(body, '', 'pages');
    $d(body, '', 'scripts');
}; firstLoad();
