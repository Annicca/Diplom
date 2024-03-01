import { TImageLink } from "./types/TImageLink";
import { TypeLink } from "./types/TypeLink";
import YoutubeIcon from 'assets/icons/youtube.svg?react';
import VkIcon from 'assets/icons/vk.svg?react';
import InstIcon from 'assets/icons/instagram1.svg?react';
import TgIcon from 'assets/icons/telegram.svg?react';

export const IS_MOBILE = window.innerWidth <= 780;
export const URL_IMAGE = "http://localhost:8080/img/"

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

export const socials: TImageLink[] = [
    {
        icon: <YoutubeIcon width = {40} height={40} fill='#000'/>,
        link: 'https://www.youtube.com/'
    },

    {
        icon: <TgIcon width = {40} height={40} fill='#000' />,
        link: 'https://web.telegram.org/'
    },
    {
        icon: <InstIcon width = {40} height={40} fill='#000' color="#000" />,
        link: 'https://www.instagram.com/'
    },
    {
        icon: <VkIcon width = {40} height={40} fill='#000' />,
        link: 'https://vk.com/',
    }
];

