
const lessons = [
  {
    title: "سلام و احوال‌پرسی",
    items: [
      ["Merhaba", "سلام", "مِرحَبا"],
      ["Günaydın", "صبح بخیر", "گون‌آیدِن"],
      ["İyi akşamlar", "عصر بخیر", "ای‌یی آکشاملار"],
      ["Nasılsın?", "حالت چطوره؟", "ناسیلسین"],
      ["İyiyim", "خوبم", "ای‌یی‌ییم"],
      ["Hoşça kal", "خداحافظ", "هوشچا کال"]
    ]
  },
  {
    title: "معرفی خودت",
    items: [
      ["Benim adım Ali", "اسم من علی است", "بَنیم آدِم علی"],
      ["Ben İranlıyım", "من ایرانی هستم", "بَن ایرانلی‌ییم"],
      ["Memnun oldum", "از آشنایی خوشوقتم", "مَمنون اُلدوم"],
      ["Nerelisin?", "اهل کجایی؟", "نِرِلیسین"],
      ["Türkçe öğreniyorum", "دارم ترکی یاد می‌گیرم", "تورکچه اُغرَنی‌یوروم"]
    ]
  },
  {
    title: "عبارت‌های روزمره",
    items: [
      ["Lütfen", "لطفاً", "لوتفَن"],
      ["Teşekkürler", "متشکرم", "تَشَکّورلَر"],
      ["Evet", "بله", "اِوِت"],
      ["Hayır", "نه", "هایر"],
      ["Tamam", "باشه", "تامام"],
      ["Ne kadar?", "چند؟ / قیمتش چقدر است؟", "نِه کادار"]
    ]
  }
];

const cards = [
  ["Merhaba", "مِرحَبا", "سلام"],
  ["Teşekkürler", "تَشَکّورلَر", "متشکرم"],
  ["Lütfen", "لوتفَن", "لطفاً"],
  ["Evet", "اِوِت", "بله"],
  ["Hayır", "هایر", "نه"],
  ["Günaydın", "گون‌آیدِن", "صبح بخیر"],
  ["Nasılsın?", "ناسیلسین", "حالت چطوره؟"],
  ["Tamam", "تامام", "باشه"],
  ["Güzel", "گوزَل", "زیبا / خوب"],
  ["Hoşça kal", "هوشچا کال", "خداحافظ"]
];

const questions = [
  {
    q: "معنی Merhaba چیست؟",
    options: ["خداحافظ", "سلام", "لطفاً", "شب بخیر"],
    answer: 1,
    explain: "Merhaba یعنی سلام."
  },
  {
    q: "کدام کلمه به معنی متشکرم است؟",
    options: ["Teşekkürler", "Günaydın", "Hayır", "Nasılsın?"],
    answer: 0,
    explain: "Teşekkürler یعنی متشکرم."
  },
  {
    q: "معنی Evet چیست؟",
    options: ["نه", "شاید", "بله", "ببخشید"],
    answer: 2,
    explain: "Evet یعنی بله."
  },
  {
    q: "صبح بخیر به ترکی چه می‌شود؟",
    options: ["İyi geceler", "Hoşça kal", "Lütfen", "Günaydın"],
    answer: 3,
    explain: "Günaydın یعنی صبح بخیر."
  },
  {
    q: "معنی Nasılsın? چیست؟",
    options: ["اسمت چیست؟", "حالت چطوره؟", "اهل کجایی؟", "قیمتش چنده؟"],
    answer: 1,
    explain: "Nasılsın? یعنی حالت چطوره؟"
  }
];

