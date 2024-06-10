import { TImageLink } from "./types/TImageLink";
import { TypeLink } from "./types/TypeLink";
import VkIcon from "assets/icons/vk.svg?react";
import TgIcon from "assets/icons/telegram.svg?react";

export const IS_MOBILE = window.innerWidth <= 1024;
export const URL_IMAGE = "http://localhost:8080/img/";
export const URL_FILE = "http://localhost:8080/rules/";

export const ACCEPTED_FORMATS = [".jpg", ".jpeg", ".png", ".webp"];

export const header: TypeLink[] = [
  {
    title: "Вход",
    link: "/login",
  },
  {
    title: "Регистрация",
    link: "/signin",
  },
  {
    title: "Разместить коллектив и конкурс",
    link: "/create/statement",
  },
];

export const footerList: TypeLink[] = [
  {
    title: "Разместить коллектив",
    link: "/statement",
  },
  {
    title: "Разместить конкурс",
    link: "/statement",
  },
  {
    title: "Конкурсы",
    link: "/competitions",
  },
  {
    title: "Коллективы",
    link: "/",
  },
];

export const socials: TImageLink[] = [
  {
    icon: <TgIcon width={40} height={40} fill="#000" />,
    link: "https://web.telegram.org/",
  },
  {
    icon: <VkIcon width={40} height={40} fill="#000" />,
    link: "https://vk.com/",
  },
];
