import React from "react";
import { useReducer, createContext, useContext } from "react";

const tempDataForNow = [
  {
    id: 1,
    name: "gelb baum traditionell",
    description:
      "I caught this moment when these yellow lanterns were perfectly complemented by the blooming flowers in the garden. Using a shallow depth of field, I focused on one central lantern while letting the others softly blur in the background. The natural light made the silk lanterns glow beautifully against the green foliage, creating this peaceful, harmonious scene that I was lucky to capture.",
    image:
      "https://images.pexels.com/photos/22669491/pexels-photo-22669491/free-photo-of-gelb-baum-traditionell-hangen.jpeg",
    author: "Khoi Tran",
  },
  {
    id: 2,
    name: "Light & Shadow",
    description:
      "I captured this striking portrait in a moody, golden-hour setting. I used atmospheric lighting to create this warm, ethereal glow around my subject, who's wearing a military-style jacket and a traditional patterned headband. I positioned a large-leafed plant next to them and played with backlighting to create dramatic silhouettes and shadows. The combination of the warm tones and the rich contrasts really brings out the contemplative mood I was aiming for in this shot. The white pants provided a nice contrast against the overall amber atmosphere I created through my lighting setup.",
    image:
      "https://images.pexels.com/photos/29832283/pexels-photo-29832283/free-photo-of-portrat-eines-mannes-der-eine-pflanze-in-kunstlerischem-licht-halt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: "ORBABZ",
  },
  {
    id: 3,
    name: "Through the Falls",
    description:
      "I captured this shot from behind Seljalandsfoss waterfall in Iceland, one of the few waterfalls you can walk behind. I positioned myself in the cave-like space to frame the powerful curtain of water against the bright sky and distant landscape. What I love about this perspective is how it shows both the raw power of the falling water in the foreground and the serene Icelandic countryside in the background, with tiny visitors visible on the viewing path. The natural light filtering through the water created these beautiful blue-grey tones that really capture the ethereal feeling of being in this unique spot.",
    image:
      "https://images.pexels.com/photos/17827718/pexels-photo-17827718/free-photo-of-ijsland.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: "Febe Vanermen",
  },
  {
    id: 4,
    name: "Alpine Gold",
    description:
      "I captured this magical moment during golden hour in what appears to be an alpine setting. The late afternoon sun was hitting the tall evergreen trees perfectly, making them glow in warm amber tones against the snow-dusted mountain peaks in the background. I love how the light caught the texture of the pine needles, creating this beautiful contrast between the illuminated trees in the foreground and the more shadowed mountain face behind them. The composition draws your eye up from the detailed trees to the majestic rocky peaks above.",
    image:
      "https://images.pexels.com/photos/29803469/pexels-photo-29803469/free-photo-of-morgen.jpeg",
    author: "Slampa",
  },
  {
    id: 5,
    name: "The Rental",
    description:
      "I caught this nostalgic scene of an old Airstream trailer converted into a fishing rod rental shop on what looks like a pier in a coastal town. The seagull perched on top added the perfect coastal touch - I couldn't have staged it better myself. The vintage aluminum exterior of the trailer reflects the soft evening light beautifully, and you can see the hillside homes in the background creating depth to the scene. I particularly love how the weathered ROD RENTAL sign and the worn wooden pier boards give the image that classic, timeless feel.",
    image:
      "https://images.pexels.com/photos/29784440/pexels-photo-29784440/free-photo-of-airstream-rutenverleih-am-pismo-beach-pier.jpeg",
    author: "Stayna",
  },
];
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      return [...state, action.payload];
    }
  }
};
const TodoContext = createContext();
export default function TodoProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, tempDataForNow);
  return (
    <TodoContext.Provider value={{ items, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => useContext(TodoContext);
