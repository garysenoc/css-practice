import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  count: number;
  posts: Post[];
  filteredPost: Post[];
}

interface Post {
  id: string;
  title: string;
  time: string;
  description: string;
  reads: number;
  views: number;
  comments: number;
  color: string;
  imageLink: string;
}

const initialData = [
  // Initial posts
  {
    id: "1",
    title: "Post One",
    time: "4 Day ago",
    description: "hello there",
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
    description: "Croque mon melted cheese pepper jack croque",
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

const initialState: CounterState = {
  count: 0,
  posts: initialData,
  filteredPost: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Post>) => {
      // Add the new post to the array
      state.posts.push(action.payload);
    },
    sortPostsByViews: (state, action: PayloadAction<boolean>) => {
      // Action to sort posts by views
      const isDescending = action.payload;
      const sortedData = [...state.posts].sort((a, b) =>
        isDescending ? a.views - b.views : b.views - a.views,
      );
      state.posts = sortedData;
    },
    resetCards: (state) => {
      state.posts = initialData;
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.posts = state.posts.filter((post) => post.id !== id);
    },

    filterCards: (state, action: PayloadAction<string>) => {
      const searchText = action.payload;
      const postDuplicate = state.posts;
      const filteredPosts = postDuplicate.filter((post) => {
        const title = post.title.toLowerCase();
        const description = post.description.toLowerCase();
        return title.includes(searchText) || description.includes(searchText);
      });

      state.filteredPost = filteredPosts;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addCard,
  sortPostsByViews,
  resetCards,
  deleteCard,
  filterCards,
} = counterSlice.actions;

export default counterSlice.reducer;

