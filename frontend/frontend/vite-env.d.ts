/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Add other VITE_ environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Type declaration for assets.js module
declare module './src/assets/assets' {
  const moringaImg: string;
  const moringa2Img: string;
  const honeyImg: string;
  const honey2Img: string;
  const ugaliImg: string;
  const ugaliAndStewImg: string;
  const ugaliAndEggsImg: string;
  const ugaliStew2Img: string;
  const riceBeefVegetablesImg: string;
  const riceBeefStewImg: string;
  const kenyanTraditionalMealImg: string;
  const sorghumImg: string;
  const cyclingImg: string;
  const cycling2Img: string;
  const workoutImg: string;
  const workout2Img: string;
  const manTrainingImg: string;
  const man2TrainingImg: string;
  const womanTrainingImg: string;
  const morningRunImg: string;
  const joggingImg: string;
  const joggingHappilyImg: string;
  const womanWellnessImg: string;
  const womanMeditatingImg: string;
  const wellnessImg: string;
  const wellness2Img: string;
  const wellness3Img: string;
  const outdoorTrainingImg: string;
  const outdoorTraining2Img: string;
  const outdoorTraining3Img: string;
  const logoImg: string;

  const assets: {
    [key: string]: string;
  };

  export {
    moringaImg,
    moringa2Img,
    honeyImg,
    honey2Img,
    ugaliImg,
    ugaliAndStewImg,
    ugaliAndEggsImg,
    ugaliStew2Img,
    riceBeefVegetablesImg,
    riceBeefStewImg,
    kenyanTraditionalMealImg,
    sorghumImg,
    cyclingImg,
    cycling2Img,
    workoutImg,
    workout2Img,
    manTrainingImg,
    man2TrainingImg,
    womanTrainingImg,
    morningRunImg,
    joggingImg,
    joggingHappilyImg,
    womanWellnessImg,
    womanMeditatingImg,
    wellnessImg,
    wellness2Img,
    wellness3Img,
    outdoorTrainingImg,
    outdoorTraining2Img,
    outdoorTraining3Img,
    logoImg,
  };

  export default assets;
}