import "./App.css";
import Card from "./component/Card";
import { useState } from "react";
function App() {
  const initialCardData = [
    {
      id: "1",
      title: "Post One",
      time: "4 Day ago",
      description:
        "Croque monsieur paneer cheese triangles. When the cheese comes out everybody's happy cheeseburger melted cheese pepper jack croque",
      reads: 7,
      views: 3224,
      comments: 21,
      color: "#E44759",
      imageLink:
        "https://discovery.sndimg.com/content/dam/images/discovery/editorial/podcasts/Curiosity/2020/3/GettyImages-675488626.jpg.rend.hgtvcom.1280.1280.suffix/1583712292845.jpeg",
    },
    {
      id: "2",
      title: "Post Two",
      time: "1 week ago",
      description:
        "Croque monsieur paneer cheese triangles. When the cheese comes out everybody's happy cheeseburger melted cheese pepper jack croque",
      reads: 11,
      views: 1699,
      comments: 27,
      color: "#F2A93B",
      imageLink:
        "https://discovery.sndimg.com/content/dam/images/discovery/editorial/podcasts/Curiosity/2020/3/GettyImages-675488626.jpg.rend.hgtvcom.1280.1280.suffix/1583712292845.jpeg",
    },
    {
      id: "3",
      title: "Post Three",
      time: "4 week ago",
      description:
        "Croque monsieur paneer cheese triangles. When the cheese comes out everybody's happy cheeseburger melted cheese pepper jack croque",
      reads: 4,
      views: 1624,
      comments: 17,
      color: "#377E22",
      imageLink:
        "https://discovery.sndimg.com/content/dam/images/discovery/editorial/podcasts/Curiosity/2020/3/GettyImages-675488626.jpg.rend.hgtvcom.1280.1280.suffix/1583712292845.jpeg",
    },
    {
      id: "4",
      title: "Post Four",
      time: "4 week ago",
      description:
        "Croque monsieur paneer cheese triangles. When the cheese comes out everybody's happy cheeseburger melted cheese pepper jack croque",
      reads: 4,
      views: 4624,
      comments: 17,
      color: "#4A2CDE",
      imageLink:
        "https://discovery.sndimg.com/content/dam/images/discovery/editorial/podcasts/Curiosity/2020/3/GettyImages-675488626.jpg.rend.hgtvcom.1280.1280.suffix/1583712292845.jpeg",
    },
  ];

  const [cardData, setCardData] = useState(initialCardData);
  const [isStacked, setIsStacked] = useState(false);
  const [isDescending, setIsDescending] = useState(true);

  const handleSortAndStack = () => {
    const sortedData = [...cardData].sort((a, b) =>
      isDescending ? a.views - b.views : b.views - a.views
    );
    setCardData(sortedData);
    setIsStacked(true);
    setIsDescending(!isDescending);
  };

  return (
    <div className="container">
      <button onClick={handleSortAndStack} className="btn">
        Sort & Stack
      </button>
      <div className={`cards-container  ${isStacked ? "center" : ""}`}>
        {cardData?.map((val, index) => (
          <Card key={val.id} data={val} isStacked={isStacked} index={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
