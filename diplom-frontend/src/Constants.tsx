import { ImageLink } from "./types/ImageLink";
import { TypeLink } from "./types/TypeLink";

export const IS_MOBILE = window.innerWidth <= 780;

export const header: TypeLink[] = [
    {
        title: 'Вход',
        link: '/login',
    },
    {
        title: 'Регистрация',
        link: 'signin',
    },
    {
        title: 'Разместить коллектив и конкурс',
        link: '/statement',
    }
];

export const footerList: TypeLink[] = [
    {
        title: 'Разместить коллектив',
        link: '/statement'
    },
    {
        title: 'Разместить конкурс',
        link: '/statement'
    },
    {
        title: 'Конкурсы' ,
        link: '/competitions'
    },
    {
        title: 'Коллективы',
        link: '/'
    }
];

export const socials: ImageLink[] = [
    {
        src: '/icons/youtube.svg',
        alt: 'Youtube',
        link: 'https://www.youtube.com/'
    },

    {
        src: '/icons/telega.svg',
        alt: 'Telegram',
        link: 'https://web.telegram.org/'
    },

    {
        src: '/icons/inst.svg',
        alt: 'Instagram',
        link: 'https://www.instagram.com/'
    },
    {
        src: '/icons/vk.svg',
        alt: 'Vk',
        link: 'https://vk.com/',
    }
];

