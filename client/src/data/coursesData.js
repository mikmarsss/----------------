import { useContext } from "react"
import { Context } from ".."

const tags = [
    {
        id: "1",
        tag: "design",
        name: "Дизайн",
    },
    {
        id: "2",
        tag: "programming",
        name: "Программирование",
    },
    {
        id: "3",
        tag: "marketing",
        name: "Маркетинг",
    },
    {
        id: "4",
        tag: "dataBases",
        name: "Базы данных",
    },
    {
        id: "5",
        tag: "QA",
        name: "Тестирование",
    },
    {
        id: "6",
        tag: "3dmodelling",
        name: "3D Моделирование"
    },
    {
        id: "7",
        tag: "popular",
        name: "Популярное"
    },

]

const courses = [
    {
        id: "1",
        tag: "1",
        popular: "popular",
        name: "ОЧЕНЬ КРУТОЙ КУРС ПО ПРОГРАММИРОВАНИЮ",
        description: "Описание тут",
        cost: "1400",
        img: "courseicon.svg",
        author: "Михаил Казинский",
        buyer: "1552",
        time: "41",
        point: "4.7",
    },
    {
        id: "2",
        tag: "2",
        popular: "popular",
        name: "ОЧЕНЬ КРУТОЙ КУРС ПО ДИЗАЙНУ",
        description: "Описание тут",
        cost: "1400",
        author: "Михаил Казинский",
        buyer: "1552",
        time: "41",
        point: "4.7",
    },
    {
        id: "3",
        tag: "3",
        popular: "popular",
        name: "ОЧЕНЬ КРУТОЙ КУРС ПО МАРКЕТИНГУ",
        description: "Описание тут",
        cost: "1400",
        author: "Михаил Казинский",
        buyer: "1552",
        time: "41",
        point: "4.7",
    },
    {
        id: "4",
        tag: "4",
        popular: "popular",
        name: "ОЧЕНЬ КРУТОЙ КУРС ПО МОДЕЛИРОВАНИЮ",
        description: "Описание тут",
        cost: "1400",
        author: "Михаил Казинский",
        buyer: "1552",
        time: "41",
        point: "4.7",
    },
    {
        id: "5",
        tag: "5",
        popular: "popular",
        name: "ОЧЕНЬ КРУТОЙ КУРС ПО ТЕСТИРОВАНИЮ",
        description: "Описание тут",
        cost: "1400",
        author: "Михаил Казинский",
        buyer: "1552",
        time: "41",
        point: "4.7",
    },
    {
        id: "6",
        tag: "6",
        popular: "popular",
        name: "ОЧЕНЬ КРУТОЙ КУРС ПО АНАЛИТИКЕ",
        description: "Описание тут",
        cost: "1400",
        author: "Михаил Казинский",
        buyer: "1552",
        time: "41",
        point: "4.7",
    },
]

const profile = [

    {
        id: "1",
        name: "Профиль",
        url: "/persacc"
    },
    {
        id: "2",
        name: "Мои курсы",
    },
    {
        id: "3",
        name: "Мои заказы",
    },
    {
        id: "4",
        name: "Настройки",
    },
    {
        id: "5",
        name: "Выход",
    }
]


export { tags, courses, profile }