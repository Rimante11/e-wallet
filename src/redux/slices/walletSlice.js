import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const randomUser = createAsyncThunk(
  "walletList/getRandomUser",
  //fetchar data 
  async () => {
    let response = await fetch("https://randomuser.me/api/");
    let json = await response.json();

    console.log("Json data: ", json);
    return json;
  }
);


const walletSlice = createSlice({
  name: "walletList",
  initialState: {
    randomUser: {
      firstName: "",
      lastName: ""
    },
    listOfCards: [
      {
        id: Date.now(),
        cardNumber: "1111 2222 3333 4444",
        randomUser: {
          firstName: "",
          lastName: ""
        },
        validMonth: "02",
        validYear: "24",
        cvc: "321",
        vendor: "React",
      },
    ],
    status: null,
  },

  reducers: {
    addCard: (state, { payload }) => {
      state.listOfCards.push(payload);
    },
    //fixa error
    //importera till wallet.jsx
    changeActive: (state, { payload }) => {
      let filteredCards = state.listOfCards.filter(
        (card) => card.id !== payload.id
      );
      filteredCards.splice(0, 0, payload);
      return { ...state, listOfCards: filteredCards };
    },
    //importera till wallet.jsx
    deleteCard: (state, { payload }) => {
      let filteredCards = state.listOfCards.filter(
        (card) => card.id !== payload
      );
      return { ...state, listOfCards: filteredCards };
    },
  },
  
  //rendering när promise fulfilled
  extraReducers: {
    [randomUser.fulfilled]: (state, { payload }) => {
      state.randomUser.firstName = payload.results[0].name.first.toUpperCase();
      state.listOfCards[0].randomUser.firstName = payload.results[0].name.first.toUpperCase();

      state.randomUser.lastName = payload.results[0].name.last.toUpperCase();
      state.listOfCards[0].randomUser.lastName = payload.results[0].name.last.toUpperCase();

      state.status = null;
    },

    [randomUser.pending]: (state) => {
      state.status = "Data loading..."
    },

    [randomUser.rejected]: (state) => {
      state.status = "Error! Couldn't bring data."
    }
  },
});

export const { addCard, changeActive, deleteCard } = walletSlice.actions;
export default walletSlice.reducer;
