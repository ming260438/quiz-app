export interface LocalizedText {
  en: string;
  th: string;
}

export interface Option {
  text: LocalizedText;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  question: LocalizedText;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: {
      en: "What is the capital of France?",
      th: "เมืองหลวงของประเทศฝรั่งเศสคือเมืองใด?",
    },
    options: [
      { text: { en: "Paris", th: "ปารีส" }, isCorrect: true },
      { text: { en: "London", th: "ลอนดอน" }, isCorrect: false },
      { text: { en: "Berlin", th: "เบอร์ลิน" }, isCorrect: false },
      { text: { en: "Rome", th: "โรม" }, isCorrect: false },
    ],
  },
  {
    id: 2,
    question: {
      en: "Which planet is closest to the Sun?",
      th: "ดาวเคราะห์ดวงใดอยู่ใกล้ดวงอาทิตย์มากที่สุด?",
    },
    options: [
      { text: { en: "Mercury", th: "ดาวพุธ" }, isCorrect: true },
      { text: { en: "Venus", th: "ดาวศุกร์" }, isCorrect: false },
      { text: { en: "Earth", th: "โลก" }, isCorrect: false },
      { text: { en: "Mars", th: "ดาวอังคาร" }, isCorrect: false },
    ],
  },
  {
    id: 3,
    question: {
      en: "What is the chemical symbol for gold?",
      th: "สัญลักษณ์ทางเคมีของทองคำคืออะไร?",
    },
    options: [
      { text: { en: "Au", th: "Au" }, isCorrect: true },
      { text: { en: "Ag", th: "Ag" }, isCorrect: false },
      { text: { en: "Go", th: "Go" }, isCorrect: false },
      { text: { en: "Gd", th: "Gd" }, isCorrect: false },
    ],
  },
  {
    id: 4,
    question: {
      en: 'Who wrote "Romeo and Juliet"?',
      th: 'ใครเป็นผู้ประพันธ์เรื่อง "โรมิโอกับจูเลียต"?',
    },
    options: [
      {
        text: { en: "William Shakespeare", th: "วิลเลียม เชกสเปียร์" },
        isCorrect: true,
      },
      {
        text: { en: "Charles Dickens", th: "ชาร์ลส์ ดิกเกนส์" },
        isCorrect: false,
      },
      { text: { en: "Jane Austen", th: "เจน ออสเตน" }, isCorrect: false },
      { text: { en: "Mark Twain", th: "มาร์ก ทเวน" }, isCorrect: false },
    ],
  },
  {
    id: 5,
    question: {
      en: "How many continents are there on Earth?",
      th: "โลกมีทั้งหมดกี่ทวีป?",
    },
    options: [
      { text: { en: "7", th: "7" }, isCorrect: true },
      { text: { en: "5", th: "5" }, isCorrect: false },
      { text: { en: "6", th: "6" }, isCorrect: false },
      { text: { en: "8", th: "8" }, isCorrect: false },
    ],
  },
  {
    id: 6,
    question: {
      en: "What is the largest ocean on Earth?",
      th: "มหาสมุทรที่ใหญ่ที่สุดในโลกคือมหาสมุทรใด?",
    },
    options: [
      {
        text: { en: "Pacific Ocean", th: "มหาสมุทรแปซิฟิก" },
        isCorrect: true,
      },
      {
        text: { en: "Atlantic Ocean", th: "มหาสมุทรแอตแลนติก" },
        isCorrect: false,
      },
      {
        text: { en: "Indian Ocean", th: "มหาสมุทรอินเดีย" },
        isCorrect: false,
      },
      {
        text: { en: "Arctic Ocean", th: "มหาสมุทรอาร์กติก" },
        isCorrect: false,
      },
    ],
  },
  {
    id: 7,
    question: {
      en: "In what year did World War II end?",
      th: "สงครามโลกครั้งที่ 2 สิ้นสุดลงในปีใด?",
    },
    options: [
      { text: { en: "1945", th: "1945" }, isCorrect: true },
      { text: { en: "1939", th: "1939" }, isCorrect: false },
      { text: { en: "1941", th: "1941" }, isCorrect: false },
      { text: { en: "1950", th: "1950" }, isCorrect: false },
    ],
  },
  {
    id: 8,
    question: {
      en: "Who painted the Mona Lisa?",
      th: "ใครเป็นผู้วาดภาพโมนาลิซา?",
    },
    options: [
      {
        text: { en: "Leonardo da Vinci", th: "เลโอนาร์โด ดา วินชี" },
        isCorrect: true,
      },
      { text: { en: "Michelangelo", th: "ไมเคิลแองเจโล" }, isCorrect: false },
      { text: { en: "Raphael", th: "ราฟาเอล" }, isCorrect: false },
      { text: { en: "Caravaggio", th: "คาราวัจโจ" }, isCorrect: false },
    ],
  },
  {
    id: 9,
    question: {
      en: "What is the hardest natural substance on Earth?",
      th: "สารธรรมชาติที่แข็งที่สุดบนโลกคืออะไร?",
    },
    options: [
      { text: { en: "Diamond", th: "เพชร" }, isCorrect: true },
      { text: { en: "Quartz", th: "ควอตซ์" }, isCorrect: false },
      { text: { en: "Titanium", th: "ไทเทเนียม" }, isCorrect: false },
      { text: { en: "Obsidian", th: "ออบซิเดียน" }, isCorrect: false },
    ],
  },
  {
    id: 10,
    question: {
      en: "How many sides does a hexagon have?",
      th: "รูปหกเหลี่ยมมีทั้งหมดกี่ด้าน?",
    },
    options: [
      { text: { en: "6", th: "6" }, isCorrect: true },
      { text: { en: "5", th: "5" }, isCorrect: false },
      { text: { en: "7", th: "7" }, isCorrect: false },
      { text: { en: "8", th: "8" }, isCorrect: false },
    ],
  },
  {
    id: 11,
    question: {
      en: "What is the largest planet in our solar system?",
      th: "ดาวเคราะห์ที่ใหญ่ที่สุดในระบบสุริยะคือดวงใด?",
    },
    options: [
      { text: { en: "Jupiter", th: "ดาวพฤหัสบดี" }, isCorrect: true },
      { text: { en: "Saturn", th: "ดาวเสาร์" }, isCorrect: false },
      { text: { en: "Uranus", th: "ดาวยูเรนัส" }, isCorrect: false },
      { text: { en: "Neptune", th: "ดาวเนปจูน" }, isCorrect: false },
    ],
  },
  {
    id: 12,
    question: {
      en: "What language has the most native speakers in the world?",
      th: "ภาษาใดมีผู้พูดเป็นภาษาแม่มากที่สุดในโลก?",
    },
    options: [
      { text: { en: "Mandarin Chinese", th: "ภาษาจีนกลาง" }, isCorrect: true },
      { text: { en: "English", th: "ภาษาอังกฤษ" }, isCorrect: false },
      { text: { en: "Spanish", th: "ภาษาสเปน" }, isCorrect: false },
      { text: { en: "Hindi", th: "ภาษาฮินดี" }, isCorrect: false },
    ],
  },
  {
    id: 13,
    question: {
      en: "Who is credited with inventing the telephone?",
      th: "ใครได้รับการยกย่องว่าเป็นผู้ประดิษฐ์โทรศัพท์?",
    },
    options: [
      {
        text: { en: "Alexander Graham Bell", th: "อเล็กซานเดอร์ เกรแฮม เบลล์" },
        isCorrect: true,
      },
      { text: { en: "Thomas Edison", th: "โทมัส เอดิสัน" }, isCorrect: false },
      { text: { en: "Nikola Tesla", th: "นิโคลา เทสลา" }, isCorrect: false },
      {
        text: { en: "Guglielmo Marconi", th: "กูลเยลโม มาร์โคนี" },
        isCorrect: false,
      },
    ],
  },
  {
    id: 14,
    question: {
      en: "What is the smallest country in the world by area?",
      th: "ประเทศที่มีพื้นที่เล็กที่สุดในโลกคือประเทศใด?",
    },
    options: [
      { text: { en: "Vatican City", th: "นครรัฐวาติกัน" }, isCorrect: true },
      { text: { en: "Monaco", th: "โมนาโก" }, isCorrect: false },
      { text: { en: "San Marino", th: "ซานมารีโน" }, isCorrect: false },
      { text: { en: "Liechtenstein", th: "ลิกเตนสไตน์" }, isCorrect: false },
    ],
  },
  {
    id: 15,
    question: {
      en: "What element has the atomic number 1?",
      th: "ธาตุใดมีเลขอะตอมเท่ากับ 1?",
    },
    options: [
      { text: { en: "Hydrogen", th: "ไฮโดรเจน" }, isCorrect: true },
      { text: { en: "Helium", th: "ฮีเลียม" }, isCorrect: false },
      { text: { en: "Oxygen", th: "ออกซิเจน" }, isCorrect: false },
      { text: { en: "Carbon", th: "คาร์บอน" }, isCorrect: false },
    ],
  },
  {
    id: 16,
    question: {
      en: "What is the longest river in the world?",
      th: "แม่น้ำที่ยาวที่สุดในโลกคือแม่น้ำใด?",
    },
    options: [
      { text: { en: "Nile", th: "แม่น้ำไนล์" }, isCorrect: true },
      { text: { en: "Amazon", th: "แม่น้ำแอมะซอน" }, isCorrect: false },
      { text: { en: "Yangtze", th: "แม่น้ำแยงซี" }, isCorrect: false },
      {
        text: { en: "Mississippi", th: "แม่น้ำมิสซิสซิปปี" },
        isCorrect: false,
      },
    ],
  },
  {
    id: 17,
    question: {
      en: "How many bones are in the adult human body?",
      th: "ร่างกายของมนุษย์วัยผู้ใหญ่มีทั้งหมดกี่กระดูก?",
    },
    options: [
      { text: { en: "206", th: "206" }, isCorrect: true },
      { text: { en: "195", th: "195" }, isCorrect: false },
      { text: { en: "215", th: "215" }, isCorrect: false },
      { text: { en: "230", th: "230" }, isCorrect: false },
    ],
  },
  {
    id: 18,
    question: {
      en: "In what year did the Berlin Wall fall?",
      th: "กำแพงเบอร์ลินพังทลายในปีใด?",
    },
    options: [
      { text: { en: "1989", th: "1989" }, isCorrect: true },
      { text: { en: "1991", th: "1991" }, isCorrect: false },
      { text: { en: "1985", th: "1985" }, isCorrect: false },
      { text: { en: "1993", th: "1993" }, isCorrect: false },
    ],
  },
  {
    id: 19,
    question: {
      en: "What gas do plants absorb during photosynthesis?",
      th: "พืชดูดซับก๊าซใดระหว่างกระบวนการสังเคราะห์ด้วยแสง?",
    },
    options: [
      {
        text: { en: "Carbon dioxide", th: "คาร์บอนไดออกไซด์" },
        isCorrect: true,
      },
      { text: { en: "Oxygen", th: "ออกซิเจน" }, isCorrect: false },
      { text: { en: "Nitrogen", th: "ไนโตรเจน" }, isCorrect: false },
      { text: { en: "Hydrogen", th: "ไฮโดรเจน" }, isCorrect: false },
    ],
  },
  {
    id: 20,
    question: {
      en: "Which country is home to the kangaroo?",
      th: "จิงโจ้เป็นสัตว์พื้นถิ่นของประเทศใด?",
    },
    options: [
      { text: { en: "Australia", th: "ออสเตรเลีย" }, isCorrect: true },
      { text: { en: "New Zealand", th: "นิวซีแลนด์" }, isCorrect: false },
      { text: { en: "South Africa", th: "แอฟริกาใต้" }, isCorrect: false },
      { text: { en: "Brazil", th: "บราซิล" }, isCorrect: false },
    ],
  },
];

export default QUESTIONS;
