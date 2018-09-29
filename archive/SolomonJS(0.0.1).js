// V0.0.1 pre-a
// SOLOMON.JS was created for internal use with the goal of a lightweight personal library.

let body = document.getElementById('root');
//Grabs the root for future use

//Simple enough generic element generator to make generic addins universal
let $g = (target, type, arg, id, cname, alt) => {
    let newEl = document.createElement(type);
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