import "./App.css";
import Card from "./component/Card";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCard,
  sortPostsByViews,
  resetCards,
  deleteCard,
  filterCards,
} from "./redux/countslice";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "300px",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    zIndex: 100,
  },
};

function App() {
  const [isStacked, setIsStacked] = useState(false);
  const [isDescending, setIsDescending] = useState(true);
  const [title, setTitle] = useState("");
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
    setTitle("");
  }

  const handleSortAndStack = () => {
    dispatch(sortPostsByViews(isDescending));
    setIsStacked(true);
    setIsDescending(!isDescending);
  };

  const posts = useSelector((state) => state.counter.posts);
  const filteredPost = useSelector((state) => state.counter.filteredPost);
  const dispatch = useDispatch();

  const generateRandomPost = (inputTitle = "") => {
    function getRandomColor() {
      const isLightColor = (color) => {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 192; // Adjust this threshold as needed
      };

      let color;
      do {
        color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      } while (isLightColor(color));

      return color;
    }
    const getRandomNumber = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const id = Math.random().toString(36).substring(7);
    const title =
      inputTitle !== "" ? inputTitle : "Post " + getRandomNumber(1, 100);
    const time = getRandomNumber(1, 12) + " week ago";
    const description =
      "Croque monsieur paneer cheese triangles. When the cheese comes out everybody's happy cheeseburger melted cheese pepper jack croque";
    const reads = getRandomNumber(1, 1000);
    const views = getRandomNumber(1000, 10000);
    const comments = getRandomNumber(1, 50);
    const color = getRandomColor(); // Random color
    const imageLink =
      "https://discovery.sndimg.com/content/dam/images/discovery/editorial/podcasts/Curiosity/2020/3/GettyImages-675488626.jpg.rend.hgtvcom.1280.1280.suffix/1583712292845.jpeg"; // Replace with a random image URL

    return {
      id,
      title,
      time,
      description,
      reads,
      views,
      comments,
      color,
      imageLink,
    };
  };

  return (
    <>
      <div className='container'>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel='Example Modal'
        >
          <h2>Add Card with Title</h2>
          <input
            type='text'
            placeholder='Enter a title'
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "12px",
              width: "80%",
              marginBottom: "15px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <button
              className='btn_danger'
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className='btn'
              onClick={() => {
                if (title == "") {
                  alert("Please input title");
                } else {
                  dispatch(addCard(generateRandomPost(title)));
                  closeModal();
                }
              }}
            >
              Add
            </button>
          </div>
        </Modal>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={handleSortAndStack}
            className='btn'
          >
            Sort & Stack
          </button>
          <div style={{ width: "10px" }}></div>{" "}
          {/* Add space between buttons */}
          <button
            onClick={() => dispatch(addCard(generateRandomPost()))}
            className='btn'
          >
            Add Card
          </button>
          <div style={{ width: "10px" }}></div>{" "}
          <button
            onClick={() => dispatch(resetCards())}
            className='btn'
          >
            Reset Cards
          </button>
        </div>
        <div className='search-container'>
          <input
            type='text'
            className='search-input'
            placeholder='Search card'
            onChange={(event) => {
              dispatch(filterCards(event.target.value));
              setSearch(event.target.value);
              console.log("hello");
              console.log(search);
            }}
          />
        </div>

        <div className={`cards-container  ${isStacked ? "center" : ""}`}>
          {search === ""
            ? posts?.map((val, index) => (
                <>
                  <Card
                    key={val.id}
                    data={val}
                    isStacked={isStacked}
                    index={index + 1}
                    deleteCard={() => dispatch(deleteCard(val.id))}
                  />
                </>
              ))
            : filteredPost?.map((val, index) => (
                <>
                  <Card
                    key={val.id}
                    data={val}
                    isStacked={isStacked}
                    index={index + 1}
                    deleteCard={() => dispatch(deleteCard(val.id))}
                  />
                </>
              ))}
        </div>
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
          }}
        >
          <button
            className='btn'
            onClick={openModal}
          >
            Add card with Title
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