// بخش درس‌ها
document.querySelectorAll("[data-lesson]").forEach(button => {
  button.addEventListener("click", () => {
    const lesson = lessons[Number(button.dataset.lesson)];
    const content = document.getElementById("lessonContent");

    content.replaceChildren();

    const title = document.createElement("h3");
    title.textContent = lesson.title;
    content.appendChild(title);

    const list = document.createElement("div");
    list.className = "vocab-list";

    lesson.items.forEach(([word, meaning, pron]) => {
      const item = document.createElement("div");
      item.className = "vocab-item";

      const wordEl = document.createElement("strong");
      wordEl.textContent = word;
      wordEl.lang = "tr";
      wordEl.dir = "ltr";

      const meaningEl = document.createElement("span");
      meaningEl.textContent = `${meaning} (${pron})`;

      item.append(wordEl, meaningEl);
      list.appendChild(item);
    });

    content.appendChild(list);
    content.hidden = false;
    content.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

// بخش فلش‌کارت‌ها
let cardIndex = 0;
let revealed = false;
let order = cards.map((_, i) => i);

function renderCard() {
  const [word, pron, meaning] = cards[order[cardIndex]];

  document.getElementById("word").textContent = word;
  document.getElementById("pron").textContent = pron;
  document.getElementById("meaning").textContent = meaning;

  document.getElementById("meaning").hidden = !revealed;
  document.getElementById("tapHint").hidden = revealed;

  document.getElementById("cardCounter").textContent =
    `کارت ${cardIndex + 1} از ${order.length}`;
}

document.getElementById("flashcard").addEventListener("click", () => {
  revealed = !revealed;
  renderCard();
});

document.getElementById("prevCard").addEventListener("click", () => {
  cardIndex = (cardIndex - 1 + order.length) % order.length;
  revealed = false;
  renderCard();
});

document.getElementById("nextCard").addEventListener("click", () => {
  cardIndex = (cardIndex + 1) % order.length;
  revealed = false;
  renderCard();
});

document.getElementById("shuffleCards").addEventListener("click", () => {
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  cardIndex = 0;
  revealed = false;
  renderCard();
});

renderCard();

// بخش آزمون
let questionIndex = 0;
let selectedAnswer = null;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const feedback = document.getElementById("feedback");

function renderQuestion() {
  const current = questions[questionIndex];

  selectedAnswer = null;
  answered = false;

  document.getElementById("questionCount").textContent =
    `سؤال ${questionIndex + 1} از ${questions.length}`;

  document.getElementById("progressBar").style.width =
    `${((questionIndex + 1) / questions.length) * 100}%`;

  questionEl.textContent = current.q;
  optionsEl.replaceChildren();

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = option;

    button.addEventListener("click", () => {
      if (answered) return;

      selectedAnswer = index;

      optionsEl.querySelectorAll(".option").forEach(item => {
        item.classList.toggle("selected", item === button);
      });

      checkBtn.disabled = false;
    });

    optionsEl.appendChild(button);
  });

  feedback.hidden = true;
  checkBtn.hidden = false;
  checkBtn.disabled = true;
  nextBtn.hidden = true;
}

checkBtn.addEventListener("click", () => {
  if (selectedAnswer === null || answered) return;

  answered = true;
  const current = questions[questionIndex];
  const buttons = [...optionsEl.querySelectorAll(".option")];

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === current.answer) {
      button.classList.add("correct");
    }

    if (index === selectedAnswer && index !== current.answer) {
      button.classList.add("wrong");
    }
  });

  if (selectedAnswer === current.answer) score++;

  feedback.textContent =
    `${selectedAnswer === current.answer ? "آفرین! پاسخ درست بود. " : "پاسخ درست را مشخص کردیم. "}${current.explain}`;

  feedback.hidden = false;
  checkBtn.hidden = true;
  nextBtn.hidden = false;

  nextBtn.textContent =
    questionIndex === questions.length - 1
      ? "مشاهده نتیجه"
      : "سؤال بعدی ←";
});

nextBtn.addEventListener("click", () => {
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    renderQuestion();
    return;
  }

  const box = document.getElementById("quizBox");
  box.replaceChildren();

  const title = document.createElement("h2");
  title.textContent = `نتیجه آزمون: ${score} از ${questions.length}`;

  const description = document.createElement("p");
  description.textContent =
    score === questions.length
      ? "عالی بود! به همه سؤال‌ها درست جواب دادی."
      : score >= 3
        ? "آفرین! با کمی تمرین بیشتر بهتر می‌شی."
        : "درس‌ها و فلش‌کارت‌ها رو مرور کن و دوباره امتحان بده.";

  const restart = document.createElement("button");
  restart.className = "btn";
  restart.textContent = "تکرار آزمون ↻";

  restart.addEventListener("click", () => {
    questionIndex = 0;
    score = 0;
    renderQuestion();
  });

  box.append(title, description, restart);
});

renderQuestion();
