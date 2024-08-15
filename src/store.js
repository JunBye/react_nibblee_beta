import { configureStore, createSlice } from '@reduxjs/toolkit'
import React from "react";
// 여기도 변수들 양이 많아지면 나눠도 됨.
// db에서 받아온 변수를 store.js에서 받아오려면 ...

let novels = createSlice({
    name : 'novels',
    initialState : [
        {
            img : '/img/airforce_beige.jpg',
            id : 0,
            title : "airforce_beige",
            keyword : ["Beige", "Nike"],
            author : "nike",
            launch : "2024-08-30",
            view : 0,
            rate : 5,
            category : 'Shoes',
        },
        {   img : '/img/airforce_white.jpg',
            id : 1,
            title : "airforce_white",
            keyword : ["White", "Nike"],
            author : "nike",
            launch : "2024-08-30",
            view : 0,
            rate : 5,
            category : 'Shoes',
        },
        {
            img : '/img/samba_black.jpg',
            id : 2,
            title : "samba_classic",
            keyword : ["black", "adidas"],
            author : "adidas",
            launch : "2024-08-30",
            view : 0,
            rate : 5,
            category : 'Shoes',
        },
        {
            img : '/img/Bohemian.png',
            id : 3,
            title : "Bohemian Rapsody",
            keyword : ["Drama", "music"],
            author : "앤서니 매카튼",
            launch : "2024-08-30",
            view : 0,
            rate : 5,
            category : 'Movie',
        },
        {
            img : '/img/frozen.png',
            id : 4,
            title : "Frozen",
            keyword : ["child", "music"],
            author : "제니퍼 리",
            launch : "2024-08-30",
            view : 0,
            rate : 5,
            category : 'Animation',
        },
        {
            img : '/img/greatestshow.png',
            id : 5,
            title : "The Greatest Show",
            keyword : ["Music", "Drama"],
            author : "마이클 그레이시",
            launch : "2024-08-30",
            view : 0,
            rate : 5,
            category : 'Movie',
        },
        {
            img : '/img/insideout2.png',
            id : 6,
            title : "Inside Out 2 ",
            keyword : ["Animation", "Film"],
            author : "Pixar",
            launch : "2024-08-30",
            view : 0,
            rate : 5,
            category : 'Animation',
        },
        {
            img : '/img/lalaland.png',
            id : 7,
            title : "LA LA LAND",
            keyword : ["Film", "music"],
            author : "데이미언 셔젤",
            launch : "2024-08-30",
            view : 0,
            rate : 5,
            category : 'Movie',
        },
        {
            img : '/img/mission.png',
            id : 8,
            title : "Mission Impossible",
            keyword : ["Thrill", "Film"],
            author : "크리스토퍼",
            launch : "2024-08-30",
            view : 0,
            rate : 5,
            category : 'Movie',
        },
        {
            img : '/img/starwars.png',
            id : 9,
            title : "StarWars",
            keyword : ["SF", "film"],
            author : "J.J 에이브럼스",
            launch : "2024-08-30",
            view : 0,
            rate : 5,
            category : 'Movie',
        },
        {
            img : '/img/suzume.png',
            id : 10,
            title : "Suzume",
            keyword : ["Animation", "music"],
            author : "Makoto",
            launch : "2024-08-30",
            view : 0,
            rate : 5,
            category : 'Animation',
        },
        {
            img : '/img/toystory.png',
            id : 11,
            title : "Toy Story 4",
            keyword : ["Animation", "Film"],
            author : "Pixar",
            launch : "2024-08-30",
            view : 0,
            rate : 5,
            category : 'Animation',
        },
        {
            img : '/img/weather.png',
            id : 12,
            title : "Weathering With You",
            keyword : ["Animation", "music"],
            author : "Makoto",
            launch : "2024-08-30",
            view : 0,
            rate : 5,
            category : 'Animation',
        },
        {
            img : '/img/yourname.png',
            id : 13,
            title : "Your Name",
            keyword : ["Animation","music", "film"],
            author : "Makoto",
            launch : "2024-08-30",
            view : 0,
            rate : 5,
            category : 'Animation',
        },
        {
            img : '/img/publang_December.jpg',
            id : 14,
            title : "December",
            keyword : ["novel", "BL"],
            author : "publang",
            launch : "2024-08-30",
            view : 0,
            rate : 5,
            category : 'Web Novel'
        }
    ]
})

let users  = createSlice({
    name : 'users',
    initialState : [
        {
            id: 'user1',
            pw: 'user1',
            email : 'user1@gmail.com',
            nickname : 'user1',
            profile_img : '/img/Profile.png',
            left_cash : 10,
            collection : { // 소장목록
                novel_id : [1,2,3,4],
                bought_episode : [[1,2,3,4], [1], [2], [1]]
            },
            like : [1,2,3,4,5], // 즐겨찾기, novel id 보관
            recently_view : [1,2,3,4,5,6] // localStorage에서 가져오기
        },
        {
            id: 'user2',
            pw: 'user2',
            email : 'user2@gmail.com',
            nickname : 'user2',
            profile_img : '/img/Profile.png',
            left_cash : 0,
            collection : { // 소장목록
                novel_id : [5,9,10],
                bought_episode : [[1,2,3,4,5,6,7,8,9,10,11,13,24], [1], [2]]
            },
            like : [1,2,3,4,5], // 즐겨찾기, novel id 보관
            recently_view : [1,2,3,4,5,6] // localStorage에서 가져오기
        }
    ]
});

export default configureStore({
  reducer: { 
    novels: novels.reducer,
    users : users.reducer
  }
})