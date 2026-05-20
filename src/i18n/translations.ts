import { AppLanguage } from "./LanguageContext";

interface AppStrings {
  navHome: string;
  navQuiz: string;
  navResult: string;
  navLeaderboard: string;
  homeKicker: string;
  homeTitle: string;
  homeSubtitleLight: string;
  homeSubtitleDark: string;
  modeLabel: string;
  modeLight: string;
  modeDark: string;
  languageLabel: string;
  languageEnglish: string;
  languageThai: string;
  nameLabel: string;
  namePlaceholder: string;
  startQuiz: string;
  leaderboard: string;
  quizQuestionPrefix: string;
  quizPlayerPrefix: string;
  quizNext: string;
  quizSeeResults: string;
  resultExcellent: string;
  resultGood: string;
  resultKeepGoing: string;
  resultScoreLabel: string;
  resultSaved: string;
  resultViewLeaderboard: string;
  resultPlayAgain: string;
  resultHome: string;
  leaderboardTitle: string;
  leaderboardSubtitle: string;
  leaderboardEmptyTop: string;
  leaderboardEmptyBottom: string;
  leaderboardBackToQuiz: string;
}

const translations: Record<AppLanguage, AppStrings> = {
  en: {
    navHome: "General Knowledge Quiz",
    navQuiz: "Quiz",
    navResult: "Results",
    navLeaderboard: "Leaderboard",
    homeKicker: "QUIZ TIME",
    homeTitle: "Bright Quiz",
    homeSubtitleLight: "20 questions in a bright, easy-to-read interface",
    homeSubtitleDark: "20 questions in a calm dark interface",
    modeLabel: "Theme mode",
    modeLight: "Light",
    modeDark: "Dark",
    languageLabel: "Language",
    languageEnglish: "English",
    languageThai: "Thai",
    nameLabel: "Player name",
    namePlaceholder: "e.g. Alex",
    startQuiz: "Start quiz",
    leaderboard: "View leaderboard",
    quizQuestionPrefix: "Question",
    quizPlayerPrefix: "Player",
    quizNext: "Next",
    quizSeeResults: "See results",
    resultExcellent: "Excellent work",
    resultGood: "Great job",
    resultKeepGoing: "Keep going",
    resultScoreLabel: "Your score",
    resultSaved: "Score has been saved to leaderboard",
    resultViewLeaderboard: "View leaderboard",
    resultPlayAgain: "Play again",
    resultHome: "Back to home",
    leaderboardTitle: "Leaderboard",
    leaderboardSubtitle: "Top 10 scores",
    leaderboardEmptyTop: "No scores yet",
    leaderboardEmptyBottom: "Play a quiz round and come back",
    leaderboardBackToQuiz: "Back to quiz",
  },
  th: {
    navHome: "ควิซความรู้รอบตัว",
    navQuiz: "ทำควิซ",
    navResult: "สรุปผล",
    navLeaderboard: "ตารางคะแนน",
    homeKicker: "QUIZ TIME",
    homeTitle: "ควิซความรู้",
    homeSubtitleLight: "20 คำถามในธีมสว่าง อ่านง่าย สบายตา",
    homeSubtitleDark: "20 คำถามในโทนเข้มสบายตา",
    modeLabel: "โหมดธีม",
    modeLight: "สว่าง",
    modeDark: "มืด",
    languageLabel: "ภาษา",
    languageEnglish: "English",
    languageThai: "ไทย",
    nameLabel: "ชื่อผู้เล่น",
    namePlaceholder: "เช่น กานต์",
    startQuiz: "เริ่มทำควิซ",
    leaderboard: "ดูตารางคะแนน",
    quizQuestionPrefix: "ข้อที่",
    quizPlayerPrefix: "ผู้เล่น",
    quizNext: "ข้อต่อไป",
    quizSeeResults: "ดูสรุปผล",
    resultExcellent: "ยอดเยี่ยมมาก",
    resultGood: "ทำได้ดีมาก",
    resultKeepGoing: "เก่งขึ้นได้อีกนิด",
    resultScoreLabel: "คะแนนของคุณ",
    resultSaved: "บันทึกคะแนนลงตารางเรียบร้อยแล้ว",
    resultViewLeaderboard: "ดูตารางคะแนน",
    resultPlayAgain: "เล่นอีกครั้ง",
    resultHome: "กลับหน้าหลัก",
    leaderboardTitle: "ตารางคะแนน",
    leaderboardSubtitle: "10 อันดับคะแนนสูงสุด",
    leaderboardEmptyTop: "ยังไม่มีคะแนนในระบบ",
    leaderboardEmptyBottom: "เล่นควิซสักรอบแล้วกลับมาดูอีกครั้ง",
    leaderboardBackToQuiz: "กลับไปเล่นควิซ",
  },
};

export function getStrings(language: AppLanguage) {
  return translations[language];
}
