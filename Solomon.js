// V0.0.5 pre-a
// SOLOMON.JS was created for internal use with the goal of a lightweight personal library.
let gen = (input) => {
    let el = document.createElement(input);
    return el;
}
let pullID = (target) => {
    let tar = document.getElementById(target)
    return tar;
}
let pullCN = (target) => {
    let tar = document.getElementsByClassName(target);
    return tar;
}
let body = pullID('root');
//Grabs the root for future use

//Simple enough generic element generator to make generic addins universal
let $g = (target, type, arg, id, cname, alt) => {
    let newEl = gen(type);
    if (type === "img") {
        newEl.src = arg;
    }
    if (type === "a") {
        newEl.href = alt;
        newEl.textContent = arg;
    }
    if (type === "p" || "h1" || "h2" || "h3" || "h4" || "h5") {
        newEl.textContent = arg;
    }
    if (id) {
        newEl.id = id;
    }
    if (cname) {
        newEl.className = cname
    }
    if (alt && type === "img") {
        newEl.alt = alt;
    }
    target.appendChild(newEl);
}
// $g calls the function, target sets where the new element will live, type sets what it is, value is the
// Source for images, text for text elements, id and class are obvious, alt is only used for images and links.
// $g(target, typeOf, value, id, class, alt)
// alt in links is instead the link target than an alt text.

let $img = (target,src,alt,cname,id) => {
    $g(target,"img",src,id,cname, alt);
}

let $p = (t,c,cn,id) => {
    $g(t,"p",c,id,cn);
}

let $h = (n,t,c,cn,id) => {
    $g(t, "h"+n, c, id, cn);
}

let $d = (t,cn,id) => {
    $g(t, "div", "", id, cn);
}

let $hr = (t,cn,id) => {
    $g(t, "hr", "", id, cn);
}

let $nav = (t, cn, id) => {
    $g(t, "nav", "", id, cn);
}

let $na = (t,c,ln,cn,id) => {
    $g(t, "a", c, id, cn, ln);
}
 // NOTE: A and NA are functionally identical but kept for readability.
let $a = (t, c, ln, cn, id) => {
    $g(t, "a", c, id, cn, ln);
}

let $header = () => {
    $d(body,"","header");
    $d(pullID('header'), "", "logoHold");
    $d(pullID('header'), "", "navHold");
    $nav(pullID('navHold'), "", "headNav");
}
