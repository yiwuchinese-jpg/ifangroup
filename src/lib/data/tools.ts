export interface ToolStep {
  step: number;
  image: string;
  textEn: string;
}

export interface ToolData {
  id: string;
  videoId: string; // YouTube video ID
  steps: ToolStep[];
}

export const toolsData: Record<string, ToolData> = {
  "731": {
    "id": "731",
    "videoId": "AE7_clkBmOg",
    "steps": [
      {
        "step": 1,
        "image": "https://cdn.sanity.io/images/m2e07kon/production/af8370c85f275c806ede77211233f57b4bbd46a4-1920x1080.jpg",
        "textEn": "Choose a right size expander head"
      },
      {
        "step": 2,
        "image": "https://cdn.sanity.io/images/m2e07kon/production/23cd3fef12deabb1a429bc42afe0debf6c4da1b2-1920x1080.jpg",
        "textEn": "put the expander head into PEX pipe"
      },
      {
        "step": 3,
        "image": "https://cdn.sanity.io/images/m2e07kon/production/0b0bd81204102977f36330d54554beceba66808a-1920x1080.jpg",
        "textEn": "expanded the pipe"
      },
      {
        "step": 4,
        "image": "https://cdn.sanity.io/images/m2e07kon/production/ba5fc039d7cc8c51c6f1f9178d50667af5328cde-1920x1080.jpg",
        "textEn": "insert the fitting into expanded pipe pull down gear hook to separate the gear and extrusion mould"
      },
      {
        "step": 5,
        "image": "https://cdn.sanity.io/images/m2e07kon/production/7c62b957dd1d878568b74c27a530d94069d0266f-1920x1080.jpg",
        "textEn": "open the handle , pull down gear hook to separate the gear and extrusion mould"
      },
      {
        "step": 6,
        "image": "https://cdn.sanity.io/images/m2e07kon/production/7a510cbcb8783a001c0031c59547602c37d6387e-1920x1080.jpg",
        "textEn": "pull out axle pin, installing right extrusion,put in axle pin,and return the gear hook"
      },
      {
        "step": 7,
        "image": "https://cdn.sanity.io/images/m2e07kon/production/750a7d01502cca3ef0151012f574ea951dd9fc2e-1920x1080.jpg",
        "textEn": "put the initial installation fitting onto clamping tool"
      },
      {
        "step": 8,
        "image": "https://cdn.sanity.io/images/m2e07kon/production/45e275ceb8558699af57adc1ec3ad6741864a1c4-1920x1080.jpg",
        "textEn": "push the handle till the copper bush meet with fittings' ring washer completely"
      },
      { step: 9, image: "/images/tools/731/steps/9.jpg", textEn: "Open the handle again, the extrusion mould will separate automatic" },
      { step: 10, image: "/images/tools/731/steps/10.jpg", textEn: "And the take down the installed fitting" }
    ],
  },
  "732": {
    id: "732",
    videoId: "YPhPM9uQ-6w",
    steps: [
      { step: 1, image: "/images/tools/732/steps/1.jpg", textEn: "Expand the pipe with the exact size" },
      { step: 2, image: "/images/tools/732/steps/2.jpg", textEn: "Insert the fittings into the expanded pipes" },
      { step: 3, image: "/images/tools/732/steps/3.jpg", textEn: "Load the corresponding die" },
      { step: 4, image: "/images/tools/732/steps/4.jpg", textEn: "Put the right pipe in" },
      { step: 5, image: "/images/tools/732/steps/5.jpg", textEn: "Insert the expanded pipe & fitting" },
      { step: 6, image: "/images/tools/732/steps/6.jpg", textEn: "Reciprocate the flexible handle until the copper sleeve slides into the connector perfectly" },
      { step: 7, image: "/images/tools/732/steps/7.jpg", textEn: "Press unloading pressure bar, exit the die, remove the finished pipe" }
    ],
  },
  "733": {
    id: "733",
    videoId: "orpM7pjsjO8",
    steps: [
      { step: 1, image: "/images/tools/733/steps/1.jpg", textEn: "Use an appropriate expanding die" },
      { step: 2, image: "/images/tools/733/steps/2.jpg", textEn: "Insert the pipe into the expanding die" },
      { step: 3, image: "/images/tools/733/steps/3.jpg", textEn: "Press the trigger, finish the first expanding" },
      { step: 4, image: "/images/tools/733/steps/4.jpg", textEn: "Rotate the head by 180° and make sound click" },
      { step: 5, image: "/images/tools/733/steps/5.jpg", textEn: "Insert the fitting, leave a gap" },
      { step: 6, image: "/images/tools/733/steps/6.jpg", textEn: "Push in the appropriate jaws successively" },
      { step: 7, image: "/images/tools/733/steps/7.jpg", textEn: "Place the pipe in" },
      { step: 8, image: "/images/tools/733/steps/8.jpg", textEn: "Press the start trigger, move the active jaw forward" },
      { step: 9, image: "/images/tools/733/steps/9.jpg", textEn: "Manual retract" }
    ],
  }
};

export const getToolById = (id: string): ToolData | undefined => {
  return toolsData[id];
};
