let current_img = 0;
let imgs = [
    {
        descrtion: "this is img 1",
        url: "img-1.jpg"
    },
    {
        descrtion: "this is img 2",
        url: "img-2.jpg"
    },
    {
        descrtion: "this is img 3",
        url: "img-3.jpg"
    },
    {
        descrtion: "this is img 4",
        url: "img-4.jpg"
    },
    {
        descrtion: "this is img 5",
        url: "img-5.jpg"
    },
];
let tracks = ["da.mp3", "net.mp3", "maybe.mp3"];
let as = document.getElementsByTagName('a');
let context, analyser, src, array, num = 65, parts, fc = 0;
function update() {
    document.getElementsByClassName("selected")[0].setAttribute("class", "preview");
    document.getElementById("big-img").setAttribute("src", "public/img/" + imgs[current_img].url);
    document.getElementById("comment").innerText = imgs[current_img].descrtion;
    document.getElementById("prev-" + (current_img + 1)).setAttribute("class", "preview selected");
    fc = 0;
}
update();
document.getElementById("next").onclick = () => {
    current_img = (current_img + 1) % 5;
    update();
}
document.getElementById("prev").onclick = () => {
    current_img = (current_img + 4) % 5;
    update();
}

let box = document.getElementById("visual");


for (let i = 0; i < num; i++) {
    part = document.createElement('div');
    part.className = 'part';
    part.style.background = "rgb(115, 154, 236)";
    part.style.minWidth = "5px";
    part.style.minHeight = "5px";
    box.appendChild(part);
}

let audio = document.getElementById("audio");


for (let i = 0; i < 3; i++) {
    as[i].onclick = () => {
        audio.src = "./public/audio/" + tracks[i];
        document.getElementsByClassName("playing")[0].removeAttribute("class");
        document.getElementsByTagName("li")[i].setAttribute("class", "playing");
        audio.play();
    };
}


audio.onplay = prepare;

function prepare() {
    if (context)
        return;

    parts = document.getElementsByClassName('part');

    context = new AudioContext();
    analyser = context.createAnalyser();
    src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    loop();
}

function loop() {
    fc++;
    if (fc > 250) {
        current_img = (current_img + 1) % 5
        update();
    }
    window.requestAnimationFrame(loop);
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);

    for (let i = 0; i < num; i++) {
        parts[i].style.minHeight = (array[i] / 5 + 5) + "px";
    }
}