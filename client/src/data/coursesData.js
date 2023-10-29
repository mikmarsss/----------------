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
        tag: "popular",
        name: "Популярное",
        description: "Описание тут",
        cost: "А цена тут"
    },
    {
        id: "2",
        tag: "popular",
        name: "Популярное",
        description: "Описание тут",
        cost: "А цена тут"
    },
    {
        id: "3",
        tag: "popular",
        name: "Популярное",
        description: "Описание тут",
        cost: "А цена тут"
    },
    {
        id: "4",
        tag: "popular",
        name: "Популярное",
        description: "Описание тут",
        cost: "А цена тут"
    },
    {
        id: "5",
        tag: "popular",
        name: "Популярное",
        description: "Описание тут",
        cost: "А цена тут"
    },
    {
        id: "6",
        tag: "popular",
        name: "Популярное",
        description: "Описание тут",
        cost: "А цена тут"
    },
    {
        id: "7",
        tag: "popular",
        name: "Популярное",
        description: "Описание тут",
        cost: "А цена тут"
    },

]

const profile = [

    {
        id: "1",
        name: "Профиль",
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