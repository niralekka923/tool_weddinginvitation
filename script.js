const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let hearts = [];

// स्क्रीन साइज के हिसाब से कैनवस को सेटकरना

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Heart {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 15 + 5;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = `rgba(255, ${Math.random() * 100}, ${Math.random() * 130 + 120}, ${this.opacity})`;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // दिल की शेप बनाने के लिए मैथ
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(this.x, this.y + topCurveHeight);
        ctx.bezierCurveTo(this.x, this.y, this.x - this.size / 2, this.y, this.x - this.size / 2, this.y + topCurveHeight);
        ctx.bezierCurveTo(this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, this.x, this.y + (this.size + topCurveHeight) / 2, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x, this.y + (this.size + topCurveHeight) / 2, this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, this.x + this.size / 2, this.y + topCurveHeight);
        ctx.bezierCurveTo(this.x + this.size / 2, this.y, this.x, this.y, this.x, this.y + topCurveHeight);
        ctx.fill();
    }

    update() {
        this.y -= this.speedY;
        if (this.y + this.size < 0) {
            this.reset();
        }
    }
}

// 50 दिल बनाना
function init() {
    for (let i = 0; i < 50; i++) {
        hearts.push(new Heart());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => {
        heart.update();
        heart.draw();
    });
    requestAnimationFrame(animate);
}

init();
animate();




















// music toggle


const musicToggle = document.getElementById('musicToggle');
const audio = document.getElementById('bgMusic');
const statusText = document.getElementById('musicStatus');

musicToggle.addEventListener('change', function() {
    if (this.checked) {
        // म्यूजिक चालू करें
        audio.play().catch(error => {
            console.log("Autoplay block हो सकता है, यूजर इंटरैक्शन जरूरी है।");
        });
        audio.muted = false;
        statusText.innerText = "Playing";
        statusText.style.color = "#ff4d6d";
    } else {
        // म्यूजिक बंद/म्यूट करें
        audio.pause();
        // अगर आप सिर्फ म्यूट करना चाहते हैं तो pause() की जगह audio.muted = true; लिखें
        statusText.innerText = "Muted";
        statusText.style.color = "white";
    }
});










const questions = [{
    q: "Happy Valentine's Day Anusha kya mai 2-4 questions puchh sakta hu ?", opt: ["Hn, puchh sakte ho", "nhi"], res: ["nhi bolne par bhi puchhta", "fir bhi mai to puchhunga hi 🙃"]
},
    {
        q: "tumhare pairo me dard hota bhi hai ya nahi ?", opt: ["Kyo ?", "Hn hota hai"], res: ["sara din mere khayalon me ghumte jo rahti ho", "hona bhi chahiye, sara din mere khayalon me ghumti rahti jo ho"]
    },
    {
        q: "tumhare pass ghar hai ya nhi ?", opt: ["Kyo ?", "Hn hai"], res: ["sara din mere dil me jo rahti ho", "hona bhi chahiye mere dil ko bhi to araam do"]
    },
    {
        q: "vaise tumhara favourite festival konsa hai ?", opt: ["Diwali", "Holi"], res: ["hona bhi chahiye pathake se kam thodi ho", "hona bhi chahiye sara rang tumhare aage fika jo hai"]
    },
    {
        q: "or tumhara favourite mausam ?", opt: ["Garmi", "Barish"], res: ["hona bhi chahiye, itni hot jo ho tum thand to tumhe lagti hi nhi hogi 😚", "hona bhi chahiye tumhari ek smile se pura mausam jo badal jata hai 🤗"]
    },
    {
        q: "sabse jyaada meetha kya hota hai दोनों में ?", opt: ["Gulaab Jamun", "Chocolate"], res: ["galat jawab 😏 tumse meetha to koi chiz hi nahi", "galat jawab 😏 tumse meetha to koi chiz hi nahi"]
    },
    {
        q: "asmaan me sabse chamakdar chiz kya hai bta sakti ho ?", opt: ["Chaand", "Taare"], res: ["achha, mujhe to lagta tha tumhari ankhe hai", "achha, mujhe to lagta tha tumhari ankhe hai"]
    },
    {
        q: "kya maine tumhaari tarif ki hai kabhi btao to", opt: ["Yes", "No"], res: ["fir bhi tumhe kabhi yaad nhi rahta chalo mujhe kiss do WhatsApp pe", "to ab kar deta hu NEXT karo jaldi"]
    },
    {
        q: "kya tumara chaat masala ka business hai ?", opt: ["Yes", "No"], res: ["isliye tumhare sath rahna mujhe achha lagta hai 🤗", "kyoki tumhaare bina meri life fiki si hai 🫠"]
    },
    {
        q: "to kya tumhara mithai ka dukaan hai ?", opt: ["No", "Yes"], res: ["to fir tum itni sweet kaise", "isliye tum इतनी sweet ho 🤤"]
    },
    {
        q: "tumhara favourite chiz", opt: ["Chocolate Ice-cream", "Orange Icecream"], res: ["joothi, chalo ab next karo", "mujhe pta tha 🤗"]
    }];

let currentIdx = 0;
let selectedOption = null;

function loadQuiz() {
    const data = questions[currentIdx];
    document.getElementById('questionText').innerText = data.q;
    document.getElementById('optA').innerText = data.opt[0];
    document.getElementById('optB').innerText = data.opt[1];

    // UI Reset
    selectedOption = null;
    document.getElementById('responseDisplay').innerText = "सही विकल्प चुनकर सबमिट करें...";
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('nextBtn').disabled = true;

    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => {
        b.classList.remove('selected');
        b.disabled = false;
    });
}

function selectOption(idx) {
    selectedOption = idx;
    const btns = document.querySelectorAll('.option-btn');
    btns[0].classList.toggle('selected',
        idx === 0);
    btns[1].classList.toggle('selected',
        idx === 1);
    document.getElementById('submitBtn').disabled = false;
}

function submitAnswer() {
    const data = questions[currentIdx];
    // Show Response
    document.getElementById('responseDisplay').innerText = data.res[selectedOption];

    // UI Lock
    document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
    if (currentIdx < questions.length - 1) {
        currentIdx++;
        loadQuiz();
    } else {
        // Show Final Screen
        document.getElementById('mainQuizUI').style.display = 'none';
        document.getElementById('finalMsg').style.display = 'block';
    }
}

// Start
loadQuiz();