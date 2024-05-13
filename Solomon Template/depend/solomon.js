
let solVersion = 'a2.1.5';


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
    if (type == 'script') {
        $script(scripts, router(func), '', '', source);
    } else if (type = 'component') {
        $script(components, '', '', '', source);
    } else {
        console.log('add error: Type is improperly configured.');
    }
}

let comment = (t, com) => {
    let comment = com;
    pullID(t).appendChild(comment);
}


let $ = [
    //Simple enough generic element generator to make generic addins universal
    // $.generate calls the function, target sets where the new element will live, type sets what it is, value is the
    // Source for images, text for text elements, id and class are obvious, alt is only used for images and links.
    // $.generate(target, typeOf, value, id, class, alt)
    // alt in links is instead the link target than an alt text.
    generate = (target, type, arg, id, cname, alt, s1, s2, s3) => {
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
            newEl.src = arg;
        };
        if (type === "a") {
            newEl.href = alt;
            newEl.textContent = arg;
        };
        if (type === "p" || "h1" || "h2" || "h3" || "h4" || "h5") {
            newEl.textContent = arg;
        };
        if (type === "button") {
            newEl.onclick = alt;
        };
        if (id) {
            newEl.id = id;
        };
        if (cname) {
            newEl.className = cname
        };
        if (alt && type === "img") {
            newEl.alt = alt;
        };
        target.appendChild(newEl);
    },

    //////////////////////////////////////////////////////////////////////
    //// Generic DOM node generators ////////////////////////////////////
    /////////////////////////////////////////////////////////////////////

    img = (target, src, alt, cname, id) => {
        $.generate(target, "img", src, id, cname, alt);
    },

    p = (t, c, cn, id) => {
        $.generate(t, "p", c, id, cn);
    },

    h = (n, t, c, cn, id) => {
        $.generate(t, "h" + n, c, id, cn);
    },

    d = (t, cn, id) => {
        $.generate(t, "div", "", id, cn);
    },

    hr = (t, cn, id) => {
        $.generate(t, "hr", "", id, cn);
    },

    nav = (t, cn, id) => {
        $.generate(t, "nav", "", id, cn);
    },

    na = (t, c, ln, cn, id) => {
        $.generate(t, "a", c, id, cn, ln);
    },
    // NOTE: A and NA are functionally identical but kept for readability.
    a = (t, c, ln, cn, id) => {
        $.generate(t, "a", c, id, cn, ln);
    },

    sel = (t, cn, id) => {
        $.generate(t, "select", "", id, cn);
    },

    opt = (t, c, cn, id) => {
        $.generate(t, "option", c, id, cn);
    },

    l = (type, t, c, cn, id) => {
        if (type === "ul" || type === "ol") {
            $.generate(t, type, c, id, cn);
        } else {
            $h(1, body, "$l error: Type is improperly configured.");
        }
    },

    li = (t, c, cn, id) => {
        $.generate(t, "li", c, id, cn);
    },

    script = (t, c, cn, id, src) => {
        $.generate(t, "script", c, id, cn, src);
    }, // src and content are technically optional, however not using one is... perhaps a tad pointless.

    form = (t, cn, id, action, method, name) => {
        $.generate(t, "form", "", id, cn, "", action, method, name);
    },

    input = (t, c, cn, id, type, name, label, isEnabled) => {
        $p(t, label, cn + 'label', id + 'label');
        $.generate(t, "input", c, id, cn, "", type, name, isEnabled);
    },

    b = (t, c, oc, cn, id) => {
        $.generate(t, "button", c, id, cn, oc);
    },

    area = (t, c, cn, id, label) => {
        $p(t, label, cn + 'label', id + 'label');
        $.generate(t, "textarea", c, id, cn, "");
    },

    abbr = (t, c, cn, id) => {
        $.generate(t, "abbr", c, id, cn);
    },

    acr = (t, c, cn, id) => {
        $.generate(t, "acronym", c, id, cn);
    },

    adr = (t, c, cn, id) => {
        $.generate(t, "address", c, id, cn);
    },

    article = (t, c, cn, id) => {
        $.generate(t, "article", c, id, cn);
    },

    
    ////////////////////////////////////////////////////////////////////////////////////
    //// Elements that hgandle ledger/registry functions //////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    register = [ 
        components = (arr) => {
            for (let i = 0; i < arr.length; i++) {
                let comp = arr[i];
                $script(pullID('components'), '', '', '', './app/component/' + comp + '.js');
            }
        },

        pages = (arr) => {
            for (let i = 0; i < arr.length; i++) {
                let page = arr[i];
                $script(pullID('pages'), '', '', '', './app/page/' + page + '.js');
            }
        },

        scripts = (arr) => {
            for (let i = 0; i < arr.length; i++) {
                let script = arr[i];
                $script(pullID('scripts'), '', '', '', './app/' + script + '.js');
            }
        }
    ],

    //////////////////////////////////////////////////////////////////////////////////
    //// Elements that handle generation of generic components //////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    component = [
        header = () => {
            $d(body, "", "header");
            $d(pullID('header'), "", "logoHold");
            $d(pullID('header'), "", "navHold");
            $nav(pullID('navHold'), "", "headNav");
        },

        foot = (content, nav, pos) => {
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
    ]

]




// Complex functionality that is a bit outdated but yet to be formally removed
let $universe = () => {

    for (let i = 0; i < comp.length; i++) {
        obj = comp[i];
        loc = pullID('components');
        $script(loc, '', '', '', ('./app/' + obj + '.js'));
    }
    for (let i = 0; i < $Page.length; i++) {
        obj = $Page[i];
        loc = pullID('pages');
        $script(loc, 'router("' + obj + '()")', '', obj + '$pageDef', './app/pages/' + obj + '.js');

    }
}





//////////////////////////////////////////////////////////////////////////////////////
////ROUTING ENGINE AND INITIALIZING//////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


let routeTick = window.setInterval(routeCheck, 100);
var currentPage = '#home()';
var prevPage = '';

//Takes the input data (a function name in string form), clears the page, runs the render function, then changes window location var
function router(inp) {
    console.log(pullID('header'))
    try {
        header();
    } catch (error) {

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
        footer();

    } catch (error) {

    }

}

async function routeCheck() {
    // If win loc != current page, router current page
    if (window.location.hash == '') {
        router('home()')
    }
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
    if (pullID('contentWrapper') == null) {
        $d(body, '', 'contentWrapper');
    }
    $d(pullID('contentWrapper'), '', 'content');
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
