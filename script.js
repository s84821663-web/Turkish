
const $ = (selector) => document.querySelector(selector);

// -------------------- دارک مود و لایت مود --------------------

const themeToggle = $("#themeToggle");

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  themeToggle.textContent =
    theme === "dark" ? " حالت روشن" : " حالت تیره";

  document.documentElement.style.colorScheme =
    theme === "dark" ? "dark" : "light";
}

let savedTheme = "light";

try {
  savedTheme = localStorage.getItem("turkeyar-theme") || "light";
} catch {}

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark")
    ? "light"
    : "dark";

  applyTheme(nextTheme);

  try {
    localStorage.setItem("turkeyar-theme", nextTheme);
  } catch {}
});

// -------------------- لغات آموزشی --------------------

const words = [
  ["Merhaba", "سلام", "سلامت و احوالپرسی"],
  ["Günaydın", "صبح بخیر", "سلامت و احوالپرسی"],
  ["İyi akşamlar", "عصر بخیر", "سلامت و احوالپرسی"],
  ["İyi geceler", "شب بخیر", "سلامت و احوالپرسی"],
  ["Nasılsın?", "حالت چطوره؟", "سلامت و احوالپرسی"],
  ["İyiyim", "خوبم", "سلامت و احوالپرسی"],
  ["Teşekkürler", "ممنون", "سلامت و احوالپرسی"],
  ["Lütfen", "لطفاً", "سلامت و احوالپرسی"],
  ["Evet", "بله", "روزمره"],
  ["Hayır", "نه", "روزمره"],
  ["Tamam", "باشه", "روزمره"],
  ["Belki", "شاید", "روزمره"],
  ["Anlamıyorum", "متوجه نمی‌شوم", "روزمره"],
  ["Anlıyorum", "متوجه می‌شوم", "روزمره"],
  ["Bilmiyorum", "نمی‌دانم", "روزمره"],
  ["Özür dilerim", "ببخشید", "روزمره"],
  ["Affedersiniz", "معذرت می‌خواهم", "روزمره"],
  ["Hoşça kal", "خداحافظ", "روزمره"],
  ["Görüşürüz", "می‌بینمت", "روزمره"],
  ["Arkadaş", "دوست", "روزمره"],
  ["Aile", "خانواده", "روزمره"],
  ["Ev", "خانه", "روزمره"],
  ["Okul", "مدرسه", "روزمره"],
  ["İş", "کار", "روزمره"],
  ["Kitap", "کتاب", "روزمره"],
  ["Su", "آب", "غذا"],
  ["Ekmek", "نان", "غذا"],
  ["Süt", "شیر", "غذا"],
  ["Kahve", "قهوه", "غذا"],
  ["Çay", "چای", "غذا"],
  ["Yemek", "غذا", "غذا"],
  ["Elma", "سیب", "غذا"],
  ["Tavuk", "مرغ", "غذا"],
  ["Hesap lütfen", "صورتحساب لطفاً", "غذا"],
  ["Restoran", "رستوران", "غذا"],
  ["Nerede?", "کجاست؟", "سفر"],
  ["Tuvalet", "دستشویی", "سفر"],
  ["Otel", "هتل", "سفر"],
  ["Havaalanı", "فرودگاه", "سفر"],
  ["Tren", "قطار", "سفر"],
  ["Otobüs", "اتوبوس", "سفر"],
  ["Bilet", "بلیط", "سفر"],
  ["Sağ", "راست", "سفر"],
  ["Sol", "چپ", "سفر"],
  ["Düz", "مستقیم", "سفر"],
  ["Ne kadar?", "چقدر است؟", "خرید"],
  ["Pahalı", "گران", "خرید"],
  ["Ucuz", "ارزان", "خرید"],
  ["Para", "پول", "خرید"],
  ["İndirim", "تخفیف", "خرید"],
  ["Mağaza", "فروشگاه", "خرید"],
  ["Bugün", "امروز", "زمان"],
  ["Yarın", "فردا", "زمان"],
  ["Dün", "دیروز", "زمان"],
  ["Şimdi", "الان", "زمان"],
  ["Saat", "ساعت", "زمان"],
  ["Sabah", "صبح", "زمان"],
  ["Akşam", "عصر / شب", "زمان"],
  ["Mutlu", "خوشحال", "احساسات"],
  ["Üzgün", "ناراحت", "احساسات"],
  ["Yorgun", "خسته", "احساسات"],
  ["Güzel", "زیبا / خوب", "احساسات"],
  ["Seviyorum", "دوست دارم", "احساسات"],
  ["Aşk", "عشق", "احساسات"],
  ["Harika", "عالی", "احساسات"]
];

const wordsGrid = $("#wordsGrid");
const wordSearch = $("#wordSearch");
const emptyWords = $("#emptyWords");
const wordCount = $("#wordCount");

