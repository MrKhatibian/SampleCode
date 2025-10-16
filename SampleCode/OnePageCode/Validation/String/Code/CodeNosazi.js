function isValidCodeNosazi(code) {
    if (!code || typeof code !== "string") return false;

    const parts = code.trim().split('-');
    if (parts.length !== 7) return false;

    // همه بخش‌ها باید عددی باشند
    if (parts.some(p => !/^\d+$/.test(p))) return false;

    // سه بخش آخر باید دقیقاً صفر باشند
    if (parts[4] !== "0" || parts[5] !== "0" || parts[6] !== "0") return false;

    // بخش‌های اول تا چهارم نباید خالی باشند
    if (parts.slice(0, 4).some(p => p === "")) return false;

    return true;
}

// ==== نمونه‌های تست ====
const samples = [
    "1-1-25-523-0-0-0",  // ✅ درست
    "1-1-25-523-1-0-0",  // ❌ بخش ۵ صفر نیست
    "1-1-25-523-A-0-0",  // ❌ حرف دارد
    "1-1-25-523-0-0",    // ❌ تعداد بخش‌ها کم است
    "0-1-25-523-0-0-0",  // ✅ اگر بخش اول 0 مجاز باشد
    "1-1--523-0-0-0",    // ❌ بخش خالی دارد
];

// ==== نمایش نتیجه ====
samples.forEach(code => {
    console.log(code, "=>", isValidCodeNosazi(code));
});
