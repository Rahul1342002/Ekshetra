import { writable } from "svelte/store";

let userData = "{}"
if (typeof localStorage !== 'undefined') {
    userData = localStorage.getItem("user");
}

export const user = writable(JSON.parse(userData));
user.subscribe(value => {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem("user", JSON.stringify(value));
    }
});

export const showPopup = writable(false)

export const currentEvent = writable("0")

export const isLoading = writable(false)

export const events = [
    {
        id: "1",
        name: "Paper Representation",
        price: 300,
        members: 2,
    }, 
    {
        id: "2",
        name: "Poster Representation",
        price: 200,
        members: 2,
    },
    {
        id: "3",
        name: "Techinal Quiz",
        price: 500,
        members: 4,
    },
    {
        id: "4",
        name: "Mobile E-Sports",
        price: 100,
        members: 4,
    },
    {
        id: "5",
        name: "Blind Coding",
        price: 50,
        members: 1,
    },
    {
        id: "6",
        name: "Cultural Events",
        price: 100,
        members: 1,
    }
]

export const eventStores = writable([
    false,
    false,
    false,
    false,
    false,
    false
])