let activeCategory = "همه";

function renderWords() {
  const search = wordSearch.value.trim().toLocaleLowerCase("tr");

  const filtered = words.filter(([tr, fa, category]) => {
    const matchesCategory =
      activeCategory === "همه" || category === activeCategory;

    const matchesSearch =
      tr.toLocaleLowerCase("tr").includes(search) ||
      fa.toLocaleLowerCase("fa").includes(search);

    return matchesCategory && matchesSearch;
  });

  wordCount.textContent = `${filtered.length} لغت`;
  emptyWords.hidden = filtered.length !== 0;

  wordsGrid.innerHTML = filtered.map(([tr, fa, category]) => `
    <article class="word-card">
      <div class="word-top">
        <span class="word-tr" lang="tr" dir="ltr">${escapeHTML(tr)}</span>
        <button type="button" class="speak-word"
          data-word="${escapeHTML(tr)}" aria-label="شنیدن تلفظ ${escapeHTML(tr)}">
          
        </button>
      </div>
      <div class="word-fa">${escapeHTML(fa)}</div>
      <span class="word-category">${escapeHTML(category)}</span>
    </article>
  `).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

wordSearch.addEventListener("input", renderWords);

$("#categoryFilters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;

  document.querySelectorAll(".filter").forEach((item) => {
    item.classList.toggle("active", item === button);
  });

  renderWords();
});

wordsGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".speak-word");
  if (!button) return;

  if (!("speechSynthesis" in window)) {
    alert("مرورگرت از قابلیت تلفظ پشتیبانی نمی‌کند.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(button.dataset.word);
  utterance.lang = "tr-TR";
  utterance.rate = 0.85;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
});

renderWords();

// -------------------- مترجم فارسی و ترکی --------------------

const sourceLang = $("#sourceLang");
const targetLang = $("#targetLang");
const sourceText = $("#sourceText");
const translateBtn = $("#translateBtn");
const translationResult = $("#translationResult");
const charCount = $("#charCount");

sourceText.addEventListener("input", () => {
  charCount.textContent = `${sourceText.value.length} / ۱۰۰۰`;

  if (sourceText.value.length > 1000) {
    sourceText.value = sourceText.value.slice(0, 1000);
    charCount.textContent = "۱۰۰۰ / ۱۰۰۰";
  }
});

$("#swapLang").addEventListener("click", () => {
  const oldSource = sourceLang.value;

  sourceLang.value = targetLang.value;
  targetLang.value = oldSource;

  const oldText = sourceText.value;
  sourceText.value = translationResult.textContent.trim();
  translationResult.textContent = oldText || "ترجمه اینجا نمایش داده می‌شود...";
  charCount.textContent = `${sourceText.value.length} / ۱۰۰۰`;
});

translateBtn.addEventListener("click", async () => {
  const text = sourceText.value.trim();
  const from = sourceLang.value;
  const to = targetLang.value;

  if (!text) {
    translationResult.textContent = "اول متن موردنظرت رو وارد کن.";
    return;
  }

  if (from === to) {
    translationResult.textContent = "زبان مبدأ و مقصد باید متفاوت باشند.";
    return;
  }

  if (text.length > 1000) {
    translationResult.textContent = "متن باید حداکثر ۱۰۰۰ کاراکتر باشد.";
    return;
  }

  translateBtn.disabled = true;
  translateBtn.textContent = "در حال ترجمه...";
  translationResult.textContent = "کمی صبر کن، داریم ترجمه می‌کنیم...";

  try {
    const params = new URLSearchParams({
      q: text,
      langpair: `${from}|${to}`
    });

    const response = await fetch(
      `https://api.mymemory.translated.net/get?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("خطا در ارتباط با سرویس ترجمه");
    }

    const data = await response.json();
    const translated = data?.responseData?.translatedText;

    if (!translated || data.responseStatus !== 200) {
      throw new Error("ترجمه در دسترس نیست");
    }

    const decoded = document.createElement("textarea");
    decoded.innerHTML = translated;
    translationResult.textContent = decoded.value;
  } catch (error) {
    translationResult.textContent =
      "ترجمه انجام نشد. اتصال اینترنتت رو بررسی کن و دوباره امتحان کن.";
  } finally {
    translateBtn.disabled = false;
    translateBtn.textContent = "ترجمه کن ";
  }
});

// -------------------- کپی ترجمه --------------------

$("#copyBtn").addEventListener("click", async () => {
  const text = translationResult.textContent.trim();

  if (!text || text === "ترجمه اینجا نمایش داده می‌شود...") {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    $("#copyBtn").textContent = " کپی شد";
    setTimeout(() => {
      $("#copyBtn").textContent = " کپی";
    }, 1500);
  } catch {
    translationResult.focus?.();
    alert("کپی خودکار انجام نشد. متن ترجمه رو انتخاب و کپی کن.");
  }
});